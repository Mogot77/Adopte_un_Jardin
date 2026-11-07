import { useState } from 'react'
import { useApp } from '@/hooks/useApp'
import { useCommuneSelect } from '@/hooks/useCommuneSelect'
import { usePhotoUpload } from '@/hooks/usePhotoUpload'
import { go } from '@/hooks/useRoute'
import { draftIssues } from '@/helpers/parcels'
import { priceBounds, suggestedPrice } from '@/helpers/pricing'
import { cloudinaryEnabled, MAX_PHOTOS } from '@/helpers/photos'
import { newParcelId, saveParcel } from '@/store/queries/parcels'
import type { Parcel, ParcelDraft, ParcelPrivate } from '@/types'
import { initialDraft, WATER_OPTIONS } from './helpers'
import ParcelFormView from './ParcelFormView'

type Props = { id: string | null; existing: Parcel | null; priv: ParcelPrivate | null }

/** Saisie de l'annonce. La participation suit la surface (prix conseillé) tant que le propriétaire ne l'a pas modifié lui-même. */
const ParcelFormEditor = ({ id, existing, priv }: Props) => {
  const { profile, toast } = useApp()
  const [draft, setDraft] = useState<ParcelDraft>(() => initialDraft(existing, priv, profile?.commune ?? null, profile?.phone ?? ''))
  const [priceTouched, setPriceTouched] = useState(existing !== null)
  const [issues, setIssues] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const commune = useCommuneSelect(draft.commune, c => setDraft(d => ({ ...d, commune: c })))

  const change = (patch: Partial<ParcelDraft>) => {
    if (patch.pricePerYear !== undefined) setPriceTouched(true)
    setDraft(d => {
      const next = { ...d, ...patch }
      if (patch.surface !== undefined && patch.pricePerYear === undefined && !priceTouched) next.pricePerYear = suggestedPrice(patch.surface)
      return next
    })
  }

  const photos = usePhotoUpload(draft.photoUrls, change => setDraft(d => ({ ...d, photoUrls: change(d.photoUrls) })))

  const submit = () => {
    const found = draftIssues(draft)
    setIssues(found)
    if (found.length > 0 || !profile || !draft.commune) return
    setSaving(true)
    saveParcel(id ?? newParcelId(), { ...draft, commune: draft.commune }, profile, existing)
      .then(() => { toast(existing ? 'Annonce mise à jour.' : 'Annonce publiée.'); go('#/mes-parcelles') })
      .catch(e => { console.error(e); setIssues(["L'enregistrement a échoué. Réessayez."]); setSaving(false) })
  }

  return (
    <ParcelFormView
      draft={draft} isEdit={existing !== null} commune={commune} suggested={suggestedPrice(draft.surface)} bounds={priceBounds(draft.surface)}
      waterOptions={WATER_OPTIONS} photoEnabled={cloudinaryEnabled} maxPhotos={MAX_PHOTOS} uploading={photos.uploading} saving={saving} issues={issues}
      onChange={change} onPhotos={photos.add} onRemovePhoto={photos.remove} onSubmit={submit} onCancel={() => go('#/mes-parcelles')}
    />
  )
}

export default ParcelFormEditor
