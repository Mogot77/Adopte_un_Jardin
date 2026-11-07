import Button from '@/components/ui/Button'
import Chip from '@/components/ui/Chip'
import Empty from '@/components/ui/Empty'
import Kv from '@/components/ui/Kv'
import Note from '@/components/ui/Note'
import PageHead from '@/components/ui/PageHead'
import type { MyReservationsViewProps } from './types'

/** Tableau de bord jardinier (vue). */
const MyReservationsView = ({ model, busyId, onOpen, onCancel, onSearch }: MyReservationsViewProps) => (
  <>
    <PageHead title="Mes réservations" subtitle="Retrouvez vos parcelles, votre code de validation et les coordonnées des propriétaires." actions={<Button variant="primary" onClick={onSearch}>Chercher un jardin</Button>} />
    {model.rows.length === 0 ? (
      <div className="card"><Empty>Vous n'avez encore réservé aucune parcelle.</Empty></div>
    ) : (
      <div className="stack" style={{ '--gap': '12px' } as React.CSSProperties}>
        {model.rows.map(r => (
          <article key={r.id} className="card pad stack" style={{ '--gap': '12px' } as React.CSSProperties}>
            <div className="row between">
              <div>
                <button type="button" className="border-0 bg-transparent p-0 text-left text-[15px] font-bold text-ink hover:text-brand" onClick={() => onOpen(r.parcelId)}>{r.title}</button>
                <p className="muted text-[13px]">{r.communeLabel} · {r.seasonLabel} · payé {r.paidLabel}</p>
              </div>
              <div className="row">
                <Chip tone={r.tone}>{r.statusLabel}</Chip>
                {r.canCancel && <Button size="sm" variant="danger" disabled={busyId === r.id} onClick={() => onCancel(r.id)}>Annuler</Button>}
              </div>
            </div>
            {r.code && (
              <Note tone="info">
                <span>Après votre première rencontre, donnez ce code au propriétaire pour confirmer la location : <b className="font-mono text-lg tracking-widest">{r.code}</b>. Si la parcelle ne vous convient pas, annulez avant de lui communiquer le code.</span>
              </Note>
            )}
            {r.contact && <Kv rows={[{ label: 'Propriétaire', value: `${r.contact.ownerName} (${r.contact.ownerEmail})` }, { label: 'Adresse', value: r.contact.address }, { label: 'Téléphone', value: r.contact.phone || 'Non renseigné' }]} />}
          </article>
        ))}
      </div>
    )}
  </>
)

export default MyReservationsView
