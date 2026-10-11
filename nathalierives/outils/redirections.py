"""Brouillon de la table de redirection : chaque ancienne adresse publique
(pages WordPress, catégories et fiches de la boutique, pages légales, PDF)
vers une adresse du nouveau site. Aucun accès réseau.

Usage : python3 -I outils/redirections.py inventaire arret-1/redirections-brouillon.csv
"""
import csv
import json
import re
import sys
import unicodedata
from pathlib import Path

CATEGORIES = {
    "12-meubles": "/galerie/mobilier/", "21-tables": "/galerie/tables/", "23-tables-basses": "/galerie/tables-basses/",
    "25-rangements": "/galerie/rangements/", "22-enfilades": "/galerie/enfilades/", "26-bureaux": "/galerie/bureaux/",
    "15-assises": "/galerie/assises/", "35-chaises": "/galerie/chaises/", "68-fauteuils": "/galerie/fauteuils/",
    "34-tabourets": "/galerie/tabourets/", "69-canape": "/galerie/canapes/",
    "13-luminaires": "/galerie/luminaires/", "27-lampes-de-table": "/galerie/lampes-de-table/",
    "28-lampadaires": "/galerie/lampadaires/", "29-appliques": "/galerie/appliques/", "30-suspensions": "/galerie/suspensions/",
    "14-ceramiques-accessoires": "/galerie/objets/", "64-ceramiques-decoratives": "/galerie/ceramiques/",
    "66-art-de-la-table": "/galerie/art-de-la-table/", "100-bougeoirs": "/galerie/objets/", "101-miroirs": "/galerie/miroirs/",
    "110-coussins": "/galerie/objets/", "111-tapisseries": "/galerie/tapisseries/", "103-divers": "/galerie/objets/",
    "18-art": "/galerie/art/", "112-tableaux-": "/galerie/art/", "113-sculptures-": "/galerie/art/",
    "20-edition": "/galerie/editions/", "93-capsule": "/galerie/editions/", "107-mobilier": "/galerie/editions/",
    "108-assise": "/galerie/editions/", "114-vase": "/galerie/editions/", "115-dainche": "/galerie/editions/",
    "117-pem": "/galerie/art/", "118-galatee-martin": "/galerie/editions/",
}
GROUPES = {"La Tour Rose": "la-tour-rose", "Château La Gallée": "chateau-la-gallee",
           "Suites MiHotel (Lyon)": "suites-mihotel", "Hôtel L'Ambassador, Zermatt": "hotel-l-ambassador-zermatt",
           "La Maison de Répit": "la-maison-de-repit", "Métropole Aidante": "metropole-aidante",
           "Galerie Nathalie Rives": "galerie-nathalie-rives"}
RUBRIQUES = {"/projets/": "/interieurs/", "/projets/hotel-restaurant/": "/interieurs/hotels-et-restaurants/",
             "/projets/bureau-commerce/": "/interieurs/commerces/", "/projets/particulier/": "/interieurs/residentiel/",
             "/projets/scenographies-2/": "/interieurs/scenographies/"}
FIXES = {
    "/": "/", "/agence/": "/studio/", "/agence/equipe/": "/studio/#equipe", "/agence/bureau-detudes/": "/studio/#methode",
    "/agence/03-recompenses/": "/studio/#recompenses", "/agence/graphisme/": "/studio/graphisme/",
    "/contact/": "/contact/", "/presse/": "/presse/", "/co/": "/studio/collaborations/", "/la-revue/": "/studio/",
    "/news/": "/", "/manage-subscriptions/": "/#newsletter", "/inauguration-galerie-nathalie-rives/": "/studio/",
    "/galerie/": "/galerie/", "/galerie/content/2-mentions-legales": "/mentions-legales/",
    "/galerie/content/3-conditions-utilisation": "/conditions-de-vente/",
    "/galerie/content/5-paiement-securise": "/conditions-de-vente/#paiement",
    "/galerie/commande": "/galerie/", "/galerie/panier": "/galerie/", "/galerie/mon-compte": "/galerie/",
    "/galerie/module/blockwishlist/mywishlist": "/galerie/", "/galerie/comparaison-produits": "/galerie/",
}
PDF_PRO = {"/wp-content/uploads/2018/04/Nathalie-Rives-X-bars-restaurants-.pdf": "/interieurs/hotels-et-restaurants/#presentation"}


