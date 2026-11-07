import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import PhotoPicker from './PhotoPicker'

const meta = {
  title: 'UI/PhotoPicker', component: PhotoPicker,
  args: { photos: [], maxPhotos: 6, enabled: true, uploading: false, onPick: fn(), onRemove: fn() },
} satisfies Meta<typeof PhotoPicker>
export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {}
export const WithPhotos: Story = { args: { photos: ['https://picsum.photos/seed/a/400/300', 'https://picsum.photos/seed/b/400/300'] } }
export const Uploading: Story = { args: { uploading: true } }
export const Disabled: Story = { args: { enabled: false } }
