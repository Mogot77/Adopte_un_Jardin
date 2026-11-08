import type { CommuneSelectProps } from '@/components/ui/CommuneSelect'
import type { HarvestDraft, HarvestItem, HarvestKind } from '@/types'

export type HarvestFormViewProps = {
  draft: HarvestDraft
  isEdit: boolean
  commune: CommuneSelectProps
  kindOptions: { value: HarvestKind; label: string }[]
  /** Noms des 12 mois, de janvier à décembre. */
  monthNames: string[]
  /** Nombre maximal d'essences. */
  maxItems: number
  /** Envoi de photo disponible (Cloudinary configuré). */
  photoEnabled: boolean
  /** Nombre maximal de photos. */
  maxPhotos: number
  uploading: boolean
  saving: boolean
  issues: string[]
  onChange: (patch: Partial<Omit<HarvestDraft, 'items'>>) => void
  onItemChange: (index: number, patch: Partial<HarvestItem>) => void
  onAddItem: () => void
  onRemoveItem: (index: number) => void
  onPhotos: (files: File[]) => void
  onRemovePhoto: (index: number) => void
  onSubmit: () => void
  onCancel: () => void
}
