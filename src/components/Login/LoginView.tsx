import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import ImpactBanner from '@/components/ImpactBanner'
import GardenArt from './GardenArt'
import { GARDENER_STEPS, OWNER_STEPS, PROMISES, THEMES, type Step } from './constants'
import type { LoginViewProps } from './types'

/** Schéma d'un parcours : étapes numérotées reliées par un trait (vertical sur téléphone, horizontal sur grand écran). */
const Flow = ({ title, tone, steps }: { title: string; tone: string; steps: Step[] }) => (
  <div className="card pad">
    <h3 className={`m-0 mb-4 text-base font-bold ${tone}`}>{title}</h3>
    <ol className="m-0 grid list-none gap-4 p-0 sm:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.title} className="relative flex gap-3 sm:flex-col sm:items-center sm:text-center">
          {i < steps.length - 1 && (
            <span aria-hidden="true" className="absolute left-5 top-11 h-[calc(100%-1rem)] w-0.5 bg-brand-line sm:left-[calc(50%+1.5rem)] sm:top-5 sm:h-0.5 sm:w-[calc(100%-3rem)]" />
          )}
          <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full bg-brand-soft text-brand ring-4 ring-surface"><Icon name={s.icon} size={20} /></span>
          <span>
            <b className="block text-[13px]"><span className="text-brand">{i + 1}.</span> {s.title}</b>
            <span className="muted mt-0.5 block text-xs">{s.text}</span>
          </span>
        </li>
      ))}
    </ol>
  </div>
)

/** Accueil public (vue) : bandeau d'accueil avec les deux entrées (chercher / proposer), engagements, parcours schématiques, rubriques et récoltes du réseau. */
const LoginView = ({ theme, impact, error, onLogin, onToggleTheme }: LoginViewProps) => (
  <div className="min-h-screen">
    <header className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4">
      <div className="flex items-center gap-2 text-brand"><Icon name="leaf" size={28} /><span className="text-xl font-bold">Adopte un Jardin</span></div>
      <button
        type="button" className="grid size-8 place-items-center rounded-lg border border-field bg-surface text-ink"
        aria-label={theme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre'} onClick={onToggleTheme}
      ><Icon name={theme === 'dark' ? 'sun' : 'moon'} /></button>
    </header>

    <main className="mx-auto flex max-w-5xl flex-col gap-10 px-4 pb-12">
      <section className="grid items-center gap-6 rounded-2xl border border-brand-line bg-brand-bg p-6 md:grid-cols-[1.2fr_1fr] md:p-10">
        <div className="flex flex-col gap-4">
          <span className="chip bl w-fit">Entre voisins, simplement</span>
          <h1 className="text-3xl leading-tight md:text-4xl">Un coin de jardin pour chacun, <span className="text-brand">entre voisins</span></h1>
          <p className="m-0 max-w-xl text-[15px] text-ink2">
            Vous rêvez d’un potager sans avoir de terrain ? Vous avez un bout de jardin que vous ne cultivez pas ?
            Adopte un Jardin vous met en relation, en toute simplicité et en confiance.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={() => onLogin('search')} className="flex flex-col items-start gap-1 rounded-xl border border-brand bg-brand p-4 text-left text-surface hover:bg-brand-dark">
              <span className="flex items-center gap-2 text-base font-bold"><Icon name="search" size={20} />Je cherche un jardin</span>
              <span className="text-xs opacity-90">Trouver une parcelle près de chez moi</span>
              <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold">Chercher <Icon name="arrow" size={14} /></span>
            </button>
            <button type="button" onClick={() => onLogin('offer')} className="flex flex-col items-start gap-1 rounded-xl border border-brand bg-surface p-4 text-left text-ink hover:bg-brand-soft">
              <span className="flex items-center gap-2 text-base font-bold text-brand"><Icon name="home" size={20} />Je propose mon jardin</span>
              <span className="muted text-xs">Partager la partie que je ne cultive pas</span>
              <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-brand">Proposer <Icon name="arrow" size={14} /></span>
            </button>
          </div>
          {error && <p role="alert" className="m-0 text-sm text-danger">{error}</p>}
          <p className="muted m-0 flex items-center gap-1.5 text-xs"><Icon name="shield" size={14} />Sans mot de passe à retenir : vous entrez en un clic.</p>
        </div>
        <div className="grid place-items-center"><GardenArt /></div>
      </section>

      <section aria-label="Nos engagements">
        <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map(p => (
            <li key={p.title} className="card flex gap-3 p-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand"><Icon name={p.icon} size={18} /></span>
              <span><b className="block text-[13px]">{p.title}</b><span className="muted block text-xs">{p.text}</span></span>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="m-0 text-2xl font-bold">Comment ça marche</h2>
          <p className="muted m-0 mt-1 text-sm">Quatre étapes, dans un sens comme dans l’autre.</p>
        </div>
        <Flow title="Je suis jardinier" tone="text-brand" steps={GARDENER_STEPS} />
        <Flow title="J’ai un jardin" tone="text-warn" steps={OWNER_STEPS} />
        <p className="note info m-0"><Icon name="heart" size={16} className="mt-0.5 shrink-0 text-brand" />Une parcelle peut aussi être mise à disposition gratuitement : une convention d’occupation précaire, renouvelée chaque année, cadre simplement la relation.</p>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="m-0 text-2xl font-bold">Et aussi, pour faire vivre les jardins</h2>
          <p className="muted m-0 mt-1 text-sm">Pas besoin de louer pour participer.</p>
        </div>
        <ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-3">
          {THEMES.map(t => (
            <li key={t.title} className="card pad flex flex-col gap-2">
              <span className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-brand"><Icon name={t.icon} size={22} /></span>
                <span className="chip ok">{t.badge}</span>
              </span>
              <b className="text-base">{t.title}</b>
              <span className="muted text-[13px]">{t.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <ImpactBanner model={impact} />

      <section className="flex flex-col items-center gap-3 rounded-2xl bg-brand-soft p-8 text-center">
        <h2 className="m-0 text-2xl font-bold">Prêt à mettre les mains dans la terre ?</h2>
        <p className="muted m-0 max-w-md text-sm">Entrez, découvrez les jardins autour de vous, ou déposez le vôtre en quelques minutes.</p>
        <div className="row justify-center">
          <Button variant="primary" onClick={() => onLogin('search')}>Je cherche un jardin</Button>
          <Button onClick={() => onLogin('offer')}>Je propose mon jardin</Button>
        </div>
      </section>
    </main>
  </div>
)

export default LoginView
