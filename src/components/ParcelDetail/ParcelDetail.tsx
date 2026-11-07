import { useMemo, useState } from 'react'
import { useAppSelector } from '@/hooks/useAppStore'
import { useApp } from '@/hooks/useApp'
import { useParcelPrivates } from '@/hooks/useParcelPrivates'
import { go } from '@/hooks/useRoute'
import { currentSeason } from '@/helpers/dates'
import { selectAllParcels, selectCodes, selectGardenerReservations } from '@/store/selectors'
import { reserveParcel } from '@/store/queries/reservations'
import Empty from '@/components/ui/Empty'
import { buildParcelDetailModel } from './helpers'
import type { ReserveStep } from './types'
import ParcelDetailView from './ParcelDetailView'

/** Fiche d'une annonce et parcours de réservation (le paiement est simulé dans la V0.1). */
const ParcelDetail = ({ id }: { id: string }) => {
  const { profile, toast } = useApp()
  const parcels = useAppSelector(selectAllParcels)
  const reservations = useAppSelector(selectGardenerReservations)
  const codes = useAppSelector(selectCodes)
  const [step, setStep] = useState<ReserveStep>('view')
  const [accepted, setAccepted] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const parcel = parcels.find(p => p.id === id) ?? null
  const booking = reservations.find(r => r.parcelId === id && r.status !== 'annulee') ?? null
  const myEmail = profile?.email ?? ''
  const mayReadContact = !!parcel && (parcel.ownerEmail === myEmail || !!booking)
  const privates = useParcelPrivates(mayReadContact ? [id] : [])

  const model = useMemo(
    () => (parcel ? buildParcelDetailModel(parcel, { myEmail, booking, code: booking ? codes[booking.id] ?? '' : '', contact: privates[id] ?? null, season: currentSeason() }) : null),
    [parcel, myEmail, booking, codes, privates, id],
  )

  if (!parcel || !model || !profile) return <Empty>Annonce introuvable ou en cours de chargement… <a href="#/">Retour à la recherche</a></Empty>

  const pay = () => {
    setBusy(true)
    setError('')
    reserveParcel(parcel, profile, model.season)
      .then(() => { toast('Réservation confirmée : retrouvez votre code dans « Mes réservations ».'); setStep('view'); setBusy(false) })
      .catch(e => {
        console.error(e)
        setError("La réservation a échoué : la parcelle vient peut-être d'être réservée par quelqu'un d'autre.")
        setBusy(false)
      })
  }

  return (
    <ParcelDetailView
      model={model} step={step} accepted={accepted} busy={busy} error={error}
      onStart={() => { setStep('confirm'); setAccepted(false); setError('') }} onBack={() => setStep('view')}
      onAccept={setAccepted} onPay={pay} onEdit={() => go(`#/proposer/${id}`)} onSearch={() => go('#/')}
    />
  )
}

export default ParcelDetail
