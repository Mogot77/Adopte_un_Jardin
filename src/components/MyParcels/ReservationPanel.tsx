import { useState } from 'react'
import Button from '@/components/ui/Button'
import Chip from '@/components/ui/Chip'
import type { PayoutKey } from '@/types'
import type { ReservationView } from './types'

type Props = {
  reservation: ReservationView
  busy: boolean
  onValidate: (reservationId: string, code: string) => void
  onPayout: (reservationId: string, key: PayoutKey) => void
}

/** Réservation d'une parcelle : saisie du code remis par le jardinier, puis échéancier des versements. */
const ReservationPanel = ({ reservation: r, busy, onValidate, onPayout }: Props) => {
  const [code, setCode] = useState('')
  return (
    <div className="mt-3 rounded-lg border border-line bg-panel p-3 text-[13px]">
      <div className="row between">
        <span><b>{r.gardenerName}</b> <span className="muted">({r.gardenerEmail}) · {r.seasonLabel}</span></span>
        <Chip tone={r.tone}>{r.statusLabel}</Chip>
      </div>
      {r.awaitingCode && (
        <form className="row mt-3" onSubmit={e => { e.preventDefault(); onValidate(r.id, code) }}>
          <input
            className="in max-w-40 font-mono tracking-widest" inputMode="numeric" maxLength={6} placeholder="Code à 6 chiffres"
            aria-label="Code de validation remis par le jardinier" value={code} onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
          />
          <Button type="submit" variant="primary" size="sm" disabled={busy || code.length !== 6}>Valider la location</Button>
          <span className="muted">Le jardinier vous donne ce code après votre première rencontre.</span>
        </form>
      )}
      {r.payouts.length > 0 && (
        <table className="t mt-3 w-full" aria-label="Échéancier des versements">
          <thead><tr><th>Tranche</th><th>Date</th><th>Montant</th><th /></tr></thead>
          <tbody>
            {r.payouts.map(p => (
              <tr key={p.key}>
                <td>{p.label}</td><td>{p.dateLabel}</td><td>{p.amountLabel}</td>
                <td className="text-right">
                  {p.state === 'requested' && <Chip tone="ok">Demandé</Chip>}
                  {p.state === 'available' && <Button size="sm" disabled={busy} onClick={() => onPayout(r.id, p.key)}>Demander mon virement</Button>}
                  {p.state === 'upcoming' && <span className="muted">À venir</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ReservationPanel
