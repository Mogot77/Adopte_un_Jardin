import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import Toasts from './Toasts'

const meta = {
  title: 'UI/Toasts', component: Toasts,
  args: { onClose: fn(), items: [{ id: 1, kind: 'ok', text: 'Annonce publiée.' }, { id: 2, kind: 'error', text: 'Code incorrect.' }, { id: 3, kind: 'info', text: 'Brouillon enregistré.' }] },
} satisfies Meta<typeof Toasts>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
