const createPalette = () => {
  return {
    primary: {
      main: '#26428b', // dark cornflower blue
      contrastText: 'white'
    },
    inputBG: {
      main: '#F8F8F8',
      contrastText: 'black'
    },
    inputPlaceholder: {
      main: '#787878',
      contrastText: 'black'
    },
    text: {
      main: '#979797',
      contrastText: 'white'
    },
    header: {
      main: '#111236',
      contrastText: 'white'
    },
    navbar: {
      main: '#E5E5E5',
      contrastText: 'white'
    },
    footer: {
      main: '#F9F9F9',
      contrastText: 'black'
    }
  };
};

export default createPalette;
