import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import HarvestFormView from './HarvestFormView'
import { initialHarvestDraft } from './helpers'
import { HARVEST_KINDS, MAX_ITEMS, MONTH_NAMES } from '@/helpers/harvests'
import { mockCommunes, mockHarvests } from '@/stories'

const none = { query: '', options: [], loading: false, onQuery: fn(), onPick: fn() }

const meta = {
  title: 'Ecrans/HarvestForm', component: HarvestFormView,
  parameters: { layout: 'fullscreen' },
  args: {
    draft: initialHarvestDraft(null, mockCommunes[0], ''), isEdit: false, commune: { ...none, value: mockCommunes[0] }, kindOptions: HARVEST_KINDS,
    monthNames: MONTH_NAMES, maxItems: MAX_ITEMS, photoEnabled: true, maxPhotos: 6, uploading: false, saving: false, issues: [],
    onChange: fn(), onItemChange: fn(), onAddItem: fn(), onRemoveItem: fn(), onPhotos: fn(), onRemovePhoto: fn(), onSubmit: fn(), onCancel: fn(),
  },
} satisfies Meta<typeof HarvestFormView>
export default meta
type Story = StoryObj<typeof meta>

export const New: Story = {}
export const Edit: Story = { args: { isEdit: true, draft: initialHarvestDraft(mockHarvests[0], null, '') } }
export const WithIssues: Story = { args: { issues: ["Donnez un titre à l'offre.", 'Donnez un nom à chaque arbre ou plante.'] } }
