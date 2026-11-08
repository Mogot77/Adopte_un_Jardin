import type { IconName } from '@/components/ui/Icon/types'

/** Une étape d'un parcours schématique (numérotée à l'affichage). */
export type Step = { icon: IconName; title: string; text: string }

/** Parcours du jardinier : de la recherche à la première récolte. */
export const GARDENER_STEPS: Step[] = [
  { icon: 'search', title: 'Je trouve', text: 'Une parcelle près de chez moi, sur la carte ou en liste.' },
  { icon: 'calendar', title: 'Je réserve', text: 'Je réserve la parcelle pour la saison, en quelques clics.' },
  { icon: 'users', title: 'Je rencontre', text: 'Je rencontre le propriétaire sur place et je reçois l’adresse exacte.' },
  { icon: 'sprout', title: 'Je cultive', text: 'Je plante, j’arrose, je récolte et je note mes kilos.' },
]

/** Parcours du propriétaire : de l'annonce aux versements. */
export const OWNER_STEPS: Step[] = [
  { icon: 'home', title: 'Je dépose', text: 'Je décris mon coin de jardin, avec photos, jours et horaires.' },
  { icon: 'users', title: 'Je rencontre', text: 'Un jardinier réserve : nous nous voyons pour faire connaissance.' },
  { icon: 'shield', title: 'Je valide', text: 'Il me donne son code : je valide la rencontre en un geste.' },
  { icon: 'heart', title: 'Je suis soutenu', text: 'Je reçois ma participation en trois versements (mars, juin, octobre).' },
]

/** Engagements affichés en bandeau pour rassurer. */
export const PROMISES: Step[] = [
  { icon: 'shield', title: 'Adresse protégée', text: 'L’adresse exacte n’est donnée qu’après la réservation.' },
  { icon: 'check', title: 'Rencontre avant tout', text: 'Rien n’est validé tant que vous ne vous êtes pas vus.' },
  { icon: 'calendar', title: 'Versements étalés', text: 'Le propriétaire reçoit sa participation en trois fois.' },
  { icon: 'heart', title: 'Entre voisins', text: 'Des jardins proches, des gens qui se parlent.' },
]

/** Autres rubriques du site, pour donner envie d'aller plus loin. */
export const THEMES: (Step & { badge: string })[] = [
  { icon: 'sprout', badge: 'Gratuit', title: 'Échange de plantes', text: 'Donnez vos surplus de plants et de semis, trouvez ceux qui vous manquent.' },
  { icon: 'basket', badge: 'Gratuit', title: 'À cueillir', text: 'Un cerisier qui déborde, du thym à volonté : venez cueillir, rien ne se perd.' },
  { icon: 'leaf', badge: 'Ensemble', title: 'Récoltes du réseau', text: 'Chaque jardin note ses kilos : on voit grandir la récolte commune.' },
]
