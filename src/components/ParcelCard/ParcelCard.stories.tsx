import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import ParcelCard from './ParcelCard'
import { buildParcelCard } from './helpers'
import { mockParcels } from '@/stories'

const meta = { title: 'Composants/ParcelCard', component: ParcelCard, args: { model: buildParcelCard(mockParcels[0], 3.2), onOpen: fn() } } satisfies Meta<typeof ParcelCard>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Minimal: Story = { args: { model: buildParcelCard(mockParcels[3], null) } }
export const WithEquipment: Story = { args: { model: buildParcelCard(mockParcels[2], 12) } }
