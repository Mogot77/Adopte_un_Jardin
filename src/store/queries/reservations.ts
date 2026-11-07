import { arrayUnion, doc, updateDoc, writeBatch } from 'firebase/firestore'
import { db } from '@/store/queries/firebase'
import { nowIso } from '@/helpers/dates'
import { newCode, reservationId } from '@/helpers/ids'
import { commission } from '@/helpers/pricing'
import type { Parcel, PayoutKey, Profile, Reservation } from '@/types'

const RESERVATIONS = 'reservations'
const CODES = 'codes'
const PARCELS = 'parcelles'

const str = (v: unknown): string => (typeof v === 'string' ? v : '')
const num = (v: unknown): number => (typeof v === 'number' && Number.isFinite(v) ? v : 0)
const keys = (v: unknown): PayoutKey[] => (Array.isArray(v) ? v.filter((k): k is PayoutKey => k === 'mars' || k === 'juin' || k === 'octobre') : [])

/** Lecture tolérante d'un document `reservations/{id}`. */
export const toReservation = (id: string, d: Record<string, unknown>): Reservation => ({
  id,
  parcelId: str(d.parcelId),
  parcelTitle: str(d.parcelTitle),
  communeNom: str(d.communeNom),
  ownerEmail: str(d.ownerEmail),
  ownerName: str(d.ownerName),
  gardenerEmail: str(d.gardenerEmail),
  gardenerName: str(d.gardenerName),
  season: num(d.season),
  price: num(d.price),
  fee: num(d.fee),
  total: num(d.total),
  status: d.status === 'validee' || d.status === 'annulee' ? d.status : 'payee',
  payoutsRequested: keys(d.payoutsRequested),
  createdAt: str(d.createdAt),
  ...(typeof d.validatedAt === 'string' ? { validatedAt: d.validatedAt } : {}),
  ...(typeof d.cancelledAt === 'string' ? { cancelledAt: d.cancelledAt } : {}),
})

/** Réserve et « paie » une parcelle (paiement simulé dans la V0.1). Atomique : si quelqu'un a réservé avant, l'écriture est refusée.
 *  Renvoie le code de validation à remettre au propriétaire après la première rencontre. */
export const reserveParcel = async (parcel: Parcel, gardener: Profile, season: number): Promise<string> => {
  const id = reservationId(parcel.id, gardener.email)
  const code = newCode()
  const now = nowIso()
  const fee = commission(parcel.pricePerYear)
  const batch = writeBatch(db)
  batch.set(doc(db, RESERVATIONS, id), {
    id,
    parcelId: parcel.id,
    parcelTitle: parcel.title,
    communeNom: parcel.commune.nom,
    ownerEmail: parcel.ownerEmail,
    ownerName: parcel.ownerName,
    gardenerEmail: gardener.email,
    gardenerName: gardener.name,
    season,
    price: parcel.pricePerYear,
    fee,
    total: Math.round((parcel.pricePerYear + fee) * 100) / 100,
    status: 'payee',
    payoutsRequested: [],
    createdAt: now,
  })
  batch.set(doc(db, CODES, id), { parcelId: parcel.id, gardenerEmail: gardener.email, code })
  batch.update(doc(db, PARCELS, parcel.id), { status: 'reservee', gardenerEmail: gardener.email, updatedAt: now })
  await batch.commit()
  return code
}

/** Annulation par le jardinier (avant validation du code) : la parcelle redevient disponible. */
export const cancelReservation = async (r: Reservation): Promise<void> => {
  const now = nowIso()
  const batch = writeBatch(db)
  batch.update(doc(db, RESERVATIONS, r.id), { status: 'annulee', cancelledAt: now })
  batch.update(doc(db, PARCELS, r.parcelId), { status: 'publiee', gardenerEmail: '', updatedAt: now })
  await batch.commit()
}

/** Validation par le propriétaire avec le code remis au jardinier. Refusée par les règles si le code est faux. */
export const validateReservation = (r: Reservation, code: string): Promise<void> =>
  updateDoc(doc(db, RESERVATIONS, r.id), { status: 'validee', codeEntered: code.trim(), validatedAt: nowIso() })

/** Demande de versement d'une tranche. */
export const requestPayout = (r: Reservation, key: PayoutKey): Promise<void> =>
  updateDoc(doc(db, RESERVATIONS, r.id), { payoutsRequested: arrayUnion(key) })
