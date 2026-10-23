import { style } from '@vanilla-extract/css';
import { vars } from '@denexapp/ciri-ui';

export const pageContainer = style({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: vars.space['8'],
  backgroundColor: vars.color.surface.canvas,
  color: vars.color.text.primary,
  fontFamily: vars.font.family.sans,
});

export const mainContent = style({
  width: '100%',
  maxWidth: '640px',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space['6'],
});

export const actionsRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space['3'],
  marginTop: vars.space['4'],
});
