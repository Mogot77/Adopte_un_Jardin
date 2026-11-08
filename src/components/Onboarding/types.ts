import type { CommuneSelectProps } from '@/components/ui/CommuneSelect'

export type OnboardingForm = {
  name: string
  phone: string
  wantsGarden: boolean
  offersGarden: boolean
}

export type OnboardingViewProps = {
  form: OnboardingForm
  commune: CommuneSelectProps
  saving: boolean
  error?: string
  onChange: (patch: Partial<OnboardingForm>) => void
  onSubmit: () => void
}
