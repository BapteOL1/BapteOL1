# Choix technique, comptes et coûts

> Les prix viennent de `notes/recherche-technique-couts.md`, relus sur les
> pages officielles le 11 octobre 2026 (131 chiffres vérifiés, 33 corrigés
> par rapport à la première recherche). Ils changent : revérifier avant
> d'ouvrir un compte payant. Les prix ne précisent pas toujours la TVA.

## En une phrase

Un site **statique** (des pages fabriquées à l'avance, servies telles
quelles, sans serveur à entretenir), fait avec **Astro**, hébergé
gratuitement chez **Cloudflare**, mis à jour par le studio avec une petite
interface d'édition dans le navigateur (**Sveltia CMS**), et des formulaires
qui envoient leurs emails par **Brevo**. Coût technique : **0 € par mois**
au départ.

Je confirme ta préférence pour un site statique. Je n'ai pas trouvé de voie
meilleure. Une boutique Shopify ou un WordPress neuf coûteraient chaque mois
et demanderaient des mises à jour, pour des fonctions (panier, comptes) que
le brief écarte.

## Comment ça marche, en mots simples

```
 La personne du studio            Le dépôt (GitHub)            Le site (Cloudflare)
 ──────────────────────           ─────────────────            ────────────────────
 ouvre l'interface d'édition  →   chaque fiche est un     →    le site est refabriqué
 dans son navigateur,             fichier texte ; chaque       en quelques minutes et
 remplit la fiche FR/EN,          changement est une           mis en ligne. Si la
 dépose ses photos                version qu'on peut           fabrication échoue,
 (réduites automatiquement)       annuler                      l'ancienne version reste
```

Les formulaires (question, réservation, devis, démarrer un projet,
newsletter) passent par une petite fonction chez Cloudflare. Elle écarte les
robots grâce à un champ piège invisible, puis envoie deux emails par Brevo :
un au studio, un de confirmation au visiteur, dans sa langue. **Jusqu'à la
bascule, les deux arrivent à ton adresse, et nulle part ailleurs.**

## Ce que verra la personne du studio

1. Elle ouvre `www.nathalierives.com/admin/` dans son navigateur, sur
   ordinateur ou sur téléphone, et clique sur « Se connecter avec GitHub ».
2. Elle voit des listes : **Pièces**, **Projets**, **Presse**, **Réglages**
   (taux de change, droits, forfaits), **Engagements** (ce que le site
   promet), **Coordonnées**.
3. Une pièce, c'est un formulaire avec des cases : référence, titre,
   designer, niveau d'attribution (liste déroulante), époque, matières,
   dimensions en cm (les pouces sont calculés), état, restaurations, prix
   TTC, prix export, type douanier (liste), taille d'envoi (liste), statut
   (disponible / réservée / vendue)… avec un onglet **Français** et un onglet
   **English** côte à côte.
4. Elle dépose ses photos de téléphone telles quelles, même au format HEIC
   des iPhone. Elles sont converties et réduites à 2 400 px au moment de
   l'envoi, sans recadrage.
5. Elle voit un aperçu, puis clique sur « Publier ». Le site est à jour en
   quelques minutes.
6. Pour passer une pièce en « Vendu », elle ouvre la fiche, change le statut,
   et publie.

**Pourquoi elle ne peut rien casser :**
- elle ne touche jamais au code, seulement aux cases prévues ;
- chaque case est contrôlée : un prix doit être un nombre, une liste
  n'accepte que ses choix ;
- si une fiche était quand même incohérente, la fabrication du site
  s'arrêterait et **la version en ligne resterait celle d'avant** ;
- toute modification est gardée dans l'historique et peut être annulée.

*Une limite honnête :* sur un dépôt privé gratuit, GitHub ne permet pas de
verrouiller le dépôt lui-même. Une personne invitée pourrait donc, en
allant volontairement sur github.com, modifier un fichier à la main. Dans
l'interface d'édition, en revanche, elle ne peut rien casser.

