Refonte de nathalierives.com, en français et en anglais
Le contexte
Je suis le fils de Nathalie Rives, styliste et architecte d'intérieur à Lyon. Elle tient aussi une galerie de mobilier et de luminaires du XXe siècle, surtout français, et édite quelques pièces (table Capsule, tapisseries Romance Cavalière). Elle a vécu six ans à New York.
Elle veut commencer à vendre à New York le mobilier et les luminaires qu'elle chine. Le site actuel l'en empêche : il est uniquement en français et en euros, lent, difficile à utiliser, et sa technique est en fin de vie. Je veux que tu le refasses entièrement : plus beau, plus simple pour ses clients, et avec une version anglaise pensée pour des acheteurs américains (designers d'intérieur et particuliers).
Je ne suis pas développeur. Les termes techniques de ce brief sont là pour toi : avec moi, emploie des mots courants, et explique un terme technique en une phrase la première fois. Quand une étape dépend de moi, donne-moi les gestes un par un et dis-moi comment vérifier que ça a marché. Quand tu me demandes de choisir, donne-moi deux ou trois options au plus, avec ce que chacune coûte, ce qu'elle change pour ma mère et son équipe, et ta recommandation.
Les documents joints
Dans le dossier etudes/ du projet :

```
•	1-audit-site-actuel.md : l'audit du site, fait le 10 octobre 2026, avec les chiffres et les preuves. Ne le refais pas ; revérifie seulement ce qui sert à la migration, le site a pu changer.  
•	2-comparatif-sites.md : 17 sites de galeries et de studios comparés, et ce que disent les études d'ergonomie.  
•	3-douane-livraison.md : droits de douane, frais, formule du prix livré, papiers d'un envoi.  
•	4-textes-anglais-brouillons.md : des premiers jets de textes anglais.

```

Le plan d'ensemble pour New York est ici : https://claude.ai/artifact/W8WR4JW4p5kkcqpFwybkV8
Quand ces documents et ce brief se contredisent, c'est ce brief qui compte. Le plan a été écrit avant l'audit : il parle encore de réparer WordPress et d'ouvrir une boutique Shopify, ne le suis pas là-dessus. L'étude 3-douane-livraison.md recommande elle aussi Shopify : n'en garde que les taux, les frais, la formule et les papiers. Les textes anglais sont des brouillons : ce qu'ils promettent (prix « livraison et droits compris », pièces restaurées, lampes recâblées, remise aux professionnels, durée de réservation, délais), ce qu'ils affirment sur elle (galerie ouverte en 2015, études, débuts à New York) et les noms de designers qu'ils citent doivent être validés par ma mère avant de paraître. Quand un brouillon et une étude ne donnent pas le même chiffre, c'est l'étude qui compte. Le plan contient aussi des emails destinés à des partenaires : ils ne te concernent pas, n'écris à personne.
Le site actuel, en bref

```
•	Ce sont deux sites sans rapport : un WordPress 5.4 (thème Salient, PHP 7.0), et une boutique PrestaShop ancienne sous /galerie/. Menus, polices et pieds de page diffèrent. On y trouve environ 182 pièces, 57 entrées de projets, 228 vignettes de presse et une centaine de newsletters en images.  
•	Pour l'inventaire : d'après mes notes, l'API REST de WordPress (/wp-json/wp/v2/) répondait le 8 octobre ; vérifie qu'elle répond encore. Le sitemap de la boutique est périmé (183 de ses 198 adresses renvoient une erreur) : pars des pages de catégories.  
•	Pour un visiteur : le premier écran de l'accueil ne dit ni qui elle est ni ce qu'elle fait. Sur une fiche, on ne peut ni poser une question, ni réserver, ni connaître le coût de la livraison. Les fiches et les pages projets sont trop pauvres pour convaincre : trois luminaires sur quatre ont une ou deux photos, aucun ne décrit son état. Rien n'invite à la contacter, et le site donne quatre adresses et trois numéros de téléphone. Plusieurs pages sont vides ou cassées. Sur téléphone, le zoom est bloqué et les menus font 10 à 12 px. L'accueil pèse près de 190 Mo.  
•	De vraies mentions légales et de vraies conditions de vente existent dans la boutique (/galerie/content/2-mentions-legales et /galerie/content/3-conditions-utilisation) : pars d'elles pour les brouillons.

```

Son identité, à garder

```
•	Le monogramme « Ř » et la signature « NATHALIE ŘIVES · A lifestyle ». Sur le site ce ne sont que de petites images. Demande-moi d'abord les fichiers d'origine. S'ils sont introuvables, décalque fidèlement la meilleure image, montre-moi l'original et ton tracé superposés, et attends l'accord de ma mère. Ne recompose jamais le logo avec une police qui lui ressemble. Le « Ř » n'existe que dans le logo : partout ailleurs, écris « Nathalie Rives ».  
•	Le fond crème (#FDFBF1) et un texte presque noir.  
•	La police Brandon, en capitales pour les titres et les libellés. Je ne sais pas si le studio en a la licence pour le web : ne réutilise pas les fichiers de police de l'ancien site. Pars d'une police libre qui s'en approche, montre-moi les deux côte à côte, et dis-moi ce que coûterait la licence. Ce qui date le site actuel, c'est son usage : graisse fine, 12 à 15 px, texte justifié.  
•	Les couvertures de sa revue Bakélite, encore visibles sur /la-revue/ : page crème, titre vertical très espacé, grand « NUMÉRO 02 » en graisse fine, photo décentrée, crédit vertical. Les libellés numérotés (« 01. », « 02. »). Le carton crème qui porte les légendes.  
•	Les photos de Sabine Serrad, les suites de La Tour Rose nommées par couleur (Ocre, Terracotta, Ambre, Acquaverde, Ébène), et le bleu de la devanture de la galerie (une photo est sur la page contact ; demande-moi la référence de la peinture).  
•	Sa voix : chaleureuse, à la première personne, tournée vers les artisans.

```

Tout cela est une matière où puiser, pas une charte à appliquer à la lettre.
Ce que je veux
Un seul site bilingue, rapide, peu coûteux à héberger, et que le studio peut tenir à jour sans moi.
Je te laisse choisir la technique. J'ai une préférence pour un site statique (Astro, par exemple) avec le contenu dans des fichiers et une petite interface d'édition, parce que c'est rapide, peu coûteux et sans serveur à entretenir. Si tu penses qu'une autre voie est meilleure, dis-le avant de commencer, avec tes raisons.
Avec ton choix technique, donne-moi :

```
•	ce que verra la personne du studio qui met le site à jour, et les comptes qu'il lui faudra ;  
•	un tableau de tout ce que le site coûtera : chaque service, à quoi il sert, son prix par mois, ce que l'offre gratuite autorise (usage commercial compris) et comment on en sort. Ajoute les dépenses hors technique : relecture de l'anglais, relecture juridique, licence de police, photos à refaire. Mon plafond mensuel est indiqué à la fin, dans « Ce que je te fournis ».

```

Le menu doit parler comme un visiteur. « & Co », « La Revue » et « E-Galerie » ne disent rien à quelqu'un qui arrive. Je propose : Galerie, Intérieurs (résidentiel, hôtels et restaurants, commerces), Studio (son histoire, l'équipe, sa méthode), Collaborations, Presse, Contact, plus Livraison / Shipping & Duties, Professionnels / To the Trade et les pages légales. Propose mieux si tu vois mieux. En anglais, « Gallery » peut se lire « galerie de photos » : vois si « Collection » est plus clair.
Six parcours à réussir
C'est sur ces parcours que je jugerai le site, sur téléphone d'abord.

