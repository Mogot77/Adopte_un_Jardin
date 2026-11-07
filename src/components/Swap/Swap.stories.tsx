import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import SwapView from './SwapView'
import { buildSwapModel } from './helpers'
import { PLANT_KINDS } from '@/helpers/plants'
import { mockCommunes, mockPlants } from '@/stories'

const none = { query: '', options: [], loading: false, onQuery: fn(), onPick: fn() }
const filters = { commune: mockCommunes[0], radiusKm: 20, kind: null }

const meta = {
  title: 'Ecrans/Swap', component: SwapView,
  parameters: { layout: 'fullscreen' },
  args: {
    model: buildSwapModel(mockPlants, [], filters, 'camille@example.com'), commune: { ...none, value: mockCommunes[0] },
    radiusKm: 20, radiusOptions: [5, 10, 20, 50], kind: '', kindOptions: PLANT_KINDS, busyId: null,
    onRadius: fn(), onKind: fn(), onOpen: fn(), onNew: fn(), onEdit: fn(), onToggle: fn(), onDelete: fn(),
  },
} satisfies Meta<typeof SwapView>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithMyDonations: Story = { args: { model: buildSwapModel(mockPlants, mockPlants, filters, 'camille@example.com') } }
export const Empty: Story = { args: { model: buildSwapModel([], [], filters, 'camille@example.com') } }
