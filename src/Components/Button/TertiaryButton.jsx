import * as React from 'react';
import Button from '@mui/material/Button';

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
    <Button
      disabled={disabled}
      sx={sx}
      type={type}
      size={size}
      color={color}
      variant="text"
      onClick={onClick}
      fullWidth
      {...props}>
      {children}
    </Button>
  );
}
