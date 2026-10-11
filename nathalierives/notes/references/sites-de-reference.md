# Sites de référence : ce que j'ai vu

Relevé du 11 octobre 2026, dans un vrai navigateur (Chromium), sur un écran
de téléphone (390 px de large) et d'ordinateur (1 440 px). Les captures sont
dans `captures/` : l'écran visible seulement, pas la page entière.

## Comment j'ai regardé

- **D'où** : le trafic de cet environnement sort aux États-Unis (Ohio, réseau
  d'un centre de données Google). Le navigateur était réglé en anglais
  américain, à l'heure de New York. Les sites qui affichent des prix les ont
  donnés en dollars (Chez Pluie, Pamono, The Invisible Collection).
- **Lecture seule** : aucun formulaire envoyé, rien ajouté au panier ni à une
  liste de demande, aucun compte créé. Bandeaux cookies refusés quand c'était
  possible ; sinon rien accepté (voir Pierre Yovanovitch).
- **Rythme** : au moins 4 secondes entre deux pages d'un même site, souvent
  plus.
- **Captures** : JPEG qualité 70, au plus 6 par site, nommées
  `<site>-<page>-<390|1440>.jpg`.

## Ce qui m'a bloqué

- **morentz.com** : renvoyé vers google.com à chaque page (application
  anti-fraude de la boutique Shopify, qui écarte les adresses de centres de
  données et de VPN). Rien vu.
- **theinvisiblecollection.com** : l'accueil s'affiche, puis la page suivante
  est bloquée par Cloudflare (« Sorry, you have been blocked »). Ni liste, ni
  fiche, ni fiche PDF, ni câblage par pays.
- **pierreyovanovitch.com**, en partie : deux pages ont répondu « 502 upstream
  request failed » (erreur du serveur) malgré 6 à 45 secondes d'écart. J'ai
  arrêté ; la fiche pièce n'a pas été vue sur téléphone.

## Site par site

### Chez Pluie (chezpluie.com) — fonctionnement

