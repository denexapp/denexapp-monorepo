'use client';

import {
  createContext,
  forwardRef,
  useContext,
  useMemo,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { colorVars, scaleVars, type ColorThemeTokens, type ScaleThemeTokens } from './contract.css';
import {
  compactScaleTheme,
  darkTheme,
  defaultScaleTheme,
  lightTheme,
  themeRoot,
} from './themes.css';
import type { DeepPartial } from './types';
import { assignPartialContractVars } from './utils';

export type ThemeMode = 'light' | 'dark';
export type ThemeDensity = 'default' | 'compact';

export interface ThemeContextValue {
  mode: ThemeMode;
  density: ThemeDensity;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  return (
    useContext(ThemeContext) ?? {
      mode: 'light',
      density: 'default',
    }
  );
}

export interface ThemeProviderProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  /**
   * Semantic color mode (`'light'` or `'dark'`).
   * Inherits from parent `<ThemeProvider>` when nested, or defaults to `'light'`.
   */
  mode?: ThemeMode;
  /**
   * Structural spacing density (`'default'` or `'compact'`).
   * Inherits from parent `<ThemeProvider>` when nested, or defaults to `'default'`.
   */
  density?: ThemeDensity;
  /**
   * Optional custom Vanilla Extract color theme class created via `createCiriColorTheme()`.
   * Takes precedence over the built-in `mode` theme class when provided.
   */
  colorThemeClass?: string;
  /**
   * Optional custom Vanilla Extract scale theme class created via `createCiriScaleTheme()`.
   * Takes precedence over the built-in `density` theme class when provided.
   */
  scaleThemeClass?: string;
  /**
   * Runtime partial overrides for Layer 2 semantic color tokens.
   */
  colorOverrides?: DeepPartial<ColorThemeTokens>;
  /**
   * Runtime partial overrides for Layer 2 structural scale tokens.
   */
  scaleOverrides?: DeepPartial<ScaleThemeTokens>;
  /**
   * Layer 3 scoped component variable overrides (created via `assignComponentVars(...)`).
   * Applies to all matching components inside this provider's DOM subtree.
   */
  componentVars?: Record<string, string>;
}

/**
 * Composable ThemeProvider that applies Layer 2 (semantic color & scale) and Layer 3 (component)
 * design tokens to its DOM subtree. Can be nested to scope themes or density to specific sections.
 */
export const ThemeProvider = forwardRef<HTMLDivElement, ThemeProviderProps>(function ThemeProvider(
  {
    children,
    mode,
    density,
    colorThemeClass,
    scaleThemeClass,
    colorOverrides,
    scaleOverrides,
    componentVars,
    className,
    style,
    ...props
  },
  ref,
) {
  const parentContext = useContext(ThemeContext);
  const resolvedMode: ThemeMode = mode ?? parentContext?.mode ?? 'light';
  const resolvedDensity: ThemeDensity = density ?? parentContext?.density ?? 'default';

  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      mode: resolvedMode,
      density: resolvedDensity,
    }),
    [resolvedMode, resolvedDensity],
  );

  const inlineThemeVars = useMemo<CSSProperties>(() => {
    const varsRecord: Record<string, string> = {};

    if (colorOverrides) {
      Object.assign(varsRecord, assignPartialContractVars(colorVars, colorOverrides));
    }
    if (scaleOverrides) {
      Object.assign(varsRecord, assignPartialContractVars(scaleVars, scaleOverrides));
    }
    if (componentVars) {
      Object.assign(varsRecord, componentVars);
    }

    return varsRecord as CSSProperties;
  }, [colorOverrides, scaleOverrides, componentVars]);

  const activeColorClass = colorThemeClass ?? (resolvedMode === 'dark' ? darkTheme : lightTheme);
  const activeScaleClass =
    scaleThemeClass ?? (resolvedDensity === 'compact' ? compactScaleTheme : defaultScaleTheme);

  const combinedClassName = [themeRoot, activeColorClass, activeScaleClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <ThemeContext.Provider value={contextValue}>
      <div
        ref={ref}
        data-theme={resolvedMode}
        data-density={resolvedDensity}
        className={combinedClassName}
        style={{ ...inlineThemeVars, ...style }}
        {...props}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
});
