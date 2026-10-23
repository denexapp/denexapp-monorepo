import type { createVar } from '@vanilla-extract/css';

export type CSSVarFunction = ReturnType<typeof createVar>;

/**
 * Strict CSS Color value type.
 * Accepts hex, rgb/rgba, hsl/hsla, oklch, color-mix, semantic keywords, or a Vanilla Extract CSS variable.
 */
export type CssColor =
  | `#${string}`
  | `rgb(${string})`
  | `rgba(${string})`
  | `hsl(${string})`
  | `hsla(${string})`
  | `oklch(${string})`
  | `color-mix(${string})`
  | 'transparent'
  | 'currentColor'
  | CSSVarFunction;

/**
 * Strict pixel length type for spacing, radii, and border widths.
 */
export type CssPx = `${number}px` | '0' | CSSVarFunction;

/**
 * Strict rem length type for typography sizing.
 */
export type CssRem = `${number}rem` | '0' | CSSVarFunction;

/**
 * Strict unitless or rem line-height type.
 */
export type CssLineHeight = `${number}` | `${number}rem` | `${number}px` | CSSVarFunction;

/**
 * Strict font-weight token type.
 */
export type CssFontWeight =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | CSSVarFunction;

/**
 * Strict CSS duration type for transitions and animations.
 */
export type CssDuration = `${number}ms` | `${number}s` | '0ms' | '0s' | CSSVarFunction;

/**
 * Strict CSS timing-function type for transitions and animations.
 */
export type CssEasing =
  | `cubic-bezier(${string})`
  | `steps(${string})`
  | 'linear'
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | CSSVarFunction;

/**
 * Strict integer string or CSS var for z-index layering.
 */
export type CssZIndex = `${number}` | CSSVarFunction;

/**
 * Recursive partial type for ergonomic theme overrides in consuming applications.
 */
export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Record<string, unknown> ? DeepPartial<T[K]> : T[K];
};
