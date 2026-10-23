# Tokens & Theming Guide

`@denexapp/ciri-ui` uses a **3-Layer Token Architecture** split by mutability so Light/Dark mode switching and density scaling require zero React re-renders or redundant CSS variable declarations.

---

## 1. The 3 Token Layers

| Layer                        | Location                                   | Purpose                                                                                         | Allowed Consumers                                                       |
| :--------------------------- | :----------------------------------------- | :---------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------- |
| **Layer 1: Base Primitives** | `src/theme/primitives.ts`                  | Raw color palettes (`palette.blue600`) & numeric scales (`spaceScale['4']`)                     | Only Layer 2 theme definitions (`tokens.ts` or app custom themes)       |
| **Layer 2A: Color Contract** | `src/theme/contract.css.ts` (`vars.color`) | Mode-dependent semantic roles (`surface`, `text`, `fill`, `border`, `shadow`)                   | All component & app `.css.ts` files                                     |
| **Layer 2B: Scale Contract** | `src/theme/contract.css.ts` (`vars.*`)     | Mode-invariant structural scales (`space`, `radius`, `borderWidth`, `font`, `zIndex`, `motion`) | All component & app `.css.ts` files                                     |
| **Layer 3: Component Vars**  | `src/lib/<comp>.css.ts` (`<comp>Vars`)     | Scoped component overrides with `fallbackVar(localVar, vars.*)`                                 | App themes, `<ThemeProvider componentVars>`, or `<Comp tokenOverrides>` |

---

## 2. Layer 2 Token Reference (`vars`)

Import `vars` from `@denexapp/ciri-ui` (in apps) or `../theme` (inside `packages/ciri-ui`).

### `vars.color` (Semantic Colors & Elevation)

| Group                | Keys                                                                                                                                                                                                                                 | Description                                                                                                                                 |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `vars.color.surface` | `canvas`, `surface0`, `surface1`, `surface2`, `sunken`, `inverse`, `backdrop`                                                                                                                                                        | Progressive elevation tiers (`canvas` = page bg, `surface0` = card, `surface1` = raised, `surface2` = modal/popover, `sunken` = input well) |
| `vars.color.text`    | `primary`, `secondary`, `muted`, `disabled`, `inverse`, `onPrimary`, `onDanger`, `accent`, `success`, `warning`, `danger`                                                                                                            | Foreground typography & icon colors                                                                                                         |
| `vars.color.fill`    | `primary`, `primaryHover`, `primaryActive`, `secondary`, `secondaryHover`, `secondaryActive`, `ghostHover`, `ghostActive`, `danger`, `dangerHover`, `dangerActive`, `successSubtle`, `warningSubtle`, `dangerSubtle`, `accentSubtle` | Interactive control backgrounds and status callout fills                                                                                    |
| `vars.color.border`  | `subtle`, `default`, `strong`, `focus`, `danger`                                                                                                                                                                                     | Hairline dividers, control borders, and `:focus-visible` rings                                                                              |
| `vars.color.shadow`  | `xs`, `sm`, `md`, `lg`, `overlay`                                                                                                                                                                                                    | Mode-adapted elevation shadows                                                                                                              |

### `vars` (Structural Scales)

| Group                  | Keys                                                                                                      | Unit / Type                                                |
| :--------------------- | :-------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------- |
| `vars.space`           | `'0'`, `'0.5'`, `'1'`, `'1.5'`, `'2'`, `'2.5'`, `'3'`, `'4'`, `'5'`, `'6'`, `'8'`, `'10'`, `'12'`, `'16'` | `CssPx` (`1` = `4px` in default density, `3px` in compact) |
| `vars.radius`          | `none`, `xs`, `sm`, `md`, `lg`, `xl`, `'2xl'`, `full`                                                     | `CssPx` (`0px` to `9999px`)                                |
| `vars.borderWidth`     | `none`, `thin`, `thick`                                                                                   | `CssPx` (`0px`, `1px`, `2px`)                              |
| `vars.font.family`     | `sans`, `mono`                                                                                            | `string`                                                   |
| `vars.font.size`       | `xs`, `sm`, `md`, `lg`, `xl`, `'2xl'`, `'3xl'`                                                            | `CssRem` (`0.75rem` to `1.875rem`)                         |
| `vars.font.lineHeight` | `tight`, `snug`, `normal`, `relaxed`                                                                      | `CssLineHeight` (`1.25` to `1.625`)                        |
| `vars.font.weight`     | `normal`, `medium`, `semibold`, `bold`                                                                    | `CssFontWeight` (`400` to `700`)                           |
| `vars.zIndex`          | `base`, `dropdown`, `sticky`, `overlay`, `modal`, `popover`, `toast`, `tooltip`                           | `CssZIndex` (`0` to `1600`)                                |
| `vars.motion.duration` | `instant`, `fast`, `normal`, `slow`                                                                       | `CssDuration` (`0ms`, `120ms`, `200ms`, `300ms`)           |
| `vars.motion.easing`   | `standard`, `enter`, `exit`                                                                               | `CssEasing` (`cubic-bezier(...)`)                          |

---

## 3. Using & Customizing Themes in an App

### A. Switching Built-in Modes & Density (`<ThemeProvider>`)

`<ThemeProvider>` can be mounted at the app root or nested around any subtree (e.g., a dark sidebar or a compact data table):

```tsx
import { ThemeProvider, Button } from '@denexapp/ciri-ui';

export function App() {
  return (
    <ThemeProvider mode="light" density="default">
      <Button>Standard Light Button</Button>

      {/* Nested subtree with Dark Mode + Compact Density */}
      <ThemeProvider mode="dark" density="compact">
        <Button>Compact Dark Button</Button>
      </ThemeProvider>
    </ThemeProvider>
  );
}
```

### B. Build-Time Custom App Theme (`.css.ts`)

Use `createCiriColorTheme` or `createCiriScaleTheme` inside an app's `.css.ts` file. You only need to pass the tokens you want to override (`DeepPartial`):

```ts
// app-theme.css.ts
import { createCiriColorTheme, darkColorTokens, palette } from '@denexapp/ciri-ui';

export const emeraldDarkTheme = createCiriColorTheme(
  {
    fill: {
      primary: palette.emerald500,
      primaryHover: palette.emerald400,
      primaryActive: palette.emerald600,
    },
    border: {
      focus: palette.emerald400,
    },
  },
  darkColorTokens,
);
```

Then pass `colorThemeClass={emeraldDarkTheme}` to `<ThemeProvider>`:

```tsx
<ThemeProvider colorThemeClass={emeraldDarkTheme}>
  <AppContent />
</ThemeProvider>
```

### C. Runtime & Layer 3 Component Token Overrides

Override Layer 2 tokens or Layer 3 component tokens (`buttonVars`, `ciriCardVars`) either for a subtree via `<ThemeProvider>` or on a single component instance via `tokenOverrides`:

```tsx
import {
  assignComponentVars,
  Button,
  buttonVars,
  palette,
  ThemeProvider,
  vars,
} from '@denexapp/ciri-ui';

// 1. Subtree-wide Layer 3 override (all buttons inside become pill-shaped)
<ThemeProvider
  componentVars={assignComponentVars(buttonVars, {
    radius: vars.radius.full,
  })}
>
  <Button>Pill Button A</Button>
  <Button variant="secondary">Pill Button B</Button>
</ThemeProvider>;

// 2. Single-instance Layer 3 override
<Button
  tokenOverrides={{
    radius: vars.radius.full,
    bg: palette.amber500,
    bgHover: palette.amber600,
    text: palette.neutral950,
  }}
>
  Custom Amber Pill
</Button>;
```
