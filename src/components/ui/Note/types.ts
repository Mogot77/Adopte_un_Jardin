import type { ReactNode } from 'react'

export type NoteProps = {
  tone?: 'default' | 'info' | 'warn'
  children: ReactNode
}
