import Button from '@/components/ui/Button'
import CommuneSelect from '@/components/ui/CommuneSelect'
import Field from '@/components/ui/Field'
import Note from '@/components/ui/Note'
import PageHead from '@/components/ui/PageHead'
import PhotoPicker from '@/components/ui/PhotoPicker'
import type { PlantFormViewProps } from './types'

/** Formulaire de don de plantes (vue). */
const PlantFormView = ({ draft: d, isEdit, commune, kindOptions, photoEnabled, maxPhotos, uploading, saving, issues, onChange, onPhotos, onRemovePhoto, onSubmit, onCancel }: PlantFormViewProps) => (
  <>
    <PageHead title={isEdit ? "Modifier l'annonce" : 'Donner des plantes'} subtitle="Plants, semis, graines ou boutures : offerts gratuitement à d'autres jardiniers." />
    <form className="stack mx-auto max-w-3xl" onSubmit={e => { e.preventDefault(); onSubmit() }}>
      <section className="card pad grid gap-4 sm:grid-cols-2" aria-label="Le don">
        <h2 className="h2 sm:col-span-2">Ce que je donne</h2>
        <Field label="Titre de l'annonce" className="sm:col-span-2"><input className="in" value={d.title} maxLength={80} placeholder="Ex. Plants de tomates cœur de bœuf" onChange={e => onChange({ title: e.target.value })} /></Field>
        <Field label="Nature">
          <select className="in" value={d.kind} onChange={e => onChange({ kind: e.target.value as typeof d.kind })}>
            {kindOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </Field>
        <Field label="Quantité"><input className="in" type="number" min={1} max={999} inputMode="numeric" value={d.quantity || ''} onChange={e => onChange({ quantity: e.target.value === '' ? 0 : Number(e.target.value) })} /></Field>
        <Field label="Description (facultatif)" className="sm:col-span-2"><textarea className="in" rows={3} value={d.description} placeholder="Variété, âge des plants, conseils de culture, moment de remise…" onChange={e => onChange({ description: e.target.value })} /></Field>
        <PhotoPicker photos={d.photoUrls} maxPhotos={maxPhotos} enabled={photoEnabled} uploading={uploading} onPick={onPhotos} onRemove={onRemovePhoto} />
      </section>

      <section className="card pad grid gap-4 sm:grid-cols-2" aria-label="Remise">
        <h2 className="h2 sm:col-span-2">Où le récupérer</h2>
        <div><span className="lbl">Commune</span><CommuneSelect {...commune} /></div>
        <Field label="Téléphone (facultatif)" hint="Visible des membres connectés. Sans téléphone, on vous écrit par e-mail.">
          <input className="in" type="tel" value={d.phone} onChange={e => onChange({ phone: e.target.value })} />
        </Field>
        <div className="sm:col-span-2"><Note tone="info">Ne donnez pas votre adresse dans l'annonce : convenez du lieu de remise avec la personne intéressée.</Note></div>
      </section>

      {issues.length > 0 && (
        <div role="alert" className="note warn"><ul className="m-0 pl-5">{issues.map(i => <li key={i}>{i}</li>)}</ul></div>
      )}
      <div className="row">
        <Button type="submit" variant="primary" disabled={saving || uploading}>{saving ? 'Enregistrement…' : isEdit ? 'Enregistrer' : "Publier l'annonce"}</Button>
        <Button onClick={onCancel} disabled={saving}>Annuler</Button>
      </div>
    </form>
  </>
)

export default PlantFormView
