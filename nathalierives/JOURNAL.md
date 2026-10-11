# Journal du projet : refonte de nathalierives.com

Écrit en français simple. Le plus récent en haut de chaque rubrique.
Pour reprendre dans une nouvelle conversation : écrire « reprends ». Je
relis `BRIEF.md`, ce journal et `QUESTIONS.md`, puis je continue.

## Où on en est

**Étape 1 : exploration, en cours** (11 octobre 2026, soir).

```
Projet   [██░░░░░░░░░░░░░░░░░░]  ~10 %
Arrêt 1  [██████████████░░░░░░]  ~70 %   inventaire de la boutique en cours
```

- L'accès réseau est ouvert depuis le 11/10 : le site, son API WordPress et
  la boutique répondent.
- Inventaire WordPress fait : `arret-1/inventaire.md` et les tableaux dans
  `inventaire/`.
- Inventaire de la boutique (185 pièces) : lecture lente en cours, avec
  `outils/boutique_inventaire.py`. Si la conversation s'arrête, relancer :
  `python3 -I outils/boutique_inventaire.py inventaire/brut`, puis
  `python3 -I outils/inventaire_boutique.py inventaire/brut inventaire` et
  `python3 -I outils/redirections.py inventaire arret-1/redirections-brouillon.csv`.
- Faits : plan du site et menu (`arret-1/plan-du-site.md`), ce qui disparaît
  et les exports à faire soi-même (`arret-1/ce-qui-disparait.md`), brouillon
  du choix technique et des coûts (`arret-1/technique-et-couts.md`).
- Fait sans attendre : le calcul des prix pour les États-Unis
  (`site/src/lib/prix.ts`, 14 tests), le fichier unique de réglages
  (`site/src/donnees/reglages-prix.yaml`) et celui des engagements
  (`site/src/donnees/engagements.yaml`).
- En cours : étude des sites de référence dans un vrai navigateur
  (`notes/references/`), revérification des prix des services sur les
  pages officielles (`notes/recherche-technique-couts.md`).

### Toujours bloqué
- **Les quatre études** (`etudes/`) n'ont pas été fournies (T2). La formule
  du prix livré suit le plan, à titre provisoire. Rien de ce qui en dépend
  ne s'affiche tant que les forfaits ne sont pas « confirmés ».

## Ce qui est décidé, et pourquoi

- **11/10 — Calcul des prix : règles du brief codées et testées.** Pas de
  dollars sans règle de TVA, taux de change et validation de Nathalie ;
  jamais de conversion du TTC ; droits toujours chiffrés ou « sur demande » ;
  pas de total livré tant qu'un forfait n'est pas « confirmé ». Pourquoi
  maintenant : ça ne dépend d'aucune réponse, et c'est la partie la plus
  risquée.
- **11/10 — Référence des pièces : le numéro de la boutique actuelle**
  (ex. 1095), faute de référence saisie (aucune fiche n'en a). Il sert aussi
  aux redirections. À confirmer avec Nathalie si elle a son propre registre.
- **11/10 — Domaine : le DNS reste chez Gandi** (option A proposée).
  Pourquoi : Gandi sait rediriger l'adresse sans « www » en HTTPS. Le jour de
  la bascule, on ne change que les deux réglages du site, pas ceux des
  emails. À valider à l'arrêt 1.
- **11/10 — Le projet vit dans le dossier `nathalierives/`** de ce dépôt,
  sur la branche `claude/nathalierives-redesign-syc71o`. Pourquoi : le dépôt
  contient déjà un autre projet (l'application Settle). Le site déménagera
  dans un dépôt à lui, au nom du studio, avant l'aperçu (arrêt 3).
- **11/10 — La charte graphique Settle ne s'applique pas ici.** Le
  `CLAUDE.md` racine vise Settle ; une ligne y renvoie vers ce projet.
- **11/10 — Technique : un site statique fait avec Astro**, hébergé chez
  Cloudflare, édité avec Sveltia CMS, emails par Brevo (détails et options
  dans `arret-1/technique-et-couts.md`, à valider à l'arrêt 1).
- **11/10 — Formule du prix livré** : l'étude 3 fera foi. En attendant,
  celle du calculateur du plan, sans ce que le brief écarte (Shopify,
  « droits compris »).

## Ce que j'attends de toi

Voir `QUESTIONS.md`. Toujours en attente : **T2** (les études), puis T3 à
T13. **T5 a une réponse partielle** : le domaine et les emails sont chez
Gandi, le site chez OVH ; il reste à savoir qui a l'accès au compte Gandi.

## Questions pour Nathalie

Voir `QUESTIONS.md` (N1 à N5), `a-fournir/contenus-pilotes.md`, et les
regroupements de projets dans `arret-1/inventaire.md`.

## Ce qui reste à faire

### Arrêt 1
- [x] Revérifier l'API WordPress et partir des pages de catégories.
- [x] Inventaire WordPress : projets, presse, PDF, pages, crédits.
- [ ] Inventaire de la boutique : pièces, designers nommés, titres à
      vérifier, pièces à rephotographier, types douaniers et tailles proposés.
- [ ] Table de redirection (brouillon) avec les pièces.
- [x] Registre public du domaine.
- [x] Plan du site et menu ; ce qui disparaît ; exports.
- [ ] Sites de référence (en cours) ; prix revérifiés (en cours).
- [ ] Compte rendu de l'arrêt 1.

### Plus tard
- [ ] Modèle des fiches dans l'interface d'édition (arrêt 3).

## Historique

- **11/10/2026, soir** — Accès réseau ouvert. Inventaire WordPress, registre
  du domaine, plan du site, ce qui disparaît, calcul des prix et réglages.
- **11/10/2026** — Démarrage. Brief enregistré. Constat des deux blocages.
  Questions posées. Recherche des prix faite (fiabilité limitée).
