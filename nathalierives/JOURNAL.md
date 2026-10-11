# Journal du projet : refonte de nathalierives.com

Écrit en français simple. Le plus récent en haut de chaque rubrique.
Pour reprendre dans une nouvelle conversation : écrire « reprends ». Je
relis `BRIEF.md`, ce journal et `QUESTIONS.md`, puis je continue.

## Où on en est

**Arrêt 1 atteint** (11 octobre 2026, soir) : j'attends ton accord avant
les deux directions de design (arrêt 2).

```
Projet   [████░░░░░░░░░░░░░░░░]  ~20 %   arrêt 1 sur 5
Arrêt 1  [████████████████████]  fait, en attente de ton accord
```

- Compte rendu : `arret-1/COMPTE-RENDU.md` (ce qui marche, ce qui ne marche
  pas, tes décisions V1 à V6, ce que je n'ai pas pu vérifier).
- Inventaire : `arret-1/inventaire.md` ; tableaux dans `inventaire/`.
- Pour Nathalie : `arret-1/a-valider-avec-nathalie.xlsx` (6 onglets) et
  `a-fournir/contenus-pilotes.md`.
- Plan du site et menu : `arret-1/plan-du-site.md`. Ce qui disparaît :
  `arret-1/ce-qui-disparait.md`. Technique et coûts :
  `arret-1/technique-et-couts.md`. Redirections (brouillon) :
  `arret-1/redirections-brouillon.csv`.
- Sites de référence : `notes/references/sites-de-reference.md` et 50
  captures. Prix relus : `notes/recherche-technique-couts.md`.
- Fait sans attendre : calcul des prix US (`site/src/lib/prix.ts`, 14 tests),
  réglages (`site/src/donnees/reglages-prix.yaml`), engagements
  (`site/src/donnees/engagements.yaml`).

### Toujours bloqué
- **Les quatre études** (`etudes/`) n'ont pas été fournies (T2).

### Pour relancer les outils d'inventaire (si besoin)
`python3 -I outils/wp_export.py inventaire/brut` ;
`python3 -I outils/boutique_inventaire.py inventaire/brut` (lent, reprend
où il s'est arrêté) ; puis `outils/inventaire_wp.py`,
`outils/inventaire_boutique.py`, `outils/redirections.py`,
`outils/classeur_nathalie.py` (arguments en tête de chaque fichier).

## Ce qui est décidé, et pourquoi

- **11/10 — « Ma sélection » remplace la liste de souhaits** : plusieurs
  pièces dans une seule demande, sans compte (vu chez Galerie Half et Laura
  Gonzalez ; le brief cite Galerie Half pour cela).
- **11/10 — En anglais, « Collection »** pour la galerie : c'est le mot de
  Maison Gerard (New York) pour son stock.
- **11/10 — Les fiches gardent tout le texte actuel** (dimensions, époque,
  noms, matières) ; titres et attributions seulement proposés, à valider.
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

### Arrêt 1 — fait
- [x] API WordPress revérifiée ; boutique lue depuis les catégories.
- [x] Inventaire WordPress et boutique, designers, titres, photos, douane.
- [x] Table de redirection (brouillon), registre du domaine.
- [x] Plan du site et menu ; ce qui disparaît ; exports.
- [x] Sites de référence ; prix revérifiés ; compte rendu.

### Arrêt 2 (après ton accord)
- [ ] Deux directions de design, à 390 et 1 440 px, sur quatre écrans, avec
      ses vraies photos et ses vrais textes (douze pièces au hasard).
- [ ] Police libre à côté de Brandon ; tracé du logo si besoin (T4).
- [ ] Page en mots simples pour Nathalie, lisible sur son téléphone.

### Plus tard
- [ ] Modèle des fiches dans l'interface d'édition (arrêt 3).

## Historique

- **11/10/2026, nuit** — Arrêt 1 : inventaire complet (185 pièces, 37
  projets, 222 parutions), classeur pour Nathalie, redirections, sites de
  référence, prix relus, compte rendu.

- **11/10/2026, soir** — Accès réseau ouvert. Inventaire WordPress, registre
  du domaine, plan du site, ce qui disparaît, calcul des prix et réglages.
- **11/10/2026** — Démarrage. Brief enregistré. Constat des deux blocages.
  Questions posées. Recherche des prix faite (fiabilité limitée).
