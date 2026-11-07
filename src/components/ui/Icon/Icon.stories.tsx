import type { Meta, StoryObj } from '@storybook/react-vite'
import Icon from './Icon'

const meta = { title: 'UI/Icon', component: Icon, args: { name: 'leaf', size: 24 } } satisfies Meta<typeof Icon>
export default meta
type Story = StoryObj<typeof meta>

export const Leaf: Story = {}
export const Sun: Story = { args: { name: 'sun' } }
export const Moon: Story = { args: { name: 'moon' } }
