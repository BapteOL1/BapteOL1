# Ce qui disparaît, ce que je propose à la place, et ce que tu dois exporter toi-même

## Les fonctions de l'ancien site qui ne seront pas dans le nouveau

| Aujourd'hui | Dans le nouveau site | Pourquoi |
|---|---|---|
| Panier et commande en ligne (boutique PrestaShop) | Trois boutons par pièce : poser une question, réserver, demander un devis de livraison. Un champ « lien de paiement » vide est prévu pour plus tard | Pièces uniques, souvent lourdes, livraison à chiffrer : la vente se conclut en échangeant avec le client (brief) |
| Paiement en ligne (« Paiement sécurisé ») | Règlement après réponse de la galerie ; moyens de paiement « à confirmer » par Nathalie | Idem ; rien n'est construit pour l'instant |
| Comptes clients (« Se connecter ») | Aucun compte. Le client laisse son email dans la demande | Moins de données personnelles à protéger ; rien à retenir pour le client |
| Liste de souhaits | Le bouton « réserver » et la fiche PDF à garder ou à envoyer | Une designer envoie une sélection à son client : la fiche PDF le fait mieux |
| Comparateur de produits | Les filtres, et des dimensions lisibles sur chaque fiche | Peu utile pour des pièces uniques |
| Étiquettes « Nouveau » et « Soldes ! » sur les vignettes | Les pièces les plus récentes peuvent passer en tête de liste. Pas d'étiquette « soldes » prévue : si Nathalie veut baisser un prix, le nouveau prix s'affiche, c'est tout | Une galerie de pièces uniques ne fait pas de soldes ; à confirmer avec elle |
| Archive des ~240 newsletters en images (« Numéro 1 » à « Numéro 250 ») | Rien ; les anciennes adresses mènent à l'accueil. L'inscription reste : un champ email dans le pied de page et sur les pièces vendues | Brief : ne pas reprendre les newsletters en images (texte illisible, très lourd) |
| Envoi de la newsletter depuis WordPress *(voir plus bas)* | Un outil d'envoi à choisir (question T11) | [Probable] Le site actuel envoie la newsletter avec une extension de WordPress : elle s'arrêtera avec lui |
| La revue Bakélite (lien vers Issuu) | Ses couvertures servent d'inspiration au design ; un lien vers Issuu peut rester dans le Studio ou la Presse si Nathalie le souhaite | Le menu « La Revue » ne dit rien à un visiteur |
| Quatre adresses, trois numéros | Une seule fiche (adresse, téléphone, horaires), reprise partout | Brief ; question N2 |
| Mesure d'audience Google Analytics (deux anciens codes « UA ») | Mesure d'audience sans cookie | Ces codes ne collectent plus rien depuis l'arrêt de cette version de Google Analytics ; et le brief exclut les traceurs à cookies |
| Lecture des PDF d'articles de presse sur le site | Pour l'instant : chaque ancienne adresse de PDF mène à la page Presse | Brief : ne pas remettre en ligne les PDF d'articles sans ton accord (question de droits) |

## Ce que tu dois exporter toi-même (je n'y touche pas)

Ce sont des données personnelles : **garde ces fichiers pour toi**, dans un
dossier privé. Ne les dépose pas dans le dossier partagé avec moi.

Je ne vois pas l'administration de la boutique ni celle de WordPress : les
intitulés ci-dessous sont ceux des versions utilisées par le site ([Probable]
PrestaShop 1.6 et WordPress 5.4). S'ils diffèrent un peu, cherche le bouton
« Exporter » dans la même page. Ceux qui ont les codes d'accès sont
probablement les deux prestataires cités sur la page Contact (Quentin
Assandri, prakt.co, et Anthony Villien, crealp.fr).

### Dans l'administration de la boutique (PrestaShop)

1. **Clients** : menu *Clients › Clients*, puis le bouton *Exporter* en haut à
   droite de la liste. Vérification : un fichier `.csv` est téléchargé ; ouvert
   dans Excel, il a une ligne par client.
2. **Commandes** : menu *Commandes › Commandes*, puis *Exporter*. Même
   vérification : une ligne par commande.
3. **Abonnés à la newsletter de la boutique** : menu *Modules*, chercher
   « newsletter », ouvrir le module *Bloc newsletter* avec *Configurer*, puis
   la partie *Exporter les adresses e-mail des clients*. Vérification : un
   fichier avec une adresse par ligne.
4. **Factures** (si tu veux une copie) : menu *Commandes › Factures*, choisir
   une période, puis *Générer le PDF par date*.

### Dans l'administration de WordPress

5. **Abonnés à la newsletter** : [Probable] l'extension s'appelle
   « Newsletters » (Tribulant). Menu *Newsletters › Subscribers*, puis
   *Export*. Vérification : un fichier `.csv` avec une adresse par ligne, et
   leur liste d'abonnement.
6. **Messages reçus par le formulaire de contact** : l'extension Contact
   Form 7 ne les garde pas d'elle-même. S'il existe un menu *Flamingo* ou
   *Messages*, exporte-les ; sinon, ils ne sont que dans la boîte email.

Ces exports seront refaits juste avant la bascule (arrêt 5), en même temps
que la copie complète des deux sites.
