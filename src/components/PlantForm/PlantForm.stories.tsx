import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import PlantFormView from './PlantFormView'
import { initialPlantDraft } from './helpers'
import { PLANT_KINDS } from '@/helpers/plants'
import { mockCommunes, mockPlants } from '@/stories'

const none = { query: '', options: [], loading: false, onQuery: fn(), onPick: fn() }

const meta = {
  title: 'Ecrans/PlantForm', component: PlantFormView,
  parameters: { layout: 'fullscreen' },
  args: {
    draft: initialPlantDraft(null, mockCommunes[0], ''), isEdit: false, commune: { ...none, value: mockCommunes[0] }, kindOptions: PLANT_KINDS,
    photoEnabled: true, maxPhotos: 6, uploading: false, saving: false, issues: [],
    onChange: fn(), onPhotos: fn(), onRemovePhoto: fn(), onSubmit: fn(), onCancel: fn(),
  },
} satisfies Meta<typeof PlantFormView>
export default meta
type Story = StoryObj<typeof meta>

export const New: Story = {}
export const Edit: Story = { args: { isEdit: true, draft: initialPlantDraft(mockPlants[0], null, '') } }
export const WithIssues: Story = { args: { issues: ["Donnez un titre à l'annonce.", 'Choisissez la commune où se fera la remise.'] } }
