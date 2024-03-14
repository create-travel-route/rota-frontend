import React, { useEffect, useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';

const Input = ({ type, value, onChange, error, helperText, label, length, ...props }) => {
  const [counter, setCounter] = useState(length);

  useEffect(() => {
    if (!length) return;
    const characters = length - value.length;
    setCounter(characters);
  }, [value]);

  return (
    <TextField
      label={label}
      variant="outlined"
      value={value}
      type={type === 'date' ? 'text' : type}
      onChange={onChange}
      error={error}
      helperText={helperText}
      fullWidth
      inputProps={{
        maxLength: length
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment
            position="end"
            sx={{
              color: counter === 0 ? 'red' : 'primary.main'
            }}>
            {length ? counter : null}
          </InputAdornment>
        )
      }}
      {...props}
    />
  );
};

export default Input;
