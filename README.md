# Adopte un Jardin

Application web responsive (PC et téléphone) qui met en relation des **jardiniers** à la recherche d'une parcelle et des **propriétaires** qui louent une partie de leur jardin. Slogan : « Planter, récolter, économiser ».

> **V0.1** : recherche par commune avec carte, dépôt d'annonce, réservation avec **paiement simulé**, code de validation, tableaux de bord propriétaire et jardinier. Concept et périmètre : [docs/analyse-ancien-projet.md](docs/analyse-ancien-projet.md).

## Technologies

| Domaine | Technologie |
|---|---|
| Framework UI | **React 19** |
| État global | **Redux Toolkit** + `react-redux` |
| Langage | **TypeScript 6** (mode strict) |
| Build / dev server | **Vite 8** + `@vitejs/plugin-react` |
| Styles | **Tailwind CSS 4** + classes réutilisables dans `index.css`, thème clair/sombre par jetons CSS |
| Authentification | **Firebase Auth** (connexion Google, e-mail vérifié) |
| Base de données | **Cloud Firestore** |
| Carte | **Leaflet** + OpenStreetMap ; communes via l'API publique geo.api.gouv.fr |
| Photos | **Cloudinary** (facultatif, preset *unsigned*) |
| Composants | **Storybook 10** (publié dans `/storybook`) |
| Qualité | **ESLint 10** (flat config, `typescript-eslint`, `react-hooks`, `react-refresh`) |
| Déploiement | **GitHub Pages** via **GitHub Actions** (`.github/workflows/deploy.yml`) |

## Structure du projet

```
src/
  App.tsx              portail de connexion + routes par hash
  components/          un dossier par composant (Search, ParcelDetail, ParcelForm, MyParcels, MyReservations, ui/...)
  store/               Redux Toolkit, AuthProvider, accès Firebase
  helpers/             fonctions partagées (tarification, filtrage, dates, géo)
  hooks/               useAuth, useRoute, useTheme, hooks Redux
  stories/             données factices pour Storybook
  index.css            thème et classes réutilisables
```

Les consignes détaillées sont dans les `CLAUDE.md` de chaque dossier.

## Démarrage

```bash
npm install
cp .env.example .env.local   # puis renseigner les valeurs Firebase
npm run dev                  # http://localhost:5173
```

Sous Windows, `lancer.bat` installe les dépendances si besoin et ouvre le navigateur.

### Configuration (`.env.local`)

1. Créer un projet Firebase ; activer **Authentication > Google** et **Firestore** (région `eur3`).
2. Copier la config web (Paramètres du projet > Vos applications) dans `.env.local` (`VITE_FIREBASE_*`). Pour les photos : créer un compte Cloudinary et un preset *unsigned*, puis renseigner `VITE_CLOUDINARY_*` (facultatif).
3. Publier `firestore.rules` dans la console Firestore (idéalement après les avoir testées sur l'émulateur).
4. L'inscription est ouverte à tout compte Google à e-mail vérifié (profil créé à la première connexion). L'administrateur d'origine est reconnu d'office dans les règles.
5. En production : renseigner les mêmes valeurs dans *Settings > Secrets and variables > Actions > Variables* du dépôt GitHub, et activer GitHub Pages (source : GitHub Actions).

### Commandes

`npm run dev` · `npm run build` · `npm run lint` · `npm run preview` · `npm run storybook`

## Sécurité

La configuration web Firebase (`VITE_FIREBASE_*`) n'est **pas un secret** : elle désigne le projet et se retrouve dans le JavaScript de tout site Firebase. Ce qui protège les données : les règles Firestore (`firestore.rules` : compte connecté, e-mail vérifié, présent dans la liste blanche) et les domaines autorisés dans Firebase Authentication. Ne jamais committer de clé privée.

## Consignes pour Claude Code

Voir `CLAUDE.md` à la racine et dans `src/*/`. Skill du projet : `.claude/skills/react-structure` (structure d'un projet React/TypeScript).
