import React from 'react';
import { TextField } from '@mui/material';

function Input({ type, value, onChange, error, label, ...props }) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      type={type}
      onChange={onChange}
      value={value}
      error={error}
      label={label}
      {...props}
    />
  );
}

export default Input;
