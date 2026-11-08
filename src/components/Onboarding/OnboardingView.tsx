import Button from '@/components/ui/Button'
import CommuneSelect from '@/components/ui/CommuneSelect'
import Field from '@/components/ui/Field'
import type { OnboardingViewProps } from './types'

/** Inscription (vue) : coordonnées de base et choix des usages. */
const OnboardingView = ({ form, commune, saving, error, onChange, onSubmit }: OnboardingViewProps) => (
  <main className="mx-auto max-w-xl p-6">
    <h1>Bienvenue !</h1>
    <p className="muted mb-5 mt-1">Quelques informations pour créer votre profil.</p>
    <form className="card pad stack" onSubmit={e => { e.preventDefault(); onSubmit() }}>
      <Field label="Nom affiché"><input className="in" value={form.name} onChange={e => onChange({ name: e.target.value })} autoComplete="name" /></Field>
      <Field label="Téléphone (facultatif)" hint="Communiqué seulement à la personne avec qui vous concluez une location.">
        <input className="in" type="tel" value={form.phone} onChange={e => onChange({ phone: e.target.value })} autoComplete="tel" />
      </Field>
      <div><span className="lbl">Votre commune</span><CommuneSelect {...commune} /></div>
      <fieldset className="stack" style={{ '--gap': '8px' } as React.CSSProperties}>
        <legend className="lbl">Je viens pour…</legend>
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.wantsGarden} onChange={e => onChange({ wantsGarden: e.target.checked })} />chercher un terrain à cultiver</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.offersGarden} onChange={e => onChange({ offersGarden: e.target.checked })} />proposer une parcelle de mon jardin</label>
      </fieldset>
      {error && <p role="alert" className="text-sm text-danger">{error}</p>}
      <Button type="submit" variant="primary" disabled={saving}>{saving ? 'Enregistrement…' : "Créer mon profil"}</Button>
    </form>
  </main>
)

export default OnboardingView
