import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import ScheduleField from './ScheduleField'

const meta = { title: 'UI/ScheduleField', component: ScheduleField, args: { value: [], onChange: fn() } } satisfies Meta<typeof ScheduleField>
export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {}
export const WeekAndSaturday: Story = {
  args: {
    value: [0, 1, 2, 3, 4].map(day => ({ day, from: '08:00', to: '20:00' })).concat([{ day: 5, from: '09:00', to: '12:00' }]),
  },
}
