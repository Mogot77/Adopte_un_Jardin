import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import HarvestCard from './HarvestCard'
import { buildHarvestCard } from './helpers'
import { mockHarvests } from '@/stories'

const meta = {
  title: 'Composants/HarvestCard', component: HarvestCard,
  args: { model: buildHarvestCard(mockHarvests[0], 3.2, 10), onOpen: fn() },
} satisfies Meta<typeof HarvestCard>
export default meta
type Story = StoryObj<typeof meta>

export const InSeason: Story = {}
export const Soon: Story = { args: { model: buildHarvestCard(mockHarvests[1], null, 5) } }
export const OutOfSeason: Story = { args: { model: buildHarvestCard(mockHarvests[1], null, 11) } }
