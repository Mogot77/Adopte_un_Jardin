import type { ImpactModel } from '@/components/ImpactBanner'
import type { Theme } from '@/helpers/theme'

export type LoginViewProps = {
  theme: Theme
  /** Infographie des kilos récoltés depuis le lancement. */
  impact: ImpactModel
  error?: string
  onLogin: () => void
  onToggleTheme: () => void
}
