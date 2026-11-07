import type { Theme } from '@/helpers/theme'

export type LoginViewProps = {
  theme: Theme
  /** E-mail du compte connecté mais dont l'adresse n'est pas vérifiée (absent si personne n'est connecté). */
  email?: string
  /** `denied` : adresse Google non vérifiée ; absent si l'écran n'est pas bloquant. */
  blocked?: 'denied'
  error?: string
  onLogin: () => void
  onLogout: () => void
  onToggleTheme: () => void
}
