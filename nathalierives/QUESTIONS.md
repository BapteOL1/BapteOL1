# Questions et éléments attendus

Mis à jour le 11 octobre 2026, à l'arrêt 1. Quand une réponse arrive, je la
reporte dans le journal et je coche ici.

Étapes : **A1** exploration (inventaire, plan, technique, coûts) · **A2**
deux directions de design · **A3** socle sur une adresse d'aperçu · **A4**
premier lot (luminaires) · **Lots** autres lots · **A5** avant la bascule.

## À valider maintenant (arrêt 1)

| # | Décision | Ma recommandation | Ce que ça bloque |
|---|---|---|---|
| V1 | Hébergement et domaine | **A** : Cloudflare Pages, le DNS reste chez Gandi ; le jour de la bascule, seuls les deux réglages du site changent | A3 |
| V2 | Interface d'édition | **Sveltia CMS**, avec un compte GitHub gratuit par personne qui édite | A3 |
| V3 | Emails des formulaires | **Brevo** gratuit ; à la bascule, 3 ou 4 lignes **ajoutées** dans les réglages du domaine chez Gandi (les emails du studio ne bougent pas) | A3 (envoi réel), A5 |
| V4 | Plan du site et menu | Galerie / Collection · Intérieurs · Studio · Presse · Contact ; Collaborations dans le Studio | A2, A3 |
| V5 | Le projet déménage dans un dépôt GitHub au nom du studio | oui, avant A3 | A3 |
| V6 | PDF d'articles de presse | ne pas les remettre en ligne ; anciennes adresses → page Presse | A4 (lot presse) |

## Pour toi

| # | Question ou élément | Ce que ça bloque | Statut |
|---|---|---|---|
| T1 | Ouvrir l'accès réseau | A1 | ☑ fait le 11/10 |
| T2 | **Déposer les 4 études** (`etudes/` est vide, et rien dans le Google Drive relié) | Formule du prix livré (A3) ; textes anglais (A3, A4) | ☐ |
| T3 | Photos originales en haute définition : où sont-elles, ou « non » | A4 (qualité des fiches) | ☐ |
| T4 | Fichiers d'origine du logo et du monogramme, ou « non » | A2 (sinon je décalque `logo-noir.png`, 1 638 px, et j'attends l'accord de Nathalie) | ☐ |
| T5 | Domaine et emails chez **Gandi**, site chez **OVH** (trouvé dans les registres). **Qui a l'accès au compte Gandi ?** Peut-être les prestataires cités sur la page Contact (Quentin Assandri, prakt.co ; Anthony Villien, crealp.fr) | A5 | ◐ |
| T6 | Qui mettra le site à jour, et sur quel appareil (téléphone ou ordinateur) | A3 (réglage de l'interface, mode d'emploi) | ☐ |
| T7 | Ton plafond de dépense par mois, hors nom de domaine | Les options payantes (aucune n'est nécessaire) | ☐ |
| T8 | Ton adresse email pour les tests | A3 : envoi réel des formulaires | ☐ |
| T9 | **Règle de TVA** (avec Nathalie et son comptable) : marge, normale, ou les deux | Tout prix en dollars (A4) | ☐ |
| T10 | Référence de la peinture bleue de la devanture | A2 (sinon couleur relevée sur la photo, marquée « approximative ») | ☐ |
| T11 | Newsletter : [Probable] envoyée aujourd'hui par une extension de WordPress (« Newsletters »). Le confirmer, et donner le nombre d'abonnés | A3 (inscription), A5 (reprise des abonnés) | ◐ |
| T12 | ~~Adobe Creative Cloud ?~~ Plus utile : la licence Brandon coûte 35 € par style en achat unique (HVD) | — | ☑ |
| T13 | Photos d'origine du projet de l'île Saint-Louis | Lot projets | ☐ |

## Pour Nathalie

Le classeur `arret-1/a-valider-avec-nathalie.xlsx` rassemble ce qu'elle doit
relire (colonnes jaunes).

| # | Question ou élément | Ce que ça bloque | Statut |
|---|---|---|---|
| N1 | **Contenus pilotes** : 5 pièces, 3 projets, la page presse (`a-fournir/contenus-pilotes.md`) | Jugement des six parcours (A3 avec contenus provisoires, A4 avec les vrais) | ☐ |
| N2 | La fiche unique : adresse de la galerie, un téléphone, horaires, rendez-vous ; nom de la société qui vend (et SIRET, TVA) ; l'email qui reçoit chaque type de demande ; la personne nommée qui répond en anglais ; le contact presse | A3 | ☐ |
| N3 | Ce que le site promet (fichier `site/src/donnees/engagements.yaml`, tout « à confirmer ») : délai de réponse ; réservation ; délais de livraison ; retours ; paiement ; remise aux professionnels ; recâblage ; règlement des droits de douane | Avant la mise en ligne | ☐ |
| N4 | Pour quoi la galerie est connue (aucune pièce de Guariche, Motte, Alain Richard ni Arlus n'est en ligne) | Textes d'accueil et de la galerie (A3, A4) | ☐ |
| N5 | Faits à confirmer : six ans à New York (de… à…), deux ans à Buenos Aires, année d'ouverture de la galerie, études de communication à Paris | Textes Studio et presse (A3) | ☐ |
| N6 | Regroupements de projets (onglet 4) ; Suite Balthazar avec les suites MiHotel ? ; une page MiHotel ou deux ? ; garder le Graphisme ? | Lot projets | ☐ |
| N7 | Titres (onglet 1), designers et niveaux d'attribution (onglet 2), types douaniers, tailles d'envoi, origine UE, essences de bois, prix export (onglet 3) | A4 (prix en dollars, fiches) | ☐ |
| N8 | Les 6 dates de presse incohérentes (onglet 5) ; les photos plus grandes qui existeraient (onglet 6) | Lot presse ; A4 | ☐ |
| N9 | Référence des pièces : garder le numéro de la boutique actuelle (ex. 1095), ou a-t-elle son propre registre ? Arrondir les prix en dollars (au dollar, à la dizaine) ? | A4 | ☐ |
| N10 | La présentation « Restaurants et bars » (2018) : quelles pages garder dans la version allégée ? Ajouter La Tour Rose, Ombellule, Roseaux ? | Parcours 4 (A3 ou lot projets) | ☐ |
