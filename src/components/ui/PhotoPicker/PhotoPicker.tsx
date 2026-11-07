import Field from '@/components/ui/Field'
import type { PhotoPickerProps } from './types'

/** Champ « Photos » d'un formulaire : miniatures avec bouton Retirer et choix de plusieurs fichiers. */
const PhotoPicker = ({ photos, maxPhotos, enabled, uploading, onPick, onRemove }: PhotoPickerProps) => (
  <Field label={`Photos (${photos.length}/${maxPhotos})`} className="sm:col-span-2" hint={enabled ? 'Une ou plusieurs photos ; la première sert de vignette.' : "L'envoi de photos n'est pas configuré (voir README)."}>
    <div className="stack" style={{ '--gap': '8px' } as React.CSSProperties}>
      {photos.length > 0 && (
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {photos.map((u, i) => (
            <li key={u} className="relative">
              <img src={u} alt={`Photo ${i + 1}`} className="h-28 w-full rounded-lg object-cover" />
              <button type="button" className="btn absolute right-1 top-1 !min-h-0 !px-2 !py-0.5 text-xs" aria-label={`Retirer la photo ${i + 1}`} onClick={() => onRemove(i)}>Retirer</button>
            </li>
          ))}
        </ul>
      )}
      <input
        className="in" type="file" accept="image/*" multiple disabled={!enabled || uploading || photos.length >= maxPhotos}
        onChange={e => { const f = Array.from(e.target.files ?? []); e.target.value = ''; if (f.length > 0) onPick(f) }}
      />
      {uploading && <span className="text-xs text-muted">Envoi en cours…</span>}
    </div>
  </Field>
)

export default PhotoPicker
