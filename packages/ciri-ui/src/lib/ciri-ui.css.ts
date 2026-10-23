import { createVar, fallbackVar, style, styleVariants } from '@vanilla-extract/css';
import { vars, type CssColor, type CssPx } from '../theme';

/**
 * LAYER 3: SCOPED CARD / CONTAINER COMPONENT TOKENS
 */
export const ciriCardVars = {
  background: createVar(),
  borderColor: createVar(),
  padding: createVar(),
  radius: createVar(),
  shadow: createVar(),
} as const;

export interface CiriCardTokenOverrides {
  background?: CssColor;
  borderColor?: CssColor;
  padding?: CssPx;
  radius?: CssPx;
  shadow?: string;
}

export const container = style({
  padding: fallbackVar(ciriCardVars.padding, vars.space['6']),
  borderRadius: fallbackVar(ciriCardVars.radius, vars.radius.lg),
  backgroundColor: fallbackVar(ciriCardVars.background, vars.color.surface.surface0),
  borderWidth: vars.borderWidth.thin,
  borderStyle: 'solid',
  borderColor: fallbackVar(ciriCardVars.borderColor, vars.color.border.subtle),
  boxShadow: fallbackVar(ciriCardVars.shadow, vars.color.shadow.sm),
  fontFamily: vars.font.family.sans,
  transitionProperty: 'background-color, border-color, box-shadow',
  transitionDuration: vars.motion.duration.normal,
  transitionTimingFunction: vars.motion.easing.standard,
});

export const elevationVariants = styleVariants({
  surface0: {
    vars: {
      [ciriCardVars.background]: vars.color.surface.surface0,
      [ciriCardVars.shadow]: vars.color.shadow.xs,
    },
  },
  surface1: {
    vars: {
      [ciriCardVars.background]: vars.color.surface.surface1,
      [ciriCardVars.shadow]: vars.color.shadow.sm,
    },
  },
  surface2: {
    vars: {
      [ciriCardVars.background]: vars.color.surface.surface2,
      [ciriCardVars.shadow]: vars.color.shadow.overlay,
    },
  },
});

export const title = style({
  fontSize: vars.font.size.xl,
  fontWeight: vars.font.weight.semibold,
  lineHeight: vars.font.lineHeight.tight,
  color: vars.color.text.primary,
  margin: `0 0 ${vars.space['2']} 0`,
});

export const description = style({
  fontSize: vars.font.size.sm,
  lineHeight: vars.font.lineHeight.normal,
  color: vars.color.text.secondary,
  margin: 0,
});

export type CiriSurfaceElevation = keyof typeof elevationVariants;
