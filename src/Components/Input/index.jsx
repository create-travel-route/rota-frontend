import React from 'react';
import { Box, TextField } from '@mui/material';

function Input({ type, value, onChange, error, label, ...props }) {
  return (
    <Box
      sx={{
        width: '90%',
        margin: '2px'
      }}>
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
    </Box>
  );
}

export default Input;
