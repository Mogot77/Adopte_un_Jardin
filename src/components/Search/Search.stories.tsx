import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import SearchView from './SearchView'
import { buildSearchModel } from './helpers'
import { mockCommunes, mockParcels } from '@/stories'

const filters = { commune: mockCommunes[0], radiusKm: 20, maxPrice: null, activeCode: null }
const none = { value: null, query: '', options: [], loading: false, onQuery: fn(), onPick: fn() }

const meta = {
  title: 'Ecrans/Search', component: SearchView,
  parameters: { layout: 'fullscreen' },
  args: {
    model: buildSearchModel(mockParcels, filters, 'camille@example.com'),
    commune: { ...none, value: mockCommunes[0] }, radiusKm: 20, radiusOptions: [5, 10, 20, 50], maxPrice: '', activeCode: null, showRadius: true,
    onRadius: fn(), onMaxPrice: fn(), onBubble: fn(), onClearBubble: fn(), onOpen: fn(),
  },
} satisfies Meta<typeof SearchView>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const ByCommune: Story = { args: { activeCode: '77288', model: buildSearchModel(mockParcels, { ...filters, activeCode: '77288' }, 'camille@example.com') } }
export const NoResult: Story = { args: { model: buildSearchModel([], filters, 'camille@example.com') } }
export const NoCommune: Story = { args: { commune: none, showRadius: false, model: buildSearchModel(mockParcels, { ...filters, commune: null }, 'camille@example.com') } }
