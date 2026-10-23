import { createThemeContract } from '@vanilla-extract/css';
import type {
  CssColor,
  CssDuration,
  CssEasing,
  CssFontWeight,
  CssLineHeight,
  CssPx,
  CssRem,
  CssZIndex,
} from './types';

/**
 * LAYER 2A: SEMANTIC COLOR & ELEVATION CONTRACT (Mode-Dependent)
 *
 * Organized by UI role and intent rather than raw color hue.
 * Swapping Light / Dark / Custom Brand themes updates these CSS Custom Properties.
 */
export const colorVars = createThemeContract({
  surface: {
    /** Application page / viewport background */
    canvas: null,
    /** Base container / card surface */
    surface0: null,
    /** Raised / nested container surface */
    surface1: null,
    /** Floating / overlay surface (modals, popovers, dropdowns) */
    surface2: null,
    /** Recessed / sunken surface (inputs, wells, code blocks) */
    sunken: null,
    /** High-contrast inverted surface (tooltips, banners) */
    inverse: null,
    /** Modal / dialog backdrop overlay */
    backdrop: null,
  },
  text: {
    /** Primary body and heading text */
    primary: null,
    /** Supporting / secondary text */
    secondary: null,
    /** De-emphasized / caption / placeholder text */
    muted: null,
    /** Disabled state text */
    disabled: null,
    /** Text placed on `surface.inverse` */
    inverse: null,
    /** Text placed on `fill.primary` */
    onPrimary: null,
    /** Text placed on `fill.danger` */
    onDanger: null,
    /** Brand / link / accent text */
    accent: null,
    /** Positive / success status text */
    success: null,
    /** Warning / caution status text */
    warning: null,
    /** Error / destructive status text */
    danger: null,
  },
  fill: {
    /** Primary interactive control background (rest, hover, active) */
    primary: null,
    primaryHover: null,
    primaryActive: null,
    /** Secondary interactive control background (rest, hover, active) */
    secondary: null,
    secondaryHover: null,
    secondaryActive: null,
    /** Ghost / subtle interactive control background (hover, active) */
    ghostHover: null,
    ghostActive: null,
    /** Destructive interactive control background (rest, hover, active) */
    danger: null,
    dangerHover: null,
    dangerActive: null,
    /** Subtle status fills (badges, callouts) */
    successSubtle: null,
    warningSubtle: null,
    dangerSubtle: null,
    accentSubtle: null,
  },
  border: {
    /** Hairline / low-contrast divider border */
    subtle: null,
    /** Default card / control border */
    default: null,
    /** Emphasized / hovered control border */
    strong: null,
    /** Keyboard `:focus-visible` ring color */
    focus: null,
    /** Error / invalid input border */
    danger: null,
  },
  shadow: {
    xs: null,
    sm: null,
    md: null,
    lg: null,
    overlay: null,
  },
});

/**
 * LAYER 2B: STRUCTURAL SCALE CONTRACT (Mode-Invariant)
 *
 * Spacing (px), radii (px), border widths (px), typography (rem), z-index, and motion.
 * Separated from `colorVars` so switching Light/Dark mode does not duplicate structural CSS vars,
 * while still allowing apps or subtrees to switch density (e.g., Default vs Compact).
 */
export const scaleVars = createThemeContract({
  space: {
    '0': null,
    '0.5': null,
    '1': null,
    '1.5': null,
    '2': null,
    '2.5': null,
    '3': null,
    '4': null,
    '5': null,
    '6': null,
    '8': null,
    '10': null,
    '12': null,
    '16': null,
  },
  radius: {
    none: null,
    xs: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,
    '2xl': null,
    full: null,
  },
  borderWidth: {
    none: null,
    thin: null,
    thick: null,
  },
  font: {
    family: {
      sans: null,
      mono: null,
    },
    size: {
      xs: null,
      sm: null,
      md: null,
      lg: null,
      xl: null,
      '2xl': null,
      '3xl': null,
    },
    lineHeight: {
      tight: null,
      snug: null,
      normal: null,
      relaxed: null,
    },
    weight: {
      normal: null,
      medium: null,
      semibold: null,
      bold: null,
    },
  },
  zIndex: {
    base: null,
    dropdown: null,
    sticky: null,
    overlay: null,
    modal: null,
    popover: null,
    toast: null,
    tooltip: null,
  },
  motion: {
    duration: {
      instant: null,
      fast: null,
      normal: null,
      slow: null,
    },
    easing: {
      standard: null,
      enter: null,
      exit: null,
    },
  },
});

/**
 * Unified Design System Token Contract for use in component and application `.css.ts` files.
 */
export const vars = {
  color: colorVars,
  ...scaleVars,
} as const;

/**
 * Strictly-typed Color Theme Token definition (enforces `CssColor` on all color leaves).
 */
export interface ColorThemeTokens {
  surface: { [K in keyof typeof colorVars.surface]: CssColor };
  text: { [K in keyof typeof colorVars.text]: CssColor };
  fill: { [K in keyof typeof colorVars.fill]: CssColor };
  border: { [K in keyof typeof colorVars.border]: CssColor };
  shadow: { [K in keyof typeof colorVars.shadow]: string };
}

/**
 * Strictly-typed Scale Theme Token definition (enforces `CssPx` for spacing/radii, `CssRem` for font sizes, etc.).
 */
export interface ScaleThemeTokens {
  space: { [K in keyof typeof scaleVars.space]: CssPx };
  radius: { [K in keyof typeof scaleVars.radius]: CssPx };
  borderWidth: { [K in keyof typeof scaleVars.borderWidth]: CssPx };
  font: {
    family: { [K in keyof typeof scaleVars.font.family]: string };
    size: { [K in keyof typeof scaleVars.font.size]: CssRem };
    lineHeight: { [K in keyof typeof scaleVars.font.lineHeight]: CssLineHeight };
    weight: { [K in keyof typeof scaleVars.font.weight]: CssFontWeight };
  };
  zIndex: { [K in keyof typeof scaleVars.zIndex]: CssZIndex };
  motion: {
    duration: { [K in keyof typeof scaleVars.motion.duration]: CssDuration };
    easing: { [K in keyof typeof scaleVars.motion.easing]: CssEasing };
  };
}
