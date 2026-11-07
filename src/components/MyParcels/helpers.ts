import { TODAY, fmtDate } from '@/helpers/dates'
import { eur, payoutSchedule } from '@/helpers/pricing'
import type { Parcel, Reservation } from '@/types'
import type { MyParcelRow, MyParcelsModel, PayoutView, ReservationView } from './types'

const PARCEL_STATUS: Record<Parcel['status'], { label: string; tone: MyParcelRow['tone'] }> = {
  publiee: { label: 'En ligne', tone: 'ok' },
  reservee: { label: 'Réservée', tone: 'bl' },
  retiree: { label: 'Retirée', tone: 'gr' },
}

const payoutViews = (r: Reservation, today: string): PayoutView[] =>
  payoutSchedule(r.price, r.season, today).map(p => ({
    key: p.key,
    label: p.label,
    dateLabel: fmtDate(p.date),
    amountLabel: eur(p.amount),
    state: r.payoutsRequested.includes(p.key) ? 'requested' : p.available ? 'available' : 'upcoming',
  }))

const reservationView = (r: Reservation, today: string): ReservationView => ({
  id: r.id,
  gardenerName: r.gardenerName,
  gardenerEmail: r.gardenerEmail,
  seasonLabel: `Année culturale ${r.season}`,
  statusLabel: r.status === 'validee' ? 'Location validée' : 'En attente du code de validation',
  tone: r.status === 'validee' ? 'ok' : 'wa',
  awaitingCode: r.status === 'payee',
  payouts: r.status === 'validee' ? payoutViews(r, today) : [],
})

/** Tableau de bord propriétaire : annonces, réservation en cours, échéancier des versements. */
export const buildMyParcelsModel = (parcels: Parcel[], reservations: Reservation[], today: string = TODAY): MyParcelsModel => {
  const active = reservations.filter(r => r.status !== 'annulee')
  const rows = [...parcels]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map((p): MyParcelRow => {
      const res = active.find(r => r.parcelId === p.id)
      const st = PARCEL_STATUS[p.status]
      return {
        id: p.id,
        title: p.title,
        communeLabel: `${p.commune.nom} (${p.commune.dept})`,
        priceLabel: `${eur(p.pricePerYear)} / an`,
        statusLabel: st.label,
        tone: st.tone,
        canEdit: p.status !== 'reservee',
        canWithdraw: p.status === 'publiee',
        ...(res ? { reservation: reservationView(res, today) } : {}),
      }
    })
  return {
    rows,
    online: parcels.filter(p => p.status === 'publiee').length,
    rented: active.length,
    incomeLabel: eur(active.filter(r => r.status === 'validee').reduce((sum, r) => sum + r.price, 0)),
  }
}
