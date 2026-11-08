import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import ImpactBanner from '@/components/ImpactBanner'
import type { LoginViewProps } from './types'

/** Accueil public (vue) : slogan, les deux parcours (jardinier / propriétaire) et bouton d'entrée. */
const LoginView = ({ theme, impact, error, onLogin, onToggleTheme }: LoginViewProps) => (
  <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-6 p-6 text-center">
    <button
      type="button" className="fixed right-4 top-4 grid size-9 place-items-center rounded-lg border border-field bg-surface text-ink"
      aria-label={theme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre'} onClick={onToggleTheme}
    ><Icon name={theme === 'dark' ? 'sun' : 'moon'} /></button>
    <div className="flex items-center gap-2 text-brand"><Icon name="leaf" size={32} /><h1 className="text-3xl">Adopte un Jardin</h1></div>
    <p className="text-xl font-semibold">Planter, récolter, économiser</p>
    <p className="max-w-xl text-sm text-muted">
      Un petit coin de terre pour cultiver votre potager, ou un jardinier pour faire vivre le vôtre : Adopte un Jardin met en relation
      les personnes qui cherchent une parcelle et celles qui en ont une à proposer.
    </p>
    <div className="grid w-full gap-4 text-left sm:grid-cols-2">
      <div className="card pad"><h2 className="h2s">Je cherche un terrain</h2><p className="muted">Trouvez une parcelle près de chez vous, réservez-la en ligne et récoltez vos légumes.</p></div>
      <div className="card pad"><h2 className="h2s">Je dépose une parcelle</h2><p className="muted">Louez la partie de votre jardin que vous ne cultivez pas et recevez une participation en trois versements.</p></div>
    </div>
    <div className="w-full"><ImpactBanner model={impact} /></div>
    <Button variant="primary" onClick={onLogin}>Entrer</Button>
    {error && <p role="alert" className="text-sm text-danger">{error}</p>}
  </main>
)

export default LoginView
