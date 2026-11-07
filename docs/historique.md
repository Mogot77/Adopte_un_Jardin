# Historique du projet et point de reprise

Mis à jour le 2026-11-07. À lire en premier pour reprendre le projet.

## Ce qui a été fait
1. **Création du projet** sur le modèle d'`Application_gestion_Travaux` (même pile, mêmes conventions, `CLAUDE.md`, skill `react-structure`, déploiement GitHub Pages).
2. **Analyse de l'étude de 2015-2016** (`docs/ancien_projet/`, non versionné) → `analyse-ancien-projet.md` : concept, règles métier, périmètre V0.1, points différés, hypothèses.
3. **V0.1 développée** : recherche par commune avec carte, dépôt d'annonce, réservation avec **paiement simulé**, code de validation à 6 chiffres, tableaux de bord propriétaire et jardinier, guide. Lint, build et Storybook passent.
4. **Veille** : `note-swimmy.md` (Swimmy = piscines, pas de section jardin trouvée ; la mémoire d'un « jardin » vient probablement de We Peps) et `veille-concurrence.md` (AllotMe au Royaume-Uni, meine ernte en Allemagne, Jardins-prives.com en France...). Sites non consultés directement : statuts et tarifs à vérifier.
5. **Modèle de convention** d'occupation temporaire : `docs/modeles/convention-occupation-temporaire.md` (à faire valider par un juriste avant usage réel).
6. **Mise en ligne préparée** :
   - Dépôt GitHub : https://github.com/Mogot77/Adopte_un_Jardin (branche `main`).
   - Projet Firebase **`adopte-un-jardin`** créé (projet distinct de celui de l'autre application) ; `.firebaserc` renseigné ; config dans `.env.local` (ignoré par git).
   - Site prévu : https://mogot77.github.io/Adopte_un_Jardin/ (Storybook dans `/storybook/`).
7. **Plusieurs photos par annonce** (jusqu'à 6) : ajout/retrait dans le formulaire, galerie défilante sur la fiche ; champ `photoUrls` (l'ancien `photoUrl` reste lu).
8. **Cloudinary** : même compte que l'ancien projet (les valeurs sont copiées dans `.env.local`).

## Décisions prises
- Commission payée par le jardinier en plus du loyer ; le propriétaire reçoit 100 % du loyer en 3 tranches (30 / 40 / 30 %). Barème dans `src/helpers/pricing.ts` (la tranche 150-200 € est une hypothèse).
- Prix conseillé environ 4 €/m²/an, fourchette autorisée ±50 %.
- Adresse exacte et code de validation séparés de l'annonce publique (`adresses/{id}`, `codes/{id}`).
- Inscription ouverte à tout compte Google à e-mail vérifié. Administrateur d'origine : `vallet.morgan@gmail.com` (en dur dans `firestore.rules` et `src/store/queries/users.ts`).
- Photos sur Cloudinary (gratuit, sans carte) plutôt que Firebase Storage (forfait payant) ou Firestore (limite de 1 Mo).
- Le déploiement lit la config dans les **Secrets** GitHub (pas les Variables) : modifié depuis GitHub, aligné ensuite pour Cloudinary.
- Messages de commit en anglais (Conventional Commits) ; commentaires de code en français.

## État actuel
| Élément | État |
|---|---|
| Code V0.1 + photos multiples | Poussé sur `main` |
| Projet Firebase | Créé. **À confirmer** : Authentication Google activé, Firestore créé en `eur3`, règles publiées, domaine `mogot77.github.io` autorisé |
| Test en local | **Pas encore fait** (relancer `lancer.bat` après modification de `.env.local`) |
| Secrets GitHub | 6 × `VITE_FIREBASE_*` ajoutés (à vérifier) ; **`VITE_CLOUDINARY_CLOUD` et `VITE_CLOUDINARY_PRESET` à ajouter** |
| GitHub Pages | Source « GitHub Actions » à vérifier ; relancer le workflow après les secrets |
| Règles Firestore | **Jamais testées** (ni émulateur, ni deux comptes) |

## Limites connues
- Paiement simulé : pas de prestataire, pas d'e-mails, pas de virements ; frais et total calculés côté client.
- Documents juridiques (convention, charte) non validés par un juriste.
- Pas de modération, d'avis ni d'assurance.

## Prochaines étapes proposées
1. Ajouter les 2 secrets Cloudinary, relancer le workflow, vérifier le site en ligne.
2. Tester le parcours complet avec **deux comptes Google** (propriétaire et jardinier) : dépôt avec photos, réservation, code, adresse masquée avant paiement.
3. Tester les règles Firestore sur l'émulateur.
4. Pistes V0.2 : acceptation de la demande par le propriétaire, avis, assurance, vrai paiement (côté serveur), e-mails, version Word de la convention, mode démo sans Firebase.

## Pièges rencontrés
- Le dépôt GitHub créé avec un README oblige à un `git pull --rebase` avant le premier envoi.
- `base` de Vite = `/Adopte_un_Jardin/` : doit rester identique au nom du dépôt.
- `.env.local` n'est lu qu'au démarrage du serveur de dev.
