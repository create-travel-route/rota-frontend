import React from 'react';
import { Box } from '@mui/material';
import { Input } from '../../Components';
import MainButton from '../../Components/Button/MainButton';
import SecondaryButton from '../../Components/Button/SecondaryButton';
import TertiaryButton from '../../Components/Button/TertiaryButton';

function Homepage() {
  return (
    <Box sx={{ flexGrow: 1, m: 2 }}>
      <Input label="beyza" />
      <MainButton></MainButton>
      <SecondaryButton></SecondaryButton>
      <TertiaryButton></TertiaryButton>
    </Box>
  );
}

export default Homepage;
