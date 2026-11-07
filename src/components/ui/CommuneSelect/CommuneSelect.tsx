import type { CommuneSelectProps } from './types'

/** Choix d'une commune : la commune retenue s'affiche comme une pastille, sinon un champ de saisie avec suggestions. */
const CommuneSelect = ({ value, query, options, loading, onQuery, onPick, placeholder = 'Commune ou code postal' }: CommuneSelectProps) => (
  <div className="relative">
    {value ? (
      <div className="in justify-between">
        <span><b>{value.nom}</b> <span className="muted">({value.dept})</span></span>
        <button type="button" className="border-0 bg-transparent text-sm text-brand" onClick={() => onPick(null)}>Changer</button>
      </div>
    ) : (
      <>
        <input
          className="in" type="search" value={query} placeholder={placeholder} autoComplete="off"
          aria-label="Rechercher une commune" onChange={e => onQuery(e.target.value)}
        />
        {(options.length > 0 || loading) && (
          <ul className="absolute inset-x-0 top-full z-20 mt-1 max-h-64 overflow-auto rounded-lg border border-field bg-surface p-1 shadow-lg" role="listbox">
            {loading && options.length === 0 && <li className="px-3 py-2 text-xs text-muted">Recherche…</li>}
            {options.map(c => (
              <li key={c.code} role="option" aria-selected="false">
                <button type="button" className="w-full rounded-md border-0 bg-transparent px-3 py-2 text-left text-sm text-ink hover:bg-ro" onClick={() => onPick(c)}>
                  {c.nom} <span className="muted">({c.dept})</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </>
    )}
  </div>
)

export default CommuneSelect
