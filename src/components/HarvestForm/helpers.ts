import { emptyItem } from '@/helpers/harvests'
import type { Commune, HarvestDraft, HarvestOffer } from '@/types'

/** Brouillon initial : offre existante (modification) ou valeurs par défaut (nouvelle offre avec une première essence vide). */
export const initialHarvestDraft = (existing: HarvestOffer | null, commune: Commune | null, phone: string): HarvestDraft =>
  existing
    ? {
      title: existing.title, description: existing.description, items: existing.items.map(i => ({ ...i })),
      instructions: existing.instructions, accessSlots: existing.accessSlots.map(s => ({ ...s })),
      commune: existing.commune, phone: existing.phone, photoUrls: existing.photoUrls,
    }
    : { title: '', description: '', items: [emptyItem()], instructions: '', accessSlots: [], commune, phone, photoUrls: [] }
