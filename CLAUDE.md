# Adopte un Jardin

Application web responsive (PC et téléphone) de mise en relation entre **jardiniers** qui cherchent une parcelle et **propriétaires** qui louent une partie de leur jardin. Connexion Google (Firebase Auth), inscription ouverte à tout compte à e-mail vérifié, données partagées dans Firestore, photos sur Cloudinary (seule l'URL va dans Firestore).

> Le concept, les règles métier et le périmètre de la V0.1 sont dans `docs/analyse-ancien-projet.md` (issu de l'étude de 2015-2016 conservée dans `docs/ancien_projet/`, non versionnée). **Le lire avant de toucher au métier.**

> Les consignes détaillées sont dans les `CLAUDE.md` des dossiers : `src/store/`, `src/components/`, `src/helpers/`, `src/hooks/`, `src/stories/`. Lire celui du dossier où l'on travaille.

## Stack
Vite 8, React 19, TypeScript strict, Tailwind CSS 4, Redux Toolkit, Firebase (Auth + Firestore), Leaflet, Storybook 10, ESLint (flat config).

## Commandes
- `npm run dev` : serveur de dev (http://localhost:5173) ; `lancer.bat` l'installe et le lance sous Windows
- `npm run build` : `tsc -b` puis build Vite
- `npm run lint` : ESLint
- `npm run preview` : prévisualise le build
- `npm run storybook` / `npm run build-storybook` : catalogue des composants (publié dans `/storybook` par le déploiement)
- Sous PowerShell, si `npm` est bloqué : `npm.cmd` ou `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

## Structure (`src/`)
- `App.tsx` : portail de connexion, inscription (profil), routes (routage par hash, écrans chargés à la demande)
- `components/` : un dossier par composant (écrans, composants métier, `ui/`) → voir `components/CLAUDE.md`
- `store/` : Redux Toolkit, authentification, synchro Firestore → voir `store/CLAUDE.md`
- `helpers/` : fonctions partagées (tarification, filtrage, dates, géo...) → voir `helpers/CLAUDE.md`
- `hooks/` : hooks partagés (`useApp`, `useAuth`, `useCommuneSelect`...) → voir `hooks/CLAUDE.md`
- `types/` : types du modèle de données (`Parcel`, `Reservation`, `Profile`, `Commune`)
- `stories/` : données factices pour Storybook → voir `stories/CLAUDE.md`
- `index.css` : thème (jetons CSS clair/sombre) et classes réutilisables (`card`, `btn`, `chip`, `kv`...)

## Écrans (routes par hash)
`#/` recherche (carte + liste) · `#/parcelle/:id` fiche et réservation · `#/proposer[/:id]` dépôt / modification · `#/mes-parcelles` tableau de bord propriétaire · `#/mes-reservations` tableau de bord jardinier · `#/guide` mode d'emploi et charte. Sans profil, l'écran d'inscription (`Onboarding`) s'affiche d'abord.

## Règles générales
- Noms de composants, fichiers et identifiants de code en anglais ; **commentaires de code en français** ; textes affichés en français.
- TypeScript strict : pas de `any`, pas de `as unknown as`, `type` plutôt que `interface`, fonctions fléchées. Import via l'alias `@/` (= `src/`).
- Logique métier dans les `helpers` ; les composants restent de la présentation.
- Pas de couleur hexadécimale en dur : utiliser les jetons du thème (`bg-surface`, `text-ink`, `border-line`, `bg-brand`...).
- Avant de pousser : `npm run lint` et `npm run build` doivent passer.
- Ne jamais committer de secret (clé privée, API secret Cloudinary). La config web Firebase (`VITE_FIREBASE_*`) n'en est pas un, voir « Sécurité » du README.
- Messages de commit en anglais (Conventional Commits).

## Configuration et déploiement
- Variables `VITE_FIREBASE_*`, `VITE_CLOUDINARY_*` (facultatives : sans elles, pas d'envoi de photo) et `VITE_TODAY` (facultatif) : `.env.local` en dev (modèle `.env.example`), *Variables* GitHub Actions en prod. Sans Firebase l'app s'arrête avec un message clair.
- Déploiement : GitHub Pages par `.github/workflows/deploy.yml` (lint, build, Storybook dans `dist/storybook`). `base` de Vite : `/Adopte_un_Jardin/` (à adapter au nom du dépôt GitHub).
- Firestore : règles dans `firestore.rules` (publiées à la main dans la console, **jamais testées sur l'émulateur** : à faire avant toute mise en production). Administrateur d'origine codé en dur dans les règles et dans `store/queries/users.ts`. Toute nouvelle collection doit y être déclarée. Aucun index composite nécessaire (requêtes à égalité simple).
- Le projet Firebase n'est pas encore créé : `.firebaserc` est vide.

## Points d'attention
- **Le paiement est simulé** (V0.1) : pas de prestataire, pas d'e-mails, pas de virement réel. Frais et total sont calculés côté client (le loyer est contrôlé par les règles). À déplacer côté serveur avec le vrai paiement.
- Confidentialité : l'adresse exacte vit dans `adresses/{id}` et le code de validation dans `codes/{id}`, jamais dans l'annonce publique.
- Les requêtes Firestore portent une contrainte d'égalité exigée par les règles (`status == 'publiee'`, `ownerEmail == moi`...) : ne pas les retirer.
- Préfixe des clés de stockage local : `adopte-jardin-` (thème : `adopte-jardin-theme`).
- Polices Inter, fonds de carte OpenStreetMap et recherche de communes (`geo.api.gouv.fr`) nécessitent internet.
- Pas de `<StrictMode>` dans `main.tsx` (évite les écouteurs Firestore ouverts en double en développement).
