"""Inventaire en lecture seule de la boutique PrestaShop de nathalierives.com
(/galerie/), en partant des pages de catégories (le sitemap est périmé).

Ne suit jamais un lien de panier, de compte, de liste de souhaits ni de
comparaison. Une requête à la fois, avec une pause entre chaque.

Usage : python3 -I outils/boutique_inventaire.py <dossier_de_sortie>
Sortie : boutique_categories.json, boutique_pieces.json
"""
import io
import json
import re
import sys
import time
from pathlib import Path

import requests
from bs4 import BeautifulSoup
from PIL import Image

ROOT = "https://www.nathalierives.com/galerie/"
UA = "Mozilla/5.0 (inventaire refonte nathalierives.com; lecture seule)"
PAUSE_PAGE = 2.5
PAUSE_IMAGE = 1.5
# Pages du panier, du compte, etc. (et jamais d'action « ajouter »). Une
# fiche produit (« …/760-panier-rotin.html ») n'est pas concernée.
INTERDIT = re.compile(r"/galerie/(?:panier|commande|mon-compte|module/|comparaison|authentification|adresse)|[?&](?:add|token)=", re.I)
PRODUIT = re.compile(r"/galerie/[^?#]*?/(\d+)-[^/?#]+\.html$")


def get(session, url, pause, **kw):
    if INTERDIT.search(url):
        raise ValueError(f"URL interdite : {url}")
    time.sleep(pause)
    for essai in range(3):
        try:
            r = session.get(url, timeout=60, **kw)
            return r
        except requests.RequestException as e:
            print(f"  erreur {e!r}, nouvel essai", flush=True)
            time.sleep(10 * (essai + 1))
    raise RuntimeError(url)


def soup(html):
    return BeautifulSoup(html, "html.parser")


def categories(session):
    r = get(session, ROOT, 0)
    s = soup(r.text)
    cats = {}
    for a in s.select("a[href]"):
        h = a["href"].split("?")[0].split("#")[0]
        m = re.match(r"https?://www\.nathalierives\.com/galerie/(\d+)-([^/]+)$", h)
        if m and not INTERDIT.search(h):
            cats.setdefault(h, {"id": int(m.group(1)), "slug": m.group(2),
                                "nom": a.get_text(" ", strip=True)})
    return cats


def pieces_de_categorie(session, url):
    trouves, page = [], 1
    while True:
        r = get(session, url, PAUSE_PAGE, params={"n": 100, "p": page})
        s = soup(r.text)
        for li in s.select(".ajax_block_product"):
            a = li.select_one("a.product-name")
            prix = li.select_one(".content_price .price")
            flags = [x.get_text(" ", strip=True) for x in
                     li.select(".label, .availability span, .sale-box, .new-box")]
            if a:
                trouves.append({"url": a["href"], "titre_liste": a.get_text(" ", strip=True),
                                "prix_liste": prix.get_text(" ", strip=True) if prix else None,
                                "etiquettes_liste": [f for f in flags if f]})
        compteur = s.select_one(".product-count")
        texte = compteur.get_text(" ", strip=True) if compteur else ""
        m = re.search(r"(\d+)\s*-\s*(\d+)\s+(?:of|sur|de)\s+(\d+)", texte)
        if not m or int(m.group(2)) >= int(m.group(3)):
            return trouves, texte
        page += 1


def dims_image(session, url):
    """Dimensions et poids d'une image sans la télécharger en entier."""
    r = get(session, url, PAUSE_IMAGE, headers={"Range": "bytes=0-131071"}, stream=True)
    info = {"url": url, "statut": r.status_code}
    if r.status_code not in (200, 206):
        return info
    total = r.headers.get("Content-Range", "").split("/")[-1] or r.headers.get("Content-Length")
    info["octets"] = int(total) if total and total.isdigit() else None
    data = r.raw.read(131072)
    r.close()
    try:
        p = Image.open(io.BytesIO(data))
        info["largeur"], info["hauteur"], info["format"] = p.width, p.height, p.format
    except Exception as e:  # en-tête trop loin dans le fichier
        info["erreur_dims"] = repr(e)
    return info


