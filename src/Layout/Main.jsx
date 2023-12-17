import React from 'react';
import { Box, CssBaseline } from '@mui/material';

const Main = ({ children }) => {
  return (
    <Box component="main" flexGrow={1}>
      <CssBaseline />
      <Box
        sx={{
          height: '100%'
        }}>
        {children}
      </Box>
    </Box>
  );
};

export default Main;
