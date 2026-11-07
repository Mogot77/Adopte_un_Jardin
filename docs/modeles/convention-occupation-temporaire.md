# Convention d'occupation temporaire d'un jardin (modèle)

> **Modèle de travail : non validé juridiquement.** Il doit être relu par un juriste (droit rural et droit immobilier) avant tout usage réel. Les passages `[entre crochets]` sont à remplir ; la colonne « Donnée de l'application » de la section 2 indique d'où viendra chaque valeur pour générer le contrat automatiquement. Il remplace le modèle de 2015 (`ancien_projet/ETUDE DE MARCHE/#DOSSIER/Contrat_location_vierge.pages`, qualifié de « bail » de terrain nu).

## 1. Notes préalables (hors contrat)

**Qualification retenue.** Convention d'occupation **temporaire et précaire** d'un terrain à usage de **potager familial non commercial**, conclue pour une seule année culturale, sans tacite reconduction, contre une redevance. L'objectif est d'éviter les régimes qui protègent durablement l'occupant : statut du fermage (bail rural), bail d'habitation, bail commercial. **À valider** : la qualification dépend des faits (surface, usage, durée, nature de la redevance) et le texte exact des règles applicables (notamment le seuil des « parcelles de subsistance » fixé localement) doit être vérifié par un juriste.

**Rôle d'Adopte un Jardin.** La plateforme met en relation, encaisse la redevance et les frais de service, et reverse la redevance au propriétaire. Elle **n'est pas partie** à la convention. Ce rôle doit aussi figurer dans les conditions générales d'utilisation (CGU), à rédiger.

