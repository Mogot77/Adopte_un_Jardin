import { WATER_LABELS } from '@/helpers/parcels'
import { suggestedPrice } from '@/helpers/pricing'
import type { Commune, Parcel, ParcelDraft, ParcelPrivate, WaterAccess } from '@/types'

export const WATER_OPTIONS = (Object.keys(WATER_LABELS) as WaterAccess[]).map(value => ({ value, label: WATER_LABELS[value] }))

const DEFAULT_SURFACE = 100

/** Brouillon initial : annonce existante (modification) ou valeurs par défaut (nouvelle annonce). */
export const initialDraft = (existing: Parcel | null, priv: ParcelPrivate | null, commune: Commune | null, phone: string): ParcelDraft =>
  existing
    ? {
      title: existing.title, description: existing.description, commune: existing.commune, surface: existing.surface,
      pricePerYear: existing.pricePerYear, toolsProvided: existing.toolsProvided, toolsPricePerYear: existing.toolsPricePerYear,
      water: existing.water, waterMeter: existing.waterMeter, access: existing.access, maxPeople: existing.maxPeople,
      toilets: existing.toilets, equipment: existing.equipment, photoUrls: existing.photoUrls,
      address: priv?.address ?? '', phone: priv?.phone ?? phone,
    }
    : {
      title: '', description: '', commune, surface: DEFAULT_SURFACE, pricePerYear: suggestedPrice(DEFAULT_SURFACE),
      toolsProvided: false, toolsPricePerYear: 0, water: 'robinet', waterMeter: false, access: '', maxPeople: 2,
      toilets: false, equipment: '', photoUrls: [], address: '', phone,
    }
