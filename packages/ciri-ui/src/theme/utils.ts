import type { CSSVarFunction, DeepPartial } from './types';

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Extracts the raw `--css-var-name` from a Vanilla Extract `var(--css-var-name)` reference.
 */
export function extractCssVarName(cssVar: CSSVarFunction | string): string {
  if (cssVar.startsWith('var(') && cssVar.endsWith(')')) {
    const inner = cssVar.slice(4, -1);
    const commaIndex = inner.indexOf(',');
    return (commaIndex === -1 ? inner : inner.slice(0, commaIndex)).trim();
  }
  return cssVar;
}

/**
 * Deeply merges a `DeepPartial<T>` token override object onto a complete base token object `T`.
 * Used by `defineColorTokens`, `defineScaleTokens`, and `createCiriTheme` so consuming apps
 * only need to specify the tokens they want to customize.
 */
export function deepMergeTokens<T extends object>(base: T, overrides?: DeepPartial<T>): T {
  if (!overrides) {
    return base;
  }

  const result: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  const overrideRecord = overrides as Record<string, unknown>;

  for (const key of Object.keys(overrideRecord)) {
    const overrideValue = overrideRecord[key];
    if (overrideValue === undefined) {
      continue;
    }

    const baseValue = result[key];
    if (isPlainObject(baseValue) && isPlainObject(overrideValue)) {
      result[key] = deepMergeTokens(baseValue, overrideValue);
    } else {
      result[key] = overrideValue;
    }
  }

  return result as T;
}

/**
 * Converts a `DeepPartial` token override object into a flat map of CSS Custom Property assignments
 * (`{ '--var-name': 'value' }`) suitable for Vanilla Extract `style({ vars })` or React `style` props.
 */
export function assignPartialContractVars<Contract extends object, Tokens extends object>(
  contract: Contract,
  overrides: DeepPartial<Tokens>,
): Record<string, string> {
  const result: Record<string, string> = {};

  function walk(contractNode: Record<string, unknown>, overrideNode: Record<string, unknown>) {
    for (const key of Object.keys(overrideNode)) {
      const overrideVal = overrideNode[key];
      const contractVal = contractNode[key];

      if (overrideVal === undefined || contractVal === undefined) {
        continue;
      }

      if (typeof contractVal === 'string' && typeof overrideVal === 'string') {
        result[extractCssVarName(contractVal)] = overrideVal;
      } else if (isPlainObject(contractVal) && isPlainObject(overrideVal)) {
        walk(contractVal, overrideVal);
      }
    }
  }

  walk(contract as Record<string, unknown>, overrides as Record<string, unknown>);
  return result;
}

/**
 * LAYER 3 HELPER: Assigns scoped component token overrides (`{ background: vars.color.surface.surface2 }`)
 * to a flat map of CSS Custom Property assignments for either `.css.ts` `style({ vars })` or React `style` props.
 */
export function assignComponentVars<
  ComponentContract extends Record<string, CSSVarFunction>,
  AllowedValues extends { [K in keyof ComponentContract]?: string } = {
    [K in keyof ComponentContract]?: string;
  },
>(contract: ComponentContract, overrides: AllowedValues): Record<string, string> {
  const result: Record<string, string> = {};

  for (const key of Object.keys(overrides) as Array<keyof ComponentContract>) {
    const value = overrides[key];
    const cssVar = contract[key];
    if (typeof value === 'string' && typeof cssVar === 'string') {
      result[extractCssVarName(cssVar)] = value;
    }
  }

  return result;
}
