import { collection, doc, onSnapshot, query, where, type QuerySnapshot, type Unsubscribe } from 'firebase/firestore'
import { db } from '@/store/queries/firebase'
import type { AppDispatch } from '@/store'
import { codesSet, parcelsSet, plantsSet, profileSet, reservationsSet, syncFailedSet, type ParcelSource, type PlantSource, type ReservationSource } from '@/store/reducers'
import { toParcel } from '@/store/queries/parcels'
import { toPlant } from '@/store/queries/plants'
import { toReservation } from '@/store/queries/reservations'
import { toProfile } from '@/store/queries/users'
import type { Parcel, Plant, Reservation } from '@/types'

const parcels = (s: QuerySnapshot): Parcel[] =>
  s.docs.map(d => toParcel(d.id, d.data())).filter((p): p is Parcel => p !== null)

const plants = (s: QuerySnapshot): Plant[] =>
  s.docs.map(d => toPlant(d.id, d.data())).filter((p): p is Plant => p !== null)

const reservations = (s: QuerySnapshot): Reservation[] => s.docs.map(d => toReservation(d.id, d.data()))

/** Ouvre les écouteurs Firestore du compte connecté et renvoie la fonction qui les ferme.
 *  Chaque requête porte une contrainte d'égalité exigée par les règles de sécurité (voir firestore.rules). */
export const startSync = (email: string, dispatch: AppDispatch): (() => void) => {
  const unsubs: Unsubscribe[] = []
  const fail = (e: unknown) => { console.error(e); dispatch(syncFailedSet(true)) }

  unsubs.push(onSnapshot(doc(db, 'users', email), s => dispatch(profileSet(s.exists() ? toProfile(email, s.data()) : null)), fail))

  const watchParcels = (source: ParcelSource, field: string, value: string) =>
    unsubs.push(onSnapshot(query(collection(db, 'parcelles'), where(field, '==', value)), s => dispatch(parcelsSet({ source, items: parcels(s) })), fail))
  watchParcels('open', 'status', 'publiee')
  watchParcels('mine', 'ownerEmail', email)
  watchParcels('rented', 'gardenerEmail', email)

  const watchPlants = (source: PlantSource, field: string, value: string) =>
    unsubs.push(onSnapshot(query(collection(db, 'plantes'), where(field, '==', value)), s => dispatch(plantsSet({ source, items: plants(s) })), fail))
  watchPlants('open', 'status', 'disponible')
  watchPlants('mine', 'ownerEmail', email)

  const watchReservations = (source: ReservationSource, field: string) =>
    unsubs.push(onSnapshot(query(collection(db, 'reservations'), where(field, '==', email)), s => dispatch(reservationsSet({ source, items: reservations(s) })), fail))
  watchReservations('asOwner', 'ownerEmail')
  watchReservations('asGardener', 'gardenerEmail')

  unsubs.push(onSnapshot(query(collection(db, 'codes'), where('gardenerEmail', '==', email)), s => {
    const codes: Record<string, string> = {}
    for (const d of s.docs) { const c = d.data().code; if (typeof c === 'string') codes[d.id] = c }
    dispatch(codesSet(codes))
  }, fail))

  return () => unsubs.forEach(u => u())
}
