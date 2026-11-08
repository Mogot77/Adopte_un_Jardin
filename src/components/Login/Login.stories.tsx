import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import LoginView from './LoginView'
import { buildImpactModel } from '@/components/ImpactBanner'
import { mockImpactMonths } from '@/stories'

const TODAY = '2027-10-15'

const meta = {
  title: 'Ecrans/Login', component: LoginView,
  parameters: { layout: 'fullscreen' },
  args: { theme: 'light', impact: buildImpactModel(mockImpactMonths, TODAY), onLogin: fn(), onToggleTheme: fn() },
} satisfies Meta<typeof LoginView>
export default meta
type Story = StoryObj<typeof meta>

export const SignedOut: Story = {}
export const WithError: Story = { args: { error: 'La connexion a échoué. Réessayez.' } }
export const Dark: Story = { args: { theme: 'dark' } }
export const NoHarvestYet: Story = { args: { impact: buildImpactModel([], TODAY) } }
