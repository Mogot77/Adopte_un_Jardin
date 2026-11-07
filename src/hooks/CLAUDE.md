# `hooks/` : hooks partagés

- `useApp()` : profil du compte (une fois créé) et `toast(texte, type)`. À utiliser dans les conteneurs situés sous `AppProvider`.
- `useAuth()` : compte Google connecté, `isAdmin`, `login`/`logout` (contexte fourni par `AuthProvider`).
- `useRoute()` / `go()` / `replace()` : routage par hash (route par défaut `#/`).
- `useTheme()` : thème clair/sombre.
- `useCommuneSelect(valeur, onPick)` : état d'un champ de choix de commune (saisie, suggestions avec délai de 250 ms) ; son résultat se passe tel quel à `ui/CommuneSelect`.
- `useParcelPrivates(ids)` : adresses exactes auxquelles le compte a droit (propriétaire, ou jardinier ayant payé) ; les autres restent absentes.
- `usePhotoUpload(urls, update)` : envoi de plusieurs photos (Cloudinary) vers la liste d'URL d'un formulaire (annonces de parcelles et de plantes).
- `useAppStore.ts` : hooks Redux typés (`useAppSelector`, `useAppDispatch`, `useAppStore`).

Un hook propre à un seul composant va dans le dossier de ce composant. Les vues (`*View.tsx`) n'importent jamais ces hooks : seuls les conteneurs le font.
