# `stories/` et Storybook

Catalogue des composants : `npm run storybook` (http://localhost:6006). Configuration dans `.storybook/` (`main.ts`, `preview.tsx` avec bascule de thème dans la barre d'outils). Publié avec le site dans `/storybook` par le workflow de déploiement (`base: './'` pour fonctionner sous un sous-dossier).

## Données factices
`mockData.ts` (réexporté par `index.ts`) : `mockCommunes`, `mockProfile`, `mockParcels`, `mockPrivate`, `mockReservations`. Les propriétaires des annonces sont `jean@example.com`, le jardinier `camille@example.com`. **Uniquement pour les stories** : ne jamais les importer depuis le code de l'application (les données réelles viennent de Firestore).

## Écrire une story
- Fichier `X.stories.tsx` à côté du composant, titre `Ecrans/X`, `Composants/X` ou `UI/X`.
- Sur la **vue** (`XView`), avec le modèle construit par le vrai `buildXModel` appliqué aux données factices ; callbacks avec `fn()` de `storybook/test`.
- 2 à 4 stories : cas par défaut, vide, et variantes qui comptent (par exemple annonce libre / réservée / la mienne).
- Dates : passer une date figée aux fonctions qui en dépendent (ex. `buildMyParcelsModel(..., '2026-11-07')`) pour des stories stables.
- Pas de hook d'état dans `render` (règles des hooks) : créer un petit composant `Demo` dans le fichier.
- Une story n'importe ni le store, ni firebase, ni `@/hooks/*`.
- La carte (`MapView`) a besoin d'internet pour les fonds de carte.
