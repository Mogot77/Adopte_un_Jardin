import { createContext } from 'react'
import type { AuthUser } from '@/store/queries/firebase'

export type AuthCtx = {
  /** `undefined` tant que l'état de connexion n'est pas connu, `null` si déconnecté. */
  user: AuthUser | null | undefined
  /** `ok` : compte anonyme connecté ; `loading` : en cours ou pas encore connecté. */
  access: 'loading' | 'ok'
  error: string
  login: () => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthCtx | null>(null)
