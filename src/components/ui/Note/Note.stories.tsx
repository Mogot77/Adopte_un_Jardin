import type { Meta, StoryObj } from '@storybook/react-vite'
import Note from './Note'

const meta = { title: 'UI/Note', component: Note, args: { children: "L'adresse exacte est communiquée après le paiement." } } satisfies Meta<typeof Note>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Info: Story = { args: { tone: 'info' } }
export const Warning: Story = { args: { tone: 'warn', children: 'Paiement simulé : aucun débit réel.' } }
