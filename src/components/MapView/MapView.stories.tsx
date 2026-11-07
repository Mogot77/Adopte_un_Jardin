import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import MapView from './MapView'
import { groupByCommune } from '@/helpers/parcels'
import { mockParcels } from '@/stories'

const meta = {
  title: 'Composants/MapView', component: MapView,
  args: { center: { lat: 48.54, lon: 2.66 }, zoom: 10, radiusKm: 20, bubbles: groupByCommune(mockParcels.map(parcel => ({ parcel, distanceKm: null }))), onSelect: fn() },
} satisfies Meta<typeof MapView>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Selected: Story = { args: { activeId: '77288' } }
export const NoResult: Story = { args: { bubbles: [] } }
