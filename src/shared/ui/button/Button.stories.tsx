import { Button } from './Button'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof Button> = {
  title: 'UI/Actions/Button',
  component: Button,
  args: { children: 'Кнопка' },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = { args: { variant: 'primary' } }
export const Disabled: Story = { args: { variant: 'primary', disabled: true } }
export const Loading: Story = {
  args: { variant: 'primary', isLoading: true, children: 'Загрузка' },
}
