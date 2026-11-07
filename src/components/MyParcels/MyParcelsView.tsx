import Button from '@/components/ui/Button'
import Chip from '@/components/ui/Chip'
import Empty from '@/components/ui/Empty'
import PageHead from '@/components/ui/PageHead'
import ReservationPanel from './ReservationPanel'
import type { MyParcelsViewProps } from './types'

/** Tableau de bord propriétaire (vue). */
const MyParcelsView = ({ model, busyId, onOpen, onEdit, onWithdraw, onNew, onValidate, onPayout }: MyParcelsViewProps) => (
  <>
    <PageHead title="Mes parcelles" subtitle="Suivez vos annonces, validez les locations et demandez vos versements." actions={<Button variant="primary" onClick={onNew}>Proposer une parcelle</Button>} />
    <div className="kpis">
      <div className="card kpi"><div className="l">Annonces en ligne</div><div className="v">{model.online}</div></div>
      <div className="card kpi"><div className="l">Locations en cours</div><div className="v">{model.rented}</div></div>
      <div className="card kpi"><div className="l">Participations validées</div><div className="v">{model.incomeLabel}</div></div>
    </div>
    {model.rows.length === 0 ? (
      <div className="card"><Empty>Vous n'avez pas encore d'annonce. Déposez une parcelle pour la proposer aux jardiniers de votre commune.</Empty></div>
    ) : (
      <div className="stack" style={{ '--gap': '12px' } as React.CSSProperties}>
        {model.rows.map(row => (
          <article key={row.id} className="card pad">
            <div className="row between">
              <div>
                <button type="button" className="border-0 bg-transparent p-0 text-left text-[15px] font-bold text-ink hover:text-brand" onClick={() => onOpen(row.id)}>{row.title}</button>
                <p className="muted text-[13px]">{row.communeLabel} · {row.priceLabel}</p>
              </div>
              <div className="row">
                <Chip tone={row.tone}>{row.statusLabel}</Chip>
                {row.canEdit && <Button size="sm" onClick={() => onEdit(row.id)}>Modifier</Button>}
                {row.canWithdraw && <Button size="sm" variant="danger" disabled={busyId === row.id} onClick={() => onWithdraw(row.id)}>Retirer</Button>}
              </div>
            </div>
            {row.reservation && <ReservationPanel reservation={row.reservation} busy={busyId === row.reservation.id} onValidate={onValidate} onPayout={onPayout} />}
          </article>
        ))}
      </div>
    )}
  </>
)

export default MyParcelsView
