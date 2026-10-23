import type { CSSProperties, ReactNode } from 'react';
import { assignComponentVars } from '../theme';
import {
  ciriCardVars,
  container,
  description as descriptionStyle,
  elevationVariants,
  title as titleStyle,
  type CiriCardTokenOverrides,
  type CiriSurfaceElevation,
} from './ciri-ui.css';

export { ciriCardVars, type CiriCardTokenOverrides, type CiriSurfaceElevation };

export interface CiriUiProps {
  title?: string;
  description?: string;
  elevation?: CiriSurfaceElevation;
  tokenOverrides?: CiriCardTokenOverrides;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function CiriUi({
  title = 'Welcome to CiriUi!',
  description = 'A modern React UI component library styled with a 3-layer Vanilla Extract design system.',
  elevation = 'surface0',
  tokenOverrides,
  children,
  className,
  style,
}: CiriUiProps) {
  const composedClassName = [container, elevationVariants[elevation], className]
    .filter(Boolean)
    .join(' ');

  const inlineStyle = tokenOverrides
    ? ({ ...assignComponentVars(ciriCardVars, tokenOverrides), ...style } as CSSProperties)
    : style;

  return (
    <div className={composedClassName} style={inlineStyle}>
      <h1 className={titleStyle}>{title}</h1>
      <p className={descriptionStyle}>{description}</p>
      {children}
    </div>
  );
}

export default CiriUi;
