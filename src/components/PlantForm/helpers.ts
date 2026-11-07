import type { Commune, Plant, PlantDraft } from '@/types'

/** Brouillon initial : don existant (modification) ou valeurs par défaut (nouvelle annonce). */
export const initialPlantDraft = (existing: Plant | null, commune: Commune | null, phone: string): PlantDraft =>
  existing
    ? {
      kind: existing.kind, title: existing.title, description: existing.description, quantity: existing.quantity,
      commune: existing.commune, phone: existing.phone, photoUrls: existing.photoUrls,
    }
    : { kind: 'plant', title: '', description: '', quantity: 1, commune, phone, photoUrls: [] }
