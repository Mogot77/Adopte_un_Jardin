/* Données factices pour Storybook uniquement : ne jamais importer depuis le code de l'application. */
import type { Commune, HarvestOffer, ImpactMonth, Parcel, ParcelPrivate, Plant, Profile, Reservation, YieldEntry } from '@/types'

export const mockCommunes: Commune[] = [
  { code: '77288', nom: 'Melun', lat: 48.5396, lon: 2.6606, dept: '77' },
  { code: '77333', nom: 'Le Mée-sur-Seine', lat: 48.5337, lon: 2.6319, dept: '77' },
  { code: '94028', nom: 'Créteil', lat: 48.7904, lon: 2.4556, dept: '94' },
  { code: '91228', nom: 'Évry-Courcouronnes', lat: 48.6296, lon: 2.4417, dept: '91' },
]

export const mockProfile: Profile = {
  email: 'camille@example.com', name: 'Camille Martin', phone: '06 12 34 56 78', commune: mockCommunes[0],
  wantsGarden: true, offersGarden: true, role: 'membre', createdAt: '2026-09-01T09:00:00.000Z',
}

const base = {
  ownerEmail: 'jean@example.com', ownerName: 'Jean Dupont', gardenerEmail: '', photoUrls: [], status: 'publiee' as const,
  createdAt: '2026-09-10T10:00:00.000Z', updatedAt: '2026-09-10T10:00:00.000Z', water: 'robinet' as const, waterMeter: false,
  toolsProvided: true, toolsPricePerYear: 10, maxPeople: 2, toilets: false, equipment: 'Abri de jardin', access: 'Lun–Dim 8h–20h', accessSlots: [0, 1, 2, 3, 4, 5, 6].map(day => ({ day, from: '08:00', to: '20:00' })),
}

export const mockParcels: Parcel[] = [
  { ...base, id: 'p1', title: 'Potager ensoleillé derrière la maison', description: 'Terrain plat, sol riche, exposé plein sud.', commune: mockCommunes[0], surface: 120, pricePerYear: 480 },
  { ...base, id: 'p2', title: 'Petit carré près du lavoir', description: '', commune: mockCommunes[1], surface: 45, pricePerYear: 180, water: 'cuve', toolsProvided: false, toolsPricePerYear: 0 },
  { ...base, id: 'p3', title: 'Grand jardin avec verger', description: 'Quelques arbres fruitiers déjà en place.', commune: mockCommunes[0], surface: 260, pricePerYear: 900, toilets: true, equipment: 'Abri, composteur' },
  { ...base, id: 'p4', title: 'Parcelle en bord de Marne', description: '', commune: mockCommunes[2], surface: 80, pricePerYear: 330, water: 'aucune', waterMeter: true },
]

export const mockPrivate: ParcelPrivate = { id: 'p1', ownerEmail: 'jean@example.com', address: '12 chemin des Vignes, 77000 Melun', phone: '06 98 76 54 32' }

export const mockReservations: Reservation[] = [
  {
    id: 'p1__camille@example.com', parcelId: 'p1', parcelTitle: 'Potager ensoleillé derrière la maison', communeNom: 'Melun',
    ownerEmail: 'jean@example.com', ownerName: 'Jean Dupont', gardenerEmail: 'camille@example.com', gardenerName: 'Camille Martin',
    season: 2027, price: 480, fee: 14.4, total: 494.4, status: 'payee', payoutsRequested: [], createdAt: '2026-11-07T10:00:00.000Z',
  },
  {
    id: 'p3__camille@example.com', parcelId: 'p3', parcelTitle: 'Grand jardin avec verger', communeNom: 'Melun',
    ownerEmail: 'jean@example.com', ownerName: 'Jean Dupont', gardenerEmail: 'camille@example.com', gardenerName: 'Camille Martin',
    season: 2026, price: 900, fee: 22.5, total: 922.5, status: 'validee', payoutsRequested: ['mars'], createdAt: '2026-02-01T10:00:00.000Z', validatedAt: '2026-02-10T10:00:00.000Z',
  },
]

export const mockPlants: Plant[] = [
  { id: 'pl1', ownerEmail: 'jean@example.com', ownerName: 'Jean Dupont', kind: 'plant', title: 'Plants de tomates cœur de bœuf', description: 'Plants robustes issus de mes semis, prêts à repiquer. À récupérer le week-end.', quantity: 8, commune: mockCommunes[0], phone: '06 98 76 54 32', photoUrls: [], status: 'disponible', createdAt: '2027-04-02T10:00:00.000Z', updatedAt: '2027-04-02T10:00:00.000Z' },
  { id: 'pl2', ownerEmail: 'jean@example.com', ownerName: 'Jean Dupont', kind: 'graines', title: 'Graines de courge butternut', description: '', quantity: 3, commune: mockCommunes[1], phone: '', photoUrls: [], status: 'disponible', createdAt: '2027-03-20T10:00:00.000Z', updatedAt: '2027-03-20T10:00:00.000Z' },
  { id: 'pl3', ownerEmail: 'lea@example.com', ownerName: 'Léa Bernard', kind: 'bouture', title: 'Boutures de géranium', description: 'Rouge et rose.', quantity: 1, commune: mockCommunes[2], phone: '', photoUrls: [], status: 'donne', createdAt: '2027-03-01T10:00:00.000Z', updatedAt: '2027-03-05T10:00:00.000Z' },
]