**Le compte qu'il lui faut :** un compte GitHub gratuit, ouvert avec son
email professionnel, invité sur le dépôt du site avec le droit d'écrire. GitHub est le service qui
range les fichiers du site et garde leur historique. *Si ce compte pose
problème, l'alternative est Pages CMS, avec une invitation par email. Mais
elle ne gère pas nativement les deux langues, ne réduit pas les photos et
oblige à des cases « titre FR / titre EN ».*

## Les choix à valider

### 1. Où héberger le site, et comment brancher le domaine le jour de la bascule

| Option | Coût / mois | Ce que ça change le jour de la bascule | Pour l'équipe | Mon avis |
|---|---|---|---|---|
| **A. Cloudflare Pages, le DNS reste chez Gandi** | 0 € | Deux réglages chez Gandi : `www` pointe vers Cloudflare ; l'adresse sans « www » est redirigée vers `www` par la redirection web de Gandi (HTTPS compris). **Les réglages des emails ne bougent pas.** | Rien | **Recommandé** : respecte ta règle « on ne change que le réglage du site » |
| B. Cloudflare, le DNS passe chez Cloudflare | 0 € | On recopie tous les réglages du domaine chez Cloudflare (dont ceux des emails), puis on change les « serveurs DNS » chez Gandi. Plus de possibilités (images, sécurité), mais un oubli coupe les emails | Rien | Seulement si A bloque |
| C. Netlify | environ 9 $ | Comme A, sans passer par la redirection de Gandi | Chaque publication consomme des crédits : environ 60 publications par mois en Personal | Plus cher, sans gain réel |

Vercel (offre gratuite) et GitHub Pages sont écartés : leurs conditions
interdisent un site commercial.

### 2. L'interface d'édition

| Option | Coût | Compte pour l'éditrice | Deux langues | Photos de téléphone | Mon avis |
|---|---|---|---|---|---|
| **Sveltia CMS** | 0 € | GitHub (gratuit) | oui, natif | converties et réduites à l'envoi (HEIC compris) | **Recommandé** |
| Pages CMS | 0 € | invitation par email | non (deux cases par texte) | non : originaux lourds | Repli si le compte GitHub bloque |
| Decap CMS | 0 € | GitHub, ou Decap Turbo (bêta) | oui | oui, sauf HEIC | Plus ancien, moins pratique sur téléphone |

[Probable] Sveltia est encore en version « bêta » (la 1.0 est annoncée pour
fin 2026), mais une version sort chaque semaine (0.234.0 le 11/10/2026). Le
français et l'anglais s'éditent côte à côte (vérifié). Le risque est faible : le
contenu reste dans de simples fichiers, et Decap lit les mêmes réglages. On
pourrait donc changer d'interface sans rien perdre.

### 3. Les emails des formulaires

**Brevo, offre gratuite** : 300 emails par jour, données en Europe, usage
professionnel prévu par ses conditions. Brevo valide le compte avant le
premier envoi. Les emails de l'offre gratuite portent la mention « Sent with
Brevo » [à vérifier sur un envoi de test pour les emails de confirmation].
La retirer coûte 15 € par mois (offre Standard). Pour que la confirmation
au visiteur parte d'une adresse du studio sans finir en indésirable, il
faudra **ajouter trois ou quatre lignes dans les réglages du domaine chez
Gandi**. Ce sont des ajouts : rien n'est remplacé, les emails
du studio ne sont pas touchés. Ce n'est pas le réglage du site : **j'ai
besoin de ton accord**. Sans ces lignes, Brevo envoie quand même, mais
depuis une adresse à lui, et les emails arrivent moins bien.

Jusqu'à la bascule, rien de tout cela n'est nécessaire : tout part vers ton
adresse de test.

### 4. La newsletter

[Probable] Elle est aujourd'hui envoyée par une extension de WordPress
(« Newsletters »). Elle s'arrêtera avec l'ancien site. Proposition : la
liste des abonnés passe dans Brevo, gratuit jusqu'à 300 emails par jour. Au-delà
(plus de 300 abonnés à écrire le même jour), il faut l'offre Starter, autour de
9 $ par mois, ou un envoi en deux jours. **Question : combien d'abonnés, et
quel outil exactement ?** (T11)

