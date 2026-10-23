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
 * LAYER 1: BASE PRIMITIVES
 *
 * Raw design tokens representing what exists in the palette and numeric scales.
 * Rule: Component `.css.ts` files MUST NOT import from `primitives.ts` directly.
 * Primitives may only be referenced by Layer 2 semantic theme definitions.
 */

export const palette = {
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',

  // Neutral / Slate scale
  neutral50: '#f8fafc',
  neutral100: '#f1f5f9',
  neutral200: '#e2e8f0',
  neutral300: '#cbd5e1',
  neutral400: '#94a3b8',
  neutral500: '#64748b',
  neutral600: '#475569',
  neutral700: '#334155',
  neutral800: '#1e293b',
  neutral850: '#152033',
  neutral900: '#0f172a',
  neutral950: '#020617',

  // Primary Blue scale
  blue50: '#eff6ff',
  blue100: '#dbeafe',
  blue200: '#bfdbfe',
  blue300: '#93c5fd',
  blue400: '#60a5fa',
  blue500: '#3b82f6',
  blue600: '#2563eb',
  blue700: '#1d4ed8',
  blue800: '#1e40af',
  blue900: '#1e3a8a',
  blue950: '#172554',

  // Success Emerald scale
  emerald50: '#ecfdf5',
  emerald100: '#d1fae5',
  emerald200: '#a7f3d0',
  emerald400: '#34d399',
  emerald500: '#10b981',
  emerald600: '#059669',
  emerald700: '#047857',
  emerald900: '#064e3b',
  emerald950: '#022c22',

  // Warning Amber / Yellow scale
  yellow100: '#fef9c3',
  yellow400: '#facc15',
  yellow500: '#eab308',
  amber50: '#fffbeb',
  amber100: '#fef3c7',
  amber400: '#fbbf24',
  amber500: '#f59e0b',
  amber600: '#d97706',
  amber700: '#b45309',
  amber900: '#78350f',
  amber950: '#451a03',

  // Danger Red scale
  red50: '#fef2f2',
  red100: '#fee2e2',
  red200: '#fecaca',
  red400: '#f87171',
  red500: '#ef4444',
  red600: '#dc2626',
  red700: '#b91c1c',
  red800: '#991b1b',
  red900: '#7f1d1d',
  red950: '#450a0a',
} as const satisfies Record<string, CssColor>;

/**
 * 4px base grid in pixels (preserves viewport space when browser root font-size scales).
 */
export const spaceScale = {
  '0': '0px',
  '0.5': '2px',
  '1': '4px',
  '1.5': '6px',
  '2': '8px',
  '2.5': '10px',
  '3': '12px',
  '4': '16px',
  '5': '20px',
  '6': '24px',
  '8': '32px',
  '10': '40px',
  '12': '48px',
  '16': '64px',
} as const satisfies Record<string, CssPx>;

/**
 * Compact spacing scale (~75% density for data-heavy views, tables, and toolbars).
 */
export const compactSpaceScale = {
  '0': '0px',
  '0.5': '2px',
  '1': '3px',
  '1.5': '4px',
  '2': '6px',
  '2.5': '8px',
  '3': '9px',
  '4': '12px',
  '5': '15px',
  '6': '18px',
  '8': '24px',
  '10': '30px',
  '12': '36px',
  '16': '48px',
} as const satisfies Record<string, CssPx>;

export const radiusScale = {
  none: '0px',
  xs: '2px',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  full: '9999px',
} as const satisfies Record<string, CssPx>;

export const borderWidthScale = {
  none: '0px',
  thin: '1px',
  thick: '2px',
} as const satisfies Record<string, CssPx>;

export const fontFamilyScale = {
  sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
} as const satisfies Record<string, string>;

/**
 * Typography sizes in `rem` to respect user accessibility font-size preferences.
 */
export const fontSizeScale = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
} as const satisfies Record<string, CssRem>;

export const lineHeightScale = {
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
} as const satisfies Record<string, CssLineHeight>;

export const fontWeightScale = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const satisfies Record<string, CssFontWeight>;

export const zIndexScale = {
  base: '0',
  dropdown: '1000',
  sticky: '1100',
  overlay: '1200',
  modal: '1300',
  popover: '1400',
  toast: '1500',
  tooltip: '1600',
} as const satisfies Record<string, CssZIndex>;

export const motionScale = {
  duration: {
    instant: '0ms',
    fast: '120ms',
    normal: '200ms',
    slow: '300ms',
  } satisfies Record<string, CssDuration>,
  easing: {
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
    enter: 'cubic-bezier(0, 0, 0.2, 1)',
    exit: 'cubic-bezier(0.4, 0, 1, 1)',
  } satisfies Record<string, CssEasing>,
} as const;
