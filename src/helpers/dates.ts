/* Dates et formats français. */
const pad = (n: number): string => String(n).padStart(2, '0')

const localIso = (d: Date): string => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

const forced = import.meta.env.VITE_TODAY as string | undefined

/** Date du jour (AAAA-MM-JJ, fuseau local). `VITE_TODAY` force une date (démonstration, tests). */
export const TODAY: string = forced && /^\d{4}-\d{2}-\d{2}$/.test(forced) ? forced : localIso(new Date())

/** Horodatage ISO pour les documents Firestore. */
export const nowIso = (): string => new Date().toISOString()

/** « 2026-11-07 » → « 07/11/2026 ». */
export const fmtDate = (iso: string): string => {
  const [y, m, d] = iso.slice(0, 10).split('-')
  return `${d}/${m}/${y}`
}

/** Année culturale à réserver : l'année en cours jusqu'en septembre, puis la suivante. */
export const currentSeason = (today: string = TODAY): number => {
  const [y, m] = today.split('-').map(Number)
  return m >= 10 ? y + 1 : y
}
