import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import PlantCard from './PlantCard'
import { buildPlantCard } from './helpers'
import { mockPlants } from '@/stories'

const meta = { title: 'Composants/PlantCard', component: PlantCard, args: { model: buildPlantCard(mockPlants[0], 3.2), onOpen: fn() } } satisfies Meta<typeof PlantCard>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithoutDistance: Story = { args: { model: buildPlantCard(mockPlants[1], null) } }
