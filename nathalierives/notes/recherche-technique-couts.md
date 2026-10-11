# Recherche technique et coûts : refonte de nathalierives.com

Recherche documentaire du 11 octobre 2026, faite uniquement sur le web. Aucune inscription, aucun formulaire envoyé, aucun compte créé.

## Résumé en 10 lignes

1. **Combinaison recommandée** : site Astro hébergé chez **Cloudflare** (Pages, ou Workers avec fichiers statiques), offre gratuite. Édition avec **Sveltia CMS** (gratuit), dont le petit service de connexion tourne sur un Worker gratuit. Formulaires traités par une fonction Cloudflare avec champ piège, qui envoie les emails via **Brevo Free** (300 emails par jour, données dans l'UE). Mesure d'audience avec **Cloudflare Web Analytics** (gratuit, sans cookie). Photos rangées dans le dépôt Git et converties en WebP de 2 048 px au plus par Sveltia au moment de l'envoi.
2. **Coût mensuel total : 0 €** (hors nom de domaine et hors licence de police). Option confort à **5 $ par mois** avec Workers Paid : 10 millions de requêtes, 100 000 fichiers et 3 000 emails Cloudflare inclus. Brevo Starter coûte 9 $ par mois si la newsletter doit dépasser 300 envois par jour.
3. **Pourquoi Cloudflare** : les requêtes vers les fichiers statiques sont gratuites et illimitées ; on dispose de 500 builds (fabrications du site) par mois sur Pages ou de 3 000 minutes sur Workers ; les fonctions ont droit à 100 000 requêtes par jour ; Cloudflare Access est gratuit jusqu'à 50 utilisateurs pour l'aperçu privé. Netlify Free (300 crédits, 15 crédits par mise en ligne) met le site en pause s'il dépasse. Vercel Hobby et GitHub Pages interdisent l'usage commercial.
4. **Pourquoi Sveltia** : bilingue FR/EN de série ; conversion automatique des photos JPEG ou HEIC en WebP redimensionnées dès l'envoi ; interface utilisable sur téléphone ; brouillons et relecture (workflow éditorial). Dernière version 0.230.1 du 7 octobre 2026, encore en bêta (version 1.0 annoncée pour fin 2026).
5. **Mesure d'audience** : les visites par langue s'obtiennent en filtrant les chemins `/` et `/en/`. Le nombre de demandes envoyées se lit dans les vues des pages « merci » / « thank you », car Cloudflare Web Analytics ne documente pas d'événements personnalisés.
6. **Accès au DNS indispensable** : envoyer un email de confirmation à n'importe quel visiteur demande d'ajouter des enregistrements DNS (code Brevo, DKIM, DMARC), quel que soit le fournisseur. Le brief interdit de toucher au DNS au-delà du réglage qui indique où se trouve le site. Sans changer de serveurs DNS, Cloudflare Pages ne sert que `www` (par un CNAME) ; servir le domaine nu `nathalierives.com` demande de déplacer le DNS chez Cloudflare.
7. **Polices** : une police libre (licence OFL) hébergée avec le site (Josefin Sans, Jost, League Spartan…) coûte 0 € et n'envoie aucune donnée à un tiers. Adobe Fonts demande un abonnement payant et transmet l'adresse IP du visiteur à Adobe. Le prix de la licence web Brandon chez HVD reste à obtenir sur devis.
8. **Incertitude 1** : Sveltia impose à l'éditrice un compte GitHub gratuit, invité sur le dépôt. Si c'est refusé, on se replie sur Pages CMS (invitation par email, mais ni bilingue natif ni conversion des photos) ou sur Decap Turbo (0 € pour un siège, encore en bêta sur invitation).
9. **Incertitude 2** : le bureau d'enregistrement (registrar) et les serveurs DNS actuels de nathalierives.com n'ont pas pu être vérifiés, car les services WHOIS/RDAP étaient inaccessibles depuis cet environnement. Le site actuel crédite un prestataire web externe : c'est probablement lui qui détient les accès.
10. **Incertitude 3** : le temps de fabrication d'Astro avec environ 1 000 photos doit tenir sous la limite de 20 minutes de Cloudflare ; c'est à tester. Repli possible : Cloudflare Images, 5 000 transformations gratuites par mois.

---

## Méthode, fiabilité et limites de cette recherche

- **Outil de lecture des pages indisponible.** Le 11/10/2026, toutes les tentatives de lecture directe d'une page web ont échoué avec l'erreur `ENOTFOUND` (developers.cloudflare.com, netlify.com, rdap.org, whois.com, example.com). Chaque chiffre ci-dessous vient donc des **extraits que le moteur de recherche donne des pages officielles**, avec la recherche limitée au domaine de l'éditeur quand c'était possible. Ce n'est pas une lecture intégrale : il faudra relire les pages de prix avant de signer quoi que ce soit.
- **L'accès aux dépôts GitHub des projets étudiés a été refusé** (session limitée au dépôt du projet). Les versions des logiciels viennent donc aussi des extraits de recherche.
- **Légende de fiabilité** utilisée dans les tableaux :
  - sans mention : chiffre lu dans l'extrait d'une page officielle actuelle ;
  - **(partiel)** : page officielle ancienne, extraits contradictoires ou source secondaire ;
  - **(non vérifié)** : rien trouvé de fiable.
- Toutes les sources ont été consultées le **11/10/2026**. Les références entre crochets, comme [H1], renvoient à la liste des sources en fin de chaque rubrique.

---

## 1. Hébergement statique et petites fonctions serveur

### 1.1 Prix et limites

| | Cloudflare Pages | Cloudflare Workers (fichiers statiques) | Netlify (offres à crédits) | GitHub Pages | Vercel Hobby |
|---|---|---|---|---|---|
| **Prix mensuel** | 0 $ (Free) [H1] | Free 0 $ ; Paid : minimum 5 $/mois par compte [H3] | Free 0 $ ; Personal 9 $ ; Pro à partir de 20 $ (3 000 crédits), paliers 33, 63, 95 et 126 $ [N1][N2][N9] | 0 $ sur un dépôt public ; dépôt privé : offre GitHub Pro nécessaire [G2] (prix de Pro : non vérifié) | 0 $ ; l'offre Pro, obligatoire pour un usage commercial, coûte 20 $/mois avec 20 $ d'usage inclus et 20 $ par siège supplémentaire [V5] |
| **Prix annuel** | sans objet | non vérifié | non vérifié (le report des crédits non utilisés n'existe qu'à partir de 5 000 crédits) [N2] | non vérifié | non vérifié |
| **Builds par mois** | 500 en Free (5 000 en Pro), 1 à la fois [H1] | Workers Builds : 3 000 minutes/mois en Free, 1 à la fois ; 6 000 minutes en Paid puis 0,005 $/min [H6] | chaque mise en ligne en production coûte **15 crédits** ; les aperçus ne sont pas comptés [N3] | 10 par heure (sauf avec un workflow Actions personnalisé) [G1] | 100 déploiements/jour [V4] |
| **Durée max d'un build** | 20 min [H1] | 20 min [H6] | non vérifié | 10 min par déploiement [G1] | 45 min [V4] |
| **Bande passante** | non plafonnée (non vérifié pour Pages ; lecture des fichiers statiques « free and unlimited » sur Workers) | requêtes vers les fichiers statiques gratuites et illimitées [H3][H4] | 20 crédits par Go ; 2 crédits pour 10 000 requêtes [N2][N3] | 100 Go/mois, limite souple [G1] | 100 Go/mois de « Fast Data Transfer » [V4] |
| **Fichiers par site** | 20 000 en Free, 100 000 en offre payante [H1] | 20 000 par version en Free, 100 000 en Paid (Wrangler 4.34 ou plus récent) [H2][H5] | pas de plafond global, mais 54 000 fichiers par dossier [N7] | site publié de 1 Go au plus [G1] | non vérifié |
| **Taille max d'un fichier** | 25 Mio [H1] | 25 Mio [H2] | pas de limite officielle ; 10 Mo conseillés sur le forum (partiel) [N7] | 100 Mio (limite de GitHub) [I1] | non vérifié |
| **Fonctions serveur** | « Pages Functions » facturées comme Workers : 100 000 requêtes/jour en Free [H3][H7] | 100 000 requêtes/jour en Free, 10 ms de temps de calcul par requête, 50 sous-requêtes ; 10 M de requêtes/mois inclus en Paid puis 0,30 $ le million [H2][H3] | 10 crédits par Go-heure de calcul [N2] | aucune | 1 M d'appels, 4 h de calcul actif [V4] |
| **Si on dépasse** | non vérifié | erreur 1027 en Free pour les fonctions ; les fichiers statiques restent servis [H3] | **Free : tous les sites du compte sont mis en pause** jusqu'au mois suivant [N3] | non vérifié | compte Hobby mis en pause [V4] |

**Exemple chiffré Netlify** (mon calcul à partir des tarifs [N3]) : 20 publications par mois consomment 20 × 15 = 300 crédits, soit tout le Free avant même le premier visiteur. Sur Personal (1 000 crédits) : 20 publications (300) + 15 Go de trafic (300) + 150 000 requêtes (30) = 630 crédits.

### 1.2 Usage commercial sur l'offre gratuite

| Service | Clause | Verdict |
|---|---|---|
| Cloudflare | Le Self-Serve Subscription Agreement (§2.2.1 « Restrictions ») interdit la revente d'accès, la surcharge du service, le contournement des limites et la rétro-ingénierie. Aucune interdiction d'usage commercial n'a été trouvée dans les extraits [H8]. | Autorisé à ma connaissance **(partiel : texte intégral non lu)** |
| Netlify | « On the Free plan, you can deploy commercial projects, personal sites, or other creative explorations you want to share on the web. » [N5] | Autorisé ; la revente est interdite |
| GitHub Pages | « GitHub Pages is not intended for or allowed to be used as a free web-hosting service to run your online business, e-commerce site, or any other website that is primarily directed at either facilitating commercial transactions or providing commercial software as a service (SaaS). » [G1][G3] (l'extrait du jour en donne le sens ; mot à mot : partiel) | **Exclu** pour une galerie qui vend |
| Vercel Hobby | « Hobby teams are restricted to non-commercial personal use only. » Et dans les conditions générales : « You shall only use the Services under a Hobby plan for your personal or non-commercial use. » [V1][V3]. Un site vitrine d'entreprise compte comme commercial [V2]. | **Exclu** |

### 1.3 Données, sortie et aperçu privé

| | Où sont les données | Comment on en sort | Aperçu privé non référencé |
|---|---|---|---|
| Cloudflare | Entreprise américaine, réseau mondial. Garder les métadonnées dans l'UE (« Customer Metadata Boundary ») est réservé à l'offre Enterprise [H12]. | Le site est un dossier de fichiers dans Git, qu'on redéploie ailleurs. Seule la configuration Cloudflare (petit fichier `wrangler`) est spécifique. | **Cloudflare Access** : gratuit jusqu'à 50 utilisateurs, puis 7 $ par utilisateur et par mois (facturé à l'année) [H9]. Sur Workers, protection en un clic des URL d'aperçu ou de tout le Worker [H10]. Sur Pages, l'option ne protège que les déploiements d'aperçu, pas `*.pages.dev` [H10]. Un forum signale qu'une carte bancaire peut être demandée même en gratuit (non vérifié). |
| Netlify | Aux États-Unis : AWS est sous-traitant (région US), fonctions en `us-east-1` par défaut ; un avenant RGPD (DPA) et la certification Data Privacy Framework existent [N8] | Même chose : fichiers dans Git | Mot de passe partagé : **Pro uniquement**. En Free et Personal, seul le propriétaire du compte voit un projet privé, après connexion à Netlify [N6] |
| GitHub Pages | États-Unis (non vérifié précisément) | Git | Pas de protection en offre gratuite (le site publié reste public même si le dépôt est privé) [G2] |
| Vercel | Fonctions à Washington (`iad1`) par défaut ; en Hobby, une seule région au choix [V6] | Git | sans objet (exclu) |

### 1.4 Point de vigilance : le nom de domaine

- **Cloudflare Workers** : pour brancher un domaine personnalisé, il faut une « zone Cloudflare active » [H11]. Autrement dit, les serveurs DNS du domaine doivent passer chez Cloudflare, ce qui est gratuit et permet de garder son registrar [H11]. Tout le DNS change alors de main, y compris les enregistrements MX des emails du studio, à recopier à l'identique.
- **Cloudflare Pages** : un sous-domaine (`www.nathalierives.com`) peut pointer vers Pages par un simple CNAME chez le fournisseur DNS actuel, sans zone Cloudflare. En revanche, le domaine nu (`nathalierives.com`) exige que les serveurs DNS passent chez Cloudflare [H11]. Le montage partiel (« CNAME setup ») est réservé aux offres Business et Enterprise [H11].
- **Netlify** : fonctionne avec un DNS externe (enregistrement A du domaine nu vers `75.2.60.5`, CNAME `www` vers `<site>.netlify.app`) [N10]. C'est l'option qui respecte le mieux la règle du brief, mais elle coûte 9 $ par mois au minimum pour éviter les pauses.
- **Statut de Pages** : Cloudflare recommande Workers pour les nouveaux projets. Pages « continue de fonctionner », mais les nouveautés vont à Workers [H7].

**Sources de la rubrique 1** (toutes consultées le 11/10/2026) :

- [H1] https://developers.cloudflare.com/pages/platform/limits/ (11/10/2026)
- [H2] https://developers.cloudflare.com/workers/platform/limits/ (11/10/2026)
- [H3] https://developers.cloudflare.com/workers/platform/pricing/ (11/10/2026)
- [H4] https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/ (11/10/2026)
- [H5] https://developers.cloudflare.com/changelog/post/2025-09-02-increased-static-asset-limits/ (11/10/2026)
- [H6] https://developers.cloudflare.com/workers/ci-cd/builds/limits-and-pricing/ (11/10/2026)
- [H7] https://developers.cloudflare.com/workers/best-practices/workers-best-practices/ et https://blog.cloudflare.com/pages-and-workers-are-converging-into-one-experience/ (11/10/2026)
- [H8] https://www.cloudflare.com/terms/ (copie consultée : https://www.cloudflare.com/de-de/terms/) et https://community.cloudflare.com/t/use-free-plan-for-commercial-project-follow-up/732438 (11/10/2026)
- [H9] https://www.cloudflare.com/sase/products/access/ et https://blog.cloudflare.com/teams-plans/ (11/10/2026)
- [H10] https://developers.cloudflare.com/workers/configuration/cloudflare-access/ et https://developers.cloudflare.com/pages/configuration/preview-deployments/ (11/10/2026)
- [H11] https://developers.cloudflare.com/workers/configuration/routing/custom-domains/ , https://developers.cloudflare.com/pages/configuration/custom-domains/ , https://developers.cloudflare.com/dns/faq/ , https://developers.cloudflare.com/dns/nameservers/update-nameservers/ (11/10/2026)
- [H12] https://developers.cloudflare.com/data-localization/metadata-boundary/faq/ (11/10/2026)
- [N1] https://www.netlify.com/pricing/ (11/10/2026)
- [N2] https://www.netlify.com/changelog/2026-04-14-pricing-updates-april-2026/ (11/10/2026)
- [N3] https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/ et https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/billing-faq-for-credit-based-plans/ (11/10/2026)
- [N5] https://www.netlify.com/blog/introducing-netlify-free-plan/ (11/10/2026)
- [N6] https://docs.netlify.com/manage/security/secure-access-to-sites/password-protection/ et https://docs.netlify.com/manage/security/secure-access-to-sites/project-visibility/ (11/10/2026)
- [N7] https://docs.netlify.com/deploy/deploy-overview/ et https://answers.netlify.com/t/what-is-the-maximum-allowed-object-size/145182 (11/10/2026)
- [N8] https://www.netlify.com/trust-center/ et https://answers.netlify.com/t/where-are-the-function-servers-located-gdpr-fml/85539 (11/10/2026)
- [N9] https://www.netlify.com/changelog/2026-07-14-pro-plan-credit-tiers/ (11/10/2026)
- [N10] https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/ (11/10/2026)
- [G1] https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits (11/10/2026)
- [G2] https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages (11/10/2026)
- [G3] https://docs.github.com/en/site-policy/github-terms/github-terms-for-additional-products-and-features (11/10/2026)
- [V1] https://vercel.com/docs/plans/hobby (11/10/2026)
- [V2] https://vercel.com/docs/limits/fair-use-guidelines (11/10/2026)
- [V3] https://vercel.com/legal/terms (11/10/2026)
- [V4] https://vercel.com/docs/limits (11/10/2026)
- [V5] https://vercel.com/pricing et https://vercel.com/docs/plans/pro-plan (11/10/2026)
- [V6] https://vercel.com/docs/functions/configuring-functions/region (11/10/2026)

---

## 2. Interfaces d'édition basées sur Git

### 2.1 Tableau comparatif

| | **Sveltia CMS** | **Decap CMS** | **Keystatic** (et Keystatic Cloud) | **Pages CMS** | **TinaCMS / TinaCloud** | **CloudCannon** |
|---|---|---|---|---|---|---|
| **Coût** | Gratuit, open source [C7] | Gratuit, open source. **Decap Turbo** (hébergé) : Free 0 € (1 site, 1 siège) ; Pro 19 €/mois (1 site, 5 sièges, +10 €/site, +6 €/siège), sans formule annuelle [D5] | Gratuit. Cloud : gratuit jusqu'à 3 utilisateurs par équipe ; Pro à partir de 10 $/mois, +5 $ par utilisateur au-delà de 3 [K1] | Gratuit (licence MIT), en ligne ou auto-hébergé [P1] | Free 0 $ (2 utilisateurs) ; Team 24 $/mois ou 290 $/an (3 utilisateurs) ; Team Plus 41 $/mois ou 490 $/an (workflow éditorial) ; Business 249 $/mois ou 2 990 $/an [T1] (partiel : un billet plus ancien donne d'autres prix) | Standard 55 $/mois, ou 49 $/mois en annuel (3 utilisateurs, +10 $ par utilisateur) ; Team 350 $/mois ou 300 $/mois en annuel ; essai de 21 jours, pas d'offre gratuite [CC1] |
| **Compte GitHub pour l'éditrice ?** | **Oui** : collaboratrice invitée avec droit d'écriture. Git Gateway et Netlify Identity ne sont pas pris en charge [C3] | Oui avec l'accès GitHub direct ; **non** avec Decap Turbo (compte Turbo seulement) [D4][D5] ; non avec Git Gateway, déprécié [NI1] | Oui en « GitHub mode » ; **non** avec Keystatic Cloud [K2] | **Non** : invitation par email avec code à usage unique [P2][P4] | **Non** : un compte TinaCloud par email suffit [T2] | Compte CloudCannon (absence de compte GitHub : non vérifié) |
| **Connexion, et ce qu'il faut héberger** | OAuth GitHub via le « Sveltia CMS Authenticator », un Worker Cloudflare gratuit, ou via Netlify. Jeton personnel possible mais déconseillé pour une non-technicienne. PKCE non disponible avec GitHub [C2] | Petit service OAuth à héberger soi-même (Worker ou fonction) ; liste de services communautaires [D4] | Application GitHub plus routes serveur : il faut un **adaptateur Astro**, donc des fonctions serveur [K3] | Rien à héberger avec l'app en ligne. En auto-hébergé : PostgreSQL et une application GitHub [P3] | TinaCloud ; l'auto-hébergement demande une base de données et Auth.js [T4] | Service hébergé |
| **Bilingue (FR/EN)** | Natif : trois façons de ranger les langues ; une entrée apparaît comme un seul contenu à plusieurs langues [C4]. Champs FR/EN côte à côte : non vérifié explicitement | Natif (`i18n`, plusieurs dossiers ou fichiers) [D3]. Côte à côte : non vérifié | Pas natif : contournement communautaire (un champ par langue) ; ajout officiel en cours, non publié [K4] | Pas natif : travail en cours sur une version dérivée, non intégré [P5]. On peut toujours créer des champs « titre_fr / titre_en » | Non vérifié | « Range of localization and i18n support », sans détail [CC3] |
| **Traitement des images à l'envoi** | **Oui** : conversion en WebP (qualité 85 par défaut), largeur et hauteur maximales, **photos HEIC de téléphone converties**, métadonnées EXIF retirées [C5] | Oui depuis la 3.16 (`media_processing`) : conversion JPEG ou WebP, qualité, largeur ; **JPEG, PNG et WebP seulement** (pas de HEIC) [D2] | Non trouvé (on compte sur Astro au moment de la fabrication). Cloud Images en offre Pro [K6] | Non trouvé | Non vérifié | Oui : redimensionnement et tailles supplémentaires configurables [CC2] |
| **Aperçu** | Volet d'aperçu dans l'éditeur, gabarits personnalisables [C8] ; lien vers l'aperçu du site avec le workflow éditorial [C6] | Volet d'aperçu (non vérifié aujourd'hui) | Non vérifié pour Astro | Non vérifié | Édition visuelle [T3] | Édition visuelle avec Astro [CC4] |
| **Brouillon puis publication** | Workflow éditorial : brouillon, en relecture, prêt ; chaque brouillon est une demande de fusion (pull request) [C6] | Workflow éditorial (non revérifié aujourd'hui) | Non vérifié | Non vérifié | Workflow éditorial à partir de Team Plus [T1] | Branches à partir de Team [CC1] |
| **Sur téléphone** | « Fully responsive and optimized for mobile » [C7] | Vues rendues adaptatives en 3.14 (partiel) [D1] | Non vérifié | « Mobile support, full responsive design » [P1] | Non vérifié | Non vérifié |
| **Maintenance en 2026** | v0.230.1 du **07/10/2026** (correctif de sécurité) ; bêta, version 1.0 prévue fin 2026 [C1][C7] | decap-cms 3.16.3 (vu dans une mise à jour du 23/09/2026) ; 3.17.0-beta.1 ; Decap Turbo annoncé le 05/05/2026 [D1][D6] | @keystatic/core 0.6.9 (26/08/2026 d'après des sources tierces, partiel) [K5] | 2.1.8 (« 08 Jun », année non affichée, probablement 2026, partiel) [P4] | tinacms 3.14.2 ; TinaCloud 2026.09.4 (septembre 2026) [T3] | Non vérifié |
| **Données / sortie** | Contenu dans le dépôt Git, rien ailleurs. Sortie immédiate | Git ; Turbo garde aussi une copie dans sa base, lieu non publié [D5] | Git ; Cloud Images hors du dépôt [K6] | Git ; l'app en ligne garde un cache (lieu non vérifié) | Git, plus la base TinaCloud | Git |

### 2.2 Netlify Identity et Git Gateway

| | Statut au 11/10/2026 |
|---|---|
| **Git Gateway** | **Déprécié** : continue de fonctionner là où il est déjà activé, mais les nouvelles configurations sont déconseillées et seules les failles de sécurité majeures seront corrigées [NI1] |
| **Netlify Identity** | **Maintenu** : la dépréciation annoncée en 2025 a été annulée le 19/02/2026 [NI2]. Gratuit sur toutes les offres à crédits, utilisateurs illimités. Modèles d'emails personnalisés et adresse d'envoi propre : Pro uniquement [NI3] |

### 2.3 Lecture pour ce projet

- **Sveltia** coche presque tout : bilingue natif, photos de téléphone (HEIC) converties sans préparation, mobile, gratuit, maintenu chaque semaine. Son seul défaut est le compte GitHub de l'éditrice.
- Pour éviter que l'éditrice « casse le site » : les champs sont imposés et validés par la configuration, l'éditrice ne voit pas le code, et chaque changement est une version Git qu'on peut annuler. Si une fabrication échoue, la version précédente reste en ligne (déduction, à vérifier chez Cloudflare). Un compte GitHub avec droit d'écriture permet en théorie de modifier les fichiers sur github.com ; le verrouillage de branche sur un dépôt privé gratuit n'a pas été vérifié.
- **Repli sans compte GitHub** :
  - **Pages CMS** : gratuit, invitation par email. Mais pas de bilingue natif (on crée deux champs) et pas de conversion des photos, donc les originaux de téléphone de plusieurs Mo grossiraient le dépôt.
  - **Decap Turbo Free** : un siège, conversion JPEG/PNG/WebP mais pas HEIC. Bêta sur liste d'attente, et les sources se contredisent sur l'ouverture au public.

**Sources de la rubrique 2** (toutes consultées le 11/10/2026) :

- [C1] https://github.com/sveltia/sveltia-cms/releases/tag/v0.230.1 et https://github.com/sveltia/sveltia-cms/releases (11/10/2026)
- [C2] https://sveltiacms.app/en/docs/backends/github (11/10/2026)
- [C3] https://sveltiacms.app/en/docs/migration/netlify-decap-cms (11/10/2026)
- [C4] https://sveltiacms.app/en/docs/i18n et https://sveltiacms.app/en/docs/i18n/structures (11/10/2026)
- [C5] https://sveltiacms.app/en/docs/media/internal et https://sveltiacms.app/en/docs/media (11/10/2026)
- [C6] https://sveltiacms.app/en/docs/workflows/editorial et https://sveltiacms.app/en/docs/workflows/deploy-previews (11/10/2026)
- [C7] https://sveltiacms.app/en/docs/intro , https://sveltiacms.app/en/docs/ui et https://sveltiacms.app/en/ (11/10/2026)
- [C8] https://sveltiacms.app/en/docs/api/preview-templates (11/10/2026)
- [D1] https://github.com/decaporg/decap-cms/releases et https://github.com/hugomods/decap-cms/pull/509 (11/10/2026)
- [D2] https://decapcms.org/docs/configuration-options/ (11/10/2026)
- [D3] https://decapcms.org/docs/i18n/ (11/10/2026)
- [D4] https://decapcms.org/docs/backends-overview/ et https://decapcms.org/docs/external-oauth-clients/ (11/10/2026)
- [D5] https://decapcms.org/turbo/ , https://decapcms.org/docs/turbo-billing/ , https://decapcms.org/blog/decap-turbo-public-preview/ , https://decapcms.org/docs/turbo-troubleshooting-faq/ , https://decapcms.org/docs/turbo-how-it-works/ (11/10/2026)
- [D6] https://decapcms.org/blog/ (11/10/2026)
- [K1] https://keystatic.com/docs/cloud (11/10/2026)
- [K2] https://keystatic.com/docs/github-mode (11/10/2026)
- [K3] https://keystatic.com/docs/installation-astro (11/10/2026)
- [K4] https://github.com/Thinkmill/keystatic/discussions/1423 et https://github.com/Thinkmill/keystatic/pull/1553 (11/10/2026)
- [K5] https://www.npmjs.com/package/@keystatic/core et https://github.com/solana-foundation/solana-com/pull/2282 (11/10/2026)
- [K6] https://keystatic.com/docs/fields/cloud-image (11/10/2026)
- [P1] https://pagescms.org/ (11/10/2026)
- [P2] https://pagescms.org/docs/configuration/collaborators/ (11/10/2026)
- [P3] https://pagescms.org/docs/guides/installing/self-host/ (11/10/2026)
- [P4] https://github.com/pages-cms/pages-cms/releases (11/10/2026)
- [P5] https://github.com/leanderrj/pagescms/pull/1 et https://github.com/pages-cms/pages-cms/issues/221 (11/10/2026)
- [T1] https://tina.io/pricing et https://tina.io/blog/Pricing-Updates-its-now-cheaper-to-use-Tinas-best-feature- (11/10/2026)
- [T2] https://tina.io/docs/faq (11/10/2026)
- [T3] https://tina.io/whats-new/tinacms et https://tina.io/whats-new/tinacloud (11/10/2026)
- [T4] https://tina.io/docs/self-hosted/overview (11/10/2026)
- [CC1] https://cloudcannon.com/pricing/ (11/10/2026)
- [CC2] https://cloudcannon.com/documentation/developer-articles/configure-a-file-input/ (11/10/2026)
- [CC3] https://cloudcannon.com/for-content-editors/ (11/10/2026)
- [CC4] https://cloudcannon.com/astro-cms/ (11/10/2026)
- [NI1] https://docs.netlify.com/manage/security/secure-access-to-sites/git-gateway/ (11/10/2026)
- [NI2] https://www.netlify.com/blog/auth0-extension-identity-changes/ et https://answers.netlify.com/t/netlify-identity-is-staying-feb-2026-reversal-what-changed-whos-affected-and-how-to-proceed/162733 (11/10/2026)
- [NI3] https://docs.netlify.com/manage/security/secure-access-to-sites/identity/plans-and-pricing/ (11/10/2026)

---

## 3. Emails transactionnels et formulaires

### 3.1 Tableau comparatif

| | Gratuit | Payant | Usage commercial en gratuit | Domaine vérifié (DNS) nécessaire ? | Sans toucher au DNS | Données |
|---|---|---|---|---|---|---|
| **Resend** | 3 000 emails/mois, **100 par jour**, 3 domaines [E1][E2] | Pro 20 $/mois pour 50 000 emails, puis 0,90 $ les 1 000 [E1] | Aucune clause trouvée, ni pour ni contre ; offre gratuite modifiable sans préavis [E5] (non vérifié) | Oui pour écrire à n'importe qui [E3] | Envoi depuis `onboarding@resend.dev` **uniquement vers l'adresse du compte Resend**, toute autre adresse renvoie une erreur 403 [E3]. Utilisable pour notifier le studio, pas pour confirmer au visiteur | **Stockées aux États-Unis**, même avec l'envoi depuis l'Irlande (`eu-west-1`) ; transfert encadré par des clauses types et le DPF [E4] |
| **Brevo** (transactionnel) | 300 emails/jour, API et SMTP inclus, 100 000 contacts [B1][B2] | Starter à partir de 9 $/mois (5 000 emails/mois) ; logo Brevo retirable avec une option à 9 $/mois [B1] | Aucune restriction trouvée (non vérifié formellement) | Recommandé, et **obligatoire** si le domaine a une politique DMARC stricte (`quarantine` ou `reject`) [B3] | Une adresse d'expédition peut être validée par un code à 6 chiffres. Si le domaine n'est pas authentifié, **Brevo remplace l'adresse d'expédition** par une adresse conforme (solution temporaire, emails moins bien délivrés) [B3] | **UE** : OVH en France et en Allemagne, Google Cloud en Belgique ; quelques sous-traitants américains (Datadog, Cloudflare) [B4] |
| **Postmark** | Offre développeur : 100 emails/mois, sans dépassement [PM1] | Basic 15 $/mois pour 10 000 emails, puis 1,80 $ les 1 000 ; pas d'offre annuelle [PM1] | Non vérifié | Pour envoyer depuis une adresse : signature confirmée par email, sans DNS. Pour tout le domaine : DNS [PM2]. **Compte à faire approuver** avant d'écrire hors des domaines vérifiés (moins de 24 h en semaine) [PM3] | Signature d'expéditeur confirmée par lien ; Gmail et Yahoo refusés comme expéditeur [PM2] | **États-Unis** (Chicago et AWS), pas de serveurs UE prévus [PM4] (page ancienne, partiel) |
| **Netlify Forms** | Gratuit et illimité sur les offres à crédits [NF1] | sans objet | Oui (cf. 1.2) | sans objet | Notifie le studio. **Pas de copie au visiteur** sans écrire une fonction et utiliser un service d'envoi [NF2]. L'intégration « Netlify Email » ne peut plus être ajoutée aux nouvelles équipes depuis le 11/09/2026 [NF2] | États-Unis (fil de forum ancien, partiel) [NF3] |
| **Formspree** | 50 envois/mois, 2 adresses de notification, 30 jours d'historique [FS1] | Personal 15 $/mois ou 120 $/an (200 envois) ; Professional 30 $/mois ou 240 $/an (2 000 envois). **Réponse automatique au visiteur à partir de Professional** [FS1] (partiel : prix différents sur une ancienne page) | Offre gratuite présentée « for testing and development » (partiel) [FS1] | Non | Envoi depuis son propre domaine (non vérifié) | États-Unis [FS2] |
| **Web3Forms** | 250 envois/mois, formulaires et domaines illimités [W1] | Réponse automatique dans l'offre à 12 $/mois (10 000 envois) ; noms d'offres incohérents sur la page [W1] (partiel) | Aucune clause explicite (non vérifié) | Non | Non vérifié | AWS, plus Hetzner (Allemagne, Finlande) d'après le DPA ; une FAQ plus ancienne disait États-Unis [W2] (partiel) |
| **Cloudflare Email Service** | Envoi vers **ses propres adresses vérifiées** gratuit sur toutes les offres [CE1][CE2] | **Workers Paid obligatoire** pour écrire à n'importe qui : 3 000 emails/mois inclus, puis 0,35 $ les 1 000 [CE1] | Oui (cf. 1.2) | Oui : le domaine doit être déclaré comme domaine d'envoi. Cloudflare crée lui-même les enregistrements SPF, DKIM et DMARC sur `cf-bounce.<domaine>` [CE4] | Sans domaine d'envoi déclaré : seulement vers les adresses vérifiées du compte [CE2]. L'obligation d'avoir le DNS chez Cloudflare est probable mais non vérifiée | Cloudflare (cf. 1.3). Bêta publique depuis le 16/04/2026 [CE3] |

### 3.2 Ce qu'on peut faire sans toucher au DNS

- **Notifier le studio** : oui, gratuitement, avec Resend en mode test (si le compte Resend est ouvert à l'adresse qui doit recevoir les demandes), Netlify Forms, Formspree ou Web3Forms.
- **Envoyer une confirmation au visiteur dans sa langue** : pas proprement.
  - Brevo envoie, mais remplace l'adresse d'expédition [B3].
  - Formspree ou Web3Forms ont une réponse automatique, mais en offre payante, depuis leur propre domaine (non vérifié), et le contrôle de la langue reste à vérifier.
  - **La solution propre suppose d'ajouter 2 ou 3 enregistrements DNS** (code Brevo, DKIM, DMARC) [B3]. Ces ajouts ne coupent pas les emails existants à condition de ne pas écraser un enregistrement SPF ou DMARC déjà présent.
- Le brief veut que, jusqu'à la bascule, tous les emails partent vers l'adresse de test du fils. Brevo le permet, même avant authentification du domaine.

### 3.3 Montage recommandé

- Une fonction Cloudflare (dans le même projet que le site, gratuite) reçoit les 5 formulaires.
- Elle rejette les envois dont le champ piège est rempli, puis appelle l'API Brevo deux fois : une notification au studio, une confirmation au visiteur dans la langue de la page.
- Brevo peut aussi tenir la liste des inscrits à la newsletter (100 000 contacts en gratuit), à condition que Nathalie n'utilise pas déjà un autre outil : la question est à lui poser.

**Sources de la rubrique 3** (toutes consultées le 11/10/2026) :

- [E1] https://resend.com/pricing et https://resend.com/docs/knowledge-base/account-quotas-and-limits (11/10/2026)
- [E2] https://resend.com/changelog/three-domains-on-the-free-tier (11/10/2026)
- [E3] https://resend.com/docs/knowledge-base/403-error-resend-dev-domain (11/10/2026)
- [E4] https://resend.com/security/gdpr et https://resend.com/docs/dashboard/domains/regions (11/10/2026)
- [E5] https://resend.com/legal/terms-of-service (11/10/2026)
- [B1] https://www.brevo.com/pricing/ et https://help.brevo.com/hc/en-us/articles/208589409-About-Brevo-s-pricing-plans (11/10/2026)
- [B2] https://www.brevo.com/features/email-api/ et https://www.brevo.com/free-smtp-server/ (11/10/2026)
- [B3] https://help.brevo.com/hc/en-us/articles/208836149-Create-a-new-sender-From-name-and-From-email , https://help.brevo.com/hc/en-us/articles/14925263522578-Comply-with-Gmail-Yahoo-and-Microsoft-s-requirements-for-email-senders , https://help.brevo.com/hc/en-us/articles/12163873383186-Authenticate-your-domain-with-Brevo-Brevo-code-DKIM-DMARC (11/10/2026)
- [B4] https://help.brevo.com/hc/en-us/articles/360001005510-Data-storage-location (11/10/2026)
- [PM1] https://postmarkapp.com/pricing et https://postmarkapp.com/support/article/1285-pricing-billing-faq (11/10/2026)
- [PM2] https://postmarkapp.com/developer/user-guide/managing-your-account/managing-sender-signatures (11/10/2026)
- [PM3] https://postmarkapp.com/support/article/1084-how-does-the-account-approval-process-work (11/10/2026)
- [PM4] https://postmarkapp.com/eu-privacy (11/10/2026)
- [NF1] https://docs.netlify.com/manage/forms/usage-and-billing/ (11/10/2026)
- [NF2] https://answers.netlify.com/t/is-it-possible-to-email-a-copy-of-a-netlify-contact-form-submission-to-the-sender-on-request/53336 et https://docs.netlify.com/extend/install-and-use/setup-guides/email-integration/ (11/10/2026)
- [NF3] https://answers.netlify.com/t/netlify-forms-data-center-location/24588 (11/10/2026)
- [FS1] https://formspree.io/plans et https://help.formspree.io/articles/account-management/account-limits (11/10/2026)
- [FS2] https://formspree.io/legal/privacy-policy/ et https://formspree.io/legal/terms-of-service/ (11/10/2026)
- [W1] https://web3forms.com/pricing (11/10/2026)
- [W2] https://web3forms.com/privacy , https://web3forms.com/dpa , https://docs.web3forms.com/getting-started/faq (11/10/2026)
- [CE1] https://developers.cloudflare.com/email-service/platform/pricing/ (11/10/2026)
- [CE2] https://developers.cloudflare.com/email-service/platform/limits/ (11/10/2026)
- [CE3] https://developers.cloudflare.com/changelog/post/2026-04-16-email-sending-public-beta/ (11/10/2026)
- [CE4] https://developers.cloudflare.com/email-service/configuration/domains/ (11/10/2026)

---

## 4. Mesure d'audience sans cookies

| | Prix mensuel / annuel | Offre gratuite | Événements personnalisés | Usage commercial | Données | Sortie |
|---|---|---|---|---|---|---|
| **Cloudflare Web Analytics** | 0 $ | Pas de limite de trafic ; 10 sites si le domaine ne passe pas par Cloudflare, illimité sinon [A1] | **Non documentés** (évoqués comme un projet futur) [A1][A2]. On peut filtrer par chemin [A3] | Oui (cf. 1.2) | Ni cookie ni stockage dans le navigateur ; l'adresse IP est jetée au centre de données le plus proche [A4]. Attention : la version activée par défaut depuis le 15/10/2025 **exclut les visiteurs de l'UE**, réglage à changer [A4] | Non vérifié (API GraphQL probable) |
| **Plausible** | Starter 9 $/mois, Growth 14 $, Business 19 $ (palier 10 000 pages vues) (partiel : page officielle ancienne, confirmée par des sites tiers) [PL1][PL3]. Annuel : « 2 mois offerts » selon la page, montant non vérifié | **Pas d'offre gratuite** ; essai de 30 jours sans carte [PL2] | Oui, dès Starter (objectifs et événements) [PL1] | Oui (offre payante) | **UE** : Hetzner en Allemagne, UpCloud en Finlande [PL2] | Non vérifié |
| **Umami Cloud** | Pro 20 $/mois (1 M d'événements, 20 sites) [U1] | Hobby 0 $ : 100 000 événements/mois, 1 site, 6 mois de conservation [U1] | Oui | **Non vérifié** : l'offre Hobby est décrite comme « great for personal projects », sans clause trouvée [U1] | États-Unis ou UE, au choix à l'inscription [U1][U2] | Non vérifié |
| **GoatCounter** | 0 $, dons facultatifs | « Reasonable public usage », sans plafond chiffré [GC1] | Oui (non revérifié) | « Running your personal website or small-to-medium business on it is fine » [GC1]. Page datée de 2020 ; un ancien README disait « free for non-commercial use » (partiel) [GC2] | Non vérifié | Non vérifié |
| **Pirsch** | Standard 6 $/mois, Plus 12 $/mois (10 000 pages vues), hors TVA [PI1]. Annuel : non vérifié | Non (essai) | Oui (les événements comptent dans le quota) [PI1] | Oui (offre payante) | **Allemagne** (Hetzner, Nuremberg et Falkenstein) ; AWS cité parmi les destinataires possibles [PI2] | Non vérifié |
| **Fathom** | 15 $/mois jusqu'à 100 000 pages vues, 50 sites ; 150 $/an (partiel) [F1] | Non (essai de 7 jours) [F1] | Oui (non revérifié) | Oui (offre payante) | Entreprise canadienne ; « EU Isolation » : trafic UE traité dans l'UE (Bunny.net) [F2] | Non vérifié |

**Recommandation : Cloudflare Web Analytics.**

- Les **visites par langue** s'obtiennent en filtrant les chemins `/` et `/en/` [A3].
- Les **demandes envoyées** se comptent par les vues des pages « merci » distinctes pour chaque formulaire et chaque langue, par exemple `/merci/devis/` et `/en/thank-you/quote/`. Cela suppose une adresse de page « merci » après chaque envoi réussi : c'est un choix de conception.
- Si Nathalie veut de vrais événements avec des données hébergées en Allemagne : **Pirsch à 6 $/mois** est le moins cher trouvé.

**Sources de la rubrique 4** (toutes consultées le 11/10/2026) :

- [A1] https://developers.cloudflare.com/web-analytics/limits/ (11/10/2026)
- [A2] https://blog.cloudflare.com/privacy-first-web-analytics/ (11/10/2026)
- [A3] https://developers.cloudflare.com/web-analytics/configuration-options/filters/ et https://developers.cloudflare.com/web-analytics/data-metrics/dimensions/ (11/10/2026)
- [A4] https://developers.cloudflare.com/speed/observatory/rum-beacon/ et https://blog.cloudflare.com/the-rum-diaries-enabling-web-analytics-by-default/ (11/10/2026)
- [PL1] https://plausible.io/docs/subscription-plans et https://plausible.io/ (11/10/2026)
- [PL2] https://plausible.io/blog/made-in-eu et https://plausible.io/eu-hosted-web-analytics (11/10/2026)
- [PL3] https://saaspricehub.io/tools/plausible et https://seline.com/blog/plausible-analytics-pricing (sources tierces, 11/10/2026)
- [U1] https://umami.is/pricing et https://docs.umami.is/docs/cloud/faq (11/10/2026)
- [U2] https://docs.umami.is/docs/cloud/sign-up (11/10/2026)
- [GC1] https://www.goatcounter.com/help/terms et https://www.goatcounter.com/ (11/10/2026)
- [GC2] https://github.com/arp242/goatcounter (11/10/2026)
- [PI1] https://pirsch.io/pricing et https://docs.pirsch.io/billing (11/10/2026)
- [PI2] https://pirsch.io/privacy et https://docs.pirsch.io/ (11/10/2026)
- [F1] https://usefathom.com/pricing (11/10/2026)
- [F2] https://usefathom.com/features/eu-isolation et https://usefathom.com/legal/dpa (11/10/2026)

---

## 5. Images

| Service | Ce qui est gratuit | Au-delà | Usage commercial | Remarque pour ce projet |
|---|---|---|---|---|
| **Dépôt GitHub** | Dépôt idéalement sous 1 Go, fortement conseillé sous 5 Go (page ancienne) ; la page « Repository limits » plus récente fixe 10 Go sur disque [I1][I2]. Avertissement à 50 Mio par fichier, **blocage à 100 Mio**, 25 Mio par envoi via le navigateur, 2 Go par envoi [I1][I2] | sans objet | Oui (dépôt privé sur GitHub Free) | Estimation (mon calcul, non vérifié) : 1 000 photos en WebP de 2 048 px pèsent environ 0,3 à 0,7 Go. Cela reste sous 1 Go si Sveltia convertit à l'envoi |
| **Git LFS** (stockage des gros fichiers hors du dépôt) | Free et Pro : 10 Gio de stockage et 10 Gio de téléchargement par mois [I3] | 0,07 $ par Gio et par mois de stockage ; 0,0875 $ par Gio téléchargé [I3] | Oui | À éviter : chaque fabrication du site retélécharge les fichiers et consomme le quota (déduction) |
| **Cloudflare Images** | 5 000 transformations distinctes par mois pour des images stockées ailleurs (dans R2 ou dans le site). Au-delà, les nouvelles transformations échouent (erreur 9422), **sans facturation** [I4] | 0,50 $ les 1 000 transformations ; stockage dans Images 5 $ les 100 000 images et livraison 1 $ les 100 000 (offre payante) [I4] | Oui | Plan B si la fabrication devient trop longue : 1 000 photos × 3 tailles = 3 000 transformations, sous les 5 000 gratuites |
| **Cloudflare R2** | 10 Go-mois, 1 M d'opérations d'écriture (classe A), 10 M de lectures (classe B), **sortie gratuite** [I5] | 0,015 $ par Go-mois ; 4,50 $ le million d'écritures ; 0,36 $ le million de lectures [I5] | Oui | Utile seulement si le dépôt dépasse quelques Go |
| **Netlify Image CDN** | Inclus, mais facturé en bande passante (20 crédits par Go) [I6][N3] | Coût par transformation non trouvé | Oui | sans objet si on choisit Cloudflare |
| **Cloudinary** | 25 crédits/mois (1 crédit = 1 000 transformations, 1 Go stocké ou 1 Go diffusé), calculés sur 30 jours glissants [I7] | Plus 99 $/mois ou 89 $/mois en annuel (225 crédits) ; Advanced 249 $ ou 224 $ (600 crédits) [I7] | « Can be used without restrictions, even in production » (FAQ développeur, pas les conditions générales : partiel) [I7] | Trop cher au-delà de l'offre gratuite |

**Sources de la rubrique 5** (toutes consultées le 11/10/2026) :

- [I1] https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github (11/10/2026)
- [I2] https://docs.github.com/en/repositories/creating-and-managing-repositories/repository-limits (11/10/2026)
- [I3] https://docs.github.com/en/billing/concepts/product-billing/git-lfs , https://github.com/pricing/calculator , https://github.blog/changelog/2024-06-03-new-enterprise-accounts-have-metered-billing-for-git-lfs/ (11/10/2026)
- [I4] https://developers.cloudflare.com/images/pricing/ (11/10/2026)
- [I5] https://developers.cloudflare.com/r2/pricing/ (11/10/2026)
- [I6] https://docs.netlify.com/build/image-cdn/overview/ (11/10/2026)
- [I7] https://cloudinary.com/pricing , https://cloudinary.com/documentation/billing_and_plans , https://cloudinary.com/documentation/developer_onboarding_faq_free_plan (11/10/2026)

---

## 6. Polices

### 6.1 Brandon Grotesque (HVD Fonts)

| Source | Ce qui est vérifié | Licence web (paliers de pages vues) |
|---|---|---|
| **HVD Fonts** (boutique du créateur) | 12 styles, « à partir de 35 € » (type de licence non précisé) [P-1] | La licence web autorise l'hébergement avec le site (`@font-face`) pour un plafond mensuel de pages vues inscrit sur la facture. Il faut passer au palier supérieur si le plafond est dépassé 3 mois dans l'année. Une licence par site. **Prix des paliers : non vérifié** (sur la boutique, un autre caractère, Fabrikat, a un palier de 10 000 pages vues par mois) [P-1] |
| **Fontspring** | 40 $ par style, famille de 12 à 249 $ ; vendue en version bureau et en version web [P-2] | Paliers de pages vues « à partir de 500 000 » pour la plupart (page ancienne, partiel) ; licence « Enterprise » sans limite de pages vues « à partir de 22 $ » (partiel) [P-2]. **Prix web exact : non vérifié** |
| **MyFonts** | À partir de 40 $ par style, famille à 249 $ ; la licence bureau exclut l'hébergement web ; la plupart des polices web y sont vendues en licence annuelle [P-3] | **Non vérifié** |
| **Adobe Fonts** | Brandon Grotesque disponible « for sync and web use » [P-4] | Usage web inclus avec un abonnement payant (Creative Cloud, Acrobat Pro ou Standard, Adobe Express payant, application seule) ; **pas de limite de pages vues** ; **hébergement par ses soins interdit** ; si l'abonnement s'arrête, la police de secours s'affiche [P-5]. Prix du moins cher de ces abonnements en France : non vérifié |

**Adobe Fonts et RGPD** [P-6] :

- Le service de polices ne dépose pas de cookie pour livrer les polices.
- Il collecte l'identifiant du projet web, l'identifiant du compte et le nom du site qui charge la police, pour la facturation.
- L'adresse IP du visiteur est reçue pour livrer le fichier, mais pas conservée (selon Adobe).
- Des statistiques agrégées sont partagées avec les fondeurs.
- Conséquence : chaque page vue fait partir l'IP du visiteur vers Adobe, entreprise américaine. Il faut le déclarer dans la politique de confidentialité. Comme l'hébergement par ses soins est interdit, on ne peut pas l'éviter.
- Pas de bandeau cookies nécessaire selon la position d'Adobe. Les avis de forums allemands divergent, et un avis juridique est conseillé (partiel).

### 6.2 Polices libres (licence OFL) les plus proches, à héberger avec le site

| Police | Licence | Pourquoi elle ressemble à Brandon | Limites |
|---|---|---|---|
| **Josefin Sans** (Santiago Orozco) | OFL 1.1 [P-7] | Même filiation géométrique années 1920 (Kabel, Futura). **Petite hauteur d'x** : selon le dessinateur, la hauteur des minuscules est à mi-chemin entre la ligne de base et la hauteur des capitales [P-7]. Capitales élégantes et espacées, idéale pour des titres en capitales | Pensée pour les grandes tailles ; dépôt archivé le 19/04/2026, donc stable mais plus développée [P-7] |
| **Jost** (indestructible type) | OFL [P-8] | Inspirée des sans-serif allemands des années 1920, proche de Futura : construction géométrique, capitales construites | La version variable « compilée » est payante sur le site du fondeur (≥ 10 $), les versions statiques sont libres ; Google Fonts la diffuse [P-8] |
| **League Spartan** | OFL 1.1 [P-9] | Reprise du Spartan d'ATF, géométrique, capitales franches ; plusieurs graisses en version variable | Plus « dure » que Brandon ; hauteur d'x à comparer sur spécimen |
| **Glacial Indifference** | OFL 1.1, nom de police réservé [P-10] | Géométrique, sobre, souvent proposée en remplacement des géométriques payantes | Peu de graisses ; nom réservé : interdit de modifier la police sous ce nom |
| **Poppins** (Indian Type Foundry) | OFL 1.1 [P-11] | Classée la plus proche (88 %) par un comparateur [P-12] | Hauteur d'x plus grande que Brandon à mon avis (à vérifier sur spécimen) : mieux pour le texte courant que pour imiter les titres |

Pour le brief, qui demande des titres et libellés en capitales : **Josefin Sans** pour les titres, avec une police de texte discrète à part, puis comparaison côte à côte avec Brandon avant de trancher. Aucune mesure de hauteur d'x n'a été vérifiée dans les fichiers.

**Sources de la rubrique 6** (toutes consultées le 11/10/2026) :

- [P-1] https://www.hvdfonts.com/fonts/brandon-grotesque , https://www.hvdfonts.com/licenses/web , https://shop.hvdfonts.com/products/fabweb (11/10/2026)
- [P-2] https://www.fontspring.com/fonts/hvd-fonts/brandon-grotesque , https://www.fontspring.com/web-fonts , https://www.fontspring.com/enterprise (11/10/2026)
- [P-3] https://www.myfonts.com/collections/brandon-grotesque-font-hvd-fonts/ (11/10/2026)
- [P-4] https://fonts.adobe.com/fonts/brandon-grotesque (11/10/2026)
- [P-5] https://helpx.adobe.com/fonts/web/font-licensing/font-licensing.html , https://helpx.adobe.com/fonts/web/using/plan-limits.html , https://helpx.adobe.com/fonts/using/subscription-types.html (11/10/2026)
- [P-6] https://www.adobe.com/privacy/policies/adobe-fonts.html et https://community.adobe.com/questions-438/gdpr-and-adobe-fonts-738351 (11/10/2026)
- [P-7] https://fonts.google.com/specimen/Josefin+Sans et https://github.com/googlefonts/josefinsans (11/10/2026)
- [P-8] https://fonts.google.com/specimen/Jost , https://github.com/indestructible-type/Jost , https://indestructibletype.com/BuyJost.html (11/10/2026)
- [P-9] https://www.theleagueofmoveabletype.com/league-spartan et https://github.com/theleagueof/league-spartan (11/10/2026)
- [P-10] https://www.fontsquirrel.com/license/glacial-indifference (11/10/2026)
- [P-11] https://fonts.google.com/specimen/Poppins/license (11/10/2026)
- [P-12] https://fontalternatives.com/fonts-like/brandon-grotesque/ (comparateur tiers, 11/10/2026)

---

## 7. Dépenses hors technique : fourchettes 2026

| Poste | Fourchette | Calcul pour ce projet | Fiabilité |
|---|---|---|---|
| **Relecture (correction) par un rédacteur américain natif** | Grille 2026 de l'Editorial Freelancers Association : correction de textes « business / marketing » à **3,0 à 4,0 cents par mot** [X1] | 5 000 mots : **150 à 200 $** ; 10 000 mots : **300 à 400 $** | Grille indicative, réponses de plus de 1 100 membres [X1] |
| **Adaptation ou réécriture (« transcréation »)** | 30 à 75 $ de l'heure, ou 60 $ de l'heure et plus ; traduction FR→EN 0,10 à 0,14 $ par mot source selon une agence [X2] | Traduction-adaptation de 5 000 à 10 000 mots : environ **500 à 1 400 $** | Guides d'agences (partiel) |
| **Rédaction par un copywriter américain** | Moyennes de 0,42 $ à 0,70 $ par mot ; un site complet entre 2 000 et 10 000 $ [X3] | 5 000 à 10 000 mots : **2 100 à 7 000 $** | Sources commerciales qui se citent entre elles (partiel) |
| **Relecture juridique : CGV e-commerce, mentions légales, politique de confidentialité, par un avocat en France** | CGV e-commerce : forfaits de cabinets de **600 à 1 300 € HT** ; guide : CGV pour particuliers 1 500 à 3 000 € HT, **CGV + CGU + confidentialité 2 500 à 5 000 € HT** ; taux horaire 200 à 400 € HT [X4] | Comme on part des textes existants de la boutique, une relecture devrait coûter moins qu'une rédaction. Fourchette prudente : **800 à 3 000 € HT** (déduction) | Pages commerciales de cabinets (partiel) ; un cabinet lyonnais en fait partie [X4] |
| **Journée de photographe mobilier / packshot à Lyon** | Profils Malt : **450 à 500 € par jour** (packshot, dont un photographe ayant travaillé pour un fabricant de meubles), jusqu'à **1 200 € par jour** pour un profil architecture et publicité ; retouche et cession de droits en plus [X5] | 1 à 2 jours pour les pièces les plus chères : **450 à 2 400 € HT** avant retouche et droits | Tarifs affichés sur les profils (partiel) |

**Sources de la rubrique 7** (toutes consultées le 11/10/2026) :

- [X1] https://www.the-efa.org/2026-editorial-rate-chart/ et https://www.the-efa.org/wp-content/uploads/2026/03/2026-Rate-Chart.pdf (11/10/2026)
- [X2] https://milengo.com/knowledge-center/translation-rates-guide/ et https://translated.com/resources/professional-translation-cost-2026-guide (11/10/2026)
- [X3] https://bestwriting.com/content-writing-rates et https://www.sidestackers.com/blog/copywriter-rates (11/10/2026)
- [X4] https://www.captaincontrat.com/contrats-commerciaux-cgv/cgv-cgu-cga/combien-coute-redaction-cgv , https://www.kyros.legal/blog/cout-avocat-droit-commercial , https://halt-avocats.fr/project/avocat-cgv-cgu/ , https://www.avocat-rainio.com/--obtenir-des-conditions-generales-et-vente-et-ou-d-utilisation.html , https://www.swim.legal/blog/avocat-cgv-guide-pratique-securiser-conditions-generales-vente (11/10/2026)
- [X5] https://en.malt.fr/profile/kelianmons , https://en.malt.fr/profile/freddiebarbera , https://www.malt.fr/profile/lauralyson , https://www.malt.com/profile/yanisourabah (11/10/2026)

---

## 8. Registre public du domaine nathalierives.com (lecture seule)

| Élément | Résultat |
|---|---|
| Bureau d'enregistrement (registrar) | **Non vérifié.** Lecture de https://rdap.org/domain/nathalierives.com et de https://www.whois.com/whois/nathalierives.com impossible le 11/10/2026 (erreur `ENOTFOUND`) ; aucun résultat dans les moteurs de recherche |
| Serveurs DNS | **Non vérifié** (même raison) |
| Hébergeur apparent | **Non vérifié.** D'après le brief : WordPress 5.4 (thème Salient, PHP 7.0) et PrestaShop sous `/galerie/`. Les adresses indexées le confirment (`/category/presse-magazine/`, titres « … Archives - Nathalie Rives ») [R1] |
| Qui contacter | La page contact du site crédite le développement et le webmastering à un prestataire externe (deux personnes, liées à `prakt.co` et `crealp.fr`), d'après un instantané d'environ 540 jours, donc peut-être plus à jour [R1]. C'est vraisemblablement lui qui détient l'accès au registrar et au DNS. À confirmer |
| À faire (par le fils, depuis un navigateur ordinaire) | Ouvrir https://rdap.org/domain/nathalierives.com ou https://lookup.icann.org et noter le registrar, les serveurs DNS et la date d'expiration. Puis demander au prestataire la liste des enregistrements DNS, en particulier MX, SPF et DMARC, avant toute modification |

**Sources de la rubrique 8** (consultées le 11/10/2026) :

- [R1] https://www.nathalierives.com/ , http://www.nathalierives.com/contact/ , https://www.nathalierives.com/category/presse-magazine/ (vus via les résultats de recherche, 11/10/2026)

---

## Tableau de synthèse des coûts : combinaison recommandée

| Service | Rôle | Prix / mois | Offre gratuite (limites clés) | Usage commercial en gratuit | Données | Comment on en sort |
|---|---|---|---|---|---|---|
| Cloudflare Pages ou Workers (Free) | Héberger le site et faire tourner les formulaires | 0 € | 500 builds/mois (Pages) ou 3 000 min (Workers), 20 min par build ; 20 000 fichiers ; 25 Mio par fichier ; 100 000 requêtes de fonctions par jour | Pas d'interdiction trouvée (partiel) | États-Unis / mondial | Site statique dans Git, redéployable ailleurs |
| Cloudflare Access | Aperçu privé | 0 € | 50 utilisateurs | idem | idem | On désactive la règle |
| Sveltia CMS et son authentificateur (Worker) | Interface d'édition | 0 € | sans objet (logiciel libre) | Oui | Tout est dans le dépôt Git | Rien à exporter |
| GitHub (dépôt privé, Free) | Stockage du contenu et des photos | 0 € | Dépôt sous 1 à 5 Go conseillé ; 100 Mio max par fichier | Oui | États-Unis (non vérifié) | `git clone` |
| Brevo Free | Emails de notification et de confirmation, liste newsletter | 0 € (Starter 9 $ si besoin) | 300 emails/jour | Pas de restriction trouvée | UE | Export des contacts (non vérifié) |
| Cloudflare Web Analytics | Mesure d'audience sans cookies | 0 € | Trafic illimité | Oui | Cloudflare | Non vérifié |
| Police OFL hébergée avec le site | Titres et libellés | 0 € | sans objet | Oui (OFL) | Aucune donnée envoyée | Fichiers dans le dépôt |
| **Total mensuel** | | **0 €** (option confort Workers Paid : 5 $) | | | | |

Dépenses ponctuelles hors technique (fourchettes de la rubrique 7) :

- relecture de l'anglais : 150 à 400 $, ou 500 à 1 400 $ pour une adaptation ;
- relecture juridique : 800 à 3 000 € HT ;
- photographe : 450 à 1 200 € par jour ;
- licence Brandon : sur devis HVD.

---

## Points « non vérifié » (liste complète)

1. Registrar, serveurs DNS et hébergeur de nathalierives.com (WHOIS et RDAP inaccessibles).
2. Usage commercial de l'offre gratuite Cloudflare : aucune interdiction trouvée, mais le texte intégral du Self-Serve Subscription Agreement n'a pas été lu.
3. Prix de GitHub Pro (nécessaire pour GitHub Pages sur un dépôt privé) et lieu de stockage des données GitHub.
4. Prix annuels : Cloudflare Workers Paid, Netlify, Plausible (montant exact), Pirsch.
5. Limites Netlify : durée max d'un build et taille max officielle d'un fichier. Limites Vercel Hobby : nombre de fichiers et taille max.
6. Obligation d'une carte bancaire pour l'offre gratuite Cloudflare Zero Trust (Access) : seulement rapportée sur un forum.
7. Sveltia : édition des champs FR/EN côte à côte (le bilingue natif est vérifié, pas l'affichage côte à côte) ; verrouillage de branche possible sur un dépôt privé gratuit ; maintien de la version précédente en ligne si une fabrication échoue.
8. Decap : édition côte à côte, aperçu et workflow éditorial revérifiés en 2026 ; lieu des données de Decap Turbo ; ouverture réelle de Turbo (liste d'attente ou accès public).
9. Keystatic : bilingue côte à côte, aperçu avec Astro, compatibilité avec les fonctions Cloudflare, date exacte de la version 0.6.9.
10. Pages CMS : traitement des images, date exacte de la version 2.1.8, lieu du cache de l'application en ligne.
11. TinaCMS : bilingue, traitement des images, prix (deux grilles différentes trouvées).
12. CloudCannon : éditrice sans compte GitHub, détail du bilingue, utilisation sur téléphone.
13. Usage commercial des offres gratuites Resend, Brevo, Postmark, Web3Forms et Umami Cloud (aucune clause trouvée, ni pour ni contre).
14. Logo Brevo dans les emails transactionnels de l'offre gratuite.
15. Réponse automatique au visiteur chez Formspree et Web3Forms : domaine d'envoi et choix de la langue.
16. Obligation d'avoir le DNS chez Cloudflare pour déclarer un domaine d'envoi dans Cloudflare Email Service.
17. Événements personnalisés de Cloudflare Web Analytics (non documentés) et export des données.
18. Export des données : Plausible, Umami, GoatCounter, Pirsch, Fathom, contacts Brevo.
19. Conditions actuelles de GoatCounter (page de 2020).
20. Prix de la licence web Brandon Grotesque chez HVD, Fontspring et MyFonts (paliers de pages vues).
21. Prix en France du moins cher des abonnements Adobe qui incluent Adobe Fonts pour le web.
22. Hauteur d'x réelle des polices libres proposées, à mesurer dans les fichiers.
23. Coût de la relecture d'avocat pour des CGV existantes (les sources chiffrent surtout la rédaction).
24. Netlify Image CDN : coût par transformation.
25. Temps de fabrication Astro avec environ 1 000 photos sur Cloudflare (2 processeurs virtuels, limite de 20 minutes), à tester.
