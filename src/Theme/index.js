import { createTheme as createMuiTheme } from '@mui/material';
import createPalette from './Palette';
import createComponents from './Components';

const createTheme = () => {
  const palette = createPalette();
  const components = createComponents({ palette });

  return createMuiTheme({
    palette,
    components,
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(',')
    }
  });
};

export default createTheme;
