# `helpers/` : fonctions partagées

Fonctions utilisées par **plusieurs** composants (ou par le store). Une fonction propre à un seul composant va dans le `helpers.ts` de ce composant.

- `pricing.ts` : règles d'argent. Prix conseillé et fourchette, gammes de surface, `commission` (barème payé par le jardinier), `payoutSchedule` (versements mars 30 % / juin 40 % / octobre 30 %), `eur`. Constantes `COMMISSION_BANDS`, `PAYOUT_TRANCHES` partagées avec le mode d'emploi.
- `parcels.ts` : filtrage de la recherche (`filterParcels`), bulles de la carte (`groupByCommune`), validation du dépôt (`draftIssues`), libellés d'eau.
- `dates.ts` : `TODAY` (fuseau local ; `VITE_TODAY` force une date), `nowIso`, `fmtDate`, `currentSeason` (année culturale à réserver).
- `geo.ts` : distance (haversine), centrage et zoom de carte.
- `ids.ts` : identifiant de réservation (`<parcelId>__<e-mail>`, utilisé par les règles Firestore) et code de validation.
- `photos.ts` : redimensionnement et envoi Cloudinary (désactivé sans configuration).
- `theme.ts` : choix clair/sombre (le hook est dans `hooks/useTheme.ts`). `roles.ts` : rôles des comptes.

Règles : fonctions pures autant que possible, type de retour explicite, aucun import de composant, de hook ou du store (sauf types). Les accès réseau (Firestore, API communes) sont dans `store/queries/`. Toute règle d'argent se teste en l'exécutant sur des cas chiffrés avant de la modifier.
