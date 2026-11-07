/* Données factices pour Storybook uniquement : ne jamais importer depuis le code de l'application. */
import type { Commune, Parcel, ParcelPrivate, Profile, Reservation } from '@/types'

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
  toolsProvided: true, toolsPricePerYear: 10, maxPeople: 2, toilets: false, equipment: 'Abri de jardin', access: 'Tous les jours de 8h à 20h',
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
