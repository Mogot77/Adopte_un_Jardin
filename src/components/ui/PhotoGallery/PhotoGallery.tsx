import Icon from '@/components/ui/Icon'
import type { PhotoGalleryProps } from './types'

/** Bandeau de photos défilant horizontalement (une photo par vue) ; une feuille s'affiche s'il n'y en a pas. */
const PhotoGallery = ({ photos, label, className = 'h-56 sm:h-72' }: PhotoGalleryProps) => (
  <div
    className={`ph flex snap-x snap-mandatory items-center overflow-x-auto rounded-[10px] bg-subtle text-faint ${photos.length === 0 ? 'justify-center' : ''} ${className}`}
    tabIndex={0} aria-label="Photos (faire défiler)"
  >
    {photos.length > 0
      ? photos.map((u, i) => <img key={u} src={u} alt={`Photo ${i + 1} sur ${photos.length} : ${label}`} className="size-full shrink-0 snap-center object-cover" />)
      : <Icon name="leaf" size={48} />}
  </div>
)

export default PhotoGallery
