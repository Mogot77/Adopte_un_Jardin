import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import MyParcelsView from './MyParcelsView'
import { buildMyParcelsModel } from './helpers'
import { mockParcels, mockReservations } from '@/stories'

// Le propriétaire des données factices est « jean@example.com » ; la date est figée pour des versements stables.
const mine = mockParcels.filter(p => p.ownerEmail === 'jean@example.com')
const TODAY = '2026-11-07'

const meta = {
  title: 'Ecrans/MyParcels', component: MyParcelsView,
  parameters: { layout: 'fullscreen' },
  args: { model: buildMyParcelsModel(mine, mockReservations, TODAY), busyId: null, onOpen: fn(), onEdit: fn(), onWithdraw: fn(), onNew: fn(), onValidate: fn(), onPayout: fn() },
} satisfies Meta<typeof MyParcelsView>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Empty: Story = { args: { model: buildMyParcelsModel([], [], TODAY) } }
export const Busy: Story = { args: { busyId: 'p1__camille@example.com' } }
