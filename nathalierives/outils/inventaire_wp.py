"""Construit l'inventaire WordPress (projets, presse, pages, images) à partir
des exports JSON produits par wp_export.py. Aucun accès réseau.

Usage : python3 -I outils/inventaire_wp.py inventaire/brut inventaire
"""
import csv
import html
import json
import re
import sys
import unicodedata
from collections import Counter, defaultdict
from pathlib import Path

SITE = "https://www.nathalierives.com"
MOIS = {"janvier": 1, "janv": 1, "fevrier": 2, "février": 2, "fev": 2, "mars": 3, "avril": 4, "avr": 4,
        "mai": 5, "juin": 6, "juillet": 7, "juil": 7, "aout": 8, "août": 8, "septembre": 9, "sept": 9,
        "octobre": 10, "oct": 10, "novembre": 11, "nov": 11, "decembre": 12, "décembre": 12, "dec": 12}
PRESSE = {"01. Presse", "02. Parution web", "Presse écrite", "Internet", "03. Télévision",
          "Télévision", "02. Dossier Presse", "04. Dossier de presse"}


def txt(h):
    h = re.sub(r"\[[^\]]*\]", " ", h or "")
    h = re.sub(r"<style.*?</style>|<script.*?</script>", " ", h, flags=re.S)
    h = re.sub(r"<[^>]+>", " ", h)
    return re.sub(r"\s+", " ", html.unescape(h)).strip()


def chemin(url):
    return re.sub(r"^https?://www\.nathalierives\.com", "", url or "")


