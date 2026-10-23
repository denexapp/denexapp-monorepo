import type { Meta, StoryObj } from '@storybook/react-vite';
import { assignComponentVars, palette, ThemeProvider, vars } from '../theme';
import { Button, buttonVars } from './button';
import { CiriUi } from './ciri-ui';

const meta = {
  component: CiriUi,
  title: 'CiriUi',
} satisfies Meta<typeof CiriUi>;
export default meta;

type Story = StoryObj<typeof CiriUi>;

export const Primary = {
  args: {
    title: 'Welcome to CiriUi',
    description: 'A modern React UI library with a 3-layer Vanilla Extract design system.',
  },
} satisfies Story;

export const SurfaceElevations: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: vars.space['4'] }}>
      <CiriUi
        elevation="surface0"
        title="Surface 0 (Base Card)"
        description="Uses vars.color.surface.surface0 and shadow.xs"
      >
        <div style={{ marginTop: vars.space['4'] }}>
          <CiriUi
            elevation="surface1"
            title="Surface 1 (Nested / Raised)"
            description="Uses vars.color.surface.surface1 and shadow.sm"
          >
            <div style={{ marginTop: vars.space['4'] }}>
              <CiriUi
                elevation="surface2"
                title="Surface 2 (Floating / Modal Overlay)"
                description="Uses vars.color.surface.surface2 and shadow.overlay"
              />
            </div>
          </CiriUi>
        </div>
      </CiriUi>
    </div>
  ),
};

export const CustomAppThemeComposition: Story = {
  render: () => (
    <ThemeProvider
      mode="dark"
      density="compact"
      colorOverrides={{
        fill: {
          primary: palette.emerald500,
          primaryHover: palette.emerald400,
          primaryActive: palette.emerald600,
        },
        border: {
          focus: palette.emerald400,
        },
      }}
      componentVars={assignComponentVars(buttonVars, {
        radius: vars.radius.full,
      })}
      style={{
        padding: vars.space['6'],
        borderRadius: vars.radius.xl,
      }}
    >
      <CiriUi
        elevation="surface1"
        title="App-Customized Subtree (Dark + Compact + Emerald Brand)"
        description="Demonstrates partial Layer 2 color overrides, Compact spacing scale, and Layer 3 buttonVars pill radius override."
      >
        <div style={{ display: 'flex', gap: vars.space['3'], marginTop: vars.space['4'] }}>
          <Button variant="primary">Emerald Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </div>
      </CiriUi>
    </ThemeProvider>
  ),
};
