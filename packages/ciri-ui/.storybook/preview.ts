import { createElement } from 'react';
import type { Preview } from '@storybook/react-vite';
import { ThemeProvider, vars, type ThemeDensity, type ThemeMode } from '../src/theme';

const preview: Preview = {
  globalTypes: {
    mode: {
      description: 'Color Theme Mode',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light Mode' },
          { value: 'dark', title: 'Dark Mode' },
        ],
        dynamicTitle: true,
      },
    },
    density: {
      description: 'Spacing Density Scale',
      toolbar: {
        title: 'Density',
        icon: 'collapse',
        items: [
          { value: 'default', title: 'Default (4px grid)' },
          { value: 'compact', title: 'Compact (~75%)' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    mode: 'light',
    density: 'default',
  },
  decorators: [
    (Story, context) => {
      const mode = (context.globals['mode'] as ThemeMode | undefined) ?? 'light';
      const density = (context.globals['density'] as ThemeDensity | undefined) ?? 'default';

      return createElement(
        ThemeProvider,
        {
          mode,
          density,
          style: {
            padding: vars.space['6'],
            borderRadius: vars.radius.md,
          },
        },
        createElement(Story),
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
