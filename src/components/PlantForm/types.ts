import type { CommuneSelectProps } from '@/components/ui/CommuneSelect'
import type { PlantDraft, PlantKind } from '@/types'

export type PlantFormViewProps = {
  draft: PlantDraft
  isEdit: boolean
  commune: CommuneSelectProps
  kindOptions: { value: PlantKind; label: string }[]
  /** Envoi de photo disponible (Cloudinary configuré). */
  photoEnabled: boolean
  /** Nombre maximal de photos. */
  maxPhotos: number
  uploading: boolean
  saving: boolean
  issues: string[]
  onChange: (patch: Partial<PlantDraft>) => void
  onPhotos: (files: File[]) => void
  onRemovePhoto: (index: number) => void
  onSubmit: () => void
  onCancel: () => void
}
