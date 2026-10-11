# Arrêt 1 — compte rendu de l'exploration

11 octobre 2026. J'attends ton accord avant de passer aux deux directions de
design (arrêt 2).

## Ce qui marche

- **L'inventaire est fait**, en lecture seule. L'API de WordPress répond
  toujours ; la boutique a été lue lentement, catégorie par catégorie, sans
  toucher au panier. Le détail est dans `arret-1/inventaire.md`, et les
  tableaux complets dans `inventaire/`.
  - 185 pièces et 528 photos ;
  - 65 pages projets, qui deviennent **37 projets** une fois regroupées ;
  - 222 parutions de presse, dont 65 datées de façon sûre ;
  - 212 PDF et 342 pages.
- **Le contenu existant vaut mieux que prévu côté boutique.** 171 fiches sur
  185 ont des dimensions, 62 une époque, 62 un nom de designer ou d'atelier.
  Tout est repris tel quel.
- **La page presse peut partir sur 65 lignes sûres** : média, mois et année
  lus dans le titre ou le nom du fichier. On y trouve Elle Décoration, AD,
  Vogue, Le Figaro Magazine, M le magazine du Monde, Les Echos, Marie Claire
  Maison, Ideat… L'objectif du brief était une trentaine.
- **Le classeur pour Nathalie est prêt** :
  `arret-1/a-valider-avec-nathalie.xlsx`. Il a six onglets avec des colonnes
  jaunes à remplir :
  1. les titres ;
  2. les designers ;
  3. les types douaniers et tailles d'envoi ;
  4. les regroupements de projets ;
  5. les dates de presse à vérifier ;
  6. les photos à refaire.
- **La table de redirection est en brouillon** :
  `arret-1/redirections-brouillon.csv`. 777 anciennes adresses (pages,
  projets, fiches, catégories, PDF, newsletters) ont toutes une
  destination. Elle sera finalisée à l'arrêt 5.
- **Le plan du site et le menu** sont dans `arret-1/plan-du-site.md` ; **ce
  qui disparaît, et comment exporter toi-même** clients, commandes et
  abonnés, dans `arret-1/ce-qui-disparait.md`.
- **Le choix technique et tous les coûts** sont dans
  `arret-1/technique-et-couts.md`. Les prix ont été relus sur les pages
  officielles. **Le site coûte 0 € par mois en technique.**
- **Le calcul des prix pour les États-Unis est fait et testé** (14 vérifications
  automatiques). Il part d'un seul fichier de réglages, et toutes les
  promesses sont rangées dans un seul fichier où elles restent « à
  confirmer ».

## Ce qui ne marche pas, ou pas encore

- **Les quatre études ne sont toujours pas là (T2).** La formule du prix
  livré suit, à titre provisoire, celle du plan pour New York. Elle ne
  produit rien de visible tant que les forfaits ne sont pas « confirmés »,
  mais elle devra être revue ligne à ligne avec l'étude 3.
- **Les projets sont presque vides de texte** : 9 mots en médiane, aucune
  année. Et 505 de leurs 686 photos font moins de 2 000 px.
- **Les photos de la galerie sont petites** : 729 px en médiane sur le grand
  côté, y compris les originaux gardés par la boutique. Seules 13 pièces sur
  185 ont une photo de 2 000 px, et 26 luminaires sur 35 n'en ont qu'une ou
  deux. **181 pièces sont à rephotographier** ; la liste commence par les
  plus chères.
- **Aucune fiche ne parle de l'état** (sauf 3) **ni du câblage pour les
  États-Unis**. Aucune pièce n'a de référence.
- **Aucune pièce de Guariche, Motte, Alain Richard ou Arlus n'est en
  ligne.** Ces noms, mis en avant par le plan et les brouillons anglais,
  n'apparaîtront donc pas sur le site tant que la galerie n'en aura pas.
- **Les deux règles du domaine entrent en tension.** Pour que la
  confirmation au visiteur parte d'une adresse du studio sans finir en
  indésirable, il faut **ajouter** 3 ou 4 lignes dans les réglages du domaine.
  Ce sont des ajouts, pas des remplacements ; les emails du studio ne bougent
  pas. Mais ton brief dit de ne changer que le réglage du site. **J'ai
  besoin de ton accord (V3).**

## Ce que j'attends de toi

### Tes décisions (arrêt 1)

1. **V1 — Hébergement : Cloudflare Pages, le DNS reste chez Gandi.** Coût :
   0 €. Le jour de la bascule, deux réglages chez Gandi : `www` pointe vers
   Cloudflare, et l'adresse sans « www » est redirigée par Gandi. Pour l'équipe,
   rien ne change.
2. **V2 — Interface d'édition : Sveltia CMS.** Coût : 0 €. Chaque personne
   qui édite ouvre un compte GitHub gratuit. Elle remplit des cases en
   français et en anglais côte à côte, et dépose ses photos de téléphone
   telles quelles.
3. **V3 — Emails : Brevo gratuit,** et à la bascule 3 ou 4 lignes ajoutées
   dans les réglages du domaine. Option : 15 € par mois pour retirer la
   mention « Sent with Brevo » des emails.
4. **V4 — Le menu :** Galerie (en anglais Collection) · Intérieurs · Studio ·
   Presse · Contact. Les Collaborations passent dans le Studio.
5. **V5 — Le site déménage** dans un dépôt GitHub au nom du studio avant
   l'arrêt 3.
6. **V6 — Les PDF d'articles** ne sont pas remis en ligne ; leurs anciennes
   adresses mènent à la page Presse.

Puis, quand tu peux, les questions encore ouvertes : T2 (études), T3
(photos HD), T4 (logo), T5 (qui a l'accès Gandi), T6 (qui édite, sur quel
appareil), T7 (plafond), T8 (ton email de test), T9 (TVA), T10 (peinture),
T11 (newsletter), T13 (île Saint-Louis). Détail dans `QUESTIONS.md`.

### Ce qu'il faut transmettre à Nathalie

- le classeur `arret-1/a-valider-avec-nathalie.xlsx` ;
- la liste des contenus pilotes `a-fournir/contenus-pilotes.md` ;
- les questions N2 à N10 de `QUESTIONS.md`, en particulier : **pour quoi la
  galerie est-elle connue ?**

## Ce que je n'ai pas pu vérifier

- **Les études** (absentes) : je n'ai donc pas confronté l'audit, le
  comparatif, la formule de l'étude 3 ni les brouillons anglais à mon
  inventaire.
- **Qui détient les comptes Gandi et OVH**, et si la redirection web de Gandi
  est disponible dans ce compte.
- **Les vrais intitulés de l'administration** de PrestaShop et de WordPress
  pour les exports (je ne la vois pas) : je les ai donnés d'après les
  versions utilisées.
- **La mention « Sent with Brevo »** sur les emails de confirmation : à voir
  sur un envoi de test.
- **Le temps de fabrication du site** avec un millier de photos : à tester à
  l'arrêt 3.
- **Le site vu depuis New York** : les sites de référence ont été regardés
  depuis cet environnement, pas comme un New-Yorkais.
- **Le prix de GitHub Pro** : github.com refuse les lectures automatiques ;
  il n'est pas nécessaire.
