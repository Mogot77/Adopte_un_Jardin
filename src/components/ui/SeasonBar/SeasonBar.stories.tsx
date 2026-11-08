import type { Meta, StoryObj } from '@storybook/react-vite'
import SeasonBar from './SeasonBar'
import { MONTH_INITIALS, seasonMask } from '@/helpers/harvests'

const meta = {
  title: 'UI/SeasonBar', component: SeasonBar,
  args: { months: seasonMask({ fromMonth: 8, toMonth: 10 }), initials: MONTH_INITIALS, currentMonth: 9, label: "Cueillette d'août à octobre" },
} satisfies Meta<typeof SeasonBar>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const OverNewYear: Story = { args: { months: seasonMask({ fromMonth: 11, toMonth: 2 }), currentMonth: 1, label: 'Cueillette de novembre à février' } }
export const AllYear: Story = { args: { months: seasonMask({ fromMonth: 1, toMonth: 12 }), label: "Cueillette toute l'année" } }
