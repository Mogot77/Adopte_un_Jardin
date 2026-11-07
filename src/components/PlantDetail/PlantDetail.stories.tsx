import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import PlantDetailView from './PlantDetailView'
import { buildPlantDetailModel } from './helpers'
import { mockPlants } from '@/stories'

const meta = {
  title: 'Ecrans/PlantDetail', component: PlantDetailView,
  parameters: { layout: 'fullscreen' },
  args: { model: buildPlantDetailModel(mockPlants[0], 'camille@example.com', 'Camille Martin'), busy: false, onEdit: fn(), onToggle: fn(), onBack: fn() },
} satisfies Meta<typeof PlantDetailView>
export default meta
type Story = StoryObj<typeof meta>

export const Available: Story = {}
export const Own: Story = { args: { model: buildPlantDetailModel(mockPlants[0], 'jean@example.com', 'Jean Dupont') } }
export const AlreadyGiven: Story = { args: { model: buildPlantDetailModel(mockPlants[2], 'camille@example.com', 'Camille Martin') } }
