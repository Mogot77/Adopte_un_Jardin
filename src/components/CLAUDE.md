# `components/` : écrans, composants métier, `ui/`

## Un dossier par composant
`index.ts`, `<Nom>.tsx`, `types.ts` et, **seulement s'il y a du contenu**, `helpers.ts` (fonctions pures propres au composant) et `constants.ts`. Pas de fichier `export {}` de remplissage. Détail dans `.claude/skills/react-structure`.
- Composant = fonction fléchée, `export default`, props typées dans `types.ts` (`XProps`).
- Import via le dossier : `import X from '@/components/X'`.
- Une fonction utilisée par plusieurs composants monte dans `src/helpers/` ; un composant partagé de pure présentation va dans `ui/`.

## Smart + dumb
- **Conteneur** `X.tsx` : lit les hooks (`useAuth`, `useAppSelector`...), porte la logique (navigation, appels au store) et fournit les props à la vue.
- **Vue** `XView.tsx` : props seulement. Interdit : imports de `@/hooks/*` et `@/store/*`, composants « smart » à l'intérieur. Le texte et les données affichés viennent de props.
- Le modèle de la vue est construit par une fonction pure `buildXModel(...)` dans `helpers.ts`, partagée par le conteneur et la story.
- `index.ts` : `export { default } from './X'`, `export { default as XView } from './XView'`, `export type * from './types'`.
- Exemples de référence : `Search/` (modèle `buildSearchModel`), `ParcelDetail/` et `Login/`. Un champ qui a besoin d'un hook (ex. choix de commune) reçoit son état du conteneur : `useCommuneSelect` → prop `commune` de la vue.

## Stories
Chaque écran et chaque composant partagé a `X.stories.tsx` (titres `Ecrans/X`, `Composants/X`, `UI/X`), écrite sur la **vue** avec `fn()` de `storybook/test`. Une story n'importe ni le store, ni firebase, ni les hooks. Voir `src/stories/CLAUDE.md`.

## `ui/` : petits composants purs
Actuellement `Button`, `Icon`, `Field`, `Chip`, `Empty`, `Note`, `Kv`, `PageHead`, `Toasts`, `CommuneSelect`. Zéro logique métier, zéro accès au store ; pilotés par props. Avant d'écrire du balisage (bouton, carte, champ, en-tête), regarder s'il existe déjà ici ; en créer un dès qu'un élément est réutilisé par plusieurs composants.

## Style et thème
Classes Tailwind dans le JSX et classes réutilisables d'`index.css` (`card`, `btn`, `chip`...). Couleurs par jetons (`bg-surface`, `text-ink`, `text-muted`, `border-line`, `bg-brand`...), jamais en hexadécimal : le thème sombre redéfinit ces jetons.

## Accessibilité
Les boutons sans libellé texte ont un `aria-label`. Toute modale future : `role="dialog"`, `aria-modal`, piège du focus et retour du focus.
