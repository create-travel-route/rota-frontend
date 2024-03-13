import * as React from 'react';
import MUIButton from '@mui/material/Button';
import styled from '@emotion/styled';

const StyledButton = styled(MUIButton)(
  ({ color, variant }) => `
  background-color: ${color};
  border-color: ${color};
  font-weight: ${variant === 'contained' || variant === 'outlined' ? '600' : 'none'};
  text-decoration: ${variant === 'text' ? 'underline' : 'none'};
  text-transform: capitalize;
`
);

export default function TertiaryButton({
  disabled = false,
  type,
  size,
  color,
  onClick,
  children,
  sx,
  ...props
}) {
  return (
    <StyledButton
      disabled={disabled}
      sx={{ p: 0, ...sx }}
      type={type}
      size={size}
      color={color}
      variant="text"
      onClick={onClick}
      fullWidth
      {...props}>
      {children}
    </StyledButton>
  );
}
