# Analyse de l'ancien projet (2015-2016) et périmètre de la V0.1

Source : `docs/ancien_projet/` (dossier SCOP « Start-up Adopte un Jardin », cartes mentales du site, étude de marché, accroche de financement participatif, maquettes Photoshop, CGU et contrat de location en format Pages, présentation Keynote). Ces fichiers ne sont pas versionnés (`.gitignore`, ~500 Mo).

## 1. Le concept

Une **interface de mise en relation** entre deux types d'usagers :

- le **jardinier** : cherche un petit coin de terre pour un potager (une parcelle de 200 m² nourrit une famille de 4 personnes presque toute l'année) ;
- le **propriétaire** : loue contre rémunération la partie de son jardin qu'il ne cultive pas. Un propriétaire peut aussi être jardinier.

Valeurs : projet solidaire. La production est destinée à la famille, aux voisins ou aux associations, **jamais commercialisée**. Une **charte du jardinier** est signée. Cible : majoritairement des plus de 50 ans, donc interface légère et simple.

Marché : la liste d'attente de la FNJFC en Île-de-France dépasse 4 200 personnes pour 3 500 parcelles ; demande estimée à 10-15 % des foyers en immeuble dans les zones denses. Offre existante : annonces éparses (Leboncoin, « Prêter son jardin »), prix relevés de 20 à 50 €/mois pour 100 m².

## 2. Règles métier retenues

| Sujet | Règle de l'étude |
|---|---|
| Annonce | surface par gamme (10-50, 50-100, 100-150, 150+ m²), prix proposé par la plateforme (moyenne du secteur) et ajustable dans une limite, outils (de l'euro symbolique à X €/an), eau (cuves, compteur individuel), jours/horaires d'accès, nombre de personnes simultanées, sanitaires, équipements annexes, photo, adresse |
| Confidentialité | l'adresse n'est communiquée qu'**après le prépaiement** |
| Réservation | le jardinier choisit, confirme (prend connaissance des caractéristiques), paie en ligne ; il reçoit un **code** et les coordonnées du propriétaire ; le propriétaire est averti. Après une **première rencontre**, l'offre est acceptée ou refusée par validation du code |
| Commission | payée **par le jardinier en plus du loyer** : forfait 2,5 € jusqu'à 50 €/an, 5 % jusqu'à 100 €, 4,5 % jusqu'à 150 €, 3 % au-delà de 200 €, 2,5 % au-delà de 500 € |
| Versements | le propriétaire demande son virement ; le loyer lui est reversé en 3 tranches : **mars 30 %, juin 40 %, octobre 30 %** |
| Recherche | par commune / périmètre ; la carte affiche un rond avec le **nombre de jardins** ; détails réservés aux inscrits |
| Alertes | alerte quand un jardin apparaît dans le périmètre de recherche |
| Tableau de bord jardinier | « j'ai planté » (récolte, conseils de plantation), maladies des plantes (mode d'emploi), photos de la parcelle |
| Tableau de bord propriétaire | mes parcelles (contrat, plantes cultivées, photos du jardinier), demande de virement, module potager s'il est aussi jardinier |
| Pages | accueil (slogan « Planter, récolter, économiser », « Je cherche un terrain », « Déposez une parcelle »), connexion, inscription, mode d'emploi, charte environnementale, témoignages, presse |

Modèle économique complet (hors V0.1) : commission, partenariats matériel et graines, publicité, formations, offre aux entreprises ayant des friches.

## 3. Périmètre de la V0.1

**Inclus**

- Connexion Google, inscription (profil : nom, commune, « je cherche » et/ou « je propose » : un même compte peut faire les deux).
- Recherche par commune + rayon, carte Leaflet à bulles (nombre de jardins par commune), filtre par loyer, liste d'annonces.
- Fiche d'annonce, dépôt / modification / retrait d'une parcelle (prix conseillé et fourchette, photo si Cloudinary est configuré).
- Réservation atomique avec **paiement simulé**, frais de service selon le barème, code de validation, révélation de l'adresse et du téléphone après paiement, annulation par le jardinier avant validation.
- Tableau de bord propriétaire : validation du code, échéancier mars/juin/octobre, demande de virement par tranche.
- Tableau de bord jardinier : réservations, code, coordonnées.
- Mode d'emploi (parcours, barème, charte du jardinier).

**Reporté** (à planifier pour les versions suivantes)

| Sujet | Pourquoi |
|---|---|
| Paiement CB réel et remboursement | nécessite un prestataire (Stripe, Mangopay...) et un serveur (Cloud Functions) |
| E-mails de confirmation (jardinier, propriétaire) | idem : envoi côté serveur |
| Virement effectif et RIB du propriétaire | données bancaires sensibles, à traiter avec le prestataire de paiement |
| Alertes de périmètre | e-mails / notifications |
| Tableau de bord potager (plantations, récoltes, maladies, photos) | contenu agronomique à écrire |
| Contrat de location et CGU juridiques | rédaction juridique (modèles dans `ancien_projet/CGU` et `ETUDE DE MARCHE/#DOSSIER/Contrat_location_vierge.pages`) |
| Assurance / protection juridique des deux parties | à étudier |
| Eau incluse dans le prix, jardins gratuits (dons) | « à trancher juridiquement » dans l'étude |
| Recherche cartographique par périmètre dessiné, pages témoignages / presse / blog | confort |
| Administration (modération, suivi des versements) | l'administrateur d'origine a déjà un accès en lecture par les règles |

## 4. Choix et hypothèses à valider

- **Barème de commission** : l'étude ne couvre pas 150-200 € ; la V0.1 applique 4,5 % jusqu'à 200 €. Le barème a une irrégularité aux bornes (200 € → 9 €, 300 € → 9 €), héritée de l'étude.
- **Prix conseillé** : ~4 €/m²/an (≈ 35 €/mois pour 100 m², relevé de 2015), fourchette autorisée ±50 %. À recaler sur les prix actuels.
- **Année culturale** : réservation de l'année en cours jusqu'en septembre, de la suivante à partir d'octobre.
- **Code de validation** : généré à la réservation, lisible par le seul jardinier (collection `codes`), saisi par le propriétaire ; les règles Firestore vérifient le code.
- **Sécurité des montants** : le prix est contrôlé par les règles Firestore, mais frais et total sont calculés côté client. Acceptable tant que le paiement est simulé ; à déplacer côté serveur avec le vrai paiement.
- **Inscription ouverte** : contrairement à l'application de travaux, tout compte Google à e-mail vérifié peut s'inscrire (pas de liste blanche).

## 5. Modèle de données (Firestore)

| Collection | Contenu | Accès |
|---|---|---|
| `users/{email}` | profil : nom, téléphone, commune, `wantsGarden`, `offersGarden`, `role` | le titulaire ; admins |
| `parcelles/{id}` | annonce publique (sans adresse), `status` publiee / reservee / retiree, `gardenerEmail` | publiées : tout compte ; sinon propriétaire et jardinier |
| `adresses/{id}` | adresse exacte et téléphone du propriétaire | propriétaire ; jardinier ayant une réservation payée |
| `reservations/{parcelId__email}` | réservation, montants, statut payee / validee / annulee, versements demandés | propriétaire et jardinier concernés |
| `codes/{parcelId__email}` | code de validation | jardinier seulement |

Les règles sont dans `firestore.rules` (non testées sur l'émulateur à ce stade).
