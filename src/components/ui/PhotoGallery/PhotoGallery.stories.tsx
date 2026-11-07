import type { Meta, StoryObj } from '@storybook/react-vite'
import PhotoGallery from './PhotoGallery'

const meta = { title: 'UI/PhotoGallery', component: PhotoGallery, args: { photos: [], label: 'Potager de Jean' } } satisfies Meta<typeof PhotoGallery>
export default meta
type Story = StoryObj<typeof meta>

export const NoPhoto: Story = {}
export const Several: Story = { args: { photos: ['https://picsum.photos/seed/a/800/500', 'https://picsum.photos/seed/b/800/500'] } }
