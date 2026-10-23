# Monorepo Agent Instructions

## Packages

- **`@denexapp/ciri-ui`** (`packages/ciri-ui`): React 19 UI component library built on `@base-ui/react` primitives and a 3-layer `@vanilla-extract/css` design system.

## Documentation Router (`@denexapp/ciri-ui`)

Before creating, modifying, or styling components in `packages/ciri-ui`—or when consuming `@denexapp/ciri-ui` tokens and themes in an application—read the relevant documentation file:

- **Architecture, File Map & Strict Rules**: [docs/README.md](./docs/README.md)
- **Token Taxonomy, `vars` Reference & App Theming**: [docs/tokens-and-theming.md](./docs/tokens-and-theming.md)
- **Component Authoring Templates & Checklist**: [docs/authoring-components.md](./docs/authoring-components.md)

## Core Invariants (`packages/ciri-ui`)

1. **One-Way Token Flow (`Layer 1 -> Layer 2 -> Layer 3`)**: Never import `src/theme/primitives.ts` or use raw hex/unit literals inside `src/lib/*.css.ts`. Always consume Layer 2 `vars` from `src/theme` and expose Layer 3 overrides via `createVar()` + `fallbackVar()`.
2. **Units**: Use `rem` (`CssRem`) for `fontSize` and `px` (`CssPx`) on the `4px` grid for `space`, `radius`, and `borderWidth`.
3. **Vanilla Extract Exports**: Never export functions from `.css.ts` files (only serializable objects, strings, arrays, or numbers).
4. **Interactive States**: Always use `stateSelectors` from `src/theme/selectors.ts` (`hover`, `active`, `focusVisible`, `disabled`, `popupOpen`, `highlighted`, `selected`) to stay aligned with `@base-ui/react` data attributes.
5. **Verification**: Run `npx tsc --build && pnpm run lint && pnpm run format:check && pnpm run build-storybook` after changes.