```
1.	Une designer d'intérieur de New York, arrivée par Instagram, cherche une paire d'appliques des années 50. Depuis l'accueil comme depuis l'entrée de la galerie, elle voit les appliques disponibles en deux gestes au plus et peut les filtrer. Sur la fiche, sans changer de page, elle trouve le prix (et s'il vaut pour la paire), les dimensions en pouces, l'état, le câblage pour les États-Unis et le délai de livraison. Elle peut poser une question, réserver ou demander un devis de livraison : la pièce et son numéro de référence sont déjà dans sa demande. Elle peut télécharger une fiche PDF, avec ou sans prix, à montrer à son client.  
2.	Une cliente de Lyon ou de Paris a vu un fauteuil sur Instagram. Sur la fiche française elle trouve le prix TTC, l'état, si la pièce est visible à la galerie (adresse, horaires, rendez-vous), comment se faire livrer en France et son droit de rétractation. Elle peut poser une question ou réserver.  
3.	Un particulier lyonnais veut lui confier son appartement. En cinq secondes sur l'accueil, il a compris ce qu'elle fait et où. Il trouve des appartements comparables et des preuves (presse, références). Un lien « Démarrer un projet » l'accompagne sur les pages Intérieurs et Studio. Le formulaire demande son nom, son email, le type de projet, le lieu et un message ; surface, budget par tranches, calendrier et téléphone sont facultatifs.  
4.	Un hôtelier ou un restaurateur l'évalue. En deux clics il arrive sur une page qui réunit ses références en hôtellerie (La Tour Rose sur une seule page, pas treize), ce qu'elle prend en charge, une présentation PDF légère et un contact professionnel.  
5.	Une journaliste ou une marque partenaire prépare un sujet. Elle trouve au même endroit une biographie courte et une longue, en texte, dans les deux langues, des portraits et le logo à télécharger, les dossiers de presse datés, les parutions triées par date et un contact presse nommé.  
6.	Une personne du studio, qui n'a jamais vu de code, ajoute une pièce. Depuis un navigateur, elle se connecte, remplit la fiche dans les deux langues, dépose cinq photos sans les préparer, voit un aperçu, publie, puis passe une autre pièce en « Vendu ». Elle y arrive seule en un quart d'heure avec le mode d'emploi, et rien de ce qu'elle peut faire là ne peut casser le site.

```

