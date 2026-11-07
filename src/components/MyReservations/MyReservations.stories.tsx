import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import MyReservationsView from './MyReservationsView'
import { buildMyReservationsModel } from './helpers'
import { mockPrivate, mockReservations } from '@/stories'

const privates = { p1: mockPrivate, p3: { ...mockPrivate, id: 'p3', address: '3 rue du Verger, 77000 Melun' } }

const meta = {
  title: 'Ecrans/MyReservations', component: MyReservationsView,
  parameters: { layout: 'fullscreen' },
  args: { model: buildMyReservationsModel(mockReservations, { 'p1__camille@example.com': '482913' }, privates), busyId: null, onOpen: fn(), onCancel: fn(), onSearch: fn() },
} satisfies Meta<typeof MyReservationsView>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Empty: Story = { args: { model: { rows: [] } } }
export const WithCancelled: Story = { args: { model: buildMyReservationsModel([{ ...mockReservations[0], status: 'annulee' }], {}, privates) } }
