import { createVar, fallbackVar, style, styleVariants } from '@vanilla-extract/css';
import { stateSelectors, vars, type CssColor, type CssPx, type CssRem } from '../theme';

/**
 * LAYER 3: SCOPED BUTTON COMPONENT TOKENS
 *
 * Allows surgical overrides of Button appearance (globally via `<ThemeProvider componentVars={...}>`,
 * in a `.css.ts` class, or inline on a single `<Button tokenOverrides={...} />`) without polluting
 * `:root` when unused. Each variable falls back to Layer 2 semantic tokens (`vars.*`).
 */
export const buttonVars = {
  bg: createVar(),
  bgHover: createVar(),
  bgActive: createVar(),
  text: createVar(),
  borderColor: createVar(),
  radius: createVar(),
  paddingX: createVar(),
  paddingY: createVar(),
  fontSize: createVar(),
  gap: createVar(),
} as const;

export interface ButtonTokenOverrides {
  bg?: CssColor;
  bgHover?: CssColor;
  bgActive?: CssColor;
  text?: CssColor;
  borderColor?: CssColor;
  radius?: CssPx;
  paddingX?: CssPx;
  paddingY?: CssPx;
  fontSize?: CssRem;
  gap?: CssPx;
}

export const buttonBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: fallbackVar(buttonVars.gap, vars.space['2']),
  paddingTop: buttonVars.paddingY,
  paddingBottom: buttonVars.paddingY,
  paddingLeft: buttonVars.paddingX,
  paddingRight: buttonVars.paddingX,
  fontFamily: vars.font.family.sans,
  fontSize: buttonVars.fontSize,
  fontWeight: vars.font.weight.medium,
  lineHeight: vars.font.lineHeight.tight,
  borderRadius: fallbackVar(buttonVars.radius, vars.radius.md),
  borderWidth: vars.borderWidth.thin,
  borderStyle: 'solid',
  borderColor: fallbackVar(buttonVars.borderColor, 'transparent'),
  backgroundColor: buttonVars.bg,
  color: buttonVars.text,
  cursor: 'pointer',
  userSelect: 'none',
  textDecoration: 'none',
  transitionProperty: 'background-color, border-color, color, box-shadow',
  transitionDuration: vars.motion.duration.fast,
  transitionTimingFunction: vars.motion.easing.standard,
  selectors: {
    [stateSelectors.hover]: {
      backgroundColor: buttonVars.bgHover,
    },
    [stateSelectors.active]: {
      backgroundColor: buttonVars.bgActive,
    },
    [stateSelectors.disabled]: {
      opacity: 0.55,
      cursor: 'not-allowed',
    },
    [stateSelectors.focusVisible]: {
      outline: `${vars.borderWidth.thick} solid ${vars.color.border.focus}`,
      outlineOffset: vars.space['0.5'],
    },
  },
});

export const buttonVariants = styleVariants({
  primary: {
    vars: {
      [buttonVars.bg]: vars.color.fill.primary,
      [buttonVars.bgHover]: vars.color.fill.primaryHover,
      [buttonVars.bgActive]: vars.color.fill.primaryActive,
      [buttonVars.text]: vars.color.text.onPrimary,
      [buttonVars.borderColor]: 'transparent',
    },
  },
  secondary: {
    vars: {
      [buttonVars.bg]: vars.color.fill.secondary,
      [buttonVars.bgHover]: vars.color.fill.secondaryHover,
      [buttonVars.bgActive]: vars.color.fill.secondaryActive,
      [buttonVars.text]: vars.color.text.primary,
      [buttonVars.borderColor]: 'transparent',
    },
  },
  outline: {
    vars: {
      [buttonVars.bg]: 'transparent',
      [buttonVars.bgHover]: vars.color.fill.ghostHover,
      [buttonVars.bgActive]: vars.color.fill.ghostActive,
      [buttonVars.text]: vars.color.text.primary,
      [buttonVars.borderColor]: vars.color.border.default,
    },
  },
  ghost: {
    vars: {
      [buttonVars.bg]: 'transparent',
      [buttonVars.bgHover]: vars.color.fill.ghostHover,
      [buttonVars.bgActive]: vars.color.fill.ghostActive,
      [buttonVars.text]: vars.color.text.secondary,
      [buttonVars.borderColor]: 'transparent',
    },
  },
  danger: {
    vars: {
      [buttonVars.bg]: vars.color.fill.danger,
      [buttonVars.bgHover]: vars.color.fill.dangerHover,
      [buttonVars.bgActive]: vars.color.fill.dangerActive,
      [buttonVars.text]: vars.color.text.onDanger,
      [buttonVars.borderColor]: 'transparent',
    },
  },
});

export const buttonSizes = styleVariants({
  sm: {
    vars: {
      [buttonVars.paddingX]: vars.space['2.5'],
      [buttonVars.paddingY]: vars.space['1.5'],
      [buttonVars.fontSize]: vars.font.size.xs,
      [buttonVars.gap]: vars.space['1.5'],
    },
  },
  md: {
    vars: {
      [buttonVars.paddingX]: vars.space['4'],
      [buttonVars.paddingY]: vars.space['2'],
      [buttonVars.fontSize]: vars.font.size.sm,
      [buttonVars.gap]: vars.space['2'],
    },
  },
  lg: {
    vars: {
      [buttonVars.paddingX]: vars.space['5'],
      [buttonVars.paddingY]: vars.space['2.5'],
      [buttonVars.fontSize]: vars.font.size.md,
      [buttonVars.gap]: vars.space['2.5'],
    },
  },
});

export type ButtonVariant = keyof typeof buttonVariants;
export type ButtonSize = keyof typeof buttonSizes;
