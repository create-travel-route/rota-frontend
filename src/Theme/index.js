import { createTheme as createMuiTheme } from '@mui/material';
import createPalette from './Palette';
import createComponents from './Components';

const createTheme = () => {
  const palette = createPalette();
  const components = createComponents({ palette });

  return createMuiTheme({
    palette,
    components
  });
};

export default createTheme;
