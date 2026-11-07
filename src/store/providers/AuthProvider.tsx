import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { signInWithGoogle, signOutUser, watchAuth, type AuthUser } from '@/store/queries/firebase'
import { BOOTSTRAP_ADMIN, normEmail } from '@/store/queries/users'
import { AuthContext, type AuthCtx } from '@/store/providers/authContext'

const message = (e: unknown): string => {
  const code = (e as { code?: string })?.code
  if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') return ''
  if (code === 'auth/popup-blocked') return 'La fenêtre de connexion a été bloquée par le navigateur.'
  if (code === 'auth/unauthorized-domain') return "Ce domaine n'est pas autorisé dans Firebase Authentication."
  if (code === 'auth/operation-not-allowed') return "La connexion Google n'est pas activée dans Firebase Authentication."
  if (code === 'auth/network-request-failed') return 'Connexion réseau indisponible.'
  return 'Connexion impossible. Réessayez.'
}

/** Contexte d'authentification : compte Google connecté. Tout compte à e-mail vérifié peut s'inscrire (créer son profil). */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null | undefined>(undefined)
  const [error, setError] = useState('')

  useEffect(() => watchAuth(setUser), [])

  const login = useCallback(async () => {
    setError('')
    try { await signInWithGoogle() } catch (e) { setError(message(e)) }
  }, [])

  const logout = useCallback(async () => {
    try { await signOutUser() } catch (e) { setError(message(e)) }
  }, [])

  const value = useMemo<AuthCtx>(() => ({
    user,
    access: user === undefined ? 'loading' : user && user.email && user.emailVerified ? 'ok' : user ? 'denied' : 'loading',
    isAdmin: !!user?.email && normEmail(user.email) === BOOTSTRAP_ADMIN,
    error, login, logout,
  }), [user, error, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
