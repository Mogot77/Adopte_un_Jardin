import type { ImpactModel } from '@/components/ImpactBanner'
import type { Theme } from '@/helpers/theme'

/** Parcours choisi à l'entrée : chercher une parcelle ou en proposer une. */
export type LoginIntent = 'search' | 'offer'

export type LoginViewProps = {
  theme: Theme
  /** Infographie des kilos récoltés depuis le lancement. */
  impact: ImpactModel
  error?: string
  onLogin: (intent: LoginIntent) => void
  onToggleTheme: () => void
}
