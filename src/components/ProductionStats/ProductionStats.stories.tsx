import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import ProductionStatsView from './ProductionStatsView'
import { buildProductionModel } from './helpers'
import { HARVEST_KINDS } from '@/helpers/harvests'
import { CROP_SUGGESTIONS, emptyYieldDraft, MAX_KG } from '@/helpers/production'
import { mockYields } from '@/stories'

const TODAY = '2027-10-15'

const meta = {
  title: 'Composants/ProductionStats', component: ProductionStatsView,
  args: {
    model: buildProductionModel(mockYields, 'camille@example.com'), draft: emptyYieldDraft(TODAY), suggestions: CROP_SUGGESTIONS.map(s => s.name),
    kindOptions: HARVEST_KINDS, maxKg: MAX_KG, today: TODAY, busy: false, issues: [], onChange: fn(), onSubmit: fn(), onDelete: fn(),
  },
} satisfies Meta<typeof ProductionStatsView>
export default meta
type Story = StoryObj<typeof meta>

export const WithHarvests: Story = {}
export const Empty: Story = { args: { model: buildProductionModel([], 'camille@example.com') } }
export const WithIssues: Story = { args: { issues: ['Indiquez la culture récoltée (ex. « Cerises »).', 'Le poids doit être compris entre 0,1 et 500 kg.'] } }
