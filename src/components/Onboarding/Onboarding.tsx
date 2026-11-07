import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useApp } from '@/hooks/useApp'
import { useCommuneSelect } from '@/hooks/useCommuneSelect'
import { go } from '@/hooks/useRoute'
import { saveProfile } from '@/store/queries/users'
import type { Commune } from '@/types'
import { onboardingError } from './helpers'
import type { OnboardingForm } from './types'
import OnboardingView from './OnboardingView'

/** Première connexion : création du profil (nom, commune, et ce que la personne vient faire). */
const Onboarding = () => {
  const { user } = useAuth()
  const { profile, toast } = useApp()
  const email = user?.email?.toLowerCase() ?? ''
  const [form, setForm] = useState<OnboardingForm>({ name: user?.displayName ?? '', phone: '', wantsGarden: true, offersGarden: false })
  const [commune, setCommune] = useState<Commune | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const communeSelect = useCommuneSelect(commune, setCommune)

  const submit = () => {
    const issue = onboardingError(form, commune)
    if (issue) { setError(issue); return }
    setError('')
    setSaving(true)
    saveProfile(email, { ...form, commune }, profile)
      .then(() => { toast('Bienvenue sur Adopte un Jardin !'); go(form.offersGarden && !form.wantsGarden ? '#/proposer' : '#/') })
      .catch(e => { console.error(e); setError("L'inscription a échoué. Réessayez."); setSaving(false) })
  }

  return (
    <OnboardingView
      email={email} form={form} commune={communeSelect} saving={saving} error={error}
      onChange={patch => setForm(f => ({ ...f, ...patch }))} onSubmit={submit}
    />
  )
}

export default Onboarding