**Vu depuis les États-Unis** : « USD $ » en haut à droite, prix en dollars
(« US$895 ») ; le sélecteur associe un pays à une devise (France → EUR €,
United States → USD $, United Kingdom → GBP £, Canada → CAD $) ; pas de choix
de langue vu, tout est en anglais. **Fiche, sur téléphone, dans l'ordre** :
bandeau noir défilant « ALL USA IMPORT DUTIES & TARIFFS INCLUDED IN PRICES » ;
8 photos avec une loupe ; titre en capitales qui contient la dimension en
pouces (« PAIR OF CHEERFUL PAINTED METAL DAISY SCONCES, 1960S -14¼" ») ;
« SKU: 25974 » (numéro de référence) ; prix « US$895 » ; juste sous le premier
écran, un encadré « ALL INCLUSIVE PRICING TO USA — The price includes
shipping, insurance and import costs. No more to pay for destinations within
the US. » ; « Add to Wishlist » ; deux paragraphes de description, où l'état
est glissé (« some small losses to the painted finish ») ; puis trois lignes
sèches : « Condition and patina consistent with age. », « Must be rewired and
installed in accordance with local electrical requirements. » (donc non
recâblée), « Each measures approx. 14¼" high x 10¼" wide x 6" deep » et la
même ligne en cm ; bouton « ADD TO CART » ; avis Trustpilot. Aucun bouton de
question, de réservation ou de devis, aucune fiche PDF : seulement le panier,
une bulle de discussion « Assistance » et, en bas, « TELEPHONE US — Speak with
us in English +33(0)7 84 56 02 37 ». **Pièce vendue** : elle garde sa page,
son prix et l'encadré « tout compris » ; le bouton « SHOP SIMILAR WALL
SCONCES » remplace le panier et « SOLD » s'affiche plus bas ; dans la liste,
elle reste avec son prix et un badge « SOLD » en haut à gauche de la vignette.
**Liste** (« WALL SCONCES & WALL LIGHTS ») : texte d'introduction repliable
(« Read more »), « 64 PRODUCTS » (sur ordinateur seulement), « SORT BY »
(Featured, Most relevant, Best selling, A-Z, Z-A, prix croissant et
décroissant, date), choix de la taille de grille, aucun filtre. Vignettes
carrées, objet entier photographié sur un mur gris clair, titre en capitales
et prix visibles sans survol, cœur. Sur téléphone : 2 colonnes, titres coupés
par « … », si bien que la dimension disparaît. **En-tête** : sur ordinateur,
menu visible « LATEST, INDOOR, OUTDOOR, MIRRORS, LIGHTING, FURNITURE,
CERAMICS, DÉCOR, ART, GLASSWARE, BARWARE », puis « USD $ », compte, recherche,
panier ; sur téléphone, menu caché derrière trois traits, mêmes libellés plus
« LOGIN » et « USD $ ». **À éviter** : une fenêtre « Early Access to New
Arrivals » (adresse email) s'ouvre à l'arrivée, sur ordinateur comme sur
téléphone ; les boutons flottants « Early Access » et « Assistance » cachent
du texte sur téléphone. Captures : `chezpluie-accueil-1440.jpg` (la fenêtre à
l'arrivée), `chezpluie-liste-1440.jpg`, `chezpluie-liste-390.jpg`,
`chezpluie-fiche-390.jpg`, `chezpluie-fiche-1440.jpg`,
`chezpluie-vendu-1440.jpg`.

### Pamono (pamono.com) — fonctionnement

**Vu depuis les États-Unis** : site américain en dollars ; la livraison est
estimée d'office vers « 10001, US » (un code postal de Manhattan) ; le code
de la page déclare des versions par pays (pamono.fr, .de, .it, .co.uk, .ca,
.com.au, .eu…), mais aucun sélecteur de langue ou de devise n'est visible.
Bandeau cookies refusé par « Use necessary cookies only ». **Fiche, sur
téléphone, dans l'ordre** : bandeau « Our prices include all customs and
import duties where applicable » ; titre descriptif (« Large Double-Arm Wall
Sconce by Robert Mathieu, France, 1950 ») ; photos « 1 / 12 » ; bloc prix :
« $5,758 », ancien prix barré « $7,036 SALE », « Price per piece », « Import
duties included », « Only one available », « Shipping from Germany to: 10001,
US » avec un crayon, deux choix chiffrés « Front-door 11-14 weeks $ 929 » et
« Express 6-8 weeks $ 1269 », « Complimentary In-House Delivery », bouton
« Add Item to Cart », « More Questions about this item? Get in Touch », « Are
you a professional? Join our Trade Program here » ; ensuite « The seller
assumes all responsibility for this listing. », une description courte, la
note « * The cable of this item may be original and might need replacement,
if not specified otherwise. » et un tableau : Creator, Manufacturer, Design
Period, Year, Country of Manufacture, Identifying Marks (« This piece has been
attributed based on archival documentation… »), Style, **Detailed Condition**
(« Very Good — This vintage/antique item has no defects, but it may show
slight traces of use. » et « The vendor has confirmed this piece is in
working order. »), **Restoration and Damage Details** (« Light wear consistent
with age and use, Shades refurbished »), **Plug Type** (« European Plug (up to
250V) »), Product Code, Material, Color, Width / Height / Diameter en pouces
seulement (« 63.0 inch ») ; enfin « Shipping & Delivery » (pays d'expédition,
retours dans les deux jours, livraison au pied de l'immeuble incluse ou dans
la pièce en supplément). Sur ordinateur, le titre et les photos remplissent
tout le premier écran : le prix n'apparaît qu'en descendant, dans une colonne
à droite. Le crayon ouvre « Delivery Country* » (sur le site américain, seule
option : United States) et « Delivery Postal Code* », avec « Cancel /
Confirm » (non validé). « Get in Touch » affiche « Please sign up or login in
order to send a question. » : il faut un compte pour poser une question ; le
formulaire qui suit (vu dans le code) fait cocher un sujet : « Product Details
& Availability », « Shipping & Terms », « Price », « Trade Price Enquiry »,
« Other ». Ni réservation, ni fiche PDF. **Liste** (« Wall Lights &
Sconces ») : colonne de gauche avec les sous-catégories de Lighting, puis des
filtres repliés : Vintage or New?, Price, Style, Design Period, Country of
Manufacture, Shop Locally, Color, Labels, **Dimensions**, Materials,
Designers and Makers. Le filtre Dimensions propose hauteur, profondeur et
largeur en minimum–maximum, en pouces, et le bouton donne le nombre de
résultats : « Apply Filter (16961) ». Tri : Featured, Recently Added, Price
Low to High, High to Low. Pas de total, seulement « Page 1 of 177 ».
Vignettes carrées, objet détouré entier sur fond gris très clair, titre et
prix sous la photo sans survol, étiquettes « Top », « SALE », « -20% or
more », « Maker's Mark ». Sur téléphone : bouton « Filter » qui ouvre un
panneau, 2 colonnes, titres coupés par « … ». **En-tête** : menu visible sur
ordinateur « What's New, Furniture, Lighting, Decor, Contemporary, Art,
Jewelry & Watches, Trade, Sale », grande barre de recherche, cœur, panier,
« Sign Up | Log In » ; sur téléphone, trois traits et la recherche. **À
éviter** : le compte obligatoire pour poser une question ; l'ambiance de
soldes (rose vif, prix barrés) ; le prix sous la ligne de flottaison sur
ordinateur. Captures : `pamono-liste-1440.jpg`, `pamono-filtre-1440.jpg`
(filtre de dimensions ouvert), `pamono-fiche-390.jpg`, `pamono-etat-390.jpg`
(tableau état, restaurations, prise), `pamono-fiche-1440.jpg` (prix,
livraison chiffrée et tableau), `pamono-formulaire-1440.jpg`.

### The Invisible Collection (theinvisiblecollection.com) — fonctionnement, bloqué

**Bloqué après la première page** : l'accueil s'affiche, puis la page des
appliques montre un écran Cloudflare « Sorry, you have been blocked » ; je
n'ai pas insisté. Je n'ai donc vu ni liste, ni fiche, ni la fiche PDF avec ou
sans prix, ni le câblage par pays : ces points du brief restent à vérifier
autrement. **Vu depuis les États-Unis** : drapeau américain et « EN » en haut
à gauche, prix en dollars sur l'accueil (« From $2,275 », « From $1,530 per
m2 » pour un tapis, « Price upon request » pour certaines pièces) ; une
fenêtre cachée, « Updating your shipping destination and currency », montre
que le drapeau règle à la fois la destination de livraison et la devise ;
« Switch to FR » mène à la version française. **En-tête** (ordinateur) :
barre fine avec deux téléphones (« +44 (0)20 3868 9012 / +1 (646) 759
0619 »), « SHOP THE TOP 100 » et « Contact us – Appointment » ; dessous,
drapeau et langue, bouton noir « TRADE PROGRAM », logo au centre, « SEARCH »,
icône d'accessibilité, compte, cœur, sac ; menu visible : ALL CATEGORIES,
DESIGNERS, SEATING, TABLES, LIGHTING, RUGS, DÉCOR, MASTERS, SHOP BY, OUR
GALLERIES, CLUBROOM. En bas de l'accueil, chaque galerie (Paris VI, Paris
VIII, Londres, New York 24 E 64th St, Tribeca, Los Angeles) a son adresse,
ses horaires ou « By appointment only », et son téléphone. Le consentement
cookies (Axeptio) est une simple pastille, sans bandeau. Captures :
`theinvisiblecollection-accueil-1440.jpg`,
`theinvisiblecollection-blocage-1440.jpg`.

