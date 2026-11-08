import Button from '@/components/ui/Button'
import CommuneSelect from '@/components/ui/CommuneSelect'
import Field from '@/components/ui/Field'
import Note from '@/components/ui/Note'
import PageHead from '@/components/ui/PageHead'
import PhotoPicker from '@/components/ui/PhotoPicker'
import ScheduleField from '@/components/ui/ScheduleField'
import type { HarvestFormViewProps } from './types'

/** Formulaire d'offre « à cueillir » (vue) : titre, essences avec leur période, lieu et accès. */
const HarvestFormView = ({ draft: d, isEdit, commune, kindOptions, monthNames, maxItems, photoEnabled, maxPhotos, uploading, saving, issues, onChange, onItemChange, onAddItem, onRemoveItem, onPhotos, onRemovePhoto, onSubmit, onCancel }: HarvestFormViewProps) => (
  <>
    <PageHead title={isEdit ? "Modifier l'offre" : 'Proposer ma récolte'} subtitle="Fruits, aromatiques ou légumes que vous ne ramassez pas : indiquez la période, des voisins viendront se servir. Gratuit, sans vente." />
    <form className="stack mx-auto max-w-3xl" onSubmit={e => { e.preventDefault(); onSubmit() }}>
      <section className="card pad grid gap-4 sm:grid-cols-2" aria-label="L'offre">
        <h2 className="h2 sm:col-span-2">Mon offre</h2>
        <Field label="Titre" className="sm:col-span-2"><input className="in" value={d.title} maxLength={80} placeholder="Ex. Pommiers, poiriers et thym du verger" onChange={e => onChange({ title: e.target.value })} /></Field>
        <Field label="Description (facultatif)" className="sm:col-span-2"><textarea className="in" rows={3} value={d.description} placeholder="Pourquoi vous proposez cette récolte, l'état du jardin, les variétés…" onChange={e => onChange({ description: e.target.value })} /></Field>
        <PhotoPicker photos={d.photoUrls} maxPhotos={maxPhotos} enabled={photoEnabled} uploading={uploading} onPick={onPhotos} onRemove={onRemovePhoto} />
      </section>

      <section className="card pad stack" style={{ '--gap': '14px' } as React.CSSProperties} aria-label="Les essences">
        <h2 className="h2">Ce qu'on peut cueillir</h2>
        <p className="muted text-[13px]">Pour chaque arbre ou plante, indiquez le premier et le dernier mois où l'on peut venir cueillir. Une période peut enjamber l'année (de novembre à février).</p>
        {d.items.map((item, index) => (
          <fieldset key={`item-${index + 1}`} className="grid gap-3 rounded-md border border-line p-3 sm:grid-cols-4">
            <legend className="px-1 text-[13px] font-bold">Essence {index + 1}</legend>
            <Field label="Nom" className="sm:col-span-2"><input className="in" value={item.name} maxLength={60} placeholder="Ex. Pommier reinette, thym, menthe" onChange={e => onItemChange(index, { name: e.target.value })} /></Field>
            <Field label="Type" className="sm:col-span-2">
              <select className="in" value={item.kind} onChange={e => onItemChange(index, { kind: e.target.value as typeof item.kind })}>
                {kindOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </Field>
            <Field label="De (mois)" className="sm:col-span-1">
              <select className="in" value={item.fromMonth} onChange={e => onItemChange(index, { fromMonth: Number(e.target.value) })}>
                {monthNames.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
              </select>
            </Field>
            <Field label="À (mois)" className="sm:col-span-1">
              <select className="in" value={item.toMonth} onChange={e => onItemChange(index, { toMonth: Number(e.target.value) })}>
                {monthNames.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
              </select>
            </Field>
            <Field label="Précision (facultatif)" className="sm:col-span-2"><input className="in" value={item.note} maxLength={120} placeholder="Variété, hauteur, quantité estimée…" onChange={e => onItemChange(index, { note: e.target.value })} /></Field>
            {d.items.length > 1 && (
              <div className="sm:col-span-4"><Button size="sm" variant="danger" onClick={() => onRemoveItem(index)}>Retirer cette essence</Button></div>
            )}
          </fieldset>
        ))}
        <div><Button dashed onClick={onAddItem} disabled={d.items.length >= maxItems}>+ Ajouter un arbre ou une plante</Button></div>
      </section>

      <section className="card pad grid gap-4 sm:grid-cols-2" aria-label="Lieu et accès">
        <h2 className="h2 sm:col-span-2">Où et comment venir</h2>
        <div><span className="lbl">Commune</span><CommuneSelect {...commune} /></div>
        <Field label="Téléphone (facultatif)" hint="Visible des membres connectés. Sans téléphone, on vous écrit par e-mail.">
          <input className="in" type="tel" value={d.phone} onChange={e => onChange({ phone: e.target.value })} />
        </Field>
        <div className="sm:col-span-2">
          <ScheduleField label="Jours et horaires pour venir cueillir" value={d.accessSlots} onChange={accessSlots => onChange({ accessSlots })} />
          <p className="muted mt-1 text-[13px]">Sans jour coché, la cueillette se fait sur rendez-vous.</p>
        </div>
        <Field label="Comment venir (facultatif)" className="sm:col-span-2" hint="Ce qu'il faut apporter (paniers, sécateur, échelle), règles du lieu.">
          <textarea className="in" rows={3} value={d.instructions} onChange={e => onChange({ instructions: e.target.value })} />
        </Field>
        <div className="sm:col-span-2"><Note tone="info">Ne donnez pas votre adresse dans l'offre : communiquez-la à la personne qui vous écrit.</Note></div>
      </section>

      {issues.length > 0 && (
        <div role="alert" className="note warn"><ul className="m-0 pl-5">{issues.map(i => <li key={i}>{i}</li>)}</ul></div>
      )}
      <div className="row">
        <Button type="submit" variant="primary" disabled={saving || uploading}>{saving ? 'Enregistrement…' : isEdit ? 'Enregistrer' : "Publier l'offre"}</Button>
        <Button onClick={onCancel} disabled={saving}>Annuler</Button>
      </div>
    </form>
  </>
)

export default HarvestFormView
