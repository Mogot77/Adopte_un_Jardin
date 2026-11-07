import type { CommuneSelectProps } from '@/components/ui/CommuneSelect'
import type { ParcelDraft, WaterAccess } from '@/types'

export type ParcelFormViewProps = {
  draft: ParcelDraft
  isEdit: boolean
  commune: CommuneSelectProps
  /** Loyer annuel conseillé pour la surface saisie, et bornes autorisées. */
  suggested: number
  bounds: { min: number; max: number }
  waterOptions: { value: WaterAccess; label: string }[]
  /** Envoi de photo disponible (Cloudinary configuré). */
  photoEnabled: boolean
  /** Nombre maximal de photos. */
  maxPhotos: number
  uploading: boolean
  saving: boolean
  issues: string[]
  onChange: (patch: Partial<ParcelDraft>) => void
  onPhotos: (files: File[]) => void
  onRemovePhoto: (index: number) => void
  onSubmit: () => void
  onCancel: () => void
}
