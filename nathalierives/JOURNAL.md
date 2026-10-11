# Journal : refonte de nathalierives.com

Pour reprendre dans une nouvelle conversation, écrire « reprends ». Claude relit alors `BRIEF.md` et ce journal, puis continue.

---

## Où on en est

**Étape 0, mise en route (11 octobre 2026).** Le brief est enregistré et ce journal est ouvert. Les questions de départ sont posées, et j'attends les réponses.

L'exploration (étape vers l'arrêt 1) est **bloquée** pour deux raisons :
1. Les quatre études (`etudes/1` à `4`) ne sont pas dans le dépôt. Je les ai cherchées sur toutes les branches.
2. L'environnement de travail n'a pas le droit d'aller sur nathalierives.com : la politique réseau refuse l'adresse. Les sites de référence et Google Fonts sont bloqués aussi. Seuls les gestionnaires de paquets passent (npm, pypi).

## Ce qui est décidé, et pourquoi

| Date | Décision | Pourquoi |
|---|---|---|
| 11/10 | Le projet vit dans le dossier `nathalierives/` du dépôt BapteOL1, sur la branche `claude/token-usage-last-year-3vhbjw`, en attendant un dépôt dédié (question Q3). | C'est la seule branche où j'ai le droit de travailler. Le reste du dépôt est un autre projet (Settle). |
| 11/10 | La charte « Settle » du fichier `CLAUDE.md` à la racine ne s'applique pas à ce site. | Elle concerne un autre produit. Le brief fixe l'identité de Nathalie Rives. |
| 11/10 | Technique pressentie : site statique Astro, contenu dans des fichiers, interface d'édition Sveltia CMS (gratuite, dans le navigateur), hébergement Cloudflare Pages. À confirmer à l'arrêt 1 avec le tableau des coûts. | C'est la préférence du brief. Pas de serveur à entretenir, et un coût proche de zéro. Rien de ce que j'ai vu ne justifie une autre voie. |
| 11/10 | Aucun recours au site en ligne par un autre chemin (copie d'archive, cache) sans accord. | Le brief demande de lire le vrai site ; une archive pourrait être périmée. |

## Ce que j'attends de toi et ce que ça bloque

Voir la section « Questions » plus bas. Les éléments bloquants en premier :
- Q1 : déposer les 4 études. Bloque l'exploration et l'arrêt 1.
- Q2 : ouvrir l'accès réseau. Bloque l'exploration et l'arrêt 1.

## Questions

### Pour toi

| # | Question | Bloque |
|---|---|---|
| Q1 | Déposer les 4 fichiers d'études dans `nathalierives/etudes/` | exploration, arrêt 1, prix |
| Q2 | Autoriser nathalierives.com et les sites de référence dans les réglages réseau de l'environnement | exploration, arrêt 1, arrêt 2 |
| Q3 | Dépôt dédié au site, ou sous-dossier ici ? | arrêt 3 (branchement de l'édition et de l'hébergement) |
| Q4 | Photos originales HD : où sont-elles ? | arrêt 2 (directions), arrêt 4 |
| Q5 | Fichiers d'origine du logo et du monogramme | arrêt 2 |
| Q6 | Qui gère le nom de domaine, l'hébergement et les emails ? | arrêt 5 (je cherche dans les registres publics dès que le réseau le permet) |
| Q7 | Qui met le site à jour, sur quel appareil ? | arrêt 3 |
| Q8 | Plafond mensuel en euros | arrêt 1 (tableau des coûts) |
| Q9 | Ton adresse email de test | arrêt 3 (envoi des formulaires) |
| Q10 | Régime de TVA : sur la marge, ou TVA normale ? Comment passer du prix TTC au prix export ? | tout prix en dollars (arrêt 4) |
| Q11 | Référence de la peinture bleue de la devanture | arrêt 2 |
| Q12 | Outil d'envoi de la newsletter | arrêt 3 |
| Q13 | Adresse, téléphone et horaires officiels ; nom de la société qui vend ; adresse email par type de demande | arrêt 3 |
| Q14 | Le studio a-t-il un abonnement Adobe Creative Cloud ? (Brandon y est peut-être incluse pour le web) | arrêt 2 (police) |
| Q15 | Photos d'origine du projet de l'île Saint-Louis (Elle Décoration) | lot projets, après l'arrêt 4 |

### Pour Nathalie

| # | Question | Bloque |
|---|---|---|
| N1 | Contenus pilotes : voir `docs/a-fournir-contenus-pilotes.md` | arrêt 3 |
| N2 | Pour quoi la galerie est-elle connue ? (designers, époques, types de pièces) | textes d'accueil, arrêt 3 |
| N3 | Les promesses du site, chacune à valider (délai de réponse, réservation, délais de livraison, retours, paiement, remise aux pros, recâblage, règlement des droits) | arrêt 3 (en attendant, formules sans chiffre) |
| N4 | Faits du brouillon anglais à confirmer : galerie ouverte en 2015 ? études ? débuts à New York ? | textes Studio et Presse |
| N5 | Droits de douane : compris dans sa facture, ou payés au transporteur ? | mention sur les fiches anglaises |
| N6 | Qui répond en anglais, nommément ? | fiches anglaises, page To the Trade |
| N7 | Fusion des entrées de projets (La Tour Rose, Château La Gallée, MiHotel, Zermatt, Balthazar) | après l'inventaire, arrêt 1 |

## Ce qui reste à faire (dans l'ordre)

1. [ ] Recevoir Q1 et Q2, puis explorer : vérifier l'API WordPress, lire la boutique par ses catégories, et dresser l'inventaire (pièces, projets, presse, designers, PDF, adresses anciennes).
2. [ ] Regarder les sites de référence.
3. [ ] **Arrêt 1** : inventaire, ce qui disparaît, plan du site et menu, choix technique, tableau des coûts, comptes à ouvrir.
4. [ ] **Arrêt 2** : deux directions de design, logo, police.
5. [ ] **Arrêt 3** : socle bilingue sur une adresse d'aperçu privée, interface d'édition, mode d'emploi v1.
6. [ ] **Arrêt 4** : lot luminaires migré.
7. [ ] Autres lots.
8. [ ] **Arrêt 5** : vérification, bascule, redirections, feuille de test.

## Travail commencé sans attendre

- [x] Brief enregistré (`BRIEF.md`)
- [x] Liste des contenus pilotes pour Nathalie (`docs/a-fournir-contenus-pilotes.md`)
- [ ] Squelette technique : Astro bilingue (FR à la racine, EN sous /en/), modèle de fiche pièce et projet, fichier de réglages des prix, fichier des promesses, formulaires qui fonctionnent sur ma machine sans rien envoyer
- [ ] Moteur de calcul des prix (droits par type, forfaits « estimation / confirmé », règles d'affichage), avec ses tests. Les lignes de frais attendent l'étude 3.
