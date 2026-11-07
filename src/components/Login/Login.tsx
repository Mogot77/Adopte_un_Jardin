import { useAuth } from '@/hooks/useAuth'
import { useTheme } from '@/hooks/useTheme'
import LoginView from './LoginView'

/** Page d'accueil publique : présentation du service et connexion Google. */
const Login = () => {
  const { user, access, login, logout, error } = useAuth()
  const { theme, toggle } = useTheme()
  const blocked = !!user && access === 'denied'
  return (
    <LoginView
      theme={theme}
      email={user?.email ?? undefined}
      blocked={blocked ? 'denied' : undefined}
      error={error}
      onLogin={() => void login()}
      onLogout={() => void logout()}
      onToggleTheme={toggle}
    />
  )
}

export default Login
