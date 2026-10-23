'use client';

import { forwardRef, type CSSProperties, type ReactNode } from 'react';
import { Button as BaseButton, type ButtonProps as BaseButtonProps } from '@base-ui/react/button';
import { assignComponentVars } from '../theme';
import {
  buttonBase,
  buttonSizes,
  buttonVariants,
  buttonVars,
  type ButtonSize,
  type ButtonTokenOverrides,
  type ButtonVariant,
} from './button.css';

export { buttonVars, type ButtonSize, type ButtonTokenOverrides, type ButtonVariant };

export interface ButtonProps extends Omit<BaseButtonProps, 'className' | 'style'> {
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * Optional Layer 3 component-scoped token overrides for this button instance.
   */
  tokenOverrides?: ButtonTokenOverrides;
  className?: string;
  style?: CSSProperties;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, variant = 'primary', size = 'md', tokenOverrides, className, style, ...props },
  ref,
) {
  const composedClassName = [buttonBase, buttonVariants[variant], buttonSizes[size], className]
    .filter(Boolean)
    .join(' ');

  const inlineStyle = tokenOverrides
    ? ({ ...assignComponentVars(buttonVars, tokenOverrides), ...style } as CSSProperties)
    : style;

  return (
    <BaseButton ref={ref} className={composedClassName} style={inlineStyle} {...props}>
      {children}
    </BaseButton>
  );
});

export default Button;
