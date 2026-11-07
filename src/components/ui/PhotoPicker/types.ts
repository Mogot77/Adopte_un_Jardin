export type PhotoPickerProps = {
  photos: string[]
  maxPhotos: number
  /** Envoi disponible (Cloudinary configuré). */
  enabled: boolean
  uploading: boolean
  onPick: (files: File[]) => void
  onRemove: (index: number) => void
}
