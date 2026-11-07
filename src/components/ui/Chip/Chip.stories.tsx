import type { Meta, StoryObj } from '@storybook/react-vite'
import Chip from './Chip'

const meta = { title: 'UI/Chip', component: Chip, args: { children: 'Disponible' } } satisfies Meta<typeof Chip>
export default meta
type Story = StoryObj<typeof meta>

export const Brand: Story = { args: { tone: 'bl' } }
export const Ok: Story = { args: { tone: 'ok', children: 'Validée' } }
export const Warning: Story = { args: { tone: 'wa', children: 'En attente du code' } }
export const Error: Story = { args: { tone: 'ko', children: 'Annulée' } }
export const Neutral: Story = { args: { tone: 'gr', children: 'Retirée' } }
