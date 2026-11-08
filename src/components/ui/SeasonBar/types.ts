export type SeasonBarProps = {
  /** Vrai pour chacun des 12 mois de la période de cueillette. */
  months: boolean[]
  /** Initiales des 12 mois. */
  initials: string[]
  /** Mois courant (1 à 12), entouré. */
  currentMonth: number
  /** Phrase lue par les lecteurs d'écran (ex. « Cueillette de mars à mai »). */
  label: string
}
