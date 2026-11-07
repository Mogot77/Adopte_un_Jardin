import { eur } from '@/helpers/pricing'
import type { ParcelPrivate, Reservation } from '@/types'
import type { MyReservationsModel, ReservationRow } from './types'

const STATUS: Record<Reservation['status'], { label: string; tone: ReservationRow['tone'] }> = {
  payee: { label: 'En attente de la première rencontre', tone: 'wa' },
  validee: { label: 'Location validée', tone: 'ok' },
  annulee: { label: 'Annulée', tone: 'gr' },
}

/** Tableau de bord jardinier : réservations avec code de validation et coordonnées du propriétaire (après paiement). */
export const buildMyReservationsModel = (
  reservations: Reservation[], codes: Record<string, string>, privates: Record<string, ParcelPrivate>,
): MyReservationsModel => ({
  rows: [...reservations]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map((r): ReservationRow => {
      const priv = privates[r.parcelId]
      const st = STATUS[r.status]
      return {
        id: r.id,
        parcelId: r.parcelId,
        title: r.parcelTitle,
        communeLabel: r.communeNom,
        seasonLabel: `Année culturale ${r.season}`,
        paidLabel: `${eur(r.total)} (dont ${eur(r.fee)} de frais de service)`,
        statusLabel: st.label,
        tone: st.tone,
        code: r.status === 'payee' ? codes[r.id] ?? '' : '',
        canCancel: r.status === 'payee',
        ...(priv && r.status !== 'annulee' ? { contact: { ownerName: r.ownerName, ownerEmail: r.ownerEmail, address: priv.address, phone: priv.phone } } : {}),
      }
    }),
})