### 5. La police

Une police libre, hébergée avec le site (0 €, aucune donnée envoyée à un
tiers), montrée à côté de Brandon à l'arrêt 2.

**Garder Brandon est bon marché** : chez son créateur, HVD Fonts, la licence
web coûte **35 € par style, en achat unique**, jusqu'à 20 000 pages vues
par mois (220 € la famille complète). Il en faudrait 2 à 4 styles, soit
70 à 140 €. À comparer à Adobe Fonts : abonnement à 11,99 € TTC par mois au
minimum, au nom du studio, qui envoie l'adresse des visiteurs à Adobe. Sur
MyFonts, la licence est à durée limitée. **Ma recommandation : la licence
HVD**, si l'arrêt 2 montre que Brandon, bien utilisée, sert mieux son
identité que la police libre.

### Le reste, sans choix à faire

- **Mesure d'audience** : Cloudflare Web Analytics, gratuit, sans cookie.
  Visites par langue (adresses en `/en/` ou non) ; demandes envoyées =
  visites des pages « merci » (l'outil ne compte pas encore d'autres
  événements). À régler : choisir « Enable Globally », sinon les visiteurs
  européens ne sont pas comptés.
- **Recherche** : Pagefind, un moteur de recherche fabriqué avec le site,
  gratuit, sans service extérieur.