Le contenu actuel ne permet pas de réussir ces parcours : aucun des 35 luminaires étudiés ne parle d'état ni de câblage, les deux pages projets regardées n'ont pas d'année, il n'existe qu'une biographie courte en français et un petit portrait. L'audit n'a pas relevé les autres fiches ni les autres projets : vérifie-les dans l'inventaire et garde ce qui y est écrit. Ne comble pas les manques toi-même. La règle :

```
•	Je jugerai les parcours sur des contenus pilotes que ma mère remplira en entier : cinq pièces (dont une paire d'appliques), trois projets (un appartement, La Tour Rose, un commerce) et la page presse. Dès le début, donne-moi la liste exacte de ce qu'elle doit fournir pour chacun.  
•	Ailleurs, une rubrique vide ne s'affiche pas. Trois exceptions, parce que l'acheteur les cherche : l'état (sauf pour ses éditions, qui sont neuves), le câblage pour les États-Unis (luminaires seulement, sur la fiche anglaise) et la livraison affichent « sur demande », avec à côté le bouton de question, ou le bouton de devis pour la livraison.  
•	Un filtre n'apparaît que s'il sépare vraiment les pièces. Il indique le nombre de résultats, et les filtres actifs restent visibles et se retirent d'un geste.  
•	Les projets suivent un ordre fixe choisi par ma mère, les plus récents d'abord quand l'année est connue. N'invente pas les années.  
•	La présentation PDF du parcours 4 est le PDF « Restaurants et bars » qui existe déjà, allégé. La fiche PDF du parcours 1 peut être une mise en page d'impression de la fiche.

```

Le visuel
Son univers : la couleur, la chaleur, l'éclectisme, le design du XXe siècle, les artisans. Le site doit prolonger ce qu'elle a déjà, pas repartir de zéro, et ne doit pas ressembler à un modèle tout fait.
Les beaux sites du comparatif ont un socle commun de lisibilité : une police qui a du caractère pour les titres et une police discrète pour le texte ; un fond clair et un texte noir ; des photos qui portent le site avec très peu d'habillage ; des légendes toujours visibles sous les images, sur trois lignes au plus ; un en-tête fin avec des liens en toutes lettres ; très peu de mouvement. Ce socle n'est pas le design : un site qui s'en tient là ressemblera à tous les autres. Ce qui doit le rendre reconnaissable vient d'elle, de la liste « à garder » plus haut.
Sa singularité, c'est la couleur. Pour l'interface (liens, boutons, états), une seule couleur d'accent. Mais la couleur peut entrer par les projets : une page projet peut prendre une teinte tirée de ses photos, tant que le texte reste lisible. Je te laisse trouver la bonne manière.
Le jour de la mise en ligne, la galerie sera faite des photos actuelles, qui sont de trois sortes : prises au téléphone sur un mur sombre, sur fond blanc, et mises en scène. La grille et la fiche doivent rester belles avec elles : même format pour toutes les vignettes, image entière et jamais recadrée, fond neutre qui accueille aussi bien une photo sur blanc qu'une photo sombre.
Propose-moi deux directions qui diffèrent par leur idée, pas seulement par leur palette : une qui prolonge au plus près l'identité actuelle, une plus audacieuse sur la couleur. Pour chacune, dis-moi en une phrase ce qui la rend reconnaissable sans le logo. Montre-les à 390 px et à 1 440 px, avec ses vraies photos et ses vrais textes, sur quatre écrans : accueil, liste de la galerie, fiche pièce, page projet. Pour la galerie, prends douze pièces au hasard, pas les douze meilleures.
Sites à regarder, dans un vrai navigateur (certains refusent les requêtes automatiques, et tu les verras depuis la France, pas comme un New-Yorkais). Si l'un d'eux te bloque, fie-toi à ma description et au comparatif.

