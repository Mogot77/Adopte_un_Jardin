import type { Meta, StoryObj } from '@storybook/react-vite'
import Kv from './Kv'

const meta = { title: 'UI/Kv', component: Kv, args: { rows: [{ label: 'Surface', value: '120 m²' }, { label: 'Eau', value: 'Robinet' }, { label: 'Accès', value: 'Tous les jours, 8h-20h' }] } } satisfies Meta<typeof Kv>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
