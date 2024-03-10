import React from 'react';
import Login from '../../Components/Login/index.jsx';
import { Box } from '@mui/material';

function Loginpage() {
  return (
    <Box sx={{ flexGrow: 1, m: 2 }}>
      <Login />
    </Box>
  );
}

export default Loginpage;
