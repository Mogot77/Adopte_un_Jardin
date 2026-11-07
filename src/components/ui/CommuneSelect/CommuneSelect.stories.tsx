import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import CommuneSelect from './CommuneSelect'
import { mockCommunes } from '@/stories'

const meta = {
  title: 'UI/CommuneSelect', component: CommuneSelect,
  args: { value: null, query: 'Mel', options: [], loading: false, onQuery: fn(), onPick: fn() },
} satisfies Meta<typeof CommuneSelect>
export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = { args: { query: '' } }
export const WithSuggestions: Story = { args: { options: mockCommunes.slice(0, 3) } }
export const Loading: Story = { args: { loading: true } }
export const Selected: Story = { args: { value: mockCommunes[0] } }
