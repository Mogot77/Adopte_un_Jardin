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
      <section className="card pad">
        <h2 className="h2s">J'échange des plantes</h2>
        <ol className="m-0 list-decimal pl-5 leading-relaxed">
          <li>Dans « Échange de plantes », je cherche des plants, semis, graines ou boutures donnés près de chez moi.</li>
          <li>Je clique sur « Écrire » pour contacter le donateur par e-mail et convenir d'un lieu de remise.</li>
          <li>Pour donner, je publie une annonce (gratuite). Quand c'est fait, je clique sur « C'est donné ».</li>
        </ol>
        <p className="muted mt-2">Les dons sont strictement gratuits, sans commission. Retrouvez-vous dans un lieu public.</p>
      </section>
      <section className="card pad">
        <h2 className="h2s">Je cueille ou je fais cueillir</h2>
        <ol className="m-0 list-decimal pl-5 leading-relaxed">
          <li>Dans « À cueillir », je trouve des fruits, aromatiques ou légumes à ramasser près de chez moi ; ceux de saison sont en tête.</li>
          <li>Sur la fiche, la frise des 12 mois m'indique la période de chaque arbre ou plante. J'écris au propriétaire pour convenir d'un moment.</li>
          <li>Pour proposer, je liste mes arbres et plantes avec leurs mois de cueillette, et les jours et heures où l'on peut venir. Quand il n'y a plus rien, je clique sur « Plus rien à cueillir : récolte réussie ! ».</li>
        </ol>
        <p className="muted mt-2">C'est gratuit et sans commission. On cueille raisonnablement, on remercie, on ne revend pas.</p>
      </section>
      <section className="card pad">
        <h2 className="h2s">Je note ma production</h2>
        <ol className="m-0 list-decimal pl-5 leading-relaxed">
          <li>Sur la fiche de ma parcelle ou de mon offre, dans « Production du jardin », je choisis la culture (cerises, courgettes, tomates…), le poids en kilos et la date.</li>
          <li>Je vois mes totaux par culture. Le propriétaire voit aussi les récoltes de son jardin.</li>
          <li>Chaque saisie s'ajoute au compteur de l'accueil : les kilos de fruits et de légumes récoltés depuis le lancement.</li>
        </ol>
      </section>
      <Note tone="warn">Version de démonstration : le paiement est simulé, les e-mails de confirmation ne sont pas encore envoyés et les versements sont à effectuer manuellement.</Note>
    </div>
  </>
)

export default GuideView
