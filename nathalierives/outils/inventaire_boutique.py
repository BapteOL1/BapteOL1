"""Tableaux de l'inventaire de la boutique, à partir de boutique_pieces.json.
Aucun accès réseau. Ne devine rien d'après les photos : tout vient du titre,
de la description et des catégories de la boutique actuelle.

Usage : python3 -I outils/inventaire_boutique.py inventaire/brut inventaire
Sorties : pieces.csv, titres_a_valider.csv, designers_nommes.csv,
          a_rephotographier.csv, resume_boutique.json
"""
import csv
import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

LUMINAIRE = {"Luminaires", "Lampes de table", "Lampadaires", "Appliques", "Suspensions"}
ASSISE = {"Assises", "Chaises", "Fauteuils", "Tabourets", "Canapés"}
MEUBLE = {"Meubles", "Tables", "Tables basses", "Rangements", "Enfilades", "Bureaux"}
EDITION = {"Edition", "Capsules", "Vases", "Dainche", "PEM", "Galatée Martin"}

# Noms propres repérés en lisant les fiches : designers, ateliers, éditeurs,
# artistes, manufactures. Seuls ceux qui apparaissent dans le texte d'une
# fiche sont retenus ; la liste sert à les reconnaître, pas à en ajouter.
NOMS = ["André Sornay", "Audoux & Minet", "Audoux-Minet", "Audoux Minet", "Maison Bagues", "Bagues",
        "Galatée Martin", "Jean Picart Ledoux", "Jean Picart Le Doux", "Robert Four", "Jean Louis Viard",
        "Jean-Louis Viard", "Roga", "Jean Lurçat", "Georges Braque", "Gianni Verma", "Georges Rohner",
        "Gianfranco Schialvino", "Denise Margoni", "Grandjean-Jourdan", "Grandjean Jourdan", "St Clément",
        "Saint-Clément", "Labrut Frères", "Valauris", "Vallauris", "Accolay", "Maison Pinton", "Pinton",
        "Tissage des Flandres", "Pierre Frey", "Frey", "Dainche", "PEM", "Capri", "Chippendale",
        "Le Corbusier", "Charlotte Perriand", "Pierre Jeanneret", "Jean Prouvé", "Mathieu Matégot",
        "Matégot", "Pierre Guariche", "Joseph-André Motte", "Alain Richard", "Arlus", "Lunel",
        "Maison Jansen", "Jansen", "Maison Charles", "Willy Rizzo", "Gio Ponti", "Paolo Buffa",
        "Jacques Adnet", "Adnet", "Marcel Breuer", "Thonet", "Baumann", "Knoll", "Gae Aulenti",
        "Tito Agnoli", "Robert Mathieu", "Jean Royère", "Royère", "Christian Liaigre", "Liaigre",
        "Hugues Steiner", "Michel Buffet", "Pierre Paulin", "Paulin", "Olivier Mourgue", "Pierre Cardin",
        "Jacques Biny", "René-Jean Caillette", "Charles Ramos", "Roger Capron", "Capron",
        "Jean Marais", "Picasso", "Madoura", "Fontana Arte", "Stilnovo", "Venini", "Murano",
        "Barovier", "Mazzega", "Veronese", "Sarfatti", "Louis Sognot", "Charlotte Alix",
        "Jules Leleu", "Leleu", "Ruhlmann", "Jean-Michel Frank", "Diego Giacometti",
        "Sornay", "Ligne Roset", "Roche Bobois", "Cassina", "Artemide", "Flos", "Kartell",
        "Vitra", "Eames", "Saarinen", "Bertoia", "Hans Wegner", "Wegner", "Arne Jacobsen",
        "Finn Juhl", "Kai Kristiansen", "Poul Henningsen", "Louis Poulsen", "Le Klint",
        "Ingo Maurer", "Hervé Baley", "Philippe Starck", "Mathieu Lustrerie", "Lustrerie Mathieu"]
NOMS_PAR_LONGUEUR = sorted(set(NOMS), key=len, reverse=True)

PERIODE = re.compile(r"(années\s*(?:19)?\d0(?:\s*[-/à]\s*(?:19)?\d0)?|XVIII[eè]?m?e?|XIX[eè]?m?e?|XX[eè]?m?e?\s*siècle|"
                     r"\b1[89]\d\d\b|art\s*d[ée]co|art\s*nouveau|napol[ée]on\s*III|Louis\s*XV|Louis\s*XVI|"
                     r"mid[- ]century|vintage)", re.I)
ETAT = re.compile(r"(en l'état|en l’état|défaut[^.]*|usure[^.]*|patine[^.]*|éclat[^.]*|rayure[^.]*|fêlure[^.]*|"
                  r"manque[^.]*|accident[^.]*|restaur[^.]*|très bon état|bon état|état d'origine|état d’origine)", re.I)
