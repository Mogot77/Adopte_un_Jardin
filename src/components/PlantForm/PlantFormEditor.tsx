import { useState } from 'react'
import { useApp } from '@/hooks/useApp'
import { useCommuneSelect } from '@/hooks/useCommuneSelect'
import { usePhotoUpload } from '@/hooks/usePhotoUpload'
import { go } from '@/hooks/useRoute'
import { cloudinaryEnabled, MAX_PHOTOS } from '@/helpers/photos'
import { PLANT_KINDS, plantIssues } from '@/helpers/plants'
import { newPlantId, savePlant } from '@/store/queries/plants'
import type { Plant, PlantDraft } from '@/types'
import { initialPlantDraft } from './helpers'
import PlantFormView from './PlantFormView'

type Props = { id: string | null; existing: Plant | null }

/** Saisie d'un don de plantes. */
const PlantFormEditor = ({ id, existing }: Props) => {
  const { profile, toast } = useApp()
  const [draft, setDraft] = useState<PlantDraft>(() => initialPlantDraft(existing, profile?.commune ?? null, profile?.phone ?? ''))
  const [issues, setIssues] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const commune = useCommuneSelect(draft.commune, c => setDraft(d => ({ ...d, commune: c })))
  const photos = usePhotoUpload(draft.photoUrls, change => setDraft(d => ({ ...d, photoUrls: change(d.photoUrls) })))

  const submit = () => {
    const found = plantIssues(draft)
    setIssues(found)
    if (found.length > 0 || !profile || !draft.commune) return
    setSaving(true)
    savePlant(id ?? newPlantId(), { ...draft, commune: draft.commune }, profile, existing)
      .then(() => { toast(existing ? 'Annonce mise à jour.' : 'Annonce publiée.'); go('#/echanges') })
      .catch(e => { console.error(e); setIssues(["L'enregistrement a échoué. Réessayez."]); setSaving(false) })
  }

  return (
    <PlantFormView
      draft={draft} isEdit={existing !== null} commune={commune} kindOptions={PLANT_KINDS}
      photoEnabled={cloudinaryEnabled} maxPhotos={MAX_PHOTOS} uploading={photos.uploading} saving={saving} issues={issues}
      onChange={patch => setDraft(d => ({ ...d, ...patch }))} onPhotos={photos.add} onRemovePhoto={photos.remove}
      onSubmit={submit} onCancel={() => go('#/echanges')}
    />
  )
}

export default PlantFormEditor
