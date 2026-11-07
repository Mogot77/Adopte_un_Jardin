import Icon from '@/components/ui/Icon'
import Toasts from '@/components/ui/Toasts'
import type { LayoutViewProps } from './types'

/** Cadre (vue) : barre de navigation et zone de contenu. */
const LayoutView = ({ theme, name, nav, toasts, children, onToggleTheme, onLogout, onCloseToast }: LayoutViewProps) => (
  <>
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3">
        <a href="#/" className="flex items-center gap-2 text-lg font-bold text-ink no-underline">
          <Icon name="leaf" size={22} className="text-brand" />Adopte un Jardin
        </a>
        <nav aria-label="Navigation principale" className="flex flex-1 flex-wrap gap-1">
          {nav.map(n => (
            <a
              key={n.href} href={n.href} aria-current={n.active ? 'page' : undefined}
              className={`rounded-lg px-3 py-1.5 text-[13px] font-semibold no-underline ${n.active ? 'bg-brand-soft text-brand' : 'text-ink2 hover:bg-ro'}`}
            >{n.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {name && <span className="hidden text-[13px] text-muted sm:inline">{name}</span>}
          <button
            type="button" className="grid size-9 place-items-center rounded-lg border border-field bg-surface text-ink"
            aria-label={theme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre'} onClick={onToggleTheme}
          ><Icon name={theme === 'dark' ? 'sun' : 'moon'} /></button>
          <button type="button" className="btn btn-sm" onClick={onLogout}>Déconnexion</button>
        </div>
      </div>
    </header>
    <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    <Toasts items={toasts} onClose={onCloseToast} />
  </>
)

export default LayoutView
