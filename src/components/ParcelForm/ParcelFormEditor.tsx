import { useState } from 'react'
import { useApp } from '@/hooks/useApp'
import { useCommuneSelect } from '@/hooks/useCommuneSelect'
import { go } from '@/hooks/useRoute'
import { draftIssues } from '@/helpers/parcels'
import { priceBounds, suggestedPrice } from '@/helpers/pricing'
import { cloudinaryEnabled, MAX_PHOTOS, uploadPhoto } from '@/helpers/photos'
import { newParcelId, saveParcel } from '@/store/queries/parcels'
import type { Parcel, ParcelDraft, ParcelPrivate } from '@/types'
import { initialDraft, WATER_OPTIONS } from './helpers'
import ParcelFormView from './ParcelFormView'

type Props = { id: string | null; existing: Parcel | null; priv: ParcelPrivate | null }

/** Saisie de l'annonce. Le loyer suit la surface (prix conseillé) tant que le propriétaire ne l'a pas modifié lui-même. */
const ParcelFormEditor = ({ id, existing, priv }: Props) => {
  const { profile, toast } = useApp()
  const [draft, setDraft] = useState<ParcelDraft>(() => initialDraft(existing, priv, profile?.commune ?? null, profile?.phone ?? ''))
  const [priceTouched, setPriceTouched] = useState(existing !== null)
  const [issues, setIssues] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
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

  const photos = (files: File[]) => {
    const room = MAX_PHOTOS - draft.photoUrls.length
    if (files.length > room) toast(`Maximum ${MAX_PHOTOS} photos : les suivantes sont ignorées.`, 'error')
    setUploading(true)
    Promise.allSettled(files.slice(0, Math.max(0, room)).map(uploadPhoto))
      .then(results => {
        const urls = results.flatMap(r => (r.status === 'fulfilled' ? [r.value] : []))
        const failed = results.find(r => r.status === 'rejected')
        if (urls.length > 0) setDraft(d => ({ ...d, photoUrls: [...d.photoUrls, ...urls].slice(0, MAX_PHOTOS) }))
        if (failed && failed.status === 'rejected') toast(failed.reason instanceof Error ? failed.reason.message : "Envoi d'une photo impossible.", 'error')
      })
      .finally(() => setUploading(false))
  }

  const removePhoto = (index: number) => setDraft(d => ({ ...d, photoUrls: d.photoUrls.filter((_, i) => i !== index) }))

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
      waterOptions={WATER_OPTIONS} photoEnabled={cloudinaryEnabled} maxPhotos={MAX_PHOTOS} uploading={uploading} saving={saving} issues={issues}
      onChange={change} onPhotos={photos} onRemovePhoto={removePhoto} onSubmit={submit} onCancel={() => go('#/mes-parcelles')}
    />
  )
}

export default ParcelFormEditor
