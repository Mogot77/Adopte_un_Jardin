import { WATER_LABELS } from '@/helpers/parcels'
import { commission, eur, surfaceRange } from '@/helpers/pricing'
import type { Parcel, ParcelPrivate, Reservation } from '@/types'
import type { DetailMode, ParcelDetailModel } from './types'

type Ctx = {
  myEmail: string
  /** Réservation active (non annulée) du compte sur cette annonce. */
  booking: Reservation | null
  code: string
  contact: ParcelPrivate | null
  season: number
}

const detailMode = (p: Parcel, ctx: Ctx): DetailMode => {
  if (p.ownerEmail === ctx.myEmail) return 'own'
  if (ctx.booking) return 'booked'
  return p.status === 'publiee' ? 'available' : 'unavailable'
}

/** Modèle d'affichage de la fiche d'une annonce, selon qui la regarde. */
export const buildParcelDetailModel = (p: Parcel, ctx: Ctx): ParcelDetailModel => {
  const fee = commission(p.pricePerYear)
  const mode = detailMode(p, ctx)
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    ownerName: p.ownerName,
    communeLabel: `${p.commune.nom} (${p.commune.dept})`,
    photoUrls: p.photoUrls,
    rows: [
      { label: 'Surface', value: `${p.surface} m² (${surfaceRange(p.surface)})` },
      { label: 'Participation annuelle', value: eur(p.pricePerYear) },
      { label: 'Outils', value: p.toolsProvided ? (p.toolsPricePerYear > 0 ? `Fournis, ${eur(p.toolsPricePerYear)} / an` : 'Fournis (gratuits)') : 'Non fournis' },
      { label: 'Eau', value: WATER_LABELS[p.water] },
      { label: "Compteur d'eau", value: p.waterMeter ? 'Individuel' : 'Non' },
      { label: 'Accès', value: p.access || 'À convenir' },
      { label: 'Présence simultanée', value: `${p.maxPeople} personne${p.maxPeople > 1 ? 's' : ''} maximum` },
      { label: 'Sanitaires', value: p.toilets ? 'Mis à disposition' : 'Non' },
      ...(p.equipment ? [{ label: 'Équipements', value: p.equipment }] : []),
    ],
    mode,
    season: ctx.season,
    rent: eur(p.pricePerYear),
    fee: eur(fee),
    total: eur(Math.round((p.pricePerYear + fee) * 100) / 100),
    ...(ctx.contact && (mode === 'own' || mode === 'booked') ? { contact: { address: ctx.contact.address, phone: ctx.contact.phone } } : {}),
    ...(ctx.booking ? { booking: { status: ctx.booking.status, code: ctx.code } } : {}),
  }
}
