import type { Meta, StoryObj } from '@storybook/react-vite';
import { palette, vars } from '../theme';
import { Button } from './button';

const meta = {
  component: Button,
  title: 'Button',
} satisfies Meta<typeof Button>;
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
    size: 'md',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: vars.space['3'], flexWrap: 'wrap', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: vars.space['3'], alignItems: 'center' }}>
      <Button size="sm">Small (sm)</Button>
      <Button size="md">Medium (md)</Button>
      <Button size="lg">Large (lg)</Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const Layer3ComponentOverride: Story = {
  args: {
    children: 'Custom Pill Token Override',
    tokenOverrides: {
      radius: vars.radius.full,
      bg: palette.amber500,
      bgHover: palette.amber600,
      bgActive: palette.amber700,
      text: palette.neutral950,
    },
  },
};
