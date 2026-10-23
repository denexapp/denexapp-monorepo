import { createGlobalTheme, createTheme, style } from '@vanilla-extract/css';
import { colorVars, scaleVars, vars } from './contract.css';
import {
  compactScaleTokens,
  darkColorTokens,
  defaultScaleTokens,
  lightColorTokens,
} from './tokens';

/**
 * Zero-config `:root` defaults so `@denexapp/ciri-ui` components render with valid tokens
 * even before an explicit `<ThemeProvider>` or theme class is mounted.
 */
createGlobalTheme(':root', scaleVars, defaultScaleTokens);
createGlobalTheme(':root, [data-theme="light"]', colorVars, lightColorTokens);
createGlobalTheme('[data-theme="dark"]', colorVars, darkColorTokens);
createGlobalTheme('[data-density="compact"]', scaleVars, compactScaleTokens);

/**
 * Scoped Color Theme classes (can be applied to any DOM subtree).
 */
export const lightTheme = createTheme(colorVars, lightColorTokens);
export const darkTheme = createTheme(colorVars, darkColorTokens);

/**
 * Scoped Structural Scale / Density Theme classes (can be applied to any DOM subtree).
 */
export const defaultScaleTheme = createTheme(scaleVars, defaultScaleTokens);
export const compactScaleTheme = createTheme(scaleVars, compactScaleTokens);

/**
 * Base typographic & surface reset class used by `<ThemeProvider>`.
 */
export const themeRoot = style({
  fontFamily: vars.font.family.sans,
  color: vars.color.text.primary,
  backgroundColor: vars.color.surface.canvas,
  boxSizing: 'border-box',
});
