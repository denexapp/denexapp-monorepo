/**
 * Standardized interactive state selectors aligned with `@base-ui/react` data attributes
 * and native HTML pseudo-classes.
 *
 * Rule: Interactive components must use `stateSelectors` to ensure `:disabled` and `[data-disabled]`
 * consistently suppress hover/active states across all components.
 */
export const stateSelectors = {
  hover: '&:hover:not(:disabled):not([data-disabled])',
  active:
    '&:active:not(:disabled):not([data-disabled]), &[data-pressed]:not(:disabled):not([data-disabled])',
  focusVisible: '&:focus-visible, &[data-focus-visible]',
  disabled: '&:disabled, &[data-disabled]',
  popupOpen: '&[data-popup-open], &[data-open]',
  highlighted: '&[data-highlighted]:not([data-disabled])',
  selected: '&[data-selected], &[data-checked], &[aria-selected="true"]',
} as const;
