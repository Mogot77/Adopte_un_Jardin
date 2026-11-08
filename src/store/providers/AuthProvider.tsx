import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { signInAnonymous, signOutUser, watchAuth, type AuthUser } from '@/store/queries/firebase'
import { AuthContext, type AuthCtx } from '@/store/providers/authContext'

const message = (e: unknown): string => {
  const code = (e as { code?: string })?.code
  if (code === 'auth/operation-not-allowed') return "La connexion anonyme n'est pas activée dans Firebase Authentication."
  if (code === 'auth/network-request-failed') return 'Connexion réseau indisponible.'
  return 'Connexion impossible. Réessayez.'
}

/** Contexte d'authentification : compte anonyme (provisoire). L'`uid` sert d'identité ; le profil se crée ensuite (inscription). */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null | undefined>(undefined)
  const [error, setError] = useState('')

  useEffect(() => watchAuth(setUser), [])

  const login = useCallback(async () => {
    setError('')
    try { await signInAnonymous() } catch (e) { setError(message(e)) }
  }, [])

  const logout = useCallback(async () => {
    try { await signOutUser() } catch (e) { setError(message(e)) }
  }, [])

  const value = useMemo<AuthCtx>(() => ({
    user,
    access: user ? 'ok' : 'loading',
    error, login, logout,
  }), [user, error, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
