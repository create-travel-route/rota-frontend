import * as React from 'react';
import Button from '@mui/material/Button';

export default function SecondaryButton({
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
      variant="outlined"
      onClick={onClick}
      fullWidth
      {...props}>
      {children}
    </Button>
  );
}
