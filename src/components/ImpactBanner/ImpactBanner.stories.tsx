import type { Meta, StoryObj } from '@storybook/react-vite'
import ImpactBanner from './ImpactBanner'
import { buildImpactModel } from './helpers'
import { mockImpactMonths } from '@/stories'

/** Date figée pour des stories stables. */
const TODAY = '2027-10-15'

const meta = {
  title: 'Composants/ImpactBanner', component: ImpactBanner,
  args: { model: buildImpactModel(mockImpactMonths, TODAY) },
} satisfies Meta<typeof ImpactBanner>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Compact: Story = { args: { compact: true } }
export const NoHarvestYet: Story = { args: { model: buildImpactModel([], TODAY) } }
