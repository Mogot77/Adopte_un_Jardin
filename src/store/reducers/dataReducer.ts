import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { HarvestOffer, Parcel, Plant, Profile, Reservation } from '@/types'

/** Provenance des annonces : publiées (recherche), les miennes, celles que j'ai réservées. */
export type ParcelSource = 'open' | 'mine' | 'rented'
/** Provenance des réservations : sur mes parcelles (propriétaire) ou faites par moi (jardinier). */
export type ReservationSource = 'asOwner' | 'asGardener'

/** Provenance des dons de plantes : disponibles pour tous (liste) ou les miens. */
export type PlantSource = 'open' | 'mine'

/** Provenance des offres « à cueillir » : ouvertes pour tous (liste) ou les miennes. */
export type HarvestSource = 'open' | 'mine'

export type DataState = {
  /** `undefined` tant que le profil n'a pas été lu ; `null` si le compte n'a pas encore de profil. */
  profile: Profile | null | undefined
  parcels: Record<ParcelSource, Parcel[]>
  reservations: Record<ReservationSource, Reservation[]>
  plants: Record<PlantSource, Plant[]>
  harvests: Record<HarvestSource, HarvestOffer[]>
  /** Codes de validation des réservations du jardinier, par identifiant de réservation. */
  codes: Record<string, string>
}

const initialState: DataState = {
  profile: undefined,
  parcels: { open: [], mine: [], rented: [] },
  reservations: { asOwner: [], asGardener: [] },
  plants: { open: [], mine: [] },
  harvests: { open: [], mine: [] },
  codes: {},
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    profileSet: (s, a: PayloadAction<Profile | null>) => { s.profile = a.payload },
    parcelsSet: (s, a: PayloadAction<{ source: ParcelSource; items: Parcel[] }>) => { s.parcels[a.payload.source] = a.payload.items },
    reservationsSet: (s, a: PayloadAction<{ source: ReservationSource; items: Reservation[] }>) => { s.reservations[a.payload.source] = a.payload.items },
    plantsSet: (s, a: PayloadAction<{ source: PlantSource; items: Plant[] }>) => { s.plants[a.payload.source] = a.payload.items },
    harvestsSet: (s, a: PayloadAction<{ source: HarvestSource; items: HarvestOffer[] }>) => { s.harvests[a.payload.source] = a.payload.items },
    codesSet: (s, a: PayloadAction<Record<string, string>>) => { s.codes = a.payload },
  },
})

export const { profileSet, parcelsSet, reservationsSet, plantsSet, harvestsSet, codesSet } = dataSlice.actions
export default dataSlice.reducer
