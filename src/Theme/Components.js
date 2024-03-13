const createComponents = ({ palette }) => {
  return {
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: '0'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: palette.inputBG.main, // Giriş arkaplan rengini değiştir
          borderRadius: 5
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          width: '100%'
        },
        textPrimary: {
          padding: 0,
          minWidth: 0,
          '&:hover': {
            backgroundColor: 'transparent'
          }
        }
      }
    }
  };
};

export default createComponents;
