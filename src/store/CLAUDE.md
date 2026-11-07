# `store/` : état, authentification, Firestore

Redux Toolkit. Un store par session connectée, créé par `AppProvider` (qui ouvre aussi la synchro Firestore et la ferme au démontage). L'authentification passe par un contexte React (`AuthProvider`), pas par Redux.

## Organisation
- `index.ts` : `configureStore` + types (`RootState`, `AppStore`, `AppDispatch`).
- `reducers/` : `dataReducer` (profil, annonces par provenance, réservations par rôle, codes) et `uiReducer` (toasts, `syncFailed`).
- `selectors/` : `selectProfile`, `selectOpenParcels`, `selectMyParcels`, `selectAllParcels` (fusion sans doublon), réservations, codes, toasts.
- `thunks/` : `toast`.
- `providers/` : `AppProvider` (store + synchro), `AuthProvider` + `authContext` (compte Google, e-mail vérifié obligatoire).
- `queries/` : accès réseau. `firebase.ts` (init, Auth, Firestore avec cache persistant), `sync.ts` (écouteurs), `users.ts` (profil), `parcels.ts` (annonces, coordonnées privées), `reservations.ts` (réservation, annulation, validation, versements), `plants.ts` (dons de plantes : enregistrement, « c'est donné », suppression), `communes.ts` (API publique geo.api.gouv.fr).

## Synchro Firestore (`queries/sync.ts`)
Écouteurs temps réel ouverts à la connexion : profil, annonces publiées (`status == 'publiee'`), mes annonces (`ownerEmail == moi`), annonces que j'ai réservées (`gardenerEmail == moi`), réservations en tant que propriétaire et que jardinier, mes codes, dons de plantes disponibles (`status == 'disponible'`) et mes dons (`ownerEmail == moi`). **Chaque requête porte une contrainte d'égalité** : les règles de sécurité l'exigent pour autoriser une lecture de liste. Les `toX` de `queries/` lisent les documents de façon tolérante (valeurs par défaut) : on ne fait pas confiance à la forme des données stockées.

## Écritures
- Dépôt : `saveParcel` écrit l'annonce publique et ses coordonnées privées (`adresses/{id}`) dans un même lot.
- Réservation : `reserveParcel` écrit en un seul lot la réservation, le code (`codes/{id}`) et le passage de l'annonce à `reservee`. Si quelqu'un a réservé avant, les règles refusent le lot. Annulation : `cancelReservation` (lot réservation + annonce).
- Validation : `validateReservation` écrit le code saisi ; les règles le comparent au code du jardinier (que le propriétaire ne peut pas lire).
- Les horodatages sont des chaînes ISO (`nowIso()`), pas des `serverTimestamp`.
- Pas de suppression de réservation : elle passe à `annulee`.

## Règles de sécurité
`firestore.rules` est la vraie barrière (le client est modifiable) : adresse et code ne sont lisibles que par les bonnes personnes, la participation d'une réservation doit égaler celle de l'annonce, un propriétaire ne peut pas réserver sa propre annonce. Toute nouvelle collection ou tout nouveau champ écrit par un autre que le propriétaire doit y être déclaré. Penser à republier les règles dans la console après modification, et à les tester sur l'émulateur.
