import { fmtDate } from '@/helpers/dates'
import { PLANT_KIND_LABELS, quantityLabel } from '@/helpers/plants'
import type { Plant } from '@/types'
import type { PlantDetailModel } from './types'

/** Lien e-mail avec sujet et message prérempli (le donateur est contacté depuis la messagerie du demandeur). */
const mailto = (p: Plant, myName: string): string => {
  const subject = `Adopte un Jardin : ${p.title}`
  const body = `Bonjour ${p.ownerName},\n\nVotre annonce « ${p.title} » m'intéresse. Est-elle toujours disponible ? Quand et où pourrait-on se retrouver à ${p.commune.nom} ?\n\nMerci,\n${myName}`
  return `mailto:${p.ownerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/** Modèle de la fiche d'un don. */
export const buildPlantDetailModel = (p: Plant, myEmail: string, myName: string): PlantDetailModel => ({
  id: p.id,
  title: p.title,
  description: p.description,
  kindLabel: PLANT_KIND_LABELS[p.kind],
  quantityLabel: quantityLabel(p.kind, p.quantity),
  communeLabel: `${p.commune.nom} (${p.commune.dept})`,
  ownerName: p.ownerName,
  photoUrls: p.photoUrls,
  status: p.status,
  isOwner: p.ownerEmail === myEmail,
  rows: [
    { label: 'Nature', value: PLANT_KIND_LABELS[p.kind] },
    { label: 'Quantité', value: quantityLabel(p.kind, p.quantity) },
    { label: 'Commune', value: `${p.commune.nom} (${p.commune.dept})` },
    { label: 'Donné par', value: p.ownerName },
    { label: 'Publié le', value: fmtDate(p.createdAt) },
  ],
  mailHref: mailto(p, myName),
  phone: p.phone,
})
