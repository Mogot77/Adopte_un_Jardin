import type { ReactNode } from 'react'

export type ChipProps = {
  /** `bl` bleu/vert marque, `ok` succès, `wa` attention, `ko` erreur, `gr` neutre. */
  tone?: 'bl' | 'ok' | 'wa' | 'ko' | 'gr'
  children: ReactNode
}
