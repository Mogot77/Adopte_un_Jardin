import Button from '@/components/ui/Button'
import Empty from '@/components/ui/Empty'
import Field from '@/components/ui/Field'
import type { ProductionStatsViewProps } from './types'

/** Production d'un jardin (vue) : totaux par culture, saisies et formulaire pour noter une récolte. */
const ProductionStatsView = ({ model, draft: d, suggestions, kindOptions, maxKg, today, busy, issues, onChange, onSubmit, onDelete }: ProductionStatsViewProps) => (
  <section className="card pad stack" style={{ '--gap': '14px' } as React.CSSProperties} aria-label="Production du jardin">
    <div className="row between">
      <h2 className="h2">Production du jardin</h2>
      <p className="text-[15px]"><b>{model.totalLabel}</b> <span className="muted">récoltés</span></p>
    </div>
    <p className="muted text-[13px]">Notez ce que vous récoltez (kilos de cerises, de courgettes, de tomates…). Chaque saisie s'ajoute au compteur de l'accueil.</p>

    {model.crops.length === 0
      ? <Empty>Aucune récolte notée pour le moment.</Empty>
      : (
        <table className="t w-full" aria-label="Totaux par culture">
          <thead><tr><th>Culture</th><th>Type</th><th>Récoltes</th><th className="text-right">Total</th></tr></thead>
          <tbody>{model.crops.map(c => <tr key={c.key}><td>{c.name}</td><td>{c.kindLabel}</td><td>{c.countLabel}</td><td className="text-right font-semibold">{c.kgLabel}</td></tr>)}</tbody>
        </table>
      )}

    <form className="grid gap-3 sm:grid-cols-4" onSubmit={e => { e.preventDefault(); onSubmit() }}>
      <h3 className="h2s sm:col-span-4">Noter une récolte</h3>
      <Field label="Culture" className="sm:col-span-2">
        <input className="in" list="crop-suggestions" value={d.crop} maxLength={40} placeholder="Ex. Cerises, courgettes…" onChange={e => onChange({ crop: e.target.value })} />
        <datalist id="crop-suggestions">{suggestions.map(s => <option key={s} value={s} />)}</datalist>
      </Field>
      <Field label="Type">
        <select className="in" value={d.kind} onChange={e => onChange({ kind: e.target.value as typeof d.kind })}>
          {kindOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </Field>
      <Field label="Poids (kg)">
        <input className="in" type="number" min={0} max={maxKg} step={0.1} inputMode="decimal" value={d.kg || ''} onChange={e => onChange({ kg: e.target.value === '' ? 0 : Number(e.target.value) })} />
      </Field>
      <Field label="Date de la récolte" className="sm:col-span-2">
        <input className="in" type="date" max={today} value={d.date} onChange={e => onChange({ date: e.target.value })} />
      </Field>
      <div className="flex items-end sm:col-span-2"><Button type="submit" variant="primary" disabled={busy}>{busy ? 'Enregistrement…' : 'Ajouter au compteur'}</Button></div>
      {issues.length > 0 && (
        <div role="alert" className="note warn sm:col-span-4"><ul className="m-0 pl-5">{issues.map(i => <li key={i}>{i}</li>)}</ul></div>
      )}
    </form>

    {model.entries.length > 0 && (
      <details>
        <summary className="cursor-pointer text-[13px] font-semibold">Voir les {model.entries.length} saisie{model.entries.length > 1 ? 's' : ''}</summary>
        <ul className="m-0 mt-2 list-none p-0">
          {model.entries.map(e => (
            <li key={e.id} className="row between border-b border-line py-1.5 text-[13px]">
              <span>{e.dateLabel} · {e.cropName} · <b>{e.kgLabel}</b></span>
              {e.mine && <Button size="sm" variant="danger" onClick={() => onDelete(e.id)} disabled={busy}>Supprimer</Button>}
            </li>
          ))}
        </ul>
      </details>
    )}
  </section>
)

export default ProductionStatsView
