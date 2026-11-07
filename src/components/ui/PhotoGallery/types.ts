export type PhotoGalleryProps = {
  photos: string[]
  /** Description de l'objet photographié (ex. titre de l'annonce). */
  label: string
  /** Hauteur du bandeau (classes Tailwind). */
  className?: string
}
