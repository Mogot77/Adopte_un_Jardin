import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import OnboardingView from './OnboardingView'
import { mockCommunes } from '@/stories'

const meta = {
  title: 'Ecrans/Onboarding', component: OnboardingView,
  parameters: { layout: 'fullscreen' },
  args: {
    saving: false, onChange: fn(), onSubmit: fn(),
    form: { name: 'Camille Martin', phone: '', wantsGarden: true, offersGarden: false },
    commune: { value: null, query: '', options: [], loading: false, onQuery: fn(), onPick: fn() },
  },
} satisfies Meta<typeof OnboardingView>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Filled: Story = { args: { commune: { value: mockCommunes[0], query: '', options: [], loading: false, onQuery: fn(), onPick: fn() }, form: { name: 'Camille Martin', phone: '06 12 34 56 78', wantsGarden: true, offersGarden: true } } }
export const WithError: Story = { args: { error: 'Choisissez votre commune.' } }
