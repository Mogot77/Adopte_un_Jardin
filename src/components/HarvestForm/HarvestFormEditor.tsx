import { useState } from 'react'
import { useApp } from '@/hooks/useApp'
import { useCommuneSelect } from '@/hooks/useCommuneSelect'
import { usePhotoUpload } from '@/hooks/usePhotoUpload'
import { go } from '@/hooks/useRoute'
import { cloudinaryEnabled, MAX_PHOTOS } from '@/helpers/photos'
import { emptyItem, HARVEST_KINDS, harvestIssues, MAX_ITEMS, MONTH_NAMES } from '@/helpers/harvests'
import { newHarvestId, saveHarvest } from '@/store/queries/harvests'
import type { HarvestDraft, HarvestOffer } from '@/types'
import { initialHarvestDraft } from './helpers'
import HarvestFormView from './HarvestFormView'

type Props = { id: string | null; existing: HarvestOffer | null }

/** Saisie d'une offre « à cueillir ». */
const HarvestFormEditor = ({ id, existing }: Props) => {
  const { profile, toast } = useApp()
  const [draft, setDraft] = useState<HarvestDraft>(() => initialHarvestDraft(existing, profile?.commune ?? null, profile?.phone ?? ''))
  const [issues, setIssues] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const commune = useCommuneSelect(draft.commune, c => setDraft(d => ({ ...d, commune: c })))
  const photos = usePhotoUpload(draft.photoUrls, change => setDraft(d => ({ ...d, photoUrls: change(d.photoUrls) })))

  const submit = () => {
    const found = harvestIssues(draft)
    setIssues(found)
    if (found.length > 0 || !profile || !draft.commune) return
    setSaving(true)
    saveHarvest(id ?? newHarvestId(), { ...draft, commune: draft.commune }, profile, existing)
      .then(() => { toast(existing ? 'Offre mise à jour.' : 'Offre publiée.'); go('#/cueillette') })
      .catch(e => { console.error(e); setIssues(["L'enregistrement a échoué. Réessayez."]); setSaving(false) })
  }

  return (
    <HarvestFormView
      draft={draft} isEdit={existing !== null} commune={commune} kindOptions={HARVEST_KINDS} monthNames={MONTH_NAMES} maxItems={MAX_ITEMS}
      photoEnabled={cloudinaryEnabled} maxPhotos={MAX_PHOTOS} uploading={photos.uploading} saving={saving} issues={issues}
      onChange={patch => setDraft(d => ({ ...d, ...patch }))}
      onItemChange={(index, patch) => setDraft(d => ({ ...d, items: d.items.map((item, i) => (i === index ? { ...item, ...patch } : item)) }))}
      onAddItem={() => setDraft(d => ({ ...d, items: [...d.items, emptyItem()] }))}
      onRemoveItem={index => setDraft(d => ({ ...d, items: d.items.filter((_, i) => i !== index) }))}
      onPhotos={photos.add} onRemovePhoto={photos.remove}
      onSubmit={submit} onCancel={() => go('#/cueillette')}
    />
  )
}

export default HarvestFormEditor