export const mockHarvests: HarvestOffer[] = [
  {
    id: 'h1', ownerEmail: 'jean@example.com', ownerName: 'Jean Dupont', title: 'Pommiers, poiriers et thym du verger',
    description: 'Le verger est trop grand pour nous : les fruits tombent et pourrissent. Servez-vous !',
    items: [
      { name: 'Pommier reinette', kind: 'fruit', fromMonth: 9, toMonth: 11, note: 'Échelle fournie, arbres hauts' },
      { name: 'Poirier', kind: 'fruit', fromMonth: 8, toMonth: 10, note: '' },
      { name: 'Thym', kind: 'aromatique', fromMonth: 1, toMonth: 12, note: 'Près du portail, à couper aux ciseaux' },
      { name: 'Romarin', kind: 'aromatique', fromMonth: 1, toMonth: 12, note: '' },
    ],
    instructions: 'Apportez des paniers et un sécateur ; le portail se ferme à clé.',
    accessSlots: [{ day: 5, from: '09:00', to: '12:00' }, { day: 6, from: '09:00', to: '12:00' }],
    commune: mockCommunes[0], phone: '06 98 76 54 32', photoUrls: [], status: 'ouverte', createdAt: '2027-08-20T10:00:00.000Z', updatedAt: '2027-08-20T10:00:00.000Z',
  },
  {
    id: 'h2', ownerEmail: 'jean@example.com', ownerName: 'Jean Dupont', title: 'Cerisier et groseilliers',
    description: '',
    items: [
      { name: 'Cerisier', kind: 'fruit', fromMonth: 6, toMonth: 7, note: '' },
      { name: 'Groseilliers', kind: 'fruit', fromMonth: 6, toMonth: 8, note: '' },
    ],
    instructions: '', accessSlots: [], commune: mockCommunes[1], phone: '', photoUrls: [], status: 'ouverte', createdAt: '2027-05-10T10:00:00.000Z', updatedAt: '2027-05-10T10:00:00.000Z',
  },
  {
    id: 'h3', ownerEmail: 'lea@example.com', ownerName: 'Léa Bernard', title: 'Coing et noix de la vieille ferme',
    description: 'Récolte à ramasser au sol.',
    items: [
      { name: 'Cognassier', kind: 'fruit', fromMonth: 10, toMonth: 11, note: '' },
      { name: 'Noyer', kind: 'fruit', fromMonth: 9, toMonth: 10, note: 'Ramasser les noix tombées' },
    ],
    instructions: 'Sonnez au portail, je vous ouvre.', accessSlots: [{ day: 2, from: '14:00', to: '18:00' }], commune: mockCommunes[2], phone: '', photoUrls: [], status: 'fermee', createdAt: '2027-09-01T10:00:00.000Z', updatedAt: '2027-11-20T10:00:00.000Z',
  },
]

const yieldBase = { sourceType: 'parcelle', sourceId: 'p1', ownerEmail: 'jean@example.com', authorEmail: 'camille@example.com' } as const
export const mockYields: YieldEntry[] = [
  { ...yieldBase, id: 'y1', crop: 'Cerises', kind: 'fruit', kg: 12.5, date: '2027-06-18', createdAt: '2027-06-18T18:00:00.000Z' },
  { ...yieldBase, id: 'y2', crop: 'Courgettes', kind: 'legume', kg: 8, date: '2027-07-10', createdAt: '2027-07-10T18:00:00.000Z' },
  { ...yieldBase, id: 'y3', crop: 'courgettes', kind: 'legume', kg: 11.4, date: '2027-07-24', createdAt: '2027-07-24T18:00:00.000Z' },
  { ...yieldBase, id: 'y4', crop: 'Tomates', kind: 'legume', kg: 21, date: '2027-08-15', createdAt: '2027-08-15T18:00:00.000Z' },
  { ...yieldBase, id: 'y5', authorEmail: 'jean@example.com', crop: 'Thym', kind: 'aromatique', kg: 0.6, date: '2027-08-20', createdAt: '2027-08-20T18:00:00.000Z' },
]

/** Compteurs publics factices : de février à octobre 2027. */
export const mockImpactMonths: ImpactMonth[] = [
  { month: '2027-02', fruit: 0, legume: 0, aromatique: 1.5, autre: 0, count: 2 },
  { month: '2027-04', fruit: 0, legume: 14, aromatique: 3, autre: 0, count: 6 },
  { month: '2027-05', fruit: 22, legume: 40, aromatique: 4, autre: 0, count: 11 },
  { month: '2027-06', fruit: 180, legume: 95, aromatique: 6, autre: 0, count: 24 },
  { month: '2027-07', fruit: 260, legume: 310, aromatique: 8, autre: 5, count: 41 },
  { month: '2027-08', fruit: 340, legume: 520, aromatique: 9, autre: 0, count: 58 },
  { month: '2027-09', fruit: 610, legume: 380, aromatique: 7, autre: 12, count: 63 },
  { month: '2027-10', fruit: 450, legume: 150, aromatique: 5, autre: 0, count: 37 },
]
