# Authoring Components in `@denexapp/ciri-ui`

Every component in `packages/ciri-ui/src/lib/` consists of 3 files:

1. `<component>.css.ts` — Layer 3 `createVar()` declarations, base style, and `styleVariants` bound to Layer 2 `vars`.
2. `<component>.tsx` — React component wrapping `@base-ui/react` (or semantic HTML) with `forwardRef` and `tokenOverrides`.
3. `<component>.stories.tsx` — Storybook stories covering variants, sizes, states, and token overrides.

---

## 1. Style Template (`<component>.css.ts`)

> **Constraint:** Never export functions from `.css.ts` files. Never import `primitives.ts`. Always use `vars` and `stateSelectors` from `../theme`.

```ts
import { createVar, fallbackVar, style, styleVariants } from '@vanilla-extract/css';
import { stateSelectors, vars, type CssColor, type CssPx, type CssRem } from '../theme';

// 1. Define Layer 3 component-scoped CSS variables
export const badgeVars = {
  bg: createVar(),
  text: createVar(),
  borderColor: createVar(),
  radius: createVar(),
  paddingX: createVar(),
  paddingY: createVar(),
  fontSize: createVar(),
} as const;

// 2. Define strict TypeScript override interface matching `badgeVars` keys
export interface BadgeTokenOverrides {
  bg?: CssColor;
  text?: CssColor;
  borderColor?: CssColor;
  radius?: CssPx;
  paddingX?: CssPx;
  paddingY?: CssPx;
  fontSize?: CssRem;
}

// 3. Base style using `fallbackVar(badgeVars.*, vars.*)` and `stateSelectors`
export const badgeBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  paddingLeft: fallbackVar(badgeVars.paddingX, vars.space['2']),
  paddingRight: fallbackVar(badgeVars.paddingX, vars.space['2']),
  paddingTop: fallbackVar(badgeVars.paddingY, vars.space['0.5']),
  paddingBottom: fallbackVar(badgeVars.paddingY, vars.space['0.5']),
  borderRadius: fallbackVar(badgeVars.radius, vars.radius.full),
  borderWidth: vars.borderWidth.thin,
  borderStyle: 'solid',
  borderColor: fallbackVar(badgeVars.borderColor, 'transparent'),
  backgroundColor: fallbackVar(badgeVars.bg, vars.color.fill.secondary),
  color: fallbackVar(badgeVars.text, vars.color.text.primary),
  fontFamily: vars.font.family.sans,
  fontSize: fallbackVar(badgeVars.fontSize, vars.font.size.xs),
  fontWeight: vars.font.weight.medium,
  lineHeight: vars.font.lineHeight.tight,
  selectors: {
    [stateSelectors.disabled]: {
      opacity: 0.55,
      cursor: 'not-allowed',
    },
  },
});

// 4. Variants assign Layer 2 semantic tokens into Layer 3 component vars
export const badgeVariants = styleVariants({
  neutral: {
    vars: {
      [badgeVars.bg]: vars.color.fill.secondary,
      [badgeVars.text]: vars.color.text.secondary,
    },
  },
  accent: {
    vars: {
      [badgeVars.bg]: vars.color.fill.accentSubtle,
      [badgeVars.text]: vars.color.text.accent,
    },
  },
  success: {
    vars: {
      [badgeVars.bg]: vars.color.fill.successSubtle,
      [badgeVars.text]: vars.color.text.success,
    },
  },
  danger: {
    vars: {
      [badgeVars.bg]: vars.color.fill.dangerSubtle,
      [badgeVars.text]: vars.color.text.danger,
    },
  },
});

export type BadgeVariant = keyof typeof badgeVariants;
```

---

## 2. Component Template (`<component>.tsx`)

```tsx
import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { assignComponentVars } from '../theme';
import {
  badgeBase,
  badgeVariants,
  badgeVars,
  type BadgeTokenOverrides,
  type BadgeVariant,
} from './badge.css';

export { badgeVars, type BadgeTokenOverrides, type BadgeVariant };

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  variant?: BadgeVariant;
  tokenOverrides?: BadgeTokenOverrides;
  className?: string;
  style?: CSSProperties;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { children, variant = 'neutral', tokenOverrides, className, style, ...props },
  ref,
) {
  const composedClassName = [badgeBase, badgeVariants[variant], className]
    .filter(Boolean)
    .join(' ');

  const inlineStyle = tokenOverrides
    ? ({ ...assignComponentVars(badgeVars, tokenOverrides), ...style } as CSSProperties)
    : style;

  return (
    <span ref={ref} className={composedClassName} style={inlineStyle} {...props}>
      {children}
    </span>
  );
});
```

---

## 3. Checklist for Adding a Component

- [ ] No raw hex colors or `px`/`rem` magic numbers in `<component>.css.ts` (all mapped to `vars.*`).
- [ ] No functions exported from `<component>.css.ts`.
- [ ] Interactive states use `stateSelectors` from `../theme`.
- [ ] Component exports `<component>Vars` and supports `tokenOverrides` via `assignComponentVars`.
- [ ] Public exports added to `packages/ciri-ui/src/index.ts`.
- [ ] Storybook story created in `packages/ciri-ui/src/lib/<component>.stories.tsx`.
- [ ] Verified with `npx tsc --build && pnpm run lint && pnpm run format && pnpm run build-storybook`.