def fiche(session, url):
    r = get(session, url, PAUSE_PAGE)
    out = {"url": url, "statut_http": r.status_code}
    if r.status_code != 200:
        return out
    s = soup(r.text)
    t = lambda q: (s.select_one(q).get_text(" ", strip=True) if s.select_one(q) else None)
    h = lambda q: (str(s.select_one(q)) if s.select_one(q) else None)
    out["id"] = int(PRODUIT.search(url).group(1))
    out["titre"] = t("h1")
    out["reference"] = (t("#product_reference") or "").replace("Référence:", "").replace("Référence :", "").strip() or None
    out["etat_presta"] = (t("#product_condition") or "").replace("État :", "").replace("Condition:", "").strip() or None
    out["prix"] = t("#our_price_display")
    out["prix_barre"] = t("#old_price_display")
    out["description_courte"] = t("#short_description_content")
    out["description_courte_html"] = h("#short_description_content")
    rte = [x for x in s.select(".page-product-box .rte, #idTab1, .product-description .rte")]
    out["description_longue"] = "\n\n".join(x.get_text("\n", strip=True) for x in rte if x.get_text(strip=True)) or None
    out["caracteristiques"] = [[td.get_text(" ", strip=True) for td in tr.select("td")]
                               for tr in s.select(".table-data-sheet tr")]
    out["disponibilite"] = t("#availability_value")
    out["quantite"] = t("#quantityAvailable")
    out["etiquettes"] = [x.get_text(" ", strip=True) for x in s.select(".primary_block .label, #availability_statut, .sale-box, .new-box") if x.get_text(strip=True)]
    out["fil_ariane"] = t(".breadcrumb")
    meta = s.select_one('meta[name="description"]')
    out["meta_description"] = meta.get("content") if meta else None
    ids = []
    for a in s.select("#thumbs_list a[href], #bigpic"):
        src = a.get("href") or a.get("src") or ""
        m = re.search(r"/galerie/(\d+)-[a-z_]+default/", src)
        if m and int(m.group(1)) not in ids:
            ids.append(int(m.group(1)))
    out["images_ids"] = ids
    out["texte_page_contient_vendu"] = bool(re.search(r"\bvendu", r.text, re.I))
    return out


def chemin_original(image_id):
    return ROOT + "img/p/" + "/".join(str(image_id)) + f"/{image_id}.jpg"


def main(dest):
    dest = Path(dest)
    dest.mkdir(parents=True, exist_ok=True)
    s = requests.Session()
    s.headers["User-Agent"] = UA
    cats = categories(s)
    print(f"{len(cats)} catégories", flush=True)
    pieces = {}
    for url, c in cats.items():
        trouves, compteur = pieces_de_categorie(s, url)
        c["compteur"] = compteur
        c["nb"] = len(trouves)
        print(f"  {c['nom']} : {len(trouves)} ({compteur})", flush=True)
        for p in trouves:
            e = pieces.setdefault(p["url"], {**p, "categories": []})
            e["categories"].append(c["nom"])
    (dest / "boutique_categories.json").write_text(json.dumps(cats, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"{len(pieces)} pièces distinctes", flush=True)
    sortie = dest / "boutique_pieces.json"
    deja = {f["url"]: f for f in json.load(open(sortie, encoding="utf-8"))} if sortie.exists() else {}
    resultat = []
    for i, (url, p) in enumerate(sorted(pieces.items()), 1):
        if url in deja:  # reprise après interruption
            resultat.append(deja[url])
            continue
        f = fiche(s, url)
        f.update({k: p[k] for k in ("titre_liste", "prix_liste", "etiquettes_liste", "categories")})
        f["images"] = [dims_image(s, chemin_original(i_)) for i_ in f.get("images_ids", [])]
        resultat.append(f)
        print(f"[{i}/{len(pieces)}] {f.get('titre')} — {len(f['images'])} photo(s)", flush=True)
        if i % 10 == 0:
            (dest / "boutique_pieces.json").write_text(json.dumps(resultat, ensure_ascii=False, indent=1), encoding="utf-8")
    (dest / "boutique_pieces.json").write_text(json.dumps(resultat, ensure_ascii=False, indent=1), encoding="utf-8")


if __name__ == "__main__":
    main(sys.argv[1])