def slug(s):
    s = unicodedata.normalize("NFD", s.lower())
    s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    return re.sub(r"[^a-z0-9]+", "-", s.replace("’", "-").replace("'", "-")).strip("-")


def main(inv, dest):
    inv = Path(inv)
    lignes = []

    def ajoute(old, new, typ, note=""):
        lignes.append({"ancienne_adresse": old, "nouvelle_adresse": new, "type": typ, "remarque": note})

    projets = {r["ancienne_adresse"]: r for r in csv.DictReader(open(inv / "projets.csv", encoding="utf-8"))}
    for r in csv.DictReader(open(inv / "wp_pages.csv", encoding="utf-8")):
        a = r["ancienne_adresse"]
        if a in FIXES:
            ajoute(a, FIXES[a], "page WordPress")
        elif a in RUBRIQUES:
            ajoute(a, RUBRIQUES[a], "rubrique de projets")
        elif a in projets:
            p = projets[a]
            if p["rubrique_actuelle"] == "Graphisme":
                ajoute(a, "/studio/graphisme/", "graphisme", "si Nathalie garde la page Graphisme")
            elif p["regroupement_propose"] in GROUPES:
                ajoute(a, f"/interieurs/{GROUPES[p['regroupement_propose']]}/", "projet regroupé",
                       f"regroupement « {p['regroupement_propose']} » à confirmer")
            else:
                ville = ""
                if p["titre_actuel"].upper() == "SUMMER":
                    ville = "-arles" if "Arles" in p["lieu_ecrit_sur_la_page"] else "-lyon"
                note = "projet en attente (photos d'origine demandées)" if "saint-louis" in a else ""
                ajoute(a, f"/interieurs/{slug(p['titre_actuel'])}{ville}/", "projet", note)
        elif re.search(r"numero-\d+|^/news/", a):
            ajoute(a, "/", "newsletter en image", "non reprise (brief)")
        else:
            ajoute(a, "/", "page WordPress", "À VÉRIFIER : pas de correspondance évidente")

    for old, new in CATEGORIES.items():
        ajoute(f"/galerie/{old}", new, "catégorie de la boutique")

    pieces = json.load(open(inv / "brut" / "boutique_pieces.json", encoding="utf-8"))
    for p in pieces:
        old = p["url"].replace("https://www.nathalierives.com", "")
        if p.get("statut_http") == 200:
            ajoute(old, f"/galerie/{slug(p['titre'] or 'piece')}-{p['id']}/", "fiche de la boutique",
                   "adresse définitive après validation des titres")
        else:
            ajoute(old, "/galerie/", "fiche de la boutique", f"page en erreur {p.get('statut_http')}")

    for r in csv.DictReader(open(inv / "pdf.csv", encoding="utf-8")):
        a = r["adresse"]
        ajoute(a, PDF_PRO.get(a, "/presse/"), "PDF", "PDF d'article : pas remis en ligne sans ton accord" if a not in PDF_PRO else "présentation allégée")

    ajoute("/news/*", "/", "règle générale", "toutes les newsletters")
    ajoute("/galerie/*", "/galerie/", "règle générale", "toute autre adresse de l'ancienne boutique")
    ajoute("/wp-content/uploads/*.pdf", "/presse/", "règle générale", "tout autre PDF")

    dest = Path(dest)
    dest.parent.mkdir(parents=True, exist_ok=True)
    with open(dest, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(lignes[0].keys()))
        w.writeheader()
        w.writerows(lignes)
    print(len(lignes), "lignes ;", sum(1 for l in lignes if "À VÉRIFIER" in l["remarque"]), "à vérifier")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
