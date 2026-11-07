import type { NavItem } from './types'

const ITEMS: { href: string; label: string; match: (path: string) => boolean }[] = [
  { href: '#/', label: 'Chercher un jardin', match: p => p === '/' || p === '' || p.startsWith('/parcelle/') },
  { href: '#/proposer', label: 'Proposer une parcelle', match: p => p.startsWith('/proposer') },
  { href: '#/mes-parcelles', label: 'Mes parcelles', match: p => p === '/mes-parcelles' },
  { href: '#/mes-reservations', label: 'Mes réservations', match: p => p === '/mes-reservations' },
  { href: '#/echanges', label: 'Échange de plantes', match: p => p.startsWith('/echanges') },
  { href: '#/guide', label: "Mode d'emploi", match: p => p === '/guide' },
]

/** Entrées du menu, avec celle de la page courante marquée. */
export const buildNav = (path: string): NavItem[] => ITEMS.map(i => ({ href: i.href, label: i.label, active: i.match(path) }))
