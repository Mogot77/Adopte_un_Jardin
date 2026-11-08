import { useMemo, useState } from 'react'
import { useApp } from '@/hooks/useApp'
import { useYieldEntries } from '@/hooks/useYieldEntries'
import { TODAY } from '@/helpers/dates'
import { HARVEST_KINDS } from '@/helpers/harvests'
import { CROP_SUGGESTIONS, emptyYieldDraft, fmtKg, kindForCrop, MAX_KG, yieldIssues } from '@/helpers/production'
import { deleteYield, newYieldId, saveYield } from '@/store/queries/production'
import type { YieldDraft, YieldSourceType } from '@/types'
import { buildProductionModel } from './helpers'
import ProductionStatsView from './ProductionStatsView'

type Props = {
  sourceType: YieldSourceType
  /** Identifiant du jardin (parcelle ou offre « à cueillir »). */
  sourceId: string
  /** Propriétaire du jardin. */
  ownerEmail: string
}

/** Production d'un jardin : noter les kilos récoltés par culture ; chaque saisie alimente le compteur public de l'accueil. */
const ProductionStats = ({ sourceType, sourceId, ownerEmail }: Props) => {
  const { profile, toast } = useApp()
  const myEmail = profile?.email ?? ''
  const entries = useYieldEntries(sourceId, myEmail)
  const [draft, setDraft] = useState<YieldDraft>(() => emptyYieldDraft())
  const [issues, setIssues] = useState<string[]>([])
  const [busy, setBusy] = useState(false)
  const model = useMemo(() => buildProductionModel(entries, myEmail), [entries, myEmail])

  const change = (patch: Partial<YieldDraft>) => setDraft(d => {
    const next = { ...d, ...patch }
    const known = patch.crop === undefined ? null : kindForCrop(patch.crop)
    return known ? { ...next, kind: known } : next
  })

  const submit = () => {
    const found = yieldIssues(draft)
    setIssues(found)
    if (found.length > 0 || !profile) return
    setBusy(true)
    saveYield(newYieldId(), draft, { type: sourceType, id: sourceId, ownerEmail }, profile.email)
      .then(() => { toast(`${fmtKg(draft.kg)} de ${draft.crop.trim().toLowerCase()} ajoutés au compteur.`); setDraft(emptyYieldDraft()) })
      .catch(e => { console.error(e); setIssues(["L'enregistrement a échoué. Réessayez."]) })
      .finally(() => setBusy(false))
  }

  const remove = (id: string) => {
    const entry = entries.find(e => e.id === id)
    if (!entry || !window.confirm('Supprimer cette saisie ? Son poids sera retiré du compteur.')) return
    setBusy(true)
    deleteYield(entry)
      .then(() => toast('Saisie supprimée.'))
      .catch(e => { console.error(e); toast('Suppression impossible.', 'error') })
      .finally(() => setBusy(false))
  }

  return (
    <ProductionStatsView
      model={model} draft={draft} suggestions={CROP_SUGGESTIONS.map(s => s.name)} kindOptions={HARVEST_KINDS} maxKg={MAX_KG} today={TODAY}
      busy={busy} issues={issues} onChange={change} onSubmit={submit} onDelete={remove}
    />
  )
}

export default ProductionStats