### Galerie Half (galeriehalf.com) — fonctionnement

**Vu** en anglais (pas de choix de langue), galerie de Los Angeles, aucun prix
nulle part, pas de bandeau cookies. **Fiche** (« G320 WALL LAMP »), sur
téléphone : grande photo, puis « INQUIRE » et un petit compteur « 0 », le
titre, « Pierre Guariche », « France, 1954 », « H 8.25 x W 27.5 x D 6.25 »
(sans unité), « Condition - wear consistent with age. », « 120V US
Wiring. », puis les autres photos et « ITEMS SIMILAR ». Sur ordinateur, ces
lignes sont dans une colonne à gauche (état et câblage tout en bas de
l'écran), les photos à droite. Pas de numéro de référence, pas de fiche PDF.
**Plusieurs pièces dans une seule demande** : « INQUIRE » ajoute la pièce à
une liste de demande (« INQUIRE CART » dans le menu, compteur dans
l'en-tête) ; je ne l'ai pas cliqué, c'est l'équivalent d'un panier. La page
de demande, vide, montre « EMAIL* », « FIRST NAME* », « LAST NAME »,
« PHONE* » (téléphone obligatoire), une liste cachée « Products » remplie par
la liste de demande, et le bouton « INQUIRE » ; pas de champ message, et rien
ne dit que la liste est vide. **Liste** (« Lighting ») : fond noir, 2
colonnes de photos verticales très hautes recadrées serré (1 colonne sur
téléphone) ; ni filtre, ni tri, ni nombre, ni prix ; la légende « TITRE /
designer / pays, année » n'apparaît qu'au **survol** de la souris sur
ordinateur (sur téléphone, elle est sous la photo). **En-tête** :
« GALERIE   HALF » et un « + » qui ouvre le menu, caché sur ordinateur comme
sur téléphone : NEW, CATEGORY, DESIGNERS, PRESS, CONTACT, INQUIRE CART,
SEARCH, STORE. L'accueil n'est qu'une photo noir et blanc plein écran, sans
texte. **À éviter** : légendes au survol ; menu caché derrière « + » ;
en-tête transparent qui passe par-dessus le texte quand on fait défiler sur
téléphone ; dimensions sans unité ; téléphone obligatoire et pas de message
dans la demande. Captures : `galeriehalf-liste-1440.jpg` (sans légendes),
`galeriehalf-menu-1440.jpg`, `galeriehalf-fiche-1440.jpg`,
`galeriehalf-fiche-390.jpg`, `galeriehalf-cablage-390.jpg`,
`galeriehalf-demande-390.jpg`.

### Morentz (morentz.com) — fonctionnement, bloqué

**Bloqué** : à chaque chargement, le navigateur est renvoyé vers google.com.
La boutique (Shopify) utilise une application anti-fraude (« Blockify Fraud
Filter », avec détection de VPN) qui écarte les visiteurs passant par un
centre de données, ce qui est le cas de cet environnement. Je n'ai pas
insisté : les filtres par dimensions, la réservation, le tableau technique et
la fiche PDF n'ont pas été vus. Pas de capture.

### Demisch Danant (demischdanant.com) — allure

**Vu** en anglais (pas de choix de langue), galerie de New York, aucun prix,
pas de bandeau cookies. **Fiche** présentée comme un cartel de musée. Sur
téléphone : logo, « Menu », le nom du designer et « Back », une photo avec
des flèches, puis « Maria Pergay » / *Applique Totem / Totem Sconce*, c. 1974
/ « Stainless steel, bronze » / « 23.62 H x 13.78 x 8.66 inches » / « 60 H x
35 x 22 cm » / « INQUIRE » ; sur une autre fiche, une ligne d'éditeur
(« Edition Disderot »). Pas de phrase de description, pas d'état, pas de
câblage. Le titre garde le nom français d'origine suivi de sa traduction
(« Chandelier de Parquet / Candelabra », « Chevet Goutte B / Drop Bedside
Table B »). « INQUIRE » est un lien qui ouvre la messagerie du visiteur avec
l'objet déjà écrit, « Website inquiry | Maria Pergay, Applique Totem / Totem
Sconce, c. 1974 », et le message déjà rempli : designer, titre, date,
matériaux, dimensions en pouces et en cm. Sous le cartel, trois rubriques de
liens : « Designers » (la page du designer, ex. « Maria Pergay | 1957 -
1979 »), « Works » (autres pièces du même designer) et « Exhibitions » (les
expositions de la galerie où la pièce a été montrée : « Postwar Metal Works /
Material Focus », « MOMENTUM », « In the Room | Summer 2025 », « Precious
Strength | Maria Pergay Across the Decades »). Dans l'autre sens, la page
d'une exposition (« STUDIO VISITS | Creative Spaces and Collected Lives »,
« September 9 – December 19, 2026 ») a deux onglets, « Works » et « About the
Exhibition », et liste les pièces exposées avec un lien vers chaque fiche. Je
n'ai pas trouvé de ligne « Provenance » sur les deux fiches regardées.
**Liste** (Works > Lamp) : catégories en texte dans une colonne à gauche (New
Acquisitions, Chair, Lounge Chair, … Lamp, Floor Lamp, Art, Object, View
All) ; ni filtre, ni tri, ni nombre ; grille de 3, vignettes carrées, objet
entier sur fond gris clair uni ; légende toujours visible, en trois lignes :
designer (« French » quand l'auteur est inconnu, « Attributed to Michel
Boyer »), titre en italique (« Table Lamp, in the Style of Boris Lacroix »,
« Yo-Yo Ceiling Lamp (6 Available) »), date (« c. 1970 »). **En-tête** :
logo en capitales espacées, menu visible sur une ligne : Designers, Artists,
Works, Exhibitions, Store Front, made in France, Publications, News, About,
Search ; sur téléphone, le mot « Menu » déplie la même liste. Pied de page :
adresse, téléphone, email et horaires. **À éviter** : texte de 12 px en gris
(#555) ; sur ordinateur, la photo occupe tout le premier écran et le cartel
est dessous. Captures : `demischdanant-accueil-1440.jpg`,
`demischdanant-liste-1440.jpg`, `demischdanant-fiche-390.jpg`,
`demischdanant-fiche-1440.jpg` (cartel), `demischdanant-expositions-390.jpg`
(rubriques Designers et Exhibitions d'une fiche),
`demischdanant-exposition-390.jpg`.

### Maison Gerard (maisongerard.com) — allure

**Vu** en anglais (pas de choix de langue), New York, aucun prix, pas de
bandeau cookies. **Fiche** : DESIGNER en capitales / titre / « France, circa
1950 » / numéro de stock « ADN 98 » ; « Images | Thumbnails » (diaporama ou
planche) ; « Return to Previous Page » ; diaporama ; « Inquire » ; rubrique
« DESCRIPTION » : dimensions en pouces seulement mais précises (« Height:
13.5" – Width: 14.5" – Depth: 6.75" (Each sconce) Dimensions include shades.
Depth without shade: 4" », ou « Base: … / Shade: … »), matériaux (« Gilt-
bronze, original mirrored glass »), une phrase de description ; puis
« DESIGNERS & ARTISTS » et, s'il y a lieu, « EXHIBITIONS & FAIRS »
(l'événement de la galerie). **Provenance et expositions** : sur une pièce
ancienne (Leleu, « Commode Feu d'Artifice », 1938, « LELEU 714 »), trois
rubriques en texte simple suivent la description : « Exhibited: 17e Salon des
Arts Ménagers, 1948, Paris. A sideboard in Macassar ebony with the same
marquetry pattern was exhibited during this show. » ; « Public collection:
Mobilier National, Paris, France. A very similar sideboard (with a different
marquetry pattern), manufactured in 1941 and acquired in 1995, inventory
number GME 17238… » ; « Bibliography: » puis une ligne par source
(« Mobilier & Décoration, April 1948, page 14. For the sideboard shown at the
17e Salon des Arts Ménagers. »). Chaque mention dit exactement à quel objet
elle se rapporte (un modèle semblable, pas forcément la pièce elle-même).
« Inquire » ouvre une fenêtre plein écran avec la photo de la pièce et
« NAME* », « EMAIL* », « MESSAGE » (vide), « SUBMIT », protégée par
reCAPTCHA ; la pièce part dans un champ caché (adresse de la page et numéro
de la photo affichée). **Liste** (Collection > Lighting) : barre de
catégories (New Acquisitions | Tables | Seating | … | View All) et, pour
Lighting, des sous-catégories « Wall | Ceiling | Table | Floor » ; ni tri, ni
nombre ; grille de 4, vignettes en largeur, objet entier sur fond gris
dégradé ; légende toujours visible : DESIGNER / titre / pays, année / numéro
de stock. **En-tête** : logo centré « EST 1974 / MAISON GERARD / NEW YORK »,
menu visible en capitales : COLLECTION, DESIGNERS & ARTISTS, MAISON,
EXHIBITIONS & FAIRS, PRESS, PUBLICATIONS, CONTACT, SEARCH ; sur téléphone,
« MENU » sous le logo. **À éviter** : sur téléphone le logo est si grand que
la fiche commence à mi-écran ; texte de 12 à 13 px ; reCAPTCHA ; bouton
d'accessibilité flottant qui cache du texte sur téléphone. Captures :
`maisongerard-accueil-1440.jpg`, `maisongerard-liste-1440.jpg`,
`maisongerard-fiche-390.jpg`, `maisongerard-fiche-1440.jpg`,
`maisongerard-formulaire-1440.jpg`, `maisongerard-provenance-390.jpg`
(Exhibited, Public collection, Bibliography).

### Zana (zana.fr) — allure

**Vu** en anglais, sans version française alors que le site est en .fr et que
le code de la page la déclare en français ; aucun prix ; pas de bandeau
cookies vu. **Page projet** (« Cheyne Garden, London » et « La Résidence, New
York ») : grande photo ; titre très gros sur deux lignes « Nom, / Ville » ;
un paragraphe (un seul sur les deux projets vus, pas deux) à gauche et, à
droite sur ordinateur, un tableau de trois faits : « Type — Private
apartment », « Date — 2015 », « Location — London, United-Kingdom » ; puis
les photos en grille ; en bas « Previous » et « Next », sans le nom du projet
voisin. Ni crédits photo, ni lien vers les meubles qu'on voit. Sur téléphone :
photo plein écran, titre, paragraphe, photos, puis le tableau des faits juste
avant « Previous / Next ». **Liste des projets** : courte présentation,
bascule « Grid / List », filtres « All / Commercial / Residential » ; en mode
liste, « Nom, Ville ». **Fiche d'une édition** (« Attilio, Wall Lamp ») :
titre, puis deux liens côte à côte, « Enquire » et « Download info sheet »,
**avant** les photos, donc visibles au premier écran du téléphone ; ensuite un
tableau Materials / Dimensions (« h 50 x l 18.5 x d 14 cm » puis « h 19.7 x
l 7.3 x d 5.5 in. ») / Specifications (« Edition of 12 ») / Manufacturing.
« Enquire » ouvre une page plein écran titrée « Attilio, Wall Lamp » (First
name*, Last name*, Email*, Country, Message*, case de consentement, « Send »),
et le nom de la pièce part dans un champ caché. L'« info sheet » est un PDF
d'une page A4 (logo, coordonnées, matériaux, édition, dimensions en cm et en
pouces, trois photos), sans prix. Liste des appliques : 2 colonnes, vignettes
carrées, légende « Attilio, Wall Lamp » toujours visible. **En-tête** : menu
visible en haut à gauche, « Charles Zana / Projects / Furniture / About /
Contact », sous-menus en ligne ; trois traits sur téléphone. **À éviter** :
l'écran d'introduction (diaporama plein écran, « Charles Zana » en lettres
géantes, bouton « skip ») qui bloque la page tant qu'il dure ; le défilement
détourné (la page elle-même ne défile pas, c'est un cadre intérieur qui
défile) ; « Next » sans dire vers quoi. Captures : `zana-accueil-1440.jpg`
(écran d'introduction), `zana-liste-projets-1440.jpg`,
`zana-projet-1440.jpg`, `zana-faits-390.jpg`, `zana-fiche-390.jpg`,
`zana-formulaire-390.jpg`.

### Laura Gonzalez (lauragonzalez.fr) — lien projet → pièces

**Vu** en français : c'est la langue par défaut, sans redirection malgré un
navigateur en anglais américain ; version anglaise sous /en/. Pas de prix. Le
bandeau cookies n'apparaît qu'après un premier défilement ; refusé par « TOUT
REJETER » ; sur téléphone il couvre la moitié de l'écran. **Page projet**
(« CHAMPS DE MARS », « RÉSIDENTIEL ») : grande photo titrée ; deux
paragraphes en italique (le lieu est dans le texte : « dans le 7ᵉ
arrondissement de Paris ») ; photos en mosaïque ; deux autres paragraphes et
une citation ; à la fin, un carrousel « Retrouvez les pièces de notre
collection » qui ne montre pas les pièces du projet. Ni année, ni tableau de
faits, ni crédits, ni projet suivant. **Lien vers les pièces** : dix petits
points blancs posés sur les photos (des points cliquables) ; au toucher ou au
clic, une carte s'ouvre : « CHAISE MAWU LANDSCAPE / En chêne doré. W 45 x D 52
x H 90 cm / VOIR LE PRODUIT », avec une vignette. Pièces reliées ainsi :
chaise Mawu Landscape, table Rainbow Mainneville, console Guimauve verte,
sculpture Lion de William Byl (« Grès roux. Création William Byl, France,
années 2020. »), chaises Pondichery. Les points se voient mal et n'ont réagi
qu'après un premier geste sur la page ; dans l'autre sens, la fiche d'une
pièce ne dit pas dans quels projets on la voit. **Fiche** (« APPLIQUE
BOSPHORE CRÈME », téléphone) : diaporama, titre, description en italique,
vignettes des coloris, « NOUVELLE COULEUR », « DIMENSIONS » avec une bascule
« CM | IN », « SMALL: W 18 X D 14 X H 26 CM / LARGE: W 22 X D 18 X H 34 CM »,
bouton noir « AJOUTER AU DEVIS » (liste de devis pour plusieurs pièces, non
cliqué), « DEMANDE DE DEVIS PERSONALISÉE », « WHATSAPP US », accordéons
« DÉTAILS » et « AUTHENTICITÉ ». **Liste** (Luminaires > Appliques) :
mosaïque bord à bord de photos d'ambiance recadrées serré ; aucun nom ni prix
sans survol (au survol, l'image change et le nom apparaît) ; étiquettes
« NOUVELLE COULEUR » et « RUPTURE DE STOCK » visibles ; un bouton
« FILTRER » (il ne s'est pas ouvert dans mon navigateur). **En-tête** :
monogramme ; menu visible PROJETS / COLLECTION / GALERIE / À PROPOS, « FR |
EN », « SEARCH » ; en anglais PROJECTS / COLLECTION / GALLERY / ABOUT, mais
le lien « Devis » et des libellés cachés (« OUVRIR PROJETS ») restent en
français ; sur téléphone, le mot « MENU ». Accueil : vidéo plein écran avec
« LAURA GONZALEZ ». Pied de page : l'agence, la galerie de Paris et celle de
New York, chacune avec son email. Captures : `lauragonzalez-accueil-1440.jpg`,
`lauragonzalez-projet-1440.jpg`, `lauragonzalez-projet-390.jpg` (carte d'une
pièce ouverte sur la photo), `lauragonzalez-liste-1440.jpg`,
`lauragonzalez-liste-survol-1440.jpg`, `lauragonzalez-fiche-390.jpg`.

### Pierre Yovanovitch (pierreyovanovitch.com) — lien projet → pièces

**Vu** en anglais : l'adresse redirige vers /en/ ; « EN » en haut à droite ;
boutique en ligne (« E-Shop », compte, panier), mais aucun prix sur les pages
Mobilier vues. Deux pages ont répondu par une erreur 502 (voir plus haut). Le
bandeau cookies n'offre que « ACCEPT » et « Cookie settings », sans
« refuser » ; je n'ai rien accepté et je l'ai masqué dans mon navigateur pour
les captures. **Page projet** (« ROXBURY  Connecticut ») : diaporama plein
écran (« 1 / 9 » sur téléphone), barre « ROXBURY  Connecticut » avec cœur,
partage, ✕ ; fil d'Ariane « Residential > Roxbury » ; tableau « Type —
Private Residence / Year — 2025 / Location — Connecticut, USA » (sur
téléphone, il faut toucher un « + » en bas à droite pour le voir) ; aucun
texte ; puis le bloc **« Featuring »** : une carte par pièce de leur mobilier
visible dans le projet (EZE Chair, CALYPSO Rug, BLOSSOM Pendant Lamp, LEAF
(CURVED) Wall Lamp, NIMA Floor Lamp), chacune menant à sa fiche (sur
téléphone, un carrousel d'une carte à la fois) ; enfin « You might also
like », trois autres projets. **Fiche** (« LEAF (CURVED) Wall Lamp »,
ordinateur) : fil « Lighting > Wall Lamps > Leaf (curved) », photos plein
écran, barre basse « LEAF (CURVED)  Wall Lamp … Enquire » ; une ligne de
description ; tableau Materials / Dimensions (« H. 39 × W. 19 × D. 12 cm »
puis « H. 15.3 × W. 7.5 × D. 4.8 in ») / « Info Sheet — Download » ; une
photo en situation légendée « Lasata » (lien vers ce projet) ; « You might
also like » ; puis **« Featured in »** : les projets où la pièce apparaît
(« 10 YEARS ASYMMETRY, PIERRE YOVANOVITCH X CLAIRE TABOURET — Paris
Gallery », « LASATA — Hamptons »). Les liens ne sont pas tenus des deux
côtés : Roxbury cite la Leaf (curved), mais la fiche Leaf ne cite pas
Roxbury. « Enquire » ouvre un volet « Send us a message » où l'objet est
**déjà rempli**, « Inquiry – Leaf (curved) Wall Lamp », ainsi que le message
(« Hello, I would like some informations regarding : Leaf (curved) Wall Lamp
», suivi de l'adresse de la page et de « Best regards ») ; restent à remplir
nom, email, téléphone, pays, ville ; puis un captcha (hCaptcha) et « SEND »
(non envoyé). L'« Info Sheet » est un PDF de 7 pages, sans prix : matériaux,
dimensions en cm et en pouces, finitions, plans, « Designed for indoors »,
« UL Listed » (certification électrique américaine), « 110-120 V / 220-240
V », ampoule non fournie avec un modèle conseillé. **Liste** (Mobilier >
Lighting) : barre « FILTERS ● All ○ Floor Lamps ○ Table Lamps ○ Wall Lamps ○
Ceiling Lights », « View by names » (liste des noms), « + / − » pour la
taille de la grille ; 2 colonnes bord à bord, photos carrées, nom en
capitales sous chaque photo, ni prix ni nombre. **En-tête** : « Projects /
Mobilier / Galleries / About / E-Shop » à gauche, logo au centre, « EN /
Account / Cart 0 » à droite ; sur téléphone « ← », logo, « Menu ». **À
éviter** : pas de bouton pour refuser les cookies ; un volet « NEWSLETTER »
glisse depuis la droite pendant la lecture ; faits cachés derrière « + » ;
projet sans aucun texte ; liens pièce ↔ projet incomplets ; captcha.
Captures : `pierreyovanovitch-liste-1440.jpg`,
`pierreyovanovitch-projet-1440.jpg`, `pierreyovanovitch-faits-390.jpg`,
`pierreyovanovitch-featuring-390.jpg`, `pierreyovanovitch-fiche-1440.jpg`,
`pierreyovanovitch-formulaire-1440.jpg` (objet et message pré-remplis).

## À reprendre pour Nathalie Rives

1. **Dire, juste sous le prix, ce qu'il comprend et pour quelle
   destination**, en une phrase dans un encadré (« ALL INCLUSIVE PRICING TO
   USA — The price includes shipping, insurance and import costs… »). Pour
   Nathalie, la phrase décrit sa vraie formule de prix livré, sans « droits
   compris » tant qu'elle n'a pas tranché. *(Chez Pluie)*
2. **Chiffrer la livraison sur la fiche, pour une destination qu'on peut
   changer** : « Shipping from … to: 10001, US ✎ », avec délai et prix
   (« Front-door 11-14 weeks $ 929 », « Express 6-8 weeks $ 1269 »). Pour
   Nathalie : New York par défaut sur la page anglaise, la France sur la page
   française, et le bouton de devis quand le forfait n'est pas confirmé.
   *(Pamono)*
3. **Séparer l'état et les restaurations** dans un tableau, avec une ligne
   pour la prise : « Detailed Condition », « Restoration and Damage
   Details », « Plug Type ». *(Pamono)*
4. **Une ligne de câblage courte, toujours au même endroit** (« 120V US
   Wiring. » sous l'état), et les détails électriques dans la fiche PDF
   (« UL Listed », « 110-120 V », ampoule conseillée). *(Galerie Half ;
   Pierre Yovanovitch)*
5. **Dimensions en pouces et en cm, sur deux lignes**, avec les précisions
   qui évitent les erreurs (« (Each sconce) Dimensions include shades. Depth
   without shade: 4" ») ; ou une bascule « CM | IN ». *(Demisch Danant,
   Maison Gerard ; Laura Gonzalez)*
6. **Un bouton de question qui remplit la demande** : objet « Inquiry – [nom
   de la pièce] » et message avec le nom et l'adresse de la page ; le
   visiteur n'ajoute que son nom et son email. *(Pierre Yovanovitch ; même
   idée par email chez Demisch Danant, avec designer, titre, date, matériaux
   et dimensions)*
7. **Plusieurs pièces dans une seule demande** : un bouton qui met la pièce
   dans une liste, un compteur dans l'en-tête, un seul envoi à la fin (la
   paire d'appliques et le lampadaire d'une même cliente partent ensemble,
   chacun avec sa référence). *(Galerie Half « INQUIRE CART » ; Laura
   Gonzalez « AJOUTER AU DEVIS »)*
8. **Les actions au premier écran du téléphone** : « Enquire » et « Download
   info sheet » juste sous le titre, avant les photos. *(Zana)*
9. **Une fiche PDF d'une page** (logo, coordonnées, matériaux, dimensions en
   cm et en pouces, photos), à faire en deux versions, avec et sans prix,
   comme le veut le brief. *(Zana ; Pierre Yovanovitch pour les données
   électriques ; la version « avec ou sans prix » de The Invisible Collection
   n'a pas pu être vue)*
10. **Garder les pièces vendues** : la page reste, la vignette porte un badge
    « SOLD » dans la liste, et un bouton mène aux pièces semblables à la
    place de l'achat. *(Chez Pluie)*
11. **Un filtre de dimensions en pouces, avec le nombre de résultats sur le
    bouton** (« Apply Filter (16961) »), et des sous-catégories simples
    (« Wall | Ceiling | Table | Floor »). *(Pamono ; Maison Gerard, Pierre
    Yovanovitch)*
12. **Une légende de vignette toujours visible** : designer ou niveau
    d'attribution (« Attributed to … », « in the Style of … », « French » si
    l'auteur est inconnu) / titre / date / numéro de référence. *(Demisch
    Danant ; Maison Gerard pour le numéro)*
13. **Provenance, expositions et bibliographie en rubriques courtes, chaque
    ligne disant à quoi elle se rapporte** (« A sideboard … with the same
    marquetry pattern was exhibited during this show. ») : on reste exact
    sans rien gonfler. *(Maison Gerard)*
14. **Une page projet compacte** : « Nom, Ville » en titre, un ou deux
    paragraphes, un tableau de trois faits (Type, Date, Lieu), puis projet
    précédent / suivant, en nommant le projet suivant. *(Zana ; même tableau
    chez Pierre Yovanovitch)*
15. **Projet et pièces reliés dans les deux sens** : sous le projet, un bloc
    « Featuring » avec les pièces vues et un lien vers leur fiche ; sur la
    fiche, « Featured in » avec les projets ; une seule saisie (« cette pièce
    est dans ce projet ») qui alimente les deux pages, pour ne rien oublier.
    *(Pierre Yovanovitch ; même principe pièce ↔ exposition chez Demisch
    Danant)*

## À éviter

- Une fenêtre d'inscription à l'arrivée (Chez Pluie) ou un volet newsletter
  qui glisse pendant la lecture (Pierre Yovanovitch).
- Un écran d'introduction qui bloque la page (Zana), ou un accueil réduit à
  une photo plein écran sans texte (Galerie Half) : le brief veut qu'on
  comprenne en cinq secondes qui elle est.
- Le défilement détourné, où la page ne défile pas normalement (Zana).
- Des noms ou des légendes visibles seulement au survol de la souris
  (Galerie Half sur ordinateur, Laura Gonzalez) : rien ne s'affiche sur
  téléphone ni au premier regard.
- Des points minuscules sur les photos comme seul lien vers les pièces
  (Laura Gonzalez), ou des faits cachés derrière un « + » (Pierre
  Yovanovitch, téléphone).
- Un menu caché même sur ordinateur (Galerie Half).
- Des titres coupés par « … » sur téléphone, qui font disparaître la
  dimension (Chez Pluie, Pamono), et des dimensions sans unité (Galerie
  Half).
- Du texte de 12 à 13 px, gris (Demisch Danant, Maison Gerard).
- Un logo si grand que la fiche commence à mi-écran (Maison Gerard,
  téléphone) ; un en-tête transparent qui passe sur le texte (Galerie Half).
- Des boutons flottants qui cachent le texte sur téléphone (« Assistance » et
  « Early Access » chez Chez Pluie ; bouton d'accessibilité chez Maison
  Gerard).
- Un compte obligatoire pour poser une question (Pamono) ; un téléphone
  obligatoire et pas de champ message (Galerie Half).
- Des captchas visibles (reCAPTCHA chez Maison Gerard, hCaptcha chez Pierre
  Yovanovitch) : le brief prévoit un champ piège invisible.
- Un bandeau cookies sans bouton « refuser » (Pierre Yovanovitch) ou qui
  couvre la moitié du téléphone (Laura Gonzalez) : le brief n'en veut pas.
- Le prix sous un premier écran rempli de photos, sur ordinateur (Pamono).
- Un lien « Next » qui ne dit pas vers quel projet (Zana) ; des liens pièce ↔
  projet tenus à la main et donc incomplets (Pierre Yovanovitch).
- Une version anglaise incomplète (Laura Gonzalez : « Devis » reste en
  français).
- L'ambiance de soldes : prix barrés, étiquettes « SALE », rose vif (Pamono).
