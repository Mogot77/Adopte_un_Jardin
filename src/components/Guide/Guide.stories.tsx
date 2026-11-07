import type { Meta, StoryObj } from '@storybook/react-vite'
import GuideView from './GuideView'
import { buildGuideModel } from './helpers'

const meta = { title: 'Ecrans/Guide', component: GuideView, parameters: { layout: 'fullscreen' }, args: { model: buildGuideModel() } } satisfies Meta<typeof GuideView>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