CABLAGE = re.compile(r"(c[âa]bl[^.]*|électrifi[^.]*|recâbl[^.]*|douille[^.]*|ampoule[^.]*)", re.I)
ORIGINE = re.compile(r"\b(France|français[e]?|italien(?:ne)?s?|Italie|danois[e]?|Danemark|scandinave|suédois[e]?|"
                     r"anglais[e]?|Angleterre|espagnol[e]?|Espagne|allemand[e]?|Allemagne|belge|Belgique|"
                     r"portugais[e]?|marocain[e]?|Maroc|chinois[e]?|Chine|japonais[e]?|Japon|indien(?:ne)?|"
                     r"Inde|brésilien(?:ne)?|américain[e]?|Lyon|Vallauris|Valauris|Paris)\b", re.I)
HORS_UE = re.compile(r"\b(anglais[e]?|Angleterre|marocain[e]?|Maroc|chinois[e]?|Chine|japonais[e]?|Japon|indien(?:ne)?|"
                     r"Inde|brésilien(?:ne)?|américain[e]?|suisse)\b", re.I)
BOIS = re.compile(r"\b(bois|chêne|noyer|teck|palissandre|hêtre|acajou|merisier|frêne|orme|pin|sapin|bambou|"
                  r"rotin|érable|ébène|wengé|wenge|olivier|loupe|placage|plaqué)\b", re.I)
ESSENCES = re.compile(r"\b(chêne|noyer|teck|palissandre|hêtre|acajou|merisier|frêne|orme|pin|sapin|érable|ébène|"
                      r"wengé|wenge|olivier|loupe de \w+|bambou|rotin)\b", re.I)
REMBOURRE = re.compile(r"(rembourr|garni|tissu|velours|skaï|skai|cuir|coussin|tapiss|lin|laine bouclée|bouclette)", re.I)
METAL = re.compile(r"\b(métal|metal|acier|fer|laiton|chrom|aluminium|tubulaire)\w*", re.I)


def prix(t):
    if not t:
        return None
    t = t.replace(" ", " ").replace("\xa0", " ")
    m = re.search(r"([\d ]+(?:,\d+)?)\s*€", t)
    return float(m.group(1).replace(" ", "").replace(",", ".")) if m else None


def texte(p):
    return " ".join(x for x in (p.get("description_courte"), p.get("description_longue")) if x)


def dimensions(t):
    """Toutes les mesures en cm lues dans le texte ; renvoie (extrait, max)."""
    m = re.search(r"(Dimensions?[^:]*:?\s*.*?)(?:Prix livraison|Livraison prix|Matières?\s*:|$)", t, re.I | re.S)
    extrait = m.group(1).strip() if m else ""
    nombres = [float(x.replace(",", ".")) for x in re.findall(r"(\d+(?:[.,]\d+)?)\s*(?:c\s?m)\b", t, re.I)]
    nombres += [float(x.replace(",", ".")) for x in re.findall(r"\b[LPHD]\s*:?\s*(\d+(?:[.,]\d+)?)", extrait)]
    return extrait[:200], (max(nombres) if nombres else None)


def noms_dans(t):
    trouves, reste = [], t
    for n in NOMS_PAR_LONGUEUR:
        if re.search(r"(?<![\w-])" + re.escape(n) + r"(?![\w-])", reste):
            trouves.append(n)
            reste = re.sub(re.escape(n), " ", reste)
    return trouves


def niveau(t, nom):
    i = t.find(nom)
    avant = t[max(0, i - 40):i].lower()
    if "dans le goût" in avant or "dans le style" in avant or "style" in avant[-12:]:
        return "dans le goût de"
    if "d'après" in avant or "d’après" in avant or "reproduction" in t.lower():
        return "d'après (reproduction)"
    if "attribu" in avant:
        return "attribué à"
    if "signé" in avant or "signée" in avant or "par" in avant[-6:] or "de" in avant[-4:]:
        return "de (signé ou nommé)"
    return "nommé, niveau à préciser"


def famille(cats, titre):
    c = set(cats)
    if c & {"Capsules", "Galatée Martin", "PEM", "Dainche", "Edition"} or re.search(r"capsule", titre, re.I):
        return "édition ou artiste"
    if c & LUMINAIRE:
        return "luminaire"
    if c & ASSISE:
        return "assise"
    if c & MEUBLE:
        return "meuble"
    if "Tapisseries" in c:
        return "tapisserie"
    if "Tableaux" in c or "Art" in c or "Sculptures" in c:
        return "art"
    if "Art de la table" in c:
        return "art de la table"
    if "Céramiques" in c:
        return "céramique"
    if "Miroirs" in c:
        return "miroir"
    if "Coussins" in c:
        return "coussin"
    if "Bougeoirs" in c:
        return "bougeoir"
    return "divers"