def sans_accents(s):
    return "".join(c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn")


def date_lisible(*textes):
    """Mois et année lisibles dans un titre ou un nom de fichier, sinon ''."""
    for t in textes:
        t = sans_accents(html.unescape(t or "").lower()).replace("_", " ").replace("-", " ")
        m = re.search(r"\b(" + "|".join(sorted({sans_accents(k) for k in MOIS}, key=len, reverse=True)) +
                      r")\b[^0-9]{0,12}((?:19|20)\d\d)\b", t)
        if m:
            mois = MOIS.get(m.group(1)) or MOIS[[k for k in MOIS if sans_accents(k) == m.group(1)][0]]
            return f"{m.group(2)}-{mois:02d}"
        m = re.search(r"\b((?:19|20)\d\d)[ .]?(0[1-9]|1[0-2])\b", t)
        if m:
            return f"{m.group(1)}-{m.group(2)}"
    return ""


def credits(*textes):
    trouves = []
    for t in textes:
        for m in re.finditer(r"(?:©|\(c\)|copyright|photos?\s*:?)\s*([A-ZÉÈ][\w\-]+(?:[\s\-][A-ZÉÈ][\w\-]+)?)",
                             html.unescape(t or ""), re.I):
            nom = m.group(1).replace("-", " ").strip()
            if nom.lower() not in {"nathalie rives", "mihotel", "la tour"} and nom not in trouves:
                trouves.append(nom)
    return trouves


def main(brut, sortie):
    brut, sortie = Path(brut), Path(sortie)
    pages = json.load(open(brut / "wp_pages.json", encoding="utf-8"))
    posts = json.load(open(brut / "wp_posts.json", encoding="utf-8"))
    media = json.load(open(brut / "wp_media.json", encoding="utf-8"))
    cats = {c["id"]: html.unescape(c["name"]) for c in json.load(open(brut / "wp_categories.json", encoding="utf-8"))}
    par_url, par_id = {}, {}
    for m in media:
        par_id[m["id"]] = m
        par_url[m["source_url"]] = m
        for s in (m.get("media_details") or {}).get("sizes", {}).values():
            par_url.setdefault(s.get("source_url"), m)
    byid = {p["id"]: p for p in pages}

    def image_info(m):
        d = m.get("media_details") or {}
        orig = d.get("original_image")
        url = m["source_url"]
        if orig:  # WordPress a réduit l'image ; l'original est à côté
            url = url.rsplit("/", 1)[0] + "/" + orig
        meta = d.get("image_meta") or {}
        return {"id": m["id"], "url_meilleure": url, "largeur": d.get("width"), "hauteur": d.get("height"),
                "reduite_par_wp": bool(orig), "credit": ", ".join(credits(url, meta.get("credit"), meta.get("copyright"),
                                                                           m["caption"]["rendered"], m["alt_text"]))}

    def images_de(contenu):
        vus, out = set(), []
        for u in re.findall(r"https?://www\.nathalierives\.com/wp-content/uploads/[^\"'\s\)\]]+?\.(?:jpe?g|png|webp)", contenu, re.I):
            u = u.replace("http://", "https://")
            m = par_url.get(u) or par_url.get(re.sub(r"-\d+x\d+(\.\w+)$", r"\1", u))
            key = m["id"] if m else u
            if key not in vus:
                vus.add(key)
                out.append(image_info(m) if m else {"id": None, "url_meilleure": u, "largeur": None, "hauteur": None,
                                                    "reduite_par_wp": False, "credit": ", ".join(credits(u))})
        for ids in re.findall(r'(?:images|ids)\s*=\s*["»“]\s*([\d,\s]+)', contenu):
            for i in ids.split(","):
                i = int(i) if i.strip().isdigit() else None
                if i and i in par_id and i not in vus:
                    vus.add(i)
                    out.append(image_info(par_id[i]))
        return out

    # ---------- Projets ----------
    def ascendants(p):
        out = []
        while p["parent"]:
            p = byid[p["parent"]]
            out.append(p["slug"])
        return out

    rubriques = {"hotel-restaurant": "Hôtels et restaurants", "bureau-commerce": "Commerces et bureaux",
                 "particulier": "Résidentiel", "scenographies-2": "Scénographie", "projets": "(sans rubrique)",
                 "graphisme": "Graphisme"}
    projets = []
    for p in pages:
        anc = ascendants(p)
        if "projets" not in anc and "graphisme" not in anc:
            continue
        rub = rubriques.get(anc[0], anc[0])
        c = p["content"]["rendered"]
        texte = txt(c)
        imgs = images_de(c)
        larg = sorted([max(i["largeur"] or 0, i["hauteur"] or 0) for i in imgs if i["largeur"]])
        titre = html.unescape(p["title"]["rendered"])
        groupe = ""
        for motif, nom in (("tour-rose", "La Tour Rose"), ("chateau-gallee", "Château La Gallée"),
                           ("suite-masala|suite-opera|suite-scala|suite-nacarat", "Suites MiHotel (Lyon)"),
                           ("galerie-nathalie-rives", "Galerie Nathalie Rives"), ("maison-du-repit", "La Maison de Répit"),
                           ("metropole-aidante", "Métropole Aidante"),
                           ("cafe-san-telmo", "Café San Telmo"),
                           ("lambassador|le-chi-ba-bou|le-dinning-room|le-lobby", "Hôtel L'Ambassador, Zermatt"), ("loeuf-a-coq", "L'Œuf à la Coq"),
                           ("terrasses-de-saint-bonnet", "Les Terrasses de Saint-Bonnet")):
            if re.search(motif, p["slug"]):
                groupe = nom
        h4 = re.search(r"<h4[^>]*>(.*?)</h4>", c, re.S)
        lieu = txt(h4.group(1)) if h4 else ""
        index = p["slug"] in rubriques
        projets.append({
            "id_wp": p["id"], "page_index_de_rubrique": "oui" if index else "", "ancienne_adresse": chemin(p["link"]), "titre_actuel": titre, "rubrique_actuelle": rub,
            "regroupement_propose": groupe, "lieu_ecrit_sur_la_page": lieu, "texte_actuel": texte[:600], "nb_mots": len(texte.split()),
            "annee_lisible": "", "nb_photos": len(imgs),
            "plus_grand_cote_max": larg[-1] if larg else "", "plus_grand_cote_median": larg[len(larg) // 2] if larg else "",
            "photos_sous_2000px": sum(1 for x in larg if x < 2000),
            "credits_ecrits_sur_la_page": ", ".join(dict.fromkeys(
                m.strip(" .") for m in re.findall(r"Photos?\s*©\s*([^©|]+?)(?=\s*Photos?\s*©|$)", texte))),
            "derniere_modif_wp": p["modified"][:10],
        })
    projets.sort(key=lambda r: (r["rubrique_actuelle"], r["regroupement_propose"] or r["titre_actuel"], r["ancienne_adresse"]))
    ecrire(sortie / "projets.csv", projets)

    # ---------- Presse ----------
    lignes = {}
    for p in posts:
        noms = {cats[c] for c in p["categories"]}
        if not noms & PRESSE:
            continue
        cible = p["link"].replace("http://", "https://")
        e = lignes.setdefault(cible, {"media_titre_wp": html.unescape(p["title"]["rendered"]).strip(),
                                       "cible": cible, "categories_wp": set(), "type": "",
                                       "date_lisible": "", "source_de_la_date": "",
                                       "vignette": "", "mis_en_ligne_wp": p["date"][:10], "ids_wp": []})
        e["categories_wp"] |= noms
        e["ids_wp"].append(p["id"])
        fm = par_id.get(p["featured_media"])
        if fm and not e["vignette"]:
            e["vignette"] = fm["source_url"]
    for e in lignes.values():
        c = e["cible"]
        e["type"] = ("PDF" if c.lower().endswith(".pdf") else "image" if re.search(r"\.(png|jpe?g)$", c, re.I)
                     else "vidéo" if re.search(r"dailymotion|dai\.ly|youtu|vimeo", c) else "page web")
        nom_fichier = c.rsplit("/", 1)[-1]
        d = date_lisible(e["media_titre_wp"])
        if d:
            e["date_lisible"], e["source_de_la_date"] = d, "titre"
        elif e["type"] in ("PDF", "image") and date_lisible(nom_fichier):
            e["date_lisible"], e["source_de_la_date"] = date_lisible(nom_fichier), "nom du fichier"
        e["controle_date"] = ""
        if e["date_lisible"]:
            lu = int(e["date_lisible"][:4]) * 12 + int(e["date_lisible"][5:7])
            mis = int(e["mis_en_ligne_wp"][:4]) * 12 + int(e["mis_en_ligne_wp"][5:7])
            if lu > mis + 1:
                e["controle_date"] = "à vérifier : postérieure à la mise en ligne"
            elif mis - lu > 6:
                e["controle_date"] = f"à vérifier : mise en ligne {mis - lu} mois après"
        e["categories_wp"] = ", ".join(sorted(e["categories_wp"]))
        e["ids_wp"] = " ".join(map(str, e["ids_wp"]))
    presse = sorted(lignes.values(), key=lambda e: (e["date_lisible"] or "0000", e["mis_en_ligne_wp"]), reverse=True)
    ecrire(sortie / "presse.csv", presse)

    # ---------- Toutes les pages (pour la table de redirection) ----------
    toutes = [{"id_wp": p["id"], "ancienne_adresse": chemin(p["link"]), "titre": html.unescape(p["title"]["rendered"]),
               "parent": chemin(byid[p["parent"]]["link"]) if p["parent"] in byid else "",
               "nb_mots": len(txt(p["content"]["rendered"]).split()), "derniere_modif_wp": p["modified"][:10]}
              for p in pages]
    toutes.sort(key=lambda r: r["ancienne_adresse"])
    ecrire(sortie / "wp_pages.csv", toutes)

    # ---------- PDF ----------
    pdfs = [{"id_wp": m["id"], "adresse": chemin(m["source_url"]), "titre": html.unescape(m["title"]["rendered"]),
             "mis_en_ligne_wp": m["date"][:10], "date_lisible": date_lisible(m["title"]["rendered"], m["source_url"].rsplit("/", 1)[-1])}
            for m in media if m["mime_type"] == "application/pdf"]
    ecrire(sortie / "pdf.csv", pdfs)

    # ---------- Résumé ----------
    res = {
        "pages": len(pages), "articles": len(posts), "medias": len(media),
        "medias_par_type": Counter(m["mime_type"] for m in media),
        "projets_par_rubrique": Counter(r["rubrique_actuelle"] for r in projets),
        "regroupements": Counter(r["regroupement_propose"] for r in projets if r["regroupement_propose"]),
        "presse_lignes_uniques": len(presse), "presse_avec_date_lisible": sum(1 for e in presse if e["date_lisible"]),
        "presse_par_type": Counter(e["type"] for e in presse), "pdf": len(pdfs),
    }
    (sortie / "resume_wp.json").write_text(json.dumps(res, ensure_ascii=False, indent=1, default=dict), encoding="utf-8")
    print(json.dumps(res, ensure_ascii=False, indent=1, default=dict))


def ecrire(path, lignes):
    path.parent.mkdir(parents=True, exist_ok=True)
    if not lignes:
        return
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(lignes[0].keys()))
        w.writeheader()
        w.writerows(lignes)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
