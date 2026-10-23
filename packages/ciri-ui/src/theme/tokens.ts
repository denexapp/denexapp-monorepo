import { createTheme } from '@vanilla-extract/css';
import { colorVars, scaleVars, type ColorThemeTokens, type ScaleThemeTokens } from './contract.css';
import {
  borderWidthScale,
  compactSpaceScale,
  fontFamilyScale,
  fontSizeScale,
  fontWeightScale,
  lineHeightScale,
  motionScale,
  palette,
  radiusScale,
  spaceScale,
  zIndexScale,
} from './primitives';
import type { DeepPartial } from './types';
import { deepMergeTokens } from './utils';

/**
 * Default Light Mode Semantic Color Tokens (Layer 2 -> Layer 1 mapping).
 */
export const lightColorTokens: ColorThemeTokens = {
  surface: {
    canvas: palette.neutral50,
    surface0: palette.white,
    surface1: palette.neutral100,
    surface2: palette.white,
    sunken: palette.neutral100,
    inverse: palette.neutral900,
    backdrop: 'rgba(15, 23, 42, 0.45)',
  },
  text: {
    primary: palette.neutral900,
    secondary: palette.neutral600,
    muted: palette.neutral500,
    disabled: palette.neutral400,
    inverse: palette.white,
    onPrimary: palette.white,
    onDanger: palette.white,
    accent: palette.blue600,
    success: palette.emerald700,
    warning: palette.amber700,
    danger: palette.red600,
  },
  fill: {
    primary: palette.blue600,
    primaryHover: palette.blue700,
    primaryActive: palette.blue800,
    secondary: palette.neutral100,
    secondaryHover: palette.neutral200,
    secondaryActive: palette.neutral300,
    ghostHover: palette.neutral100,
    ghostActive: palette.neutral200,
    danger: palette.red600,
    dangerHover: palette.red700,
    dangerActive: palette.red800,
    successSubtle: palette.emerald50,
    warningSubtle: palette.amber50,
    dangerSubtle: palette.red50,
    accentSubtle: palette.blue50,
  },
  border: {
    subtle: palette.neutral200,
    default: palette.neutral300,
    strong: palette.neutral400,
    focus: palette.blue600,
    danger: palette.red500,
  },
  shadow: {
    xs: '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
    sm: '0 1px 3px 0 rgba(15, 23, 42, 0.08), 0 1px 2px -1px rgba(15, 23, 42, 0.08)',
    md: '0 4px 6px -1px rgba(15, 23, 42, 0.1), 0 2px 4px -2px rgba(15, 23, 42, 0.08)',
    lg: '0 10px 15px -3px rgba(15, 23, 42, 0.12), 0 4px 6px -4px rgba(15, 23, 42, 0.08)',
    overlay: '0 20px 25px -5px rgba(15, 23, 42, 0.16), 0 8px 10px -6px rgba(15, 23, 42, 0.1)',
  },
};

/**
 * Default Dark Mode Semantic Color Tokens (Layer 2 -> Layer 1 mapping).
 * Uses progressive surface elevation (`neutral950` -> `neutral900` -> `neutral850` -> `neutral800`).
 */
export const darkColorTokens: ColorThemeTokens = {
  surface: {
    canvas: palette.neutral950,
    surface0: palette.neutral900,
    surface1: palette.neutral850,
    surface2: palette.neutral800,
    sunken: palette.neutral950,
    inverse: palette.neutral50,
    backdrop: 'rgba(2, 6, 23, 0.7)',
  },
  text: {
    primary: palette.neutral50,
    secondary: palette.neutral300,
    muted: palette.neutral400,
    disabled: palette.neutral600,
    inverse: palette.neutral900,
    onPrimary: palette.white,
    onDanger: palette.white,
    accent: palette.blue400,
    success: palette.emerald400,
    warning: palette.amber400,
    danger: palette.red400,
  },
  fill: {
    primary: palette.blue500,
    primaryHover: palette.blue400,
    primaryActive: palette.blue600,
    secondary: palette.neutral800,
    secondaryHover: palette.neutral700,
    secondaryActive: palette.neutral600,
    ghostHover: palette.neutral800,
    ghostActive: palette.neutral700,
    danger: palette.red600,
    dangerHover: palette.red500,
    dangerActive: palette.red700,
    successSubtle: palette.emerald950,
    warningSubtle: palette.amber950,
    dangerSubtle: palette.red950,
    accentSubtle: palette.blue950,
  },
  border: {
    subtle: palette.neutral800,
    default: palette.neutral700,
    strong: palette.neutral600,
    focus: palette.blue400,
    danger: palette.red500,
  },
  shadow: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 1px 2px -1px rgba(0, 0, 0, 0.4)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.55), 0 2px 4px -2px rgba(0, 0, 0, 0.45)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -4px rgba(0, 0, 0, 0.5)',
    overlay: '0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 8px 10px -6px rgba(0, 0, 0, 0.6)',
  },
};

/**
 * Default Structural Scale Tokens (`px` for spacing/radii/borders, `rem` for fontSize).
 */
export const defaultScaleTokens: ScaleThemeTokens = {
  space: spaceScale,
  radius: radiusScale,
  borderWidth: borderWidthScale,
  font: {
    family: fontFamilyScale,
    size: fontSizeScale,
    lineHeight: lineHeightScale,
    weight: fontWeightScale,
  },
  zIndex: zIndexScale,
  motion: motionScale,
};

/**
 * Compact Density Structural Scale Tokens (~75% spacing for dense data tables and enterprise views).
 */
export const compactScaleTokens: ScaleThemeTokens = {
  ...defaultScaleTokens,
  space: compactSpaceScale,
};

/**
 * Strictly-typed builder to create a complete `ColorThemeTokens` object from partial overrides.
 */
export function defineColorTokens(
  overrides: DeepPartial<ColorThemeTokens>,
  base: ColorThemeTokens = lightColorTokens,
): ColorThemeTokens {
  return deepMergeTokens(base, overrides);
}

/**
 * Strictly-typed builder to create a complete `ScaleThemeTokens` object from partial overrides.
 */
export function defineScaleTokens(
  overrides: DeepPartial<ScaleThemeTokens>,
  base: ScaleThemeTokens = defaultScaleTokens,
): ScaleThemeTokens {
  return deepMergeTokens(base, overrides);
}

/**
 * Build-time helper for consuming apps to create a custom Vanilla Extract color theme class
 * in their own `.css.ts` files by specifying only the tokens they wish to override.
 */
export function createCiriColorTheme(
  overrides: DeepPartial<ColorThemeTokens>,
  base: ColorThemeTokens = lightColorTokens,
): string {
  return createTheme(colorVars, defineColorTokens(overrides, base));
}

/**
 * Build-time helper for consuming apps to create a custom Vanilla Extract scale theme class
 * in their own `.css.ts` files by specifying only the tokens they wish to override.
 */
export function createCiriScaleTheme(
  overrides: DeepPartial<ScaleThemeTokens>,
  base: ScaleThemeTokens = defaultScaleTokens,
): string {
  return createTheme(scaleVars, defineScaleTokens(overrides, base));
}
