import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useImpact } from '@/hooks/useImpact'
import { go } from '@/hooks/useRoute'
import { useTheme } from '@/hooks/useTheme'
import { buildImpactModel } from '@/components/ImpactBanner'
import LoginView from './LoginView'
import { TAGLINES } from './constants'
import type { LoginIntent } from './types'

/** Page d'accueil publique : présentation du service, kilos récoltés depuis le lancement et entrée (connexion anonyme, provisoire). Le choix « proposer » ouvre le formulaire de dépôt après l'inscription. */
const Login = () => {
  const { login, error } = useAuth()
  const { theme, toggle } = useTheme()
  const months = useImpact()
  const impact = useMemo(() => buildImpactModel(months), [months])
  // L'accroche change toutes les 6 secondes (jeux de mots), en repartant de la phrase d'origine.
  const [tagIndex, setTagIndex] = useState(0)
  useEffect(() => {
    const id = window.setInterval(() => setTagIndex(i => (i + 1) % TAGLINES.length), 6000)
    return () => window.clearInterval(id)
  }, [])
  const enter = (intent: LoginIntent) => { void login().then(() => { if (intent === 'offer') go('#/proposer') }) }
  return <LoginView theme={theme} tagline={TAGLINES[tagIndex]} impact={impact} error={error} onLogin={enter} onToggleTheme={toggle} />
}

export default Login
