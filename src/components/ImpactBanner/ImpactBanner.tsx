import type { ImpactBannerProps } from './types'

const SWATCH = { fruit: 'bg-warn', legume: 'bg-brand', other: 'bg-faint' } as const

/** Infographie d'impact : kilos récoltés depuis le lancement (fruits, légumes, aromatiques) et évolution mois par mois. */
const ImpactBanner = ({ model: m, compact = false }: ImpactBannerProps) => (
  <section className="card pad text-left" aria-label="Récoltes depuis le lancement">
    <p className="muted text-[13px] font-semibold uppercase tracking-wide">Ensemble, depuis le lancement</p>
    <p className="mt-1 text-3xl font-bold text-brand">{m.totalLabel} <span className="text-base font-semibold text-ink">récoltés dans les jardins du réseau</span></p>
    {m.isEmpty && <p className="muted mt-1 text-[13px]">Les premiers kilos seront comptés ici : notez vos récoltes sur la fiche de votre jardin.</p>}

    <ul className="m-0 mt-4 grid list-none gap-3 p-0 sm:grid-cols-3">
      {m.counters.map(c => (
        <li key={c.key} className="flex items-center gap-2">
          <span aria-hidden="true" className={`size-3 shrink-0 rounded-sm ${SWATCH[c.key]}`} />
          <span><b className="text-lg">{c.kgLabel}</b> <span className="muted text-[13px]">{c.label}</span></span>
        </li>
      ))}
    </ul>

    <div className="mt-4 grid gap-3 sm:grid-cols-2">
      <div className="rounded-lg bg-brand-bg px-4 py-3">
        <p className="m-0 text-2xl font-bold text-brand">≈ {m.savedEurLabel}</p>
        <p className="muted m-0 text-[13px]">économisés sur les courses de fruits et légumes</p>
      </div>
      <div className="rounded-lg bg-brand-bg px-4 py-3">
        <p className="m-0 text-2xl font-bold text-brand">≈ {m.co2Label}</p>
        <p className="muted m-0 text-[13px]">de CO₂ évité (production, transport, emballage)</p>
      </div>
    </div>
    <p className="muted m-0 mt-2 text-[12px]">Estimations : environ 3 à 6 € le kilo selon le type de produit, et 0,5 kg de CO₂ évité par kilo récolté.</p>

    {!compact && (
      <figure className="m-0 mt-5">
        <div className="flex h-24 items-end gap-1" role="img" aria-label={`Kilos récoltés par mois sur les douze derniers mois, ${m.totalLabel} en tout`}>
          {m.bars.map(b => (
            <div key={b.month} className="flex h-full flex-1 flex-col justify-end" title={b.title}>
              {b.heightPct > 0
                ? (
                  <div className="flex w-full flex-col-reverse overflow-hidden rounded-t-sm" style={{ height: `${b.heightPct}%` }}>
                    <div className="bg-warn" style={{ height: `${b.fruitPct}%` }} />
                    <div className="bg-brand" style={{ height: `${b.legumePct}%` }} />
                    <div className="bg-faint" style={{ height: `${b.otherPct}%` }} />
                  </div>
                )
                : <div className="h-0.5 w-full bg-line" />}
            </div>
          ))}
        </div>
        <div className="mt-1 flex gap-1" aria-hidden="true">
          {m.bars.map(b => <span key={b.month} className={`flex-1 text-center text-[10px] ${b.current ? 'font-bold text-ink' : 'text-faint'}`}>{b.initial}</span>)}
        </div>
        <figcaption className="muted mt-2 text-[12px]">Douze derniers mois, en kilos. {m.harvestsLabel} par les jardiniers et les cueilleurs : le compteur grandit à chaque saisie.</figcaption>
      </figure>
    )}
  </section>
)

export default ImpactBanner
