# Journal du projet : refonte de nathalierives.com

Écrit en français simple. Le plus récent en haut de chaque rubrique.
Pour reprendre dans une nouvelle conversation : écrire « reprends ». Je
relis `BRIEF.md`, ce journal et `QUESTIONS.md`, puis je continue.

## Où on en est

**Étape 0 : questions de départ** (11 octobre 2026).

```
Projet   [█░░░░░░░░░░░░░░░░░░░]  ~5 %   étape 0 sur 5 arrêts
Arrêt 1  [░░░░░░░░░░░░░░░░░░░░]  bloqué : accès réseau + études manquantes
```

- Brief enregistré tel quel : `BRIEF.md`.
- Questions pour toi et pour Nathalie : `QUESTIONS.md`.
- Ce que Nathalie doit fournir pour les contenus pilotes :
  `a-fournir/contenus-pilotes.md`.
- Formule du prix livré relevée dans le plan, à titre provisoire :
  `notes/formule-provisoire-plan.md`.
- Recherche des prix actuels (hébergement, interface d'édition, emails,
  mesure d'audience, police Brandon) en cours : résultat dans
  `notes/recherche-technique-couts.md`.

### Deux blocages constatés le 11 octobre

1. **L'environnement de travail ne peut pas joindre nathalierives.com.** La
   politique réseau de cet environnement le refuse (comme les sites de
   référence et les registres publics). Seuls les outils de développement
   (npm) et Google Fonts passent. Tant que ce n'est pas ouvert, je ne peux
   ni faire l'inventaire, ni revérifier l'API WordPress, ni récupérer les
   images. → question T1.
2. **Le dossier `etudes/` n'existe pas** dans le dépôt, et les quatre
   études ne sont pas dans le Google Drive relié. → question T2.

## Ce qui est décidé, et pourquoi

- **11/10 — Le projet vit dans le dossier `nathalierives/`** de ce dépôt,
  sur la branche `claude/nathalierives-redesign-syc71o`. Pourquoi : le dépôt
  contient déjà un autre projet (l'application Settle). Le site devra
  ensuite déménager dans un dépôt à lui, appartenant au studio, avant
  l'aperçu (arrêt 3) : l'interface d'édition et l'hébergeur s'y brancheront,
  et la personne du studio ne doit pas avoir accès à un autre projet. Ce
  sera dans la liste des comptes de l'arrêt 1.
- **11/10 — La charte graphique Settle ne s'applique pas ici.** Le fichier
  `CLAUDE.md` à la racine du dépôt impose des couleurs et des polices
  (bleu nuit, ambre, Sora) faites pour Settle. Le site de Nathalie Rives
  suit son brief à elle. J'ai ajouté une ligne dans ce `CLAUDE.md` pour le
  dire, et pour que « reprends » mène ici.
- **11/10 — Technique pressentie : un site statique fait avec Astro**,
  comme tu le préfères (un site statique = des pages fabriquées à l'avance,
  servies telles quelles, sans serveur à entretenir). Pas d'autre voie
  meilleure à mes yeux. Les vrais choix sont ailleurs et seront tranchés à
  l'arrêt 1 : l'interface d'édition, l'endroit où vivent les photos, et le
  service qui envoie les emails des formulaires (il faut une petite
  fonction côté serveur pour ça).
- **11/10 — Formule du prix livré** : l'étude 3 fera foi. En attendant,
  j'ai relevé celle du calculateur du plan, sans en reprendre ce que le
  brief écarte (Shopify, « droits compris »).

## Ce que j'attends de toi

Voir `QUESTIONS.md`, rubrique « Pour toi ». En priorité : **T1** (accès
réseau) et **T2** (les études). Puis T6, T7 pour l'arrêt 1.

## Questions pour Nathalie

Voir `QUESTIONS.md`, rubrique « Pour Nathalie », et
`a-fournir/contenus-pilotes.md`.

## Ce qui reste à faire

### Possible sans attendre
- [x] Enregistrer le brief, ouvrir le journal, poser les questions.
- [x] Liste exacte des contenus pilotes.
- [ ] Prix vérifiés des services (en cours).
- [ ] Modèle des fiches (pièce chinée, édition, projet, parution) avec tous
      les champs du brief.
- [ ] Fichier de réglages (taux de change, droits par type, forfaits
      « estimation » datés) et fichier des engagements (tout « à confirmer »).
- [ ] Calcul du prix livré, avec des tests, en suivant la formule provisoire.
- [ ] Plan du site et menu, en français et en anglais.

### Dès que l'accès réseau est ouvert (T1)
- [ ] Revérifier l'API WordPress et les pages de catégories de la boutique.
- [ ] Inventaire : pièces, projets, presse, PDF, images (meilleure
      résolution), crédits des photographes.
- [ ] Liste des designers nommés, tableau des titres, pièces à
      rephotographier, regroupements de projets.
- [ ] Table de redirection des anciennes adresses.
- [ ] Sites de référence, dans un vrai navigateur.
- [ ] Registre public du domaine.

### Arrêt 1
- [ ] Inventaire, ce qui disparaît, plan du site et menu, choix technique,
      tableau des coûts, comptes à ouvrir et dans quel ordre.

## Historique

- **11/10/2026** — Démarrage. Brief enregistré. Constat des deux blocages.
  Questions posées. Recherche des prix lancée.
