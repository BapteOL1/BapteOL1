# Plan du site et menu

Proposition de l'arrêt 1. Les adresses françaises sont à la racine, les
anglaises sous `/en/`. Chaque page existe dans les deux langues, et le bouton
« Français / English » mène à la page jumelle.

## Le menu

**En-tête, en toutes lettres, sur ordinateur comme sur téléphone :**

| Français | English | Ce qu'on y trouve |
|---|---|---|
| Galerie | Collection | les pièces disponibles, filtrables ; les éditions ; les pièces vendues |
| Intérieurs | Interiors | les projets : résidentiel, hôtels et restaurants, commerces, scénographies |
| Studio | Studio | son histoire, l'équipe, la méthode, les collaborations, les récompenses |
| Presse | Press | biographies, portraits, logo, dossiers de presse, parutions, contact presse |
| Contact | Contact | la fiche unique (adresse, téléphone, horaires), le formulaire |
| EN / FR | FR / EN | la même page dans l'autre langue |

Plus un lien bien visible « Démarrer un projet » / « Start a project » sur les
pages Intérieurs et Studio, et dans le pied de page.

**Pied de page :** Livraison · Professionnels · Retours · Démarrer un projet ·
Mentions légales · Conditions de vente · Confidentialité · Instagram ·
inscription à la newsletter (un champ email) · la fiche contact.
En anglais : Shipping & Duties · To the Trade · Returns · Start a project ·
Legal notice · Terms of sale · Privacy · Instagram · newsletter.

### Ce que je change par rapport à ta proposition, et pourquoi

1. **« Collaborations » n'est pas dans l'en-tête ; c'est une page du Studio,
   liée depuis la Presse et le pied de page.** Pourquoi : cinq mots tiennent
   sur une ligne de téléphone ; six non. Et un visiteur qui découvre le site
   cherche d'abord des pièces ou des projets ; les collaborations (Galatée
   Martin, PEM, Farrow & Ball, Human & Tea…) servent surtout aux journalistes
   et aux marques, qui passent par la Presse. Le risque : une marque
   partenaire cherche « Collaborations » dans le menu. La parade : le lien
   dans la page Presse et le pied de page.
2. **Livraison et Professionnels sont dans le pied de page, et aussi sur
   chaque fiche** (sous les boutons d'action, comme le demande le brief).
   Pourquoi : c'est sur la fiche qu'on se pose la question.
3. **En anglais, « Collection » plutôt que « Gallery ».** « Gallery » se lit
   « galerie de photos ». « Collection » peut se lire « ses créations » : la
   page s'ouvre donc sur un titre clair, « Vintage furniture & lighting »,
   avec ses éditions dans une rubrique à part, « Nathalie Rives editions ».
   *(À confirmer après l'étude des sites de référence, qui notera les
   libellés exacts des galeries américaines.)*
4. **« Scénographies » devient une quatrième rubrique d'Intérieurs**
   (Farrow & Ball, Bakélite Store, A Galerie, Le Grand Hôtel-Dieu, ZOO Art
   Show, Workshop Domodeco). Elle n'apparaît comme filtre que si elle sépare
   vraiment des projets.
5. **Le « Graphisme » (logos, menus, flyers) devient une seule page du
   Studio**, si Nathalie veut le garder. Ce n'est pas un intérieur.

## L'arborescence

```
/                                   Accueil                 /en/
├── galerie/                        Galerie                 /en/collection/
│   ├── ?type=appliques …           (filtres, même page)
│   ├── editions/                   Ses éditions            /en/collection/editions/
│   ├── vendues/                    Pièces vendues          /en/collection/sold/
│   └── <titre>-<référence>/        Fiche pièce             /en/collection/<title>-<ref>/
│        └── fiche.pdf              (mise en page d'impression, avec ou sans prix)
├── interieurs/                     Intérieurs              /en/interiors/
│   └── <projet>/                   Page projet             /en/interiors/<project>/
├── studio/                         Studio                  /en/studio/
│   ├── collaborations/                                     /en/studio/collaborations/
│   └── graphisme/                  (si gardé)               /en/studio/graphic-design/
├── presse/                         Presse                  /en/press/
├── contact/                        Contact                 /en/contact/
├── demarrer-un-projet/             Formulaire projet       /en/start-a-project/
├── livraison/                      Livraison               /en/shipping-duties/
├── professionnels/                 Professionnels          /en/to-the-trade/
├── retours/                        Retours                 /en/returns/
├── recherche/                      Recherche               /en/search/
├── merci/                          Confirmation d'envoi    /en/thank-you/
├── mentions-legales/                                       /en/legal-notice/
├── conditions-de-vente/                                    /en/terms-of-sale/
├── confidentialite/                                        /en/privacy/
└── 404                             Page d'erreur bilingue
```

Les pages « merci » servent aussi à compter les demandes envoyées, sans cookie.

## Ce que fait chaque page, en une ligne

- **Accueil** : en vrai texte, son nom, une phrase qui dit ce qu'elle fait et
  où, deux boutons (Galerie, Intérieurs). Puis quelques pièces disponibles,
  quelques projets, une preuve (six ans à New York, deux ou trois titres de
  presse, la galerie avec son adresse).
- **Galerie** : les pièces disponibles par défaut ; filtres qui n'apparaissent
  que s'ils séparent vraiment les pièces (type, époque, designer, matière,
  « recâblée pour les États-Unis » en anglais) ; nombre de résultats ; filtres
  actifs visibles et retirables d'un geste ; chargement par tranches.
- **Fiche pièce** : photos (image entière, jamais recadrée), titre, designer
  et niveau d'attribution, époque, dimensions (pouces d'abord en anglais),
  état et restaurations, prix selon la langue, livraison, trois boutons
  (question, réservation, devis de livraison), « comment acheter » en quatre
  lignes, « Vue dans » (projet), pièces proches, fiche PDF.
- **Page projet** : titre, ville, année si elle est connue, deux paragraphes,
  trois faits, photos avec crédits, pièces de la galerie qu'on y voit
  (vendues ou non, avec des pièces proches), projet suivant. Peut prendre
  une teinte tirée de ses photos.
- **Studio** : son histoire (texte actuel conservé : Paris, Buenos Aires, six
  ans à New York), l'équipe, la méthode (texte actuel du « Bureau
  d'études »), les récompenses (French Design by VIA 2018/2019, Art &
  Décoration avril 2019), les collaborations.
- **Presse** : biographies courte et longue, portraits et logo à télécharger,
  dossiers de presse datés, parutions triées par date, contact presse nommé.
- **Hôtels et restaurants** (parcours 4) : un accès direct depuis Intérieurs ;
  la page réunit les références (La Tour Rose sur une seule page), ce
  qu'elle prend en charge, le PDF « Restaurants et bars » allégé et un
  contact professionnel.
