import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import tr from 'date-fns/locale/tr';
import createCache from '@emotion/cache';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './Utils/i18n';
import createTheme from './Theme';

import App from './App';
import RequestProvider from './Contexts/RequestContext';
import AuthProvider from './Contexts/AuthContext';

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
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={tr}>
          <AuthProvider>
            <RequestProvider>
              <React.StrictMode>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </React.StrictMode>
            </RequestProvider>
          </AuthProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </CacheProvider>
);
