import { useMemo } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useImpact } from '@/hooks/useImpact'
import { useTheme } from '@/hooks/useTheme'
import { buildImpactModel } from '@/components/ImpactBanner'
import LoginView from './LoginView'

/** Page d'accueil publique : présentation du service, kilos récoltés depuis le lancement et entrée (connexion anonyme, provisoire). */
const Login = () => {
  const { login, error } = useAuth()
  const { theme, toggle } = useTheme()
  const months = useImpact()
  const impact = useMemo(() => buildImpactModel(months), [months])
  return <LoginView theme={theme} impact={impact} error={error} onLogin={() => void login()} onToggleTheme={toggle} />
}

export default Login