```
•	Pour le fonctionnement seulement, pas pour l'allure : morentz.com (filtres par dimensions, réservation, tableau technique, fiche PDF), chezpluie.com (prix tout compris pour les États-Unis, pièces vendues gardées avec un badge), pamono.com (livraison chiffrée selon la destination, état et restaurations séparés), theinvisiblecollection.com (fiche PDF avec ou sans prix, câblage par pays), galeriehalf.com (mention « 120V US Wiring », plusieurs pièces dans une seule demande).  
•	Pour l'allure : demischdanant.com et maisongerard.com (le calme, la manière d'écrire provenance et expositions ; mais ils n'affichent aucun prix, ne les suis pas là-dessus) et zana.fr (une page projet courte et complète : titre, ville, deux paragraphes, trois faits, projet suivant).  
•	lauragonzalez.fr et pierreyovanovitch.com : les pages projets renvoient aux pièces qu'on y voit.

```

Ce que je ne veux pas, vu sur des sites du comparatif ou sur le sien : un écran d'introduction avant le contenu ; un menu caché derrière une icône sur ordinateur ; des légendes ou des prix visibles seulement au survol ; une fenêtre qui s'ouvre à l'arrivée ; un défilement détourné ou des images qui attendent derrière un fondu ; des pages anglaises à moitié en français ; du texte minuscule ou peu contrasté ; des formulaires longs.
Le lien entre ses intérieurs et sa galerie est la raison d'être d'un site unique. Une page projet peut lister les pièces de la galerie qu'on y voit, et une fiche peut afficher « Vue dans » avec le projet : c'est aussi la meilleure photo d'échelle. Comme ses pièces sont uniques, celles d'un projet sont souvent vendues : montre-les comme telles, avec des pièces proches encore disponibles. Ne devine aucun de ces liens d'après les photos : prévois le champ des deux côtés, ma mère les renseignera.
Rédige aussi un guide photo d'une page pour son équipe, à partir de ce qu'elle fait déjà sur Instagram @galerie.rives (objet centré sur fond clair, larges marges). Les vues : de trois quarts, de face, de dos ou de dessous, un détail de matière ou d'usure, la marque ou la signature, et une vue qui donne l'échelle. Pour un luminaire, allumé et éteint.
Les deux langues, les prix et la livraison
La version anglaise s'adresse à des Américains, pas à des anglophones en général.

```
•	Une vraie réécriture en anglais américain, pas une traduction mot à mot. Vocabulaire du métier : applique = sconce, enfilade = sideboard ou credenza, lampadaire = floor lamp, table basse = coffee table, années 50 = circa 1950s. Pouces d'abord, arrondis au quart, cm entre parenthèses ; surfaces en sq ft.  
•	Pages françaises à la racine, pages anglaises sous /en/, balises hreflang, et un bouton « Français / English » qui garde le visiteur sur la même page. Si le navigateur est en anglais sur une page française, affiche une ligne discrète en haut de page, jamais une fenêtre. Ne redirige personne automatiquement.  
•	Aucune page anglaise ne doit contenir de français resté là par oubli : libellés, messages d'erreur et emails de confirmation compris. Restent en français les noms propres, les noms de suites, les titres d'articles et les citations d'origine, suivies de leur traduction.

```

La langue ne décide ni de la devise ni de la destination : elle fixe seulement ce qui s'affiche par défaut, et chaque prix dit ce qu'il contient et pour quelle destination.