def type_douanier(fam, t, titre):
    """Proposition seulement ; vide quand le texte ne suffit pas (brief)."""
    origine_hors_ue = bool(HORS_UE.search(t + " " + titre))
    if origine_hors_ue:
        return "", "fabriquée hors UE d'après le texte : pas de taux vérifié"
    if fam == "luminaire":
        return "luminaire (10 %)", "origine UE à confirmer"
    if fam == "meuble":
        return "meuble (10 %)", "origine UE à confirmer" + ("; essences de bois à préciser" if BOIS.search(t) else "")
    if fam == "tapisserie":
        return "tapisserie (10 %)", "origine UE à confirmer"
    if fam == "céramique":
        if re.search(r"\bverre\b", t + titre, re.I):
            return "", "verre : pas de taux vérifié"
        return "céramique décorative (10 %)", "origine UE à confirmer"
    if fam == "assise":
        rembourre = bool(REMBOURRE.search(t + " " + titre))
        structure_bois = bool(re.search(r"\b(bois|chêne|noyer|hêtre|acajou|merisier|frêne|orme|pin)\b", t + " " + titre, re.I))
        structure_metal_teck = bool(METAL.search(t) or re.search(r"\bteck\b", t, re.I))
        if rembourre and structure_bois and not structure_metal_teck:
            return "siège rembourré, structure bois (15 %)", "origine UE à confirmer"
        if rembourre and structure_metal_teck and not structure_bois:
            return "siège rembourré, structure métal ou teck (10 %)", "origine UE à confirmer"
        return "", "structure ou garniture non précisée : question à Nathalie"
    if fam == "édition ou artiste":
        if re.search(r"tapisserie", titre, re.I):
            return "tapisserie (10 %)", "édition ; lieu de fabrication à confirmer"
        return "", "œuvre ou édition : type à préciser"
    return "", {"art": "œuvre d'art : pas de taux vérifié", "art de la table": "vaisselle : pas de taux vérifié",
                "miroir": "miroir : pas de taux vérifié", "coussin": "coussin : pas de taux vérifié",
                "bougeoir": "pas de taux vérifié", "divers": "pas de taux vérifié"}.get(fam, "pas de taux vérifié")


def taille_envoi(maxi, t, titre):
    if maxi is None:
        return "", "dimensions absentes"
    lot = re.search(r"\b(lot|paire|ensemble|\d+\s+(?:chaises|assiettes|verres|pièces))\b", t + " " + titre, re.I)
    if maxi <= 60:
        taille = "petite"
    elif maxi <= 130:
        taille = "moyenne"
    else:
        taille = "grande"
    return taille, ("lot ou paire : à vérifier" if lot else "")


GENERIQUES = {"lampe de table", "lampe", "applique murale", "paire d'appliques", "paire d’appliques", "tapisserie",
              "plat en céramique", "peinture sur papier", "vase", "tableau", "assiette ancienne", "chaise en rotin",
              "vase boule en céramique", "suspension", "lampadaire", "table basse", "chaise", "fauteuil", "miroir",
              "applique", "vase capri", "service en céramique", "céramique italienne"}


