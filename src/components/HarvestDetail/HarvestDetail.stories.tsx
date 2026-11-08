import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import HarvestDetailView from './HarvestDetailView'
import { buildHarvestDetailModel } from './helpers'
import { mockHarvests } from '@/stories'

const meta = {
  title: 'Ecrans/HarvestDetail', component: HarvestDetailView,
  parameters: { layout: 'fullscreen' },
  args: { model: buildHarvestDetailModel(mockHarvests[0], 'camille@example.com', 'Camille Martin', 10), busy: false, onEdit: fn(), onToggle: fn(), onBack: fn() },
} satisfies Meta<typeof HarvestDetailView>
export default meta
type Story = StoryObj<typeof meta>

export const InSeason: Story = {}
export const OutOfSeason: Story = { args: { model: buildHarvestDetailModel(mockHarvests[1], 'camille@example.com', 'Camille Martin', 10) } }
export const Own: Story = { args: { model: buildHarvestDetailModel(mockHarvests[0], 'jean@example.com', 'Jean Dupont', 10) } }
export const Closed: Story = { args: { model: buildHarvestDetailModel(mockHarvests[2], 'camille@example.com', 'Camille Martin', 10) } }
