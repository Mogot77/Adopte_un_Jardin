import type { KvProps } from './types'

/** Liste de couples libellé / valeur. */
const Kv = ({ rows }: KvProps) => (
  <dl className="kv">
    {rows.map(r => (
      <div key={r.label} className="contents"><dt>{r.label}</dt><dd>{r.value}</dd></div>
    ))}
  </dl>
)

export default Kv
