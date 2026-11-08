import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import HarvestsView from './HarvestsView'
import { buildHarvestsModel } from './helpers'
import { HARVEST_KINDS } from '@/helpers/harvests'
import { mockCommunes, mockHarvests } from '@/stories'

const none = { query: '', options: [], loading: false, onQuery: fn(), onPick: fn() }
/** Octobre : les pommes et les noix sont à cueillir, les cerises sont finies. */
const filters = { commune: mockCommunes[0], radiusKm: 20, kind: null, onlyNow: false, month: 10 }

const meta = {
  title: 'Ecrans/Harvests', component: HarvestsView,
  parameters: { layout: 'fullscreen' },
  args: {
    model: buildHarvestsModel(mockHarvests, [], filters, 'camille@example.com'), commune: { ...none, value: mockCommunes[0] },
    radiusKm: 20, radiusOptions: [5, 10, 20, 50], kind: '', kindOptions: HARVEST_KINDS, onlyNow: false, busyId: null,
    onRadius: fn(), onKind: fn(), onOnlyNow: fn(), onOpen: fn(), onNew: fn(), onEdit: fn(), onToggle: fn(), onDelete: fn(),
  },
} satisfies Meta<typeof HarvestsView>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const OnlyThisMonth: Story = { args: { onlyNow: true, model: buildHarvestsModel(mockHarvests, [], { ...filters, onlyNow: true }, 'camille@example.com') } }
export const WithMyOffers: Story = { args: { model: buildHarvestsModel(mockHarvests, mockHarvests, filters, 'camille@example.com') } }
export const Empty: Story = { args: { model: buildHarvestsModel([], [], filters, 'camille@example.com') } }
