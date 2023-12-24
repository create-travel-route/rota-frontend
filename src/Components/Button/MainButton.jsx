import * as React from 'react';
import Button from '@mui/material/Button';

export default function MainButton({
  disabled = false,
  type,
  size,
  variant,
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
      variant={variant}
      onClick={onClick}
      fullWidth
      {...props}>
      {children}
    </Button>
  );
}
