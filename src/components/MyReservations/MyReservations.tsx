import { useMemo, useState } from 'react'
import { useAppSelector } from '@/hooks/useAppStore'
import { useApp } from '@/hooks/useApp'
import { useParcelPrivates } from '@/hooks/useParcelPrivates'
import { go } from '@/hooks/useRoute'
import { selectCodes, selectGardenerReservations } from '@/store/selectors'
import { cancelReservation } from '@/store/queries/reservations'
import { buildMyReservationsModel } from './helpers'
import MyReservationsView from './MyReservationsView'

/** Tableau de bord jardinier : mes réservations, code de validation, coordonnées du propriétaire. */
const MyReservations = () => {
  const { toast } = useApp()
  const reservations = useAppSelector(selectGardenerReservations)
  const codes = useAppSelector(selectCodes)
  const [busyId, setBusyId] = useState<string | null>(null)
  const paidIds = useMemo(() => reservations.filter(r => r.status !== 'annulee').map(r => r.parcelId), [reservations])
  const privates = useParcelPrivates(paidIds)
  const model = useMemo(() => buildMyReservationsModel(reservations, codes, privates), [reservations, codes, privates])

  const cancel = (id: string) => {
    const r = reservations.find(x => x.id === id)
    if (!r || !window.confirm('Annuler cette réservation ? La parcelle redeviendra disponible et vous serez remboursé.')) return
    setBusyId(id)
    cancelReservation(r)
      .then(() => toast('Réservation annulée.'))
      .catch(e => { console.error(e); toast("L'annulation a échoué. Réessayez.", 'error') })
      .finally(() => setBusyId(null))
  }

  return <MyReservationsView model={model} busyId={busyId} onOpen={id => go(`#/parcelle/${id}`)} onCancel={cancel} onSearch={() => go('#/')} />
}

export default MyReservations
