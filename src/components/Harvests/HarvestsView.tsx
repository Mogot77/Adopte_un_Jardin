import Button from '@/components/ui/Button'
import Chip from '@/components/ui/Chip'
import CommuneSelect from '@/components/ui/CommuneSelect'
import Empty from '@/components/ui/Empty'
import Field from '@/components/ui/Field'
import PageHead from '@/components/ui/PageHead'
import HarvestCard from '@/components/HarvestCard'
import type { HarvestsViewProps } from './types'

/** « À cueillir » (vue) : offres de fruits, aromatiques et légumes près de chez soi, et mes propres offres. */
const HarvestsView = ({ model, commune, radiusKm, radiusOptions, kind, kindOptions, onlyNow, busyId, onRadius, onKind, onOnlyNow, onOpen, onNew, onEdit, onToggle, onDelete }: HarvestsViewProps) => (
  <>
    <PageHead
      title="À cueillir" subtitle="Fruits, aromatiques et légumes à ramasser chez des particuliers, au bon moment, pour éviter le gaspillage. Gratuit : rien ne se vend ici."
      actions={<Button variant="primary" onClick={onNew}>Proposer ma récolte</Button>}
    />
    <div className="card pad mb-4 grid gap-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
      <div><span className="lbl">Où ?</span><CommuneSelect {...commune} /></div>
      <Field label="Rayon">
        <select className="in" value={radiusKm} onChange={e => onRadius(Number(e.target.value))}>
          {radiusOptions.map(r => <option key={r} value={r}>{r} km</option>)}
        </select>
      </Field>
      <Field label="Je cherche">
        <select className="in" value={kind} onChange={e => onKind(e.target.value as typeof kind)}>
          <option value="">Tout</option>
          {kindOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </Field>
      <label className="row sm:col-span-3">
        <input type="checkbox" checked={onlyNow} onChange={e => onOnlyNow(e.target.checked)} />
        <span>Seulement ce qui se cueille en {model.monthName}</span>
      </label>
    </div>

    <section aria-label="Offres à cueillir" className="stack" style={{ '--gap': '10px' } as React.CSSProperties}>
      <b>{model.cards.length} offre{model.cards.length > 1 ? 's' : ''} près de chez vous</b>
      {model.cards.length === 0
        ? <Empty>Rien à cueillir ne correspond à votre recherche. Élargissez le rayon, décochez « seulement ce mois-ci », ou proposez les arbres de votre jardin.</Empty>
        : <div className="grid gap-3 md:grid-cols-2">{model.cards.map(c => <HarvestCard key={c.id} model={c} onOpen={onOpen} />)}</div>}
    </section>

    <section aria-label="Mes offres" className="mt-8">
      <h2 className="h2 mb-3">Mes offres</h2>
      {model.mine.length === 0 ? (
        <div className="card"><Empty>Vous n'avez rien proposé. Des fruits qui tombent, du thym qui déborde : indiquez la période, et des voisins viendront se servir.</Empty></div>
      ) : (
        <div className="stack" style={{ '--gap': '10px' } as React.CSSProperties}>
          {model.mine.map(row => (
            <article key={row.id} className="card pad">
              <div className="row between">
                <div>
                  <button type="button" className="border-0 bg-transparent p-0 text-left text-[15px] font-bold text-ink hover:text-brand" onClick={() => onOpen(row.id)}>{row.title}</button>
                  <p className="muted text-[13px]">{row.summary} · {row.communeLabel}</p>
                </div>
                {row.status === 'ouverte' ? <Chip tone="ok">Ouverte</Chip> : <Chip tone="bl">Récolte terminée</Chip>}
              </div>
              <div className="row mt-3">
                <Button size="sm" onClick={() => onEdit(row.id)} disabled={busyId === row.id}>Modifier</Button>
                <Button size="sm" variant={row.status === 'ouverte' ? 'primary' : 'default'} onClick={() => onToggle(row.id, row.status)} disabled={busyId === row.id}>
                  {row.status === 'ouverte' ? 'Plus rien à cueillir : récolte réussie !' : 'Rouvrir'}
                </Button>
                <Button size="sm" variant="danger" onClick={() => onDelete(row.id)} disabled={busyId === row.id}>Supprimer</Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  </>
)

export default HarvestsView
