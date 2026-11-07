import Note from '@/components/ui/Note'
import PageHead from '@/components/ui/PageHead'
import type { GuideViewProps } from './types'

/** Mode d'emploi (vue) : parcours, tarifs, versements, charte du jardinier. */
const GuideView = ({ model }: GuideViewProps) => (
  <>
    <PageHead title="Mode d'emploi" subtitle="Adopte un Jardin met en relation des personnes qui cherchent une parcelle et celles qui en ont une à proposer." />
    <div className="stack mx-auto max-w-3xl" style={{ '--gap': '16px' } as React.CSSProperties}>
      <section className="card pad">
        <h2 className="h2s">Je cherche un terrain</h2>
        <ol className="m-0 list-decimal pl-5 leading-relaxed">
          <li>Je recherche une commune et un rayon : la carte indique le nombre de jardins disponibles.</li>
          <li>Je consulte l'annonce, puis je réserve la parcelle et je paie en ligne l'année culturale.</li>
          <li>Je reçois un <b>code</b> et les coordonnées exactes du propriétaire.</li>
          <li>Après une première rencontre, je donne le code au propriétaire : la location est validée. Si la parcelle ne me convient pas, j'annule avant de donner le code.</li>
        </ol>
      </section>
      <section className="card pad">
        <h2 className="h2s">Je dépose une parcelle</h2>
        <ol className="m-0 list-decimal pl-5 leading-relaxed">
          <li>Je décris mon terrain : surface, participation (un prix conseillé est proposé), outils, eau, jours et horaires d'accès, photos (jusqu'à 6).</li>
          <li>Mon adresse reste cachée tant qu'un jardinier n'a pas payé sa réservation.</li>
          <li>Après la première rencontre, je saisis le code remis par le jardinier pour valider la location.</li>
          <li>Je demande mes versements depuis « Mes parcelles ».</li>
        </ol>
        <table className="t mt-3 w-full" aria-label="Échéancier des versements">
          <thead><tr><th>Versement</th><th>Part de la participation</th></tr></thead>
          <tbody>{model.payouts.map(p => <tr key={p.label}><td>{p.label}</td><td>{p.share}</td></tr>)}</tbody>
        </table>
      </section>
      <section className="card pad">
        <h2 className="h2s">Frais de service</h2>
        <p className="muted mb-2">Payés par le jardinier en plus de la participation, selon la participation annuelle. Le propriétaire perçoit l'intégralité de la participation.</p>
        <table className="t w-full" aria-label="Barème des frais de service">
          <thead><tr><th>Participation annuelle</th><th>Frais de service</th></tr></thead>
          <tbody>{model.commission.map(c => <tr key={c.label}><td>{c.label}</td><td>{c.value}</td></tr>)}</tbody>
        </table>
      </section>
      <section className="card pad">
        <h2 className="h2s">Charte du jardinier</h2>
        <ul className="m-0 list-disc pl-5 leading-relaxed">
          <li>Je respecte le terrain, ses équipements, les horaires d'accès et le nombre de personnes autorisées.</li>
          <li>Je jardine de façon responsable : pas de produits nocifs, économie d'eau, compost.</li>
          <li>Je ne commercialise pas ma production : elle sert à nourrir ma famille, mes voisins ou des associations.</li>
          <li>Je préviens le propriétaire en cas de difficulté, et je rends le terrain propre en fin de saison.</li>
        </ul>
      </section>
      <Note tone="warn">Version de démonstration : le paiement est simulé, les e-mails de confirmation ne sont pas encore envoyés et les versements sont à effectuer manuellement.</Note>
    </div>
  </>
)

export default GuideView
