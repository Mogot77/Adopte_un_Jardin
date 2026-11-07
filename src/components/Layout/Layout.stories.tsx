import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import LayoutView from './LayoutView'
import { buildNav } from './helpers'

const meta = {
  title: 'Composants/Layout', component: LayoutView,
  parameters: { layout: 'fullscreen' },
  args: { theme: 'light', name: 'Camille Martin', nav: buildNav('/'), toasts: [], children: <p>Contenu de la page</p>, onToggleTheme: fn(), onLogout: fn(), onCloseToast: fn() },
} satisfies Meta<typeof LayoutView>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const MyParcels: Story = { args: { nav: buildNav('/mes-parcelles') } }
export const WithToast: Story = { args: { toasts: [{ id: 1, kind: 'ok', text: 'Annonce publiée.' }] } }
