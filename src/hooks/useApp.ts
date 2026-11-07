import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useAppStore'
import { selectProfile } from '@/store/selectors'
import { toast as toastThunk } from '@/store/thunks/toast'
import type { ToastKind } from '@/components/ui/Toasts'

/** Façade des écrans : profil du compte (défini une fois l'inscription terminée) et messages temporaires. */
export const useApp = () => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(selectProfile)
  const toast = useCallback((text: string, kind: ToastKind = 'ok') => dispatch(toastThunk(text, kind)), [dispatch])
  return { profile: profile ?? null, toast }
}