```
•	Sur une fiche française : le prix en euros TTC, le retrait à la galerie, la livraison en France, et un lien « Livraison hors de l'Union européenne » qui ouvre, sur la même page, le prix export hors TVA et, pour les États-Unis, ce que montre la fiche anglaise.  
•	Sur une fiche anglaise : le prix de la pièce en dollars, hors livraison, les droits de douane américains estimés sur ce prix, puis la livraison à New York. Un lien « Buying in France or the EU? » ouvre, sur la même page, le prix en euros TTC, le retrait à la galerie et la livraison en France.  
•	Un prix reste donc toujours visible ; ce qui peut manquer, c'est le transport. Tant qu'une pièce n'a pas de prix en dollars, la fiche anglaise affiche son prix en euros TTC, présenté comme le prix à la galerie de Lyon, puis « US price on request » avec le bouton de question. Ne convertis jamais toi-même un prix TTC en dollars.  
•	Chaque pièce porte deux prix : le prix TTC et le prix export hors TVA. Ne calcule pas l'un à partir de l'autre (elle vend peut-être sous le régime de la TVA sur la marge) : demande-moi la règle au début. Tant que je ne te l'ai pas donnée, aucune pièce n'a de prix en dollars.  
•	Tout se calcule à partir d'un seul fichier de réglages : le taux de change, les droits par type de pièce, un forfait « livraison à New York » par taille d'envoi (petite, moyenne, grande) et les taux des frais qui dépendent du prix. Le forfait couvre ce qui dépend du volume : emballage ou caisse, transport, livraison à la porte. L'assurance et les frais de douane et de courtier dépendent du prix de la pièce, et changent au-dessus de 2 500 $ : calcule-les pièce par pièce avec les lignes de la formule de 3-douane-livraison.md. N'en oublie aucune : en ne gardant que le transport et les droits, le prix serait trop bas de plus de 1 000 $ sur un meuble.  
•	Chaque forfait est marqué « estimation » ou « confirmé », avec sa date. Aujourd'hui les trois sont des estimations. Tant qu'un forfait n'est pas confirmé, n'affiche pas de total : écris que la livraison est chiffrée sur demande, avec le bouton de devis à côté. Le jour où je le passe à « confirmé », le total livré à New York s'affiche, en précisant que les autres destinations se chiffrent sur devis.  
•	Le montant des droits s'affiche toujours en chiffres, comme une estimation : l'acheteur doit le connaître dans tous les cas. Ma mère n'a pas encore décidé s'ils seront compris dans sa facture ou payés au transporteur à la livraison. Tant qu'elle n'a pas choisi, n'écris nulle part « droits compris » ni « duties included ».  
•	Droits vérifiés le 10 octobre 2026, pour des pièces fabriquées dans l'Union européenne : 10 % pour la plupart des meubles, les luminaires, les céramiques décoratives et les tapisseries ; 15 % pour les sièges rembourrés à structure bois (10 % si elle est en teck ou en métal) ; 0 % pour les antiquités de plus de 100 ans, avec preuve de leur âge. Ils se calculent sur le prix de la pièce, pas sur le transport. Pour tout le reste (œuvres d'art, vaisselle, verre, miroirs, tapis, coussins, pièces fabriquées hors de l'Union européenne), je n'ai pas de taux vérifié : n'en applique aucun, affiche « droits de douane sur demande » et note ces pièces dans la liste pour ma mère. Ces taux peuvent changer du jour au lendemain : revérifie-les avant la mise en ligne et affiche la date de vérification sur la page Shipping & Duties.  
•	Propose pour chaque pièce un type douanier et une taille d'envoi à partir du titre, de la description et des dimensions, jamais d'après la photo. Quand ils ne suffisent pas (un fauteuil dont on ignore la structure), laisse le type vide et pose la question. Ne classe jamais une pièce en antiquité sans preuve écrite. Aucun prix en dollars ne paraît sans l'accord de ma mère sur le prix export, le type douanier et la taille d'envoi ; ensuite, il suit le taux de change sans nouvelle validation.

```

