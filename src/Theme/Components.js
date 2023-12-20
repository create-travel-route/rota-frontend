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
    }
  };
};

export default createComponents;
