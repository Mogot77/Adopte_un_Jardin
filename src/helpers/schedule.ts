/* Jours et plages horaires d'accès au terrain. Une plage par jour (0 = lundi ... 6 = dimanche). */
import type { AccessSlot } from '@/types'

export const DAY_LABELS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'] as const
const DAY_SHORT = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'] as const

export const DEFAULT_FROM = '08:00'
export const DEFAULT_TO = '20:00'

/** Raccourcis proposés dans le formulaire. */
export const SCHEDULE_PRESETS: { label: string; days: number[] }[] = [
  { label: 'Tous les jours', days: [0, 1, 2, 3, 4, 5, 6] },
  { label: 'En semaine', days: [0, 1, 2, 3, 4] },
  { label: 'Week-end', days: [5, 6] },
]

/** Plage par défaut pour un jour. */
export const defaultSlot = (day: number): AccessSlot => ({ day, from: DEFAULT_FROM, to: DEFAULT_TO })

/** Jours cochés remplacent la sélection, en gardant les horaires déjà saisis. */
export const applyDays = (slots: AccessSlot[], days: number[]): AccessSlot[] =>
  days.map(day => slots.find(s => s.day === day) ?? defaultSlot(day))

/** Coche ou décoche un jour ; la liste reste triée du lundi au dimanche. */
export const toggleDay = (slots: AccessSlot[], day: number, on: boolean): AccessSlot[] =>
  on
    ? [...slots.filter(s => s.day !== day), defaultSlot(day)].sort((a, b) => a.day - b.day)
    : slots.filter(s => s.day !== day)

/** Modifie les horaires d'un jour. */
export const setSlotTime = (slots: AccessSlot[], day: number, patch: Partial<Pick<AccessSlot, 'from' | 'to'>>): AccessSlot[] =>
  slots.map(s => (s.day === day ? { ...s, ...patch } : s))

/** « 08:00 » → « 8h », « 08:30 » → « 8h30 ». */
export const fmtTime = (t: string): string => {
  const [h = '', m = ''] = t.split(':')
  return m === '00' || m === '' ? `${Number(h)}h` : `${Number(h)}h${m}`
}

/** Résumé lisible, par exemple « Lun–Ven 8h–20h · Sam 9h–12h » (jours consécutifs aux mêmes horaires regroupés). */
export const formatAccess = (slots: AccessSlot[]): string => {
  const sorted = [...slots].sort((a, b) => a.day - b.day)
  const groups: AccessSlot[][] = []
  for (const s of sorted) {
    const last = groups[groups.length - 1]
    const prev = last?.[last.length - 1]
    if (last && prev && prev.day === s.day - 1 && prev.from === s.from && prev.to === s.to) last.push(s)
    else groups.push([s])
  }
  return groups.map(g => {
    const first = g[0]
    const end = g[g.length - 1]
    if (!first || !end) return ''
    const days = g.length === 1 ? DAY_SHORT[first.day] : g.length === 2 ? `${DAY_SHORT[first.day]}, ${DAY_SHORT[end.day]}` : `${DAY_SHORT[first.day]}–${DAY_SHORT[end.day]}`
    return `${days} ${fmtTime(first.from)}–${fmtTime(first.to)}`
  }).join(' · ')
}

/** Vrai si toutes les plages ont une fin postérieure au début. */
export const slotsValid = (slots: AccessSlot[]): boolean => slots.every(s => s.from !== '' && s.to !== '' && s.from < s.to)
