/* Données de test pour le développement : à retirer avant la mise en production. */
import { newParcelId, saveParcel } from '@/store/queries/parcels'
import { defaultSlot } from '@/helpers/schedule'
import type { Commune, ParcelDraft, Profile, WaterAccess } from '@/types'

const communes: Commune[] = [
  { code: '77288', nom: 'Melun', lat: 48.5396, lon: 2.6606, dept: '77' },
  { code: '77333', nom: 'Le Mée-sur-Seine', lat: 48.5337, lon: 2.6319, dept: '77' },
  { code: '77243', nom: 'Fontainebleau', lat: 48.4047, lon: 2.7016, dept: '77' },
  { code: '94028', nom: 'Créteil', lat: 48.7904, lon: 2.4556, dept: '94' },
  { code: '91228', nom: 'Évry-Courcouronnes', lat: 48.6296, lon: 2.4417, dept: '91' },
  { code: '75056', nom: 'Paris', lat: 48.8566, lon: 2.3522, dept: '75' },
  { code: '78646', nom: 'Versailles', lat: 48.8014, lon: 2.1301, dept: '78' },
  { code: '77284', nom: 'Meaux', lat: 48.9601, lon: 2.8788, dept: '77' },
  { code: '77122', nom: 'Chelles', lat: 48.8814, lon: 2.5905, dept: '77' },
  { code: '91377', nom: 'Massy', lat: 48.7309, lon: 2.2713, dept: '91' },
]

type Spec = { title: string; description: string; surface: number; pricePerYear: number; water: WaterAccess; tools: boolean; toilets: boolean; equipment: string; days: number[] }

const specs: Spec[] = [
  { title: 'Potager ensoleillé derrière la maison', description: 'Terrain plat, sol riche, exposé plein sud.', surface: 120, pricePerYear: 480, water: 'robinet', tools: true, toilets: false, equipment: 'Abri de jardin', days: [0, 1, 2, 3, 4, 5, 6] },
  { title: 'Petit carré près du lavoir', description: 'Idéal pour débuter, calme et fleuri.', surface: 45, pricePerYear: 180, water: 'cuve', tools: false, toilets: false, equipment: '', days: [5, 6] },
  { title: 'Grand jardin avec verger', description: 'Pommiers et pruniers déjà en place.', surface: 260, pricePerYear: 900, water: 'robinet', tools: true, toilets: true, equipment: 'Abri, composteur', days: [0, 1, 2, 3, 4] },
  { title: 'Parcelle en bord de Marne', description: 'Terre légère, bien drainée.', surface: 80, pricePerYear: 330, water: 'aucune', tools: false, toilets: false, equipment: '', days: [2, 5, 6] },
  { title: 'Jardin partagé de quartier', description: 'Ambiance conviviale, entraide entre voisins.', surface: 30, pricePerYear: 120, water: 'robinet', tools: true, toilets: true, equipment: 'Cabane à outils', days: [0, 1, 2, 3, 4, 5, 6] },
  { title: 'Terrasse potagère en ville', description: 'Bacs surélevés, accès simple.', surface: 20, pricePerYear: 150, water: 'robinet', tools: false, toilets: true, equipment: '', days: [5, 6] },
  { title: 'Clos fermé avec serre', description: 'Serre de 12 m² pour les semis précoces.', surface: 150, pricePerYear: 620, water: 'cuve', tools: true, toilets: false, equipment: 'Serre, abri', days: [0, 2, 4, 5, 6] },
  { title: 'Champ de plein vent', description: 'Grande surface idéale pour courges et pommes de terre.', surface: 400, pricePerYear: 700, water: 'aucune', tools: false, toilets: false, equipment: '', days: [1, 3, 5, 6] },
  { title: 'Jardin ombragé pour légumes-feuilles', description: 'Mi-ombre, parfait pour salades et herbes.', surface: 60, pricePerYear: 240, water: 'robinet', tools: true, toilets: false, equipment: 'Composteur', days: [0, 1, 2, 3, 4, 5, 6] },
  { title: 'Parcelle avec compteur d’eau', description: 'Consommation d’eau dissociée, abri et récupérateur.', surface: 95, pricePerYear: 410, water: 'robinet', tools: true, toilets: true, equipment: 'Abri, récupérateur d’eau', days: [0, 1, 2, 3, 4, 5, 6] },
]

/** Crée 10 annonces de test au nom du propriétaire donné. */
export const seedParcels = async (owner: Profile): Promise<void> => {
  await Promise.all(specs.map((s, i) => {
    const commune = communes[i % communes.length]
    const draft: ParcelDraft & { commune: Commune } = {
      title: `[TEST] ${s.title}`, description: s.description, commune, surface: s.surface, pricePerYear: s.pricePerYear,
      toolsProvided: s.tools, toolsPricePerYear: s.tools ? 10 : 0, water: s.water, waterMeter: i === 9, accessSlots: s.days.map(defaultSlot),
      maxPeople: 2, toilets: s.toilets, equipment: s.equipment, photoUrls: [], address: `${i + 1} rue du Test, ${commune.nom}`, phone: owner.phone,
    }
    return saveParcel(newParcelId(), draft, owner, null)
  }))
}
