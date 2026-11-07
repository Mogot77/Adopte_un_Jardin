import Button from '@/components/ui/Button'
import Chip from '@/components/ui/Chip'
import CommuneSelect from '@/components/ui/CommuneSelect'
import Empty from '@/components/ui/Empty'
import Field from '@/components/ui/Field'
import PageHead from '@/components/ui/PageHead'
import PlantCard from '@/components/PlantCard'
import type { SwapViewProps } from './types'

/** Échange de plantes (vue) : dons disponibles près de chez soi et mes propres dons. */
const SwapView = ({ model, commune, radiusKm, radiusOptions, kind, kindOptions, busyId, onRadius, onKind, onOpen, onNew, onEdit, onToggle, onDelete }: SwapViewProps) => (
  <>
    <PageHead
      title="Échange de plantes" subtitle="Plants, semis, graines et boutures donnés gratuitement entre jardiniers. Rien ne se vend ici."
      actions={<Button variant="primary" onClick={onNew}>Donner des plantes</Button>}
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
    </div>

    <section aria-label="Dons disponibles" className="stack" style={{ '--gap': '10px' } as React.CSSProperties}>
      <b>{model.cards.length} don{model.cards.length > 1 ? 's' : ''} disponible{model.cards.length > 1 ? 's' : ''}</b>
      {model.cards.length === 0
        ? <Empty>Aucun don ne correspond à votre recherche. Élargissez le rayon, ou soyez le premier à proposer des plantes.</Empty>
        : <div className="grid gap-3 md:grid-cols-2">{model.cards.map(c => <PlantCard key={c.id} model={c} onOpen={onOpen} />)}</div>}
    </section>

    <section aria-label="Mes dons" className="mt-8">
      <h2 className="h2 mb-3">Mes dons</h2>
      {model.mine.length === 0 ? (
        <div className="card"><Empty>Vous n'avez pas encore proposé de plantes. Un surplus de semis ou de boutures fera des heureux près de chez vous.</Empty></div>
      ) : (
        <div className="stack" style={{ '--gap': '10px' } as React.CSSProperties}>
          {model.mine.map(row => (
            <article key={row.id} className="card pad">
              <div className="row between">
                <div>
                  <button type="button" className="border-0 bg-transparent p-0 text-left text-[15px] font-bold text-ink hover:text-brand" onClick={() => onOpen(row.id)}>{row.title}</button>
                  <p className="muted text-[13px]">{row.kindLabel} · {row.quantityLabel} · {row.communeLabel}</p>
                </div>
                {row.status === 'disponible' ? <Chip tone="ok">Disponible</Chip> : <Chip>Donné</Chip>}
              </div>
              <div className="row mt-3">
                <Button size="sm" onClick={() => onEdit(row.id)} disabled={busyId === row.id}>Modifier</Button>
                <Button size="sm" onClick={() => onToggle(row.id, row.status)} disabled={busyId === row.id}>
                  {row.status === 'disponible' ? "C'est donné" : 'Remettre à disposition'}
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

export default SwapView