**Points à faire valider** : qualification juridique ; assurance obligatoire de chaque partie ; responsabilité de la plateforme ; mentions obligatoires pour un contrat conclu en ligne ; conservation de la preuve (signature électronique, horodatage) ; fiscalité de la redevance pour le propriétaire (revenus fonciers ou autre) ; copropriété ou lotissement (règlement qui interdirait l'usage) ; usage de produits phytosanitaires (réglementation applicable aux jardiniers amateurs) ; remboursement en cas d'annulation ; traitement des données personnelles (RGPD) ; médiation de la consommation si la plateforme est considérée comme un professionnel.

## 2. Données de l'application utilisées

| Champ du contrat | Donnée de l'application |
|---|---|
| Propriétaire : nom, adresse, e-mail, téléphone | `Parcel.ownerName`, `ownerEmail`, `ParcelPrivate.address` / `phone` (profil du propriétaire) |
| Occupant : nom, e-mail, téléphone | `Reservation.gardenerName`, `gardenerEmail`, profil du jardinier |
| Désignation du terrain | `Parcel.title`, `commune`, `surface`, adresse exacte (`ParcelPrivate`) |
| Année culturale | `Reservation.season` |
| Redevance annuelle | `Reservation.price` |
| Frais de service | `Reservation.fee` ; total payé : `Reservation.total` |
| Échéancier de versement | `payoutSchedule(price, season)` (mars 30 %, juin 40 %, octobre 30 %) |
| Outils et participation | `Parcel.toolsProvided`, `toolsPricePerYear` |
| Eau | `Parcel.water`, `waterMeter` |
| Accès, nombre de personnes | `Parcel.access`, `maxPeople` |
| Sanitaires, équipements | `Parcel.toilets`, `equipment` |
| Date de signature | `Reservation.createdAt` (réservation payée) ; validation : `validatedAt` (code saisi) |

---

# CONVENTION D'OCCUPATION TEMPORAIRE D'UN JARDIN

**Référence : [identifiant de la réservation] · Année culturale [AAAA]**

**Entre les soussigné(e)s :**

**Le propriétaire** (ci-après « le Propriétaire »)
[Madame / Monsieur] [Prénom NOM], demeurant à [adresse], né(e) le [date] à [lieu], joignable à [e-mail] et [téléphone].

**ET**

**L'occupant** (ci-après « le Jardinier »)
[Madame / Monsieur] [Prénom NOM], demeurant à [adresse], né(e) le [date] à [lieu], joignable à [e-mail] et [téléphone].

**Intermédiaire** : la plateforme **Adopte un Jardin**, [forme juridique], [adresse], [numéro d'immatriculation] (ci-après « la Plateforme »), qui met les parties en relation et encaisse la redevance pour le compte du Propriétaire. La Plateforme n'est pas partie à la présente convention.

**Il a été convenu ce qui suit :**

## Article 1 : Objet

Le Propriétaire autorise le Jardinier, qui l'accepte, à occuper à titre temporaire et précaire le terrain décrit à l'article 2, pour y cultiver un potager familial, dans les conditions ci-après.

## Article 2 : Désignation du terrain

Un terrain nu d'une surface cultivable d'environ **[X] m²**, situé à **[adresse exacte, commune]**, correspondant à l'annonce « [titre de l'annonce] » publiée sur la Plateforme. Le périmètre exact est précisé par [le plan ou la photographie en annexe C].

Sont mis à disposition en complément (cocher) :
- [ ] des outils : [liste], participation annuelle de [X] € ;
- [ ] un point d'eau : [robinet / cuve de récupération de pluie], [compteur individuel : oui / non] ;
- [ ] des sanitaires : [description, conditions d'accès] ;
- [ ] d'autres équipements : [abri, composteur, autre].

## Article 3 : Nature de la convention

3.1. La présente convention est conclue **à titre précaire et temporaire**. Elle ne constitue ni un bail rural, ni un bail d'habitation, ni un bail commercial, et ne confère au Jardinier **aucun droit au renouvellement, au maintien dans les lieux ni à la propriété commerciale**.

3.2. Elle est conclue **à titre personnel** : le Jardinier ne peut ni la céder, ni sous-louer ou prêter le terrain, ni en confier l'usage à un tiers, sauf aux personnes de son foyer désignées à l'article 9.

## Article 4 : Durée

4.1. La convention est conclue pour **l'année culturale [AAAA]**, du **[date de début]** au **[date de fin, par défaut le 31 octobre AAAA]**.

4.2. Elle prend effet à la date de **validation** prévue à l'article 7, sous réserve du paiement de la redevance. Elle prend fin de plein droit à l'échéance, **sans tacite reconduction**.

4.3. Les parties peuvent convenir d'une nouvelle convention pour l'année suivante par la Plateforme. Le Propriétaire et le Jardinier restent libres de ne pas la conclure.

## Article 5 : Usage du terrain

5.1. Le terrain est destiné **exclusivement au jardinage potager et d'agrément à usage familial**.

5.2. **La production ne peut pas être commercialisée.** Elle est destinée à la consommation du Jardinier et de son foyer, et peut être donnée (voisins, famille, associations).

5.3. Toute autre activité (élevage, activité commerciale, stockage, camping, fêtes, etc.) est exclue sauf accord écrit du Propriétaire.

## Article 6 : Redevance et frais de service

6.1. **Redevance annuelle** : **[X] €** pour l'année culturale, payable à l'avance par le Jardinier via la Plateforme.

6.2. **Frais de service** : **[X] €**, dus par le Jardinier à la Plateforme en plus de la redevance, selon le barème en vigueur au jour de la réservation. Le montant total payé par le Jardinier est de **[X] €**.

6.3. **Versement au Propriétaire** : la Plateforme reverse la redevance au Propriétaire, sur sa demande et après validation de la convention, en trois tranches : **30 % en mars, 40 % en juin, 30 % en octobre** de l'année culturale. Le Propriétaire perçoit l'intégralité de la redevance, sans déduction des frais de service.

6.4. **Participation aux outils** (si prévue à l'article 2) : [incluse dans la redevance / due en sus, [X] €, réglée à [modalités]].

6.5. **Eau** : [incluse dans la redevance / consommation relevée au compteur individuel et remboursée selon [modalités]]. À défaut d'accord, le Jardinier use de l'eau avec modération et privilégie l'eau de récupération.

6.6. Aucune charge, taxe ou impôt afférent au terrain n'est à la charge du Jardinier. Le Propriétaire s'acquitte de ses obligations fiscales relatives à la redevance perçue.

## Article 7 : Rencontre et validation par code

7.1. Après le paiement, le Jardinier reçoit par la Plateforme un **code de validation** et les coordonnées du Propriétaire. Les parties se rencontrent et visitent le terrain.

7.2. Si le terrain convient, le Jardinier communique le code au Propriétaire, qui le saisit sur la Plateforme : la convention est alors **définitivement formée**, et vaut acceptation de ses termes par les deux parties.

7.3. Si le terrain ne convient pas, le Jardinier peut **annuler la réservation avant de communiquer le code**. La parcelle redevient disponible et la redevance est remboursée selon les CGU de la Plateforme [conditions de remboursement des frais de service à préciser].

7.4. Le Propriétaire ne peut valider qu'avec le code remis par le Jardinier.

## Article 8 : État des lieux

Un état des lieux d'entrée est dressé lors de la première rencontre (annexe A), avec photographies. À défaut, le terrain est réputé remis en bon état. Un état des lieux de sortie est dressé à la fin de la convention.

## Article 9 : Accès, horaires et fréquentation

9.1. Le Jardinier accède au terrain **[jours et horaires]**, par **[accès précis : portail, chemin, clé]**.

9.2. **[X] personne(s) au maximum** peuvent être présentes en même temps : le Jardinier et [personnes de son foyer : noms]. Les invités occasionnels sont soumis à l'accord du Propriétaire.

9.3. Le Propriétaire garantit une **jouissance paisible** et ne peut entraver l'accès aux jours et horaires convenus, sauf cas de force majeure ou accord du Jardinier.

## Article 10 : Obligations du Jardinier (charte du jardinier)

Le Jardinier s'engage à :
1. cultiver le terrain en **bon jardinier**, régulièrement, de façon à ne pas le laisser à l'abandon ;
2. pratiquer un **jardinage responsable** : respect de la réglementation sur les produits phytosanitaires, économie d'eau, compostage, pas de brûlage de déchets ;
3. ne réaliser **aucune construction, plantation d'arbres, creusement important ni modification durable** sans l'accord écrit du Propriétaire ; tout équipement installé est retiré en fin de convention ;
4. respecter le voisinage, le calme, la propreté des lieux et les règles du Propriétaire (animaux, stationnement, accès à la maison) ;
5. évacuer ses déchets et ne pas laisser de matériel dans le jardin en dehors des emplacements prévus ;
6. prendre soin des outils et équipements mis à disposition, et signaler toute panne ou dégradation ;
7. rendre le terrain **libre et propre** à la fin de la convention.

## Article 11 : Obligations du Propriétaire

Le Propriétaire s'engage à :
1. mettre le terrain à disposition **en l'état décrit** dans l'annonce, propre à l'usage de potager ;
2. informer le Jardinier de toute particularité utile (sol, pollution connue, canalisations, risque, voisinage) ;
3. garantir une **jouissance paisible** et l'accès convenu ;
4. ne pas intervenir sur les cultures, ni utiliser le terrain loué, pendant la durée de la convention, sauf accord ;
5. prévenir le Jardinier, dans les meilleurs délais, de tout événement affectant le terrain.

## Article 12 : Récoltes

Le Jardinier est propriétaire de sa récolte. À l'échéance, il récolte les cultures arrivées à maturité ; le sort des cultures restantes est réglé comme suit : [laissées au Propriétaire / à retirer avant le ...].

## Article 13 : Responsabilité et assurances

13.1. Le Jardinier est responsable des dommages qu'il cause au terrain, aux équipements, aux tiers et aux biens du Propriétaire du fait de son occupation ou des personnes qu'il y fait venir.

13.2. Le Jardinier déclare être couvert par une **assurance responsabilité civile** (contrat habitation ou responsabilité civile « vie privée ») [numéro, assureur, joindre l'attestation].

13.3. Le Propriétaire déclare que son assurance (habitation / propriétaire non occupant) **couvre la présence de tiers** sur son terrain et l'en a informé [assureur, numéro].

13.4. La Plateforme n'est pas responsable des dommages résultant de l'occupation du terrain, de l'inexécution de la convention, ni des produits cultivés. [Clause à compléter selon les CGU et l'assurance éventuellement souscrite par la Plateforme.]

## Article 14 : Fin anticipée

14.1. **Manquement grave** : en cas de manquement à une obligation essentielle (usage commercial, sous-location, dégradations, nuisances graves, défaut d'entretien), la convention peut être résiliée **après mise en demeure restée sans effet pendant [15] jours**, par lettre recommandée ou courriel avec accusé de réception.

14.2. **Cas particuliers** : vente du terrain, nécessité de travaux autorisés, force majeure : préavis de [X] mois et remboursement de la redevance au prorata de la période non utilisée.

14.3. **Départ du Jardinier** : le Jardinier peut quitter le terrain à tout moment ; la redevance déjà versée reste acquise au Propriétaire [sauf accord contraire ou cas prévu aux CGU].

14.4. En fin de convention, le Jardinier restitue le terrain libre et propre, et les parties réalisent l'état des lieux de sortie.

## Article 15 : Données personnelles

Les coordonnées échangées par la Plateforme ne sont utilisées par les parties que pour l'exécution de la convention. Elles ne peuvent être transmises à des tiers ni utilisées à d'autres fins. Le traitement des données par la Plateforme est décrit dans sa politique de confidentialité (conforme au RGPD).

## Article 16 : Litiges

16.1. Les parties cherchent d'abord une solution amiable, au besoin avec l'aide de la Plateforme.

16.2. À défaut, [recours à un médiateur : à compléter selon les CGU] puis compétence des juridictions du lieu de situation du terrain.

16.3. La convention est soumise au **droit français**.

## Article 17 : Signature

La présente convention est conclue **par voie électronique** : le paiement de la redevance par le Jardinier vaut acceptation de ses termes, la saisie du code de validation par le Propriétaire vaut signature. La Plateforme conserve la trace de ces actes (date, heure, identifiants des parties). Chaque partie reçoit un exemplaire.

Fait à [lieu], le [date de validation].

| Le Propriétaire | Le Jardinier |
|---|---|
| [Prénom NOM] : [lu et approuvé / validé par code le ...] | [Prénom NOM] : [lu et approuvé / paiement le ...] |

---

## Annexe A : État des lieux d'entrée / de sortie

| Élément | Entrée : état | Sortie : état | Observations / photos |
|---|---|---|---|
| Sol et planches de culture | | | |
| Clôture, portail, accès | | | |
| Point d'eau, cuve, compteur (relevé : ___ m³) | | | |
| Outils et équipements (liste) | | | |
| Abri, sanitaires | | | |
| Plantations existantes à préserver | | | |

Date : [___] · Signatures : [Propriétaire] [Jardinier]

## Annexe B : Charte du jardinier (rappel)

- Je respecte le terrain, ses équipements, les horaires d'accès et le nombre de personnes autorisées.
- Je jardine de façon responsable : produits nocifs proscrits, économie d'eau, compost.
- Je ne commercialise pas ma production : elle nourrit ma famille, mes voisins ou des associations.
- Je préviens le propriétaire en cas de difficulté et je rends le terrain propre en fin de saison.

## Annexe C : Plan ou photographie du périmètre mis à disposition

[Joindre une photo ou un croquis avec le périmètre, les accès, le point d'eau et les équipements.]

## Annexe D : Échéancier de versement de la redevance (information)

| Tranche | Date | Part | Montant |
|---|---|---|---|
| Mars | 01/03/[AAAA] | 30 % | [X] € |
| Juin | 01/06/[AAAA] | 40 % | [X] € |
| Octobre | 01/10/[AAAA] | 30 % | [X] € |
