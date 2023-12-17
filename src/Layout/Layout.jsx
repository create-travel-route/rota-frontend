import React from 'react';
import { Grid, Stack } from '@mui/material';
import Main from './Main';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Main>
        <Navbar />
        <Grid container spacing={4} height="100%">
          <Grid item xs={12} display="flex">
            <Stack spacing={4} width="100%">
              {children}
            </Stack>
          </Grid>
        </Grid>
        <Footer />
      </Main>
    </>
  );
};

export default Layout;