- **Aperçu privé (arrêt 3)** : une adresse Cloudflare protégée par Cloudflare
  Access (gratuit jusqu'à 50 personnes, code reçu par email) et interdite
  aux moteurs de recherche. Cloudflare demande une carte bancaire pour
  activer Access, même gratuit.
- **Paiement en ligne** : rien n'est construit, seulement un champ « lien
  de paiement » par pièce. Les conditions gratuites de Cloudflare interdisent
  de collecter soi-même des numéros de carte : un lien vers un service de
  paiement extérieur reste permis.
- **Photos** : les photos du site sont rangées avec lui, en WebP de 2 400 px
  au plus (qualité 88). Le site fabrique les tailles plus petites. Les
  originaux restent au studio : Drive ou disque.
- **Fiche PDF** : une mise en page d'impression de la fiche, avec ou sans
  prix (le brief l'autorise). Aucun service payant.

## Les comptes à ouvrir, dans l'ordre

Tous au nom du studio, avec une adresse email du studio. **C'est toi qui les
ouvres** ; je te donnerai les gestes un par un au moment voulu.

| # | Service | À quoi il sert | Prêt pour | Coût | Propriétaire |
|---|---|---|---|---|---|
| 1 | **GitHub** (une « organisation » au nom du studio) | ranger le site et son historique ; se connecter à l'interface d'édition | **avant l'arrêt 3** | 0 € | le studio |
| 2 | **Cloudflare** | héberger l'aperçu puis le site, protéger l'aperçu, mesurer l'audience | **avant l'arrêt 3** | 0 € (carte bancaire demandée pour activer la protection de l'aperçu, sans débit) | le studio |
| 3 | **Brevo** | envoyer les emails des formulaires, puis la newsletter | **avant l'arrêt 3** (pour tester l'envoi réel ; Brevo valide le compte avant le premier envoi) | 0 € | le studio |
| 4 | Un compte GitHub par personne qui édite | se connecter à l'interface | **avant l'essai de l'arrêt 3** | 0 € | chaque personne |
| 5 | Accès au compte **Gandi** (déjà existant) | les deux réglages de la bascule | **arrêt 5** | déjà payé | à identifier (T5) |

## Tableau de tous les coûts

### Chaque mois

| Service | À quoi il sert | Prix / mois | Ce que l'offre gratuite permet (usage commercial compris) | Comment on en sort |
|---|---|---|---|---|
| Cloudflare Pages | héberger le site, les formulaires | **0 €** | 500 mises en ligne par mois, trafic illimité, 100 000 envois de formulaire par jour, 20 000 fichiers ; usage commercial : aucune interdiction trouvée | le site est un dossier de fichiers : on le dépose ailleurs (Netlify…) en une heure |
| Cloudflare Access | protéger l'aperçu | **0 €** | jusqu'à 50 personnes ; carte bancaire demandée à l'activation ; 7 $ par personne au-delà | on l'éteint |
| Cloudflare Web Analytics | compter les visites sans cookie | **0 €** | sans limite connue | on retire une ligne du site |
| GitHub | ranger le site, se connecter | **0 €** | dépôts privés illimités, 2 000 minutes de fabrication par mois | on télécharge le dépôt, il contient tout |
| Sveltia CMS | interface d'édition | **0 €** | logiciel libre | on le remplace par Decap, qui lit les mêmes réglages |
| Brevo | emails des formulaires et newsletter | **0 €** | 300 emails par jour ; mention « Sent with Brevo » dans les emails ; usage professionnel prévu | export des contacts en CSV |
| Pagefind | recherche | **0 €** | logiciel libre | — |
| **Total technique** | | **0 €** | | |
| *Options* | Cloudflare Workers Paid si l'on dépasse les limites | *5 $* | | |
| | Brevo Starter si la newsletter dépasse 300 envois par jour | *7 €* | | |
| | Brevo Standard pour retirer « Sent with Brevo » | *15 €* | | |

**Hors de ce total, déjà payés aujourd'hui :** le nom de domaine et les
boîtes email chez Gandi, qui restent. Et **l'hébergement OVH de l'ancien
site, qui pourra être résilié** un mois après la bascule : c'est une
économie.

### Une fois

| Dépense | Fourchette | Commentaire |
|---|---|---|
| Relecture des textes anglais par un rédacteur américain | 100 à 300 $ (correction finale, 2 à 3 cents le mot) ; 150 à 400 $ (révision, 3 à 4 cents) ; 500 à 1 400 $ (adaptation) | 5 000 à 10 000 mots selon le nombre de fiches traduites au lancement |
| Relecture juridique (conditions de vente, mentions légales, confidentialité) | 600 à 1 300 € HT pour les conditions de vente ; 2 500 à 5 000 € HT pour les trois | brouillons fournis à partir des textes actuels de la boutique |
| Licence web de la police Brandon | **70 à 140 €**, en achat unique (HVD Fonts, 35 € par style, 2 à 4 styles) ; 0 € avec une police libre | à décider à l'arrêt 2 |
| Photos à refaire | 450 à 1 200 € par journée de photographe à Lyon | [Estimation] environ 30 à 40 pièces par jour avec le guide photo ; à commencer par les 30 plus chères (liste dans l'inventaire). Ou bien l'équipe, avec le guide, pour 0 € |

## Ce qui dépend du nom de domaine (premier relevé, à compléter avant la bascule)

Relevé dans les registres publics le 11 octobre 2026 :

| Élément | Valeur actuelle | Touché par la bascule ? |
|---|---|---|
| Bureau d'enregistrement | **Gandi SAS**, depuis le 12/06/2012 ; renouvellement avant le **12/06/2027** ; transfert verrouillé | non |
| Serveurs DNS | Gandi (`ns-224-a`, `ns-230-c`, `ns-239-b.gandi.net`) | non (option A) |
| Site (`www` et adresse nue) | `51.91.236.193` : un serveur OVH, Apache, PHP 7.0 ; l'adresse nue redirige vers `www` | **oui : seuls ces deux réglages changent** |
| Emails (MX) | Gandi Mail (`spool.mail.gandi.net`, `fb.mail.gandi.net`) | non |
| Anti-usurpation (SPF) | `v=spf1 include:_mailcust.gandi.net ?all` | non ; on y **ajoute** Brevo si tu l'acceptes |
| DKIM, DMARC | aucun trouvé | Brevo en demandera (ajouts) |
| Adresses connues | contact@nathalierives.com ; presse confiée à une agence extérieure | non |

À faire à l'arrêt 5 avec la personne qui a l'accès Gandi : exporter la
liste complète des réglages DNS (Gandi le permet en un clic) et la garder
avec la copie de l'ancien site.