def main(brut, sortie):
    brut, sortie = Path(brut), Path(sortie)
    data = json.load(open(brut / "boutique_pieces.json", encoding="utf-8"))
    compte_titres = Counter((p.get("titre") or "").strip().lower() for p in data)
    pieces, titres, designers, photos = [], [], defaultdict(list), []
    for p in data:
        if p.get("statut_http") != 200:
            pieces.append({"id_boutique": p.get("url"), "statut_http": p.get("statut_http")})
            continue
        t = texte(p)
        titre = (p.get("titre") or "").strip()
        fam = famille(p.get("categories", []), titre)
        extrait, maxi = dimensions(t)
        noms = noms_dans(titre + " " + t)
        typ, typ_note = type_douanier(fam, t, titre)
        taille, taille_note = taille_envoi(maxi, t, titre)
        imgs = [i for i in p.get("images", []) if i.get("largeur")]
        cotes = sorted(max(i["largeur"], i["hauteur"]) for i in imgs)
        etat = "; ".join(dict.fromkeys(m.group(0).strip() for m in ETAT.finditer(t)))
        pieces.append({
            "id_boutique": p["id"], "reference": p.get("reference") or "", "titre_actuel": titre,
            "categories": ", ".join(p.get("categories", [])), "famille": fam, "prix_affiche_ttc": prix(p.get("prix")),
            "description": t, "dimensions_lues": extrait, "plus_grande_dimension_cm": maxi or "",
            "periode_lue": ", ".join(dict.fromkeys(m.group(0) for m in PERIODE.finditer(t))),
            "noms_cites": ", ".join(noms), "origine_lue": ", ".join(dict.fromkeys(m.group(0) for m in ORIGINE.finditer(t))),
            "essences_lues": ", ".join(dict.fromkeys(m.group(0).lower() for m in ESSENCES.finditer(t))),
            "etat_lu": etat, "cablage_lu": "; ".join(m.group(0) for m in CABLAGE.finditer(t)),
            "type_douanier_propose": typ, "note_type": typ_note, "taille_envoi_proposee": taille, "note_taille": taille_note,
            "nb_photos": len(p.get("images_ids", [])), "plus_grand_cote_px_max": cotes[-1] if cotes else "",
            "photos_sous_2000px": sum(1 for c in cotes if c < 2000), "format_images": ", ".join(sorted({i.get("format") or "?" for i in imgs})),
            "ancienne_adresse": p["url"].replace("https://www.nathalierives.com", ""),
        })
        generique = titre.lower() in GENERIQUES or compte_titres[titre.lower()] > 1
        if generique or not noms:
            a_verifier = []
            if compte_titres[titre.lower()] > 1:
                a_verifier.append(f"titre partagé par {compte_titres[titre.lower()]} pièces")
            if not PERIODE.search(t):
                a_verifier.append("époque")
            if not noms:
                a_verifier.append("designer ou fabricant")
            if not re.search(r"mati[eè]re|en (?:bois|métal|laiton|verre|céramique|rotin|bambou|chêne|noyer|corde|faïence|laine)", t, re.I):
                a_verifier.append("matières")
            titres.append({"id_boutique": p["id"], "titre_actuel": titre, "titre_propose": "",
                           "ce_que_dit_la_description": t[:220], "a_verifier": ", ".join(a_verifier)})
        for n in noms:
            designers[n].append((p["id"], titre, niveau(titre + " " + t, n)))
        photos.append({"id_boutique": p["id"], "titre_actuel": titre, "prix_affiche_ttc": prix(p.get("prix")),
                       "nb_photos": len(p.get("images_ids", [])), "plus_grand_cote_px_max": cotes[-1] if cotes else "",
                       "manque": ", ".join(x for x in (
                           f"{5 - len(p.get('images_ids', []))} photo(s) en moins que la cible" if len(p.get("images_ids", [])) < 5 else "",
                           "photos sous 2 000 px" if (not cotes or cotes[-1] < 2000) else "") if x)})
    photos.sort(key=lambda r: -(r["prix_affiche_ttc"] or 0))
    for i, r in enumerate(photos, 1):
        r["rang"] = i
    ecrire(sortie / "pieces.csv", pieces)
    ecrire(sortie / "titres_a_valider.csv", titres)
    ecrire(sortie / "a_rephotographier.csv", [r for r in photos if r["manque"]])
    ecrire(sortie / "designers_nommes.csv", [
        {"nom_tel_qu_ecrit": n, "nb_pieces": len(v), "pieces": " | ".join(f"{i} {t}" for i, t, _ in v),
         "niveau_lu_dans_le_texte": ", ".join(sorted({lv for _, _, lv in v}))}
        for n, v in sorted(designers.items(), key=lambda kv: -len(kv[1]))])
    ok = [r for r in pieces if "famille" in r]
    res = {"pieces": len(data), "pages_ok": len(ok), "par_famille": Counter(r["famille"] for r in ok),
           "avec_reference": sum(1 for r in ok if r["reference"]), "avec_dimensions": sum(1 for r in ok if r["plus_grande_dimension_cm"]),
           "avec_periode": sum(1 for r in ok if r["periode_lue"]), "avec_etat": sum(1 for r in ok if r["etat_lu"]),
           "avec_cablage": sum(1 for r in ok if r["cablage_lu"]),
           "photos_total": sum(r["nb_photos"] for r in ok), "photos_par_piece": Counter(r["nb_photos"] for r in ok),
           "pieces_avec_une_photo_de_2000px": sum(1 for r in ok if r["plus_grand_cote_px_max"] and r["plus_grand_cote_px_max"] >= 2000),
           "type_douanier_propose": Counter(r["type_douanier_propose"] or "(vide : " + r["note_type"] + ")" for r in ok),
           "taille_envoi": Counter(r["taille_envoi_proposee"] or "(vide)" for r in ok),
           "valeur_affichee_ttc": sum(r["prix_affiche_ttc"] or 0 for r in ok)}
    (sortie / "resume_boutique.json").write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf-8")
    print(json.dumps(res, ensure_ascii=False, indent=1))


def ecrire(path, lignes):
    if not lignes:
        return
    cles = list(dict.fromkeys(k for l in lignes for k in l))
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=cles)
        w.writeheader()
        w.writerows(lignes)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
