import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import ParcelFormView from './ParcelFormView'
import { initialDraft, WATER_OPTIONS } from './helpers'
import { mockCommunes, mockParcels, mockPrivate } from '@/stories'

const none = { value: null, query: '', options: [], loading: false, onQuery: fn(), onPick: fn() }

const meta = {
  title: 'Ecrans/ParcelForm', component: ParcelFormView,
  parameters: { layout: 'fullscreen' },
  args: {
    draft: initialDraft(null, null, mockCommunes[0], ''), isEdit: false, commune: { ...none, value: mockCommunes[0] }, suggested: 400, bounds: { min: 200, max: 600 },
    waterOptions: WATER_OPTIONS, photoEnabled: true, maxPhotos: 6, uploading: false, saving: false, issues: [],
    onChange: fn(), onPhotos: fn(), onRemovePhoto: fn(), onSubmit: fn(), onCancel: fn(),
  },
} satisfies Meta<typeof ParcelFormView>
export default meta
type Story = StoryObj<typeof meta>

export const New: Story = {}
export const Edit: Story = { args: { isEdit: true, draft: initialDraft(mockParcels[0], mockPrivate, null, ''), suggested: 480, bounds: { min: 240, max: 720 } } }
export const WithIssues: Story = { args: { issues: ["Donnez un titre à l'annonce.", "Renseignez l'adresse du terrain (communiquée seulement après paiement)."] } }
export const PhotoDisabled: Story = { args: { photoEnabled: false } }
export const WithPhotos: Story = { args: { draft: { ...initialDraft(mockParcels[0], mockPrivate, null, ''), photoUrls: ['https://picsum.photos/seed/a/400/300', 'https://picsum.photos/seed/b/400/300'] } } }
