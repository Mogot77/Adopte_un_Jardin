import { useMemo } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useImpact } from '@/hooks/useImpact'
import { go } from '@/hooks/useRoute'
import { useTheme } from '@/hooks/useTheme'
import { buildImpactModel } from '@/components/ImpactBanner'
import LoginView from './LoginView'
import type { LoginIntent } from './types'

/** Page d'accueil publique : présentation du service, kilos récoltés depuis le lancement et entrée (connexion anonyme, provisoire). Le choix « proposer » ouvre le formulaire de dépôt après l'inscription. */
const Login = () => {
  const { login, error } = useAuth()
  const { theme, toggle } = useTheme()
  const months = useImpact()
  const impact = useMemo(() => buildImpactModel(months), [months])
  const enter = (intent: LoginIntent) => { void login().then(() => { if (intent === 'offer') go('#/proposer') }) }
  return <LoginView theme={theme} impact={impact} error={error} onLogin={enter} onToggleTheme={toggle} />
}

export default Login
