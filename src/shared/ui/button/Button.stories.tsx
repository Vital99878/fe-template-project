import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from './Button'

const meta = {
  title: 'shared/ui/Button',
  component: Button,
  argTypes: {
    leftIcon: { control: false },
    rightIcon: { control: false },
    loadingIcon: { control: false },
    onClick: { action: 'click' },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    fullWidth: false,
    disabled: false,
    isLoading: false,
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Matrix: Story = {
  render: () => (
    <div className="grid gap-3">
      <div className="flex flex-wrap gap-2">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm">sm</Button>
        <Button size="md">md</Button>
        <Button size="lg">lg</Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button disabled>Disabled</Button>
        <Button isLoading>Loading</Button>
        <Button fullWidth>Full width</Button>
      </div>

      <div className="flex max-w-[260px] flex-wrap items-center gap-2">
        <Button className={'max-w-full min-w-0'}>
          Очень длинный текст кнопки который должен красиво ужаться. Очень длинный текст кнопки
          который должен красиво ужаться.{' '}
        </Button>
      </div>
    </div>
  ),
}
