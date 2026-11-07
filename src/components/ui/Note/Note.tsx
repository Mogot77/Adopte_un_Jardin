import type { NoteProps } from './types'

const Note = ({ tone = 'default', children }: NoteProps) => (
  <div className={`note ${tone === 'default' ? '' : tone}`} role={tone === 'warn' ? 'alert' : undefined}>{children}</div>
)

export default Note
