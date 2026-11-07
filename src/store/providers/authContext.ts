import { createContext } from 'react'
import type { AuthUser } from '@/store/queries/firebase'

export type AuthCtx = {
  /** `undefined` tant que l'état de connexion n'est pas connu, `null` si déconnecté. */
  user: AuthUser | null | undefined
  /** `ok` : compte Google à e-mail vérifié ; `denied` : e-mail non vérifié ; `loading` : en cours. */
  access: 'loading' | 'ok' | 'denied'
  /** Administrateur d'origine (voir `BOOTSTRAP_ADMIN`). */
  isAdmin: boolean
  error: string
  login: () => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthCtx | null>(null)
