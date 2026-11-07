import Button from '@/components/ui/Button'
import CommuneSelect from '@/components/ui/CommuneSelect'
import ScheduleField from '@/components/ui/ScheduleField'
import Field from '@/components/ui/Field'
import Note from '@/components/ui/Note'
import PageHead from '@/components/ui/PageHead'
import { eur } from '@/helpers/pricing'
import type { ParcelFormViewProps } from './types'

const num = (v: string): number => (v === '' ? 0 : Number(v))

/** Formulaire de dépôt (vue) : le terrain, les outils, l'eau, l'accès et les coordonnées (cachées jusqu'au paiement). */
const ParcelFormView = ({ draft: d, isEdit, commune, suggested, bounds, waterOptions, photoEnabled, maxPhotos, uploading, saving, issues, onChange, onPhotos, onRemovePhoto, onSubmit, onCancel }: ParcelFormViewProps) => (
  <>
    <PageHead title={isEdit ? "Modifier l'annonce" : 'Proposer une parcelle'} subtitle="Louez la partie de votre jardin que vous ne cultivez pas." />
    <form className="stack mx-auto max-w-3xl" onSubmit={e => { e.preventDefault(); onSubmit() }}>
      <section className="card pad grid gap-4 sm:grid-cols-2" aria-label="Le terrain">
        <h2 className="h2 sm:col-span-2">Le terrain</h2>
        <Field label="Titre de l'annonce" className="sm:col-span-2"><input className="in" value={d.title} maxLength={80} onChange={e => onChange({ title: e.target.value })} /></Field>
        <Field label="Description (facultatif)" className="sm:col-span-2"><textarea className="in" rows={3} value={d.description} onChange={e => onChange({ description: e.target.value })} /></Field>
        <div><span className="lbl">Commune du terrain</span><CommuneSelect {...commune} /></div>
        <Field label="Surface cultivable (m²)"><input className="in" type="number" min={10} inputMode="numeric" value={d.surface || ''} onChange={e => onChange({ surface: num(e.target.value) })} /></Field>
        <Field label="Participation pour l'année culturale (€)" hint={`Prix conseillé : ${eur(suggested)}. Fourchette autorisée : ${eur(bounds.min)} à ${eur(bounds.max)}.`}>
          <input className="in" type="number" min={0} inputMode="numeric" value={d.pricePerYear || ''} onChange={e => onChange({ pricePerYear: num(e.target.value) })} />
        </Field>
        <Field label={`Photos (${d.photoUrls.length}/${maxPhotos})`} className="sm:col-span-2" hint={photoEnabled ? 'Une ou plusieurs photos ; la première sert de vignette.' : "L'envoi de photos n'est pas configuré (voir README)."}>
          <div className="stack" style={{ '--gap': '8px' } as React.CSSProperties}>
            {d.photoUrls.length > 0 && (
              <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {d.photoUrls.map((u, i) => (
                  <li key={u} className="relative">
                    <img src={u} alt={`Photo ${i + 1} de la parcelle`} className="h-28 w-full rounded-lg object-cover" />
                    <button type="button" className="btn absolute right-1 top-1 !min-h-0 !px-2 !py-0.5 text-xs" aria-label={`Retirer la photo ${i + 1}`} onClick={() => onRemovePhoto(i)}>Retirer</button>
                  </li>
                ))}
              </ul>
            )}
            <input className="in" type="file" accept="image/*" multiple disabled={!photoEnabled || uploading || d.photoUrls.length >= maxPhotos}
              onChange={e => { const f = Array.from(e.target.files ?? []); e.target.value = ''; if (f.length > 0) onPhotos(f) }} />
            {uploading && <span className="text-xs text-muted">Envoi en cours…</span>}
          </div>
        </Field>
      </section>

      <section className="card pad grid gap-4 sm:grid-cols-2" aria-label="Outils et eau">
        <h2 className="h2 sm:col-span-2">Outils, eau et équipements</h2>
        <label className="flex items-center gap-2 sm:col-span-2"><input type="checkbox" checked={d.toolsProvided} onChange={e => onChange({ toolsProvided: e.target.checked })} />Je mets des outils à disposition</label>
        {d.toolsProvided && <Field label="Participation annuelle aux outils (€)" hint="De l'euro symbolique à quelques dizaines d'euros."><input className="in" type="number" min={0} value={d.toolsPricePerYear || ''} onChange={e => onChange({ toolsPricePerYear: num(e.target.value) })} /></Field>}
        <Field label="Eau">
          <select className="in" value={d.water} onChange={e => onChange({ water: e.target.value as typeof d.water })}>
            {waterOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </Field>
        <label className="flex items-center gap-2"><input type="checkbox" checked={d.waterMeter} onChange={e => onChange({ waterMeter: e.target.checked })} />Compteur d'eau individuel pour le jardin</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={d.toilets} onChange={e => onChange({ toilets: e.target.checked })} />Sanitaires mis à disposition</label>
        <Field label="Autres équipements (abri, piscine, jeux…)" className="sm:col-span-2"><input className="in" value={d.equipment} onChange={e => onChange({ equipment: e.target.value })} /></Field>
      </section>

      <section className="card pad grid gap-4 sm:grid-cols-2" aria-label="Accès">
        <h2 className="h2 sm:col-span-2">Accès</h2>
        <div className="sm:col-span-2"><ScheduleField value={d.accessSlots} onChange={accessSlots => onChange({ accessSlots })} /></div>
        <Field label="Personnes présentes en même temps (max.)"><input className="in" type="number" min={1} value={d.maxPeople || ''} onChange={e => onChange({ maxPeople: num(e.target.value) })} /></Field>
      </section>

      <section className="card pad grid gap-4 sm:grid-cols-2" aria-label="Coordonnées">
        <h2 className="h2 sm:col-span-2">Vos coordonnées</h2>
        <div className="sm:col-span-2"><Note tone="info">Adresse et téléphone ne sont communiqués au jardinier qu'après le paiement de sa réservation.</Note></div>
        <Field label="Adresse exacte du terrain"><input className="in" value={d.address} autoComplete="street-address" onChange={e => onChange({ address: e.target.value })} /></Field>
        <Field label="Téléphone"><input className="in" type="tel" value={d.phone} autoComplete="tel" onChange={e => onChange({ phone: e.target.value })} /></Field>
      </section>

      {issues.length > 0 && (
        <div role="alert" className="note warn"><ul className="m-0 list-disc pl-5">{issues.map(i => <li key={i}>{i}</li>)}</ul></div>
      )}
      <div className="row">
        <Button type="submit" variant="primary" disabled={saving || uploading}>{saving ? 'Enregistrement…' : isEdit ? 'Enregistrer' : "Publier l'annonce"}</Button>
        <Button onClick={onCancel} disabled={saving}>Annuler</Button>
      </div>
    </form>
  </>
)

export default ParcelFormView
