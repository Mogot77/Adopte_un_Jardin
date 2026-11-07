import type { Meta, StoryObj } from '@storybook/react-vite'
import PageHead from './PageHead'
import Button from '@/components/ui/Button'

const meta = { title: 'UI/PageHead', component: PageHead, args: { title: 'Mes parcelles', subtitle: 'Suivez vos annonces et vos versements.' } } satisfies Meta<typeof PageHead>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithActions: Story = { args: { actions: <Button variant="primary">Proposer une parcelle</Button> } }
