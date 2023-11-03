import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createTheme from './Theme/index';
import createCache from '@emotion/cache';
import './Utils/i18n';

import App from './App';

const theme = createTheme();
const cache = createCache({
  key: 'css',
  prepend: true
});
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CacheProvider value={cache}>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <React.StrictMode>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
            </Routes>
          </BrowserRouter>
        </React.StrictMode>
      </QueryClientProvider>
    </ThemeProvider>
  </CacheProvider>
);
