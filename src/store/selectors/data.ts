import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/store/reducers'
import type { Parcel } from '@/types'

export const selectProfile = (s: RootState) => s.data.profile
export const selectOpenParcels = (s: RootState) => s.data.parcels.open
export const selectMyParcels = (s: RootState) => s.data.parcels.mine
export const selectOwnerReservations = (s: RootState) => s.data.reservations.asOwner
export const selectGardenerReservations = (s: RootState) => s.data.reservations.asGardener
export const selectCodes = (s: RootState) => s.data.codes

const selectRented = (s: RootState) => s.data.parcels.rented

/** Toutes les annonces connues (publiées, miennes, réservées par moi), sans doublon. */
export const selectAllParcels = createSelector([selectOpenParcels, selectMyParcels, selectRented], (open, mine, rented): Parcel[] => {
  const map = new Map<string, Parcel>()
  for (const p of [...open, ...rented, ...mine]) map.set(p.id, p)
  return [...map.values()]
})
