import { useEffect, useState } from 'react'
import { useAppSelector } from '@/hooks/useAppStore'
import { useApp } from '@/hooks/useApp'
import { selectMyParcels } from '@/store/selectors'
import { fetchPrivate } from '@/store/queries/parcels'
import Empty from '@/components/ui/Empty'
import type { ParcelPrivate } from '@/types'
import ParcelFormEditor from './ParcelFormEditor'

/** Dépôt d'une annonce (sans `id`) ou modification d'une annonce du compte (avec `id`). */
const ParcelForm = ({ id }: { id?: string }) => {
  const { profile } = useApp()
  const mine = useAppSelector(selectMyParcels)
  const existing = id ? mine.find(p => p.id === id) ?? null : null
  const [loaded, setLoaded] = useState<{ id: string; priv: ParcelPrivate | null } | null>(null)

  useEffect(() => {
    if (!id) return
    let cancelled = false
    fetchPrivate(id).then(priv => { if (!cancelled) setLoaded({ id, priv }) })
    return () => { cancelled = true }
  }, [id])

  if (!profile) return null
  if (!id) return <ParcelFormEditor id={null} existing={null} priv={null} />
  if (!existing || loaded?.id !== id) return <Empty>Chargement de l'annonce… <a href="#/mes-parcelles">Retour à mes parcelles</a></Empty>
  if (existing.status === 'reservee') return <Empty>Cette parcelle est réservée : elle ne peut plus être modifiée. <a href="#/mes-parcelles">Retour à mes parcelles</a></Empty>
  return <ParcelFormEditor key={id} id={id} existing={existing} priv={loaded.priv} />
}

export default ParcelForm