Les fiches de la galerie
Chaque pièce doit pouvoir porter : un numéro de référence, un titre descriptif, le designer et le niveau d'attribution (by, attributed to, in the manner of), l'époque, les matériaux, les essences de bois (elles sont demandées à l'entrée aux États-Unis pour les meubles en bois, et le palissandre de Rio exige toujours un certificat), les dimensions, un état détaillé et les restaurations, la provenance, les deux prix, le type douanier, la taille d'envoi, « recâblé pour les États-Unis » pour les luminaires, et un statut (disponible, réservé, vendu).
Beaucoup de fiches seront incomplètes au lancement : dessine la fiche pour ce cas, pas seulement pour la fiche idéale.

```
•	N'attribue, ne date et n'identifie rien d'après les photos : ni designer, ni époque, ni matière, ni essence de bois. Les titres actuels sont génériques (« Lampe de table » quatre fois) : ne les réécris pas seul, prépare un tableau « titre actuel, titre proposé, à vérifier » que ma mère validera.  
•	Ne retouche pas les photos de pièces : ni agrandissement artificiel, ni détourage, ni image générée. Ne propose le zoom que si la photo est assez grande pour qu'il serve.  
•	La cible pour une nouvelle pièce est d'au moins cinq photos de 2 000 px sur le grand côté. Les photos en ligne en sont loin : migre ce qui existe, cherche si des originaux plus grands existent, et dresse la liste des pièces à rephotographier, en commençant par les plus chères.  
•	Ses éditions (table Capsule, tapisseries, coussins) sont des pièces neuves : une fiche plus simple, sans état ni attribution, avec un délai de fabrication.

```

Trois actions par pièce : poser une question, réserver, demander un devis de livraison. Chacune est pré-remplie avec la pièce, confirmée à l'écran et par email dans la langue du visiteur. Dessous, quatre lignes expliquent comment on achète (la question ou la réservation, notre réponse, le règlement, l'emballage et la livraison), avec un lien vers les retours et un vers la page Shipping & Duties.
Une pièce réservée garde « poser une question ». Une pièce vendue garde sa page, avec la mention « Vendu », des pièces proches et un bouton « Je cherche une pièce de ce type » : les pièces vendues montrent l'œil de ma mère. Par défaut, la liste montre les pièces disponibles.
Prévois aussi les écrans qu'on oublie : aucun résultat, une recherche sur les pièces, les designers et les projets, une page d'erreur bilingue qui renvoie vers la galerie et les intérieurs, les erreurs de formulaire affichées à côté du champ, et un envoi qui échoue (montre alors l'email et le téléphone).
Pour rassurer quelqu'un qui n'a jamais entendu parler d'elle, sers-toi de ce qui est vrai, en phrases et sans pictogrammes : ses six ans à New York, quelques titres de presse, la photo de la galerie avec son adresse, le nom de la société, une personne nommée qui répond en anglais. Ni avis ni noms de clients inventés.
Pour le paiement en ligne, ne construis rien maintenant : garde seulement pour chaque pièce un champ « lien de paiement » vide.
Le contenu

```
•	Récupère le contenu public du site actuel et les images dans la meilleure résolution disponible. Garde les crédits des photographes. Contente-toi de lire : n'envoie aucun formulaire, n'ajoute rien au panier, ne crée pas de compte, et télécharge sans hâte, le serveur est ancien.  
•	N'invente rien : ni prix, ni dates, ni citations, ni parutions, ni noms de clients, ni descriptions d'état. Là où le contenu manque, crée la structure et note ce qui manque dans une liste pour ma mère.  
•	N'invente pas non plus d'engagement. Tout ce que le site promet tient dans un seul fichier, où chaque valeur reste « à confirmer » tant que ma mère ne l'a pas validée : délai de réponse, durée et conditions d'une réservation, délais de livraison, retours, moyens de paiement, remise aux professionnels, recâblage, et la façon de régler les droits de douane. Tant qu'une valeur n'est pas confirmée, écris une formule sans chiffre.  
•	Ne cite sur le site que des designers dont une pièce figure au catalogue. Le plan et les brouillons anglais nomment Guariche, Motte, Alain Richard, Arlus et les céramiques de Vallauris : ce sont surtout des pièces qu'elle veut chiner pour New York, et rien ne prouve qu'elle en a en ligne aujourd'hui. L'audit n'a relevé des noms que sur les luminaires (Audoux-Minet, Maison Bagues) et sur un meuble André Sornay. Dans l'inventaire, dresse la liste des designers nommés sur les fiches, et demande à ma mère pour quoi la galerie est connue avant de l'écrire.  
•	Un projet, une page. Dans l'inventaire, montre-moi les entrées que tu comptes réunir (La Tour Rose, Château La Gallée, les suites MiHotel, Zermatt, Balthazar) et attends la confirmation de ma mère.  
•	Presse : les vignettes n'ont ni date ni titre. Relève-les seulement quand ils se lisent dans le PDF, l'article ou le nom du fichier ; la date de mise en ligne n'est pas une date de parution. Vise une trentaine de lignes sûres, en commençant par les grands titres, et mets le reste dans un tableau à compléter. Ne remets pas en ligne les PDF d'articles ni les pages de magazine sans m'en parler. Le projet de l'île Saint-Louis est fait de pages d'Elle Décoration : mets-le en attente et demande-moi les photos d'origine.  
•	Ne reprends pas les newsletters en images. Garde en revanche l'inscription à la newsletter : un champ email seul, dans le pied de page et sur les pièces vendues, jamais en fenêtre. Demande-moi quel outil elle utilise pour l'envoi.  
•	Le site actuel fait des choses que le nouveau ne fera pas au départ : panier, paiement en ligne, comptes clients, liste de souhaits. Dans ton inventaire, fais la liste de ce qui disparaît et de ce que tu proposes. Les commandes passées, les comptes clients et les abonnés ne sont pas du contenu public : n'y touche pas, dis-moi comment les exporter moi-même.  
•	Une seule fiche pour l'adresse, le téléphone et les horaires, reprise partout. Demande-moi les bonnes valeurs, ainsi que le nom de la société qui vend et l'adresse email qui reçoit chaque type de demande.  
•	Prépare la table de redirection des anciennes adresses vers les nouvelles.

```

Les exigences mesurables

```
•	En cinq secondes sur l'accueil, à 390 px comme à 1 440 px, on lit en vrai texte son nom, une phrase qui dit ce qu'elle fait et où, et deux boutons : la galerie, et les intérieurs.  
•	Avant tout défilement, sur téléphone, chaque page pèse au plus 1,5 Mo et fait au plus 60 requêtes. Les images situées plus bas se chargent à l'approche, la version zoom seulement quand on la demande, et une liste longue se charge par tranches. Mesure avec Lighthouse en mode mobile sur six pages (accueil, liste de la galerie, une fiche, liste des projets, un projet, presse) : l'image principale s'y affiche en moins de 2,5 secondes.  
•	Ne gagne jamais du poids en abîmant les photos. Si une page ne tient pas dans le budget sans dégrader l'image, dis-le-moi. Réserve la place de chaque image pour que la page ne saute pas.  
•	Accessibilité au niveau WCAG 2.2 AA : texte courant d'au moins 16 px, contraste d'au moins 4,5 pour 1, zones tactiles d'au moins 44 px, zoom autorisé, focus clavier visible, une étiquette pour chaque champ, la langue déclarée sur chaque page, aucun texte intégré dans une image, mouvements coupés pour qui l'a demandé. Texte alternatif dans les deux langues : pour une pièce, son titre suivi de la vue ; pour un projet, une phrase qui décrit ce qu'on voit.  
•	Le site n'a besoin d'aucun bandeau de cookies : pas de traceur publicitaire, pas de carte, de vidéo ni de fil Instagram intégrés, un champ piège invisible plutôt qu'un captcha, et une mesure d'audience sans cookies qui compte au moins les visites par langue et les demandes envoyées.  
•	Téléphone et email cliquables partout. HTTPS uniquement.  
•	Aucun lien interne cassé. Les liens sortants sont vérifiés avant chaque mise en ligne. Toutes les anciennes adresses de pièces, de projets et de PDF mènent quelque part.

```

Comment travailler
Ce travail prendra plusieurs jours et plusieurs conversations. Dès le début, enregistre ce brief tel quel dans le dossier du projet, et tiens un journal en français simple à la racine : où on en est, ce qui est décidé et pourquoi, ce que tu attends de moi, les questions pour ma mère, ce qui reste à faire. Enregistre ton travail dans git à la fin de chaque étape. En ouvrant une nouvelle conversation, je dois pouvoir écrire « reprends » pour que tu relises le brief et le journal et que tu continues.
Commence par me poser toutes tes questions en une fois, avec la liste de ce que tu attends de moi et de ma mère et l'étape que chaque élément bloque. Dis-moi ce que tu peux commencer sans attendre.
Ensuite, je veux cinq moments où tu t'arrêtes et attends mon accord, pas davantage :

```
1.	Après l'exploration : l'inventaire, ce qui disparaît, le plan du site et le menu, ton choix technique et le tableau des coûts.  
2.	Les deux directions de design, sous une forme que je peux montrer à ma mère sur son téléphone, avec une page en mots simples qui résume ce qu'elle doit choisir. Joins-y le tracé du logo superposé à l'original, si tu as dû le redessiner, et la police libre à côté de Brandon.  
3.	Le socle dans les deux langues, sur une adresse d'aperçu privée que Google ne référence pas : accueil, liste de la galerie, une fiche pièce, une page projet, le formulaire « Démarrer un projet » et l'interface d'édition, que je ferai essayer par quelqu'un du studio avec une première version du mode d'emploi.  
4.	Le premier lot migré : les luminaires, dans les deux langues. Après mon accord, enchaîne les autres lots sans t'arrêter (mobilier et assises, autres pièces, projets, presse, pages du studio), avec l'anglais au fur et à mesure.  
5.	Avant la bascule : ton compte rendu de vérification, la marche à suivre, la table de redirection et la feuille de test, que je ferai passer avant de basculer.

```

Entre ces moments, avance sans m'interrompre et regroupe tes questions pour l'arrêt suivant.
Pour vérifier, refais toi-même les six parcours dans un navigateur, à 390 px et à 1 440 px, dans les deux langues, et montre-moi les captures d'écran. Contrôle les exigences mesurables. Dans tes comptes rendus, commence par ce qui marche, ce qui ne marche pas et ce que tu attends de moi ; dis aussi ce que tu n'as pas pu vérifier.
Pour ce dernier arrêt, livre un mode d'emploi (ajouter une pièce, mettre à jour le taux de change et les droits, mettre en ligne), le guide photo, la table de redirection, la liste « à valider avec Nathalie », la liste des pièces à rephotographier, la fiche des comptes (service, propriétaire, prix, comment résilier) et ce qui reste à faire. Prépare-moi aussi une feuille de test d'une page à partir des parcours : je ferai tester le site par ma mère et deux ou trois personnes qui ne le connaissent pas, y compris depuis le lien de la bio Instagram.
Les limites

```
•	Ne modifie et ne supprime rien sur le site en ligne ni chez l'hébergeur. Je ne te donnerai aucun mot de passe : si un export de WordPress ou de la boutique t'aiderait, dis-moi où cliquer pour le faire moi-même.  
•	N'ajoute aucun service payant sans mon accord. Les comptes, c'est moi qui les ouvre, sur une adresse du studio : au premier arrêt, dis-moi lesquels, dans quel ordre, et pour quel arrêt chacun doit être prêt (l'hébergement de l'aperçu avant l'arrêt 3). Tant qu'un compte manque, les formulaires fonctionnent sur ta machine sans rien envoyer. Une fois l'envoi branché, et jusqu'à la bascule, tous les emails arrivent à mon adresse et nulle part ailleurs, y compris la confirmation destinée au visiteur.  
•	Ne touche pas au nom de domaine. La bascule sera la dernière étape, et nous la ferons ensemble. Les adresses email du studio passent par ce domaine et ne doivent pas s'interrompre : avant la bascule, dresse la liste de tout ce qui en dépend. Le jour venu, on ne change que le réglage qui indique où se trouve le site.  
•	Avant la bascule, aide-moi à faire une copie complète de l'ancien site et de la boutique, rangée ailleurs que chez l'hébergeur. On garde l'ancien hébergement au moins un mois. Écris la marche à suivre de la bascule et celle du retour en arrière, pas à pas.  
•	Les pages légales et les conditions de vente sont des brouillons à faire relire par un professionnel : présente-les comme tels.  
•	Les textes anglais seront relus par un rédacteur américain : signale les passages dont tu es le moins sûr.

```

Ce que je te fournis
Si une ligne est encore entre crochets, mets-la dans tes premières questions et commence ce qui n'en dépend pas.

```
•	Les photos originales en haute définition : [dossier, ou « non »]  
•	Les fichiers d'origine du logo et du monogramme : [dossier, ou « non »]  
•	Qui gère le nom de domaine, l'hébergement et les emails : [nom, ou « je ne sais pas »]. Si je ne sais pas, cherche-le dans les registres publics et dis-moi à qui demander.  
•	Qui mettra le site à jour, et sur quel appareil : [ma mère, quelqu'un de l'équipe ; téléphone ou ordinateur]  
•	Mon plafond de dépense par mois, hors nom de domaine : [X] €  
•	Mon adresse email pour les tests : [adresse]

```

Pour ce que ce brief ne tranche pas, fais un choix raisonnable et note-le dans le journal. Cela ne vaut ni pour le contenu, ni pour les prix, ni pour ce que le site promet : là, demande-moi.
