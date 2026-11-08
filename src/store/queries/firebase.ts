import { initializeApp } from 'firebase/app'
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore'
import { getAuth, onAuthStateChanged, signInAnonymously, signOut, type User } from 'firebase/auth'

/** Configuration web Firebase, lue dans les variables VITE_FIREBASE_* (.env.local en dev, variables GitHub Actions en prod).
 *  Ce n'est PAS un secret : ces valeurs indiquent seulement quel projet contacter et se retrouvent dans le JavaScript de tout site Firebase.
 *  La sécurité vient des règles Firestore (compte connecté, même anonyme) et des domaines autorisés, voir « Sécurité » dans le README. */
const env = import.meta.env
const config = {
  apiKey: env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  projectId: env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined,
  appId: env.VITE_FIREBASE_APP_ID as string | undefined,
}
if (!config.apiKey || !config.projectId) throw new Error('Configuration Firebase absente : renseignez les variables VITE_FIREBASE_* (voir .env.example).')

export const app = initializeApp(config)

/** Cache local persistant : les écritures en attente survivent à un rechargement ou à une coupure réseau. */
export const db = initializeFirestore(app, { localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }) })

const auth = getAuth(app)

export type AuthUser = User

export const watchAuth = (cb: (u: User | null) => void) => onAuthStateChanged(auth, cb)
/** Connexion anonyme (provisoire) : l'identité est l'`uid`, conservé par le navigateur tant que ses données ne sont pas effacées. */
export const signInAnonymous = () => signInAnonymously(auth)
export const signOutUser = () => signOut(auth)
