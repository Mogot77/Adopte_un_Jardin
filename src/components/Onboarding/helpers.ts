import type { Commune } from '@/types'
import type { OnboardingForm } from './types'

/** Message d'erreur si le formulaire d'inscription est incomplet, sinon chaîne vide. */
export const onboardingError = (form: OnboardingForm, commune: Commune | null): string => {
  if (!form.name.trim()) return 'Indiquez votre nom.'
  if (!commune) return 'Choisissez votre commune.'
  if (!form.wantsGarden && !form.offersGarden) return 'Choisissez au moins une option : chercher un terrain ou proposer une parcelle.'
  return ''
}
