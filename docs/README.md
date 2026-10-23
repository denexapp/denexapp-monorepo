# `@denexapp/ciri-ui` Documentation Index

> **Agent Context Summary:** `@denexapp/ciri-ui` (`packages/ciri-ui`) is a React 19 UI library built on headless [`@base-ui/react`](https://base-ui.com) primitives and zero-runtime [`@vanilla-extract/css`](https://vanilla-extract.style) styling. It enforces a strict 3-layer token architecture.

## Documentation Map

- **[`tokens-and-theming.md`](./tokens-and-theming.md)**: 3-layer token taxonomy, full `vars` reference table, and app theme customization patterns.
- **[`authoring-components.md`](./authoring-components.md)**: Canonical templates and checklist for creating or modifying components in `packages/ciri-ui`.

---

## Package Structure (`packages/ciri-ui`)

```text
packages/ciri-ui/
├── .storybook/
│   ├── main.ts                 # Vite + vanillaExtractPlugin Storybook config
│   └── preview.ts              # Global ThemeProvider decorator (mode & density toggles)
└── src/
    ├── index.ts                # Public package entrypoint (exports theme, components, BaseUI)
    ├── theme/
    │   ├── index.ts            # Public barrel for the theme system
    │   ├── types.ts            # Strict CSS template-literal types (CssColor, CssPx, CssRem, etc.)
    │   ├── primitives.ts       # Layer 1: Raw palette & scales (TS `as const`, internal to themes)
    │   ├── contract.css.ts     # Layer 2: `colorVars`, `scaleVars`, unified `vars`, and token interfaces
    │   ├── tokens.ts           # Layer 2: Default token values + `define*Tokens` & `createCiri*Theme` factories
    │   ├── themes.css.ts       # Layer 2: `:root` global defaults + `lightTheme`, `darkTheme`, `compactScaleTheme`
    │   ├── selectors.ts        # `stateSelectors` aligned with `@base-ui/react` data attributes
    │   ├── utils.ts            # `deepMergeTokens`, `assignPartialContractVars`, `assignComponentVars`
    │   └── theme-provider.tsx  # Composable `<ThemeProvider>` and `useTheme()` hook
    └── lib/
        ├── button.css.ts       # Button styles, variants, sizes, and Layer 3 `buttonVars`
        ├── button.tsx          # `<Button>` component wrapping `@base-ui/react/button`
        ├── button.stories.tsx  # Button Storybook stories
        ├── ciri-ui.css.ts      # Card/Surface styles, elevation variants, and Layer 3 `ciriCardVars`
        ├── ciri-ui.tsx         # `<CiriUi>` surface container component
        └── ciri-ui.stories.tsx # Surface elevation & theme composition stories
```

---

## Strict Design System Rules (Invariants)

1. **One-Way Token Flow (`Layer 1 -> Layer 2 -> Layer 3`)**
   - **Layer 1 (`primitives.ts`)**: Raw values (`palette.blue600`, `spaceScale['4']`). **NEVER** import `primitives.ts` inside `src/lib/*.css.ts` component files.
   - **Layer 2 (`contract.css.ts` -> `vars`)**: Semantic role tokens (`vars.color.surface.surface0`, `vars.space['4']`). Component styles **MUST** consume `vars`.
   - **Layer 3 (`createVar()` in `*.css.ts`)**: Component-scoped override variables (`buttonVars`, `ciriCardVars`). Always bind defaults to Layer 2 via `fallbackVar(componentVar, vars.*)`.
2. **Unit Rules (`px` vs `rem`)**
   - **Typography (`fontSize`)**: **MUST** use `rem` (`CssRem`) to respect user browser font-size accessibility settings.
   - **Spacing, Radii, Borders (`space`, `radius`, `borderWidth`)**: **MUST** use `px` (`CssPx`) on the `4px` grid to preserve viewport space and crisp `1px` border alignment.
3. **Vanilla Extract `.css.ts` Export Constraint**
   - `.css.ts` files are statically evaluated and serialized at build time.
   - **NEVER** export functions from `.css.ts` files. Export only plain objects, strings, arrays, or numbers. Helper functions (like `createCiriColorTheme`) belong in `.ts` files (`tokens.ts` or `utils.ts`).
4. **Interactive States (`@base-ui/react` Alignment)**
   - **ALWAYS** use `stateSelectors` from `src/theme/selectors.ts` (`hover`, `active`, `focusVisible`, `disabled`, `popupOpen`, `highlighted`, `selected`) so `:disabled` and `[data-disabled]` behave identically everywhere.
5. **Foreground / Background Pairing**
   - Pair `fill.primary` with `text.onPrimary`, `fill.danger` with `text.onDanger`, `surface.inverse` with `text.inverse`, and `surface.surface0..2` with `text.primary` / `text.secondary`.

---

## Verification Commands

Run these from the workspace root (`d:\code\denexapp-monorepo`):

```bash
npx tsc --build          # Typecheck all packages and Storybook references
pnpm run lint            # Run oxlint
pnpm run format:check    # Check formatting with oxfmt (or `pnpm run format` to write)
pnpm run build-storybook # Verify Vanilla Extract compilation & Storybook build
```
