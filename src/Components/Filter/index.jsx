import React from 'react';
import { Paper, Box, Typography } from '@mui/material';

const Filter = ({ children, title }) => {
  return (
    <Paper
      sx={{
        padding: 3,
        elevation: 2,
        mb: 2
      }}>
      <Typography
        sx={{
          color: 'header.main',
          fontWeight: 600,
          textAlign: 'start',
          fontSize: '16px',
          mb: 2
        }}
        variant="subtitle1">
        {title}
      </Typography>
      <Box>{children}</Box>
    </Paper>
  );
};

export default Filter;
