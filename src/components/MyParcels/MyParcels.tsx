import { useMemo, useState } from 'react'
import { useAppSelector } from '@/hooks/useAppStore'
import { useApp } from '@/hooks/useApp'
import { go } from '@/hooks/useRoute'
import { selectMyParcels, selectOwnerReservations } from '@/store/selectors'
import { withdrawParcel } from '@/store/queries/parcels'
import { requestPayout, validateReservation } from '@/store/queries/reservations'
import { buildMyParcelsModel } from './helpers'
import MyParcelsView from './MyParcelsView'

/** Tableau de bord propriétaire : mes annonces, validation du code après la rencontre, demandes de versement. */
const MyParcels = () => {
  const { toast } = useApp()
  const parcels = useAppSelector(selectMyParcels)
  const reservations = useAppSelector(selectOwnerReservations)
  const [busyId, setBusyId] = useState<string | null>(null)
  const model = useMemo(() => buildMyParcelsModel(parcels, reservations), [parcels, reservations])

  const run = (id: string, action: () => Promise<void>, ok: string, ko: string) => {
    setBusyId(id)
    action().then(() => toast(ok)).catch(e => { console.error(e); toast(ko, 'error') }).finally(() => setBusyId(null))
  }
  const reservation = (id: string) => reservations.find(r => r.id === id)

  return (
    <MyParcelsView
      model={model} busyId={busyId}
      onOpen={id => go(`#/parcelle/${id}`)} onEdit={id => go(`#/proposer/${id}`)} onNew={() => go('#/proposer')}
      onWithdraw={id => { if (window.confirm("Retirer cette annonce de la recherche ?")) run(id, () => withdrawParcel(id), 'Annonce retirée.', "Impossible de retirer l'annonce.") }}
      onValidate={(rid, code) => {
        const r = reservation(rid)
        if (r) run(rid, () => validateReservation(r, code), 'Location validée.', 'Code incorrect : demandez-le au jardinier.')
      }}
      onPayout={(rid, key) => {
        const r = reservation(rid)
        if (r) run(rid, () => requestPayout(r, key), 'Demande de versement enregistrée.', 'Demande impossible. Réessayez.')
      }}
    />
  )
}

export default MyParcels
