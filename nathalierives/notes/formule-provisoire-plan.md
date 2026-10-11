# Formule du prix livré : relevé PROVISOIRE tiré du plan

**Statut : provisoire.** La source qui fait foi est l'étude
`etudes/3-douane-livraison.md`, absente au 11 octobre 2026. En attendant,
voici les lignes du calculateur du plan pour New York
(https://claude.ai/artifact/W8WR4JW4p5kkcqpFwybkV8, version du 10 octobre
2026), relevées pour ne rien oublier. Dès que l'étude 3 arrive, la comparer
ligne par ligne et la suivre là où elle diffère.

Ce que le brief impose par-dessus (il prime sur le plan) :

- forfait « livraison à New York » par taille d'envoi (petite, moyenne,
  grande) = emballage ou caisse + transport + livraison à la porte ;
- assurance et frais de douane et de courtier calculés pièce par pièce
  selon le prix, avec un changement au-dessus de 2 500 $ ;
- droits sur le prix de la pièce seule, jamais sur le transport ;
- chaque forfait est « estimation » ou « confirmé », avec sa date ; pas de
  total tant qu'il n'est pas confirmé ;
- jamais « droits compris » / « duties included » tant que Nathalie n'a pas
  choisi (le plan, lui, affiche « droits compris » : ne pas le suivre).

## Lignes du calculateur du plan

Notations : `V` = prix de la pièce en dollars ; `fx` = taux euro → dollar
(1,1206 dans le plan) ; `droits = V × taux du type douanier` ; `N` = nombre
de pièces dans un envoi groupé.

### Envoi express (petites pièces)

- Assurance : `max(1 % × V ; 12 € × fx)`
- Si `V ≤ 2 500 $` et pas un textile (entrée simplifiée) :
  - frais de traitement douanier (MPF, forfait) : `2,77 $`
  - frais du transporteur sur droits avancés : `max(2 % × (droits + 2,77) ; 17 € × fx)`
- Sinon (entrée formelle) :
  - MPF : `0,3464 % × V`, au moins `34,58 $`, au plus `670,86 $`
  - frais du transporteur : `max(2 % × (droits + MPF) ; 17 € × fx)`
  - caution douanière : `max(40 $ ; 0,5 % × (V + droits))`
  - forfait de dossier : `35 $`
  - déclaration Lacey (bois) : `35 $` si la pièce contient du bois

### Envoi groupé, avion ou bateau (moyennes et grandes pièces)

- MPF : `0,3464 % × V`, au moins `34,58 $ / N`, au plus `670,86 $`
- Courtier : `(129,95 $ avion ou 149,95 $ bateau + 25 $) / N`
- Caution : `max(40 $ / N ; 0,5 % × (V + droits)) + 35 $ / N`
- Lacey (bois) : `35 $ / N`
- HMF (bateau seulement) : `0,125 % × V`
- ISF (bateau seulement) : `(50 + 90 + 25) $ / N`
- Débours : `5 % × (droits + MPF + HMF)`
- Assurance : `1,25 % × (V + transport)`

### Estimations de transport du plan (en $, à remplacer par des devis)

| Taille | Express | Avion | Bateau | Emballage / caisse | Livraison à domicile |
|---|---|---|---|---|---|
| Petite | 420 | – | 150 | 90 | 150 |
| Moyenne | – | 2 000 | 1 150 | 420 | 450 |
| Grande | – | 4 750 | 2 500 | 840 | 650 |

## Questions à trancher avec l'étude 3

- Un seul mode par taille (express pour les petites, bateau groupé pour les
  autres ?) et quel `N` par défaut pour répartir les frais fixes.
- L'assurance en groupage porte sur `V + transport` : le transport est dans
  le forfait, il faudra donc le connaître séparément dans les réglages.
- Le seuil de 2 500 $ : sur `V` seul (valeur déclarée) — à confirmer.
