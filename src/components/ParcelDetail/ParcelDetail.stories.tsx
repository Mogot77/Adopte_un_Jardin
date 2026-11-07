import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import ParcelDetailView from './ParcelDetailView'
import { buildParcelDetailModel } from './helpers'
import { mockPrivate, mockParcels, mockReservations } from '@/stories'

const ctx = { myEmail: 'camille@example.com', booking: null, code: '', contact: null, season: 2027 }

const meta = {
  title: 'Ecrans/ParcelDetail', component: ParcelDetailView,
  parameters: { layout: 'fullscreen' },
  args: { model: buildParcelDetailModel(mockParcels[0], ctx), step: 'view', accepted: false, busy: false, onStart: fn(), onBack: fn(), onAccept: fn(), onPay: fn(), onEdit: fn(), onSearch: fn() },
} satisfies Meta<typeof ParcelDetailView>
export default meta
type Story = StoryObj<typeof meta>

export const Available: Story = {}
export const Confirming: Story = { args: { step: 'confirm' } }
export const ConfirmingAccepted: Story = { args: { step: 'confirm', accepted: true } }
export const PaymentError: Story = { args: { step: 'confirm', accepted: true, error: "La réservation a échoué : la parcelle vient peut-être d'être réservée par quelqu'un d'autre." } }
export const Booked: Story = { args: { model: buildParcelDetailModel(mockParcels[0], { ...ctx, booking: mockReservations[0], code: '482913', contact: mockPrivate }) } }
export const Own: Story = { args: { model: buildParcelDetailModel(mockParcels[0], { ...ctx, myEmail: 'jean@example.com', contact: mockPrivate }) } }
export const Unavailable: Story = { args: { model: buildParcelDetailModel({ ...mockParcels[0], status: 'reservee' }, ctx) } }
