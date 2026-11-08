import { fmtDate } from '@/helpers/dates'
import { formatAccess } from '@/helpers/schedule'
import { HARVEST_KIND_LABELS, MONTH_INITIALS, offerState, seasonLabel, seasonMask, seasonState, SEASON_STATE_LABELS } from '@/helpers/harvests'
import type { HarvestOffer } from '@/types'
import type { HarvestDetailModel } from './types'

/** Lien e-mail avec sujet et message prérempli (le propriétaire est contacté depuis la messagerie du visiteur). */
const mailto = (o: HarvestOffer, myName: string): string => {
  const subject = `Adopte un Jardin : ${o.title}`
  const body = `Bonjour ${o.ownerName},\n\nVotre offre « ${o.title} » m'intéresse. Puis-je venir cueillir ? Quand et comment serait-ce possible à ${o.commune.nom} ?\n\nMerci,\n${myName}`
  return `mailto:${o.ownerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/** Modèle de la fiche d'une offre, pour le mois donné (1 à 12). */
export const buildHarvestDetailModel = (o: HarvestOffer, myEmail: string, myName: string, month: number): HarvestDetailModel => {
  const state = offerState(o.items, month)
  return {
    id: o.id,
    title: o.title,
    description: o.description,
    instructions: o.instructions,
    communeLabel: `${o.commune.nom} (${o.commune.dept})`,
    ownerName: o.ownerName,
    photoUrls: o.photoUrls,
    status: o.status,
    isOwner: o.ownerEmail === myEmail,
    items: o.items.map(i => {
      const s = seasonState(i, month)
      return { name: i.name, kindLabel: HARVEST_KIND_LABELS[i.kind], seasonText: seasonLabel(i), months: seasonMask(i), state: s, stateLabel: SEASON_STATE_LABELS[s], note: i.note }
    }),
    state,
    stateLabel: SEASON_STATE_LABELS[state],
    currentMonth: month,
    initials: MONTH_INITIALS,
    rows: [
      { label: 'Commune', value: `${o.commune.nom} (${o.commune.dept})` },
      { label: 'Proposé par', value: o.ownerName },
      { label: 'Quand venir', value: o.accessSlots.length > 0 ? formatAccess(o.accessSlots) : 'Sur rendez-vous' },
      { label: 'Essences', value: String(o.items.length) },
      { label: 'Publié le', value: fmtDate(o.createdAt) },
    ],
    mailHref: mailto(o, myName),
    phone: o.phone,
  }
}
