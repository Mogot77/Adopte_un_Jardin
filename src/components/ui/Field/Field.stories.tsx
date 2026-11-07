import type { Meta, StoryObj } from '@storybook/react-vite'
import Field from './Field'

const meta = { title: 'UI/Field', component: Field, args: { label: 'Surface (m²)', hint: 'Surface cultivable.', children: <input className="in" type="number" defaultValue={120} /> } } satisfies Meta<typeof Field>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithoutHint: Story = { args: { hint: undefined } }
