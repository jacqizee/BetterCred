const theme = (mode) => ({
  palette: {
    mode, 
    ...( mode === 'light') ? {
      primary: {
        main: '#1e88e5',
        contrastText: '#000',
      },
      secondary: {
        main: '#ffeb3b',
        contrastText: '#000',
      },
      background: {
        default: '#f1f1f1',
        paper: '#ffffff',
      },
    } : {
      primary: {
        main: '#1a237e',
        contrastText: '#fff',
      },
      secondary: {
        main: '#fdd835',
        contrastText: '#000',
      },
      background: {
        default: '#303030',
        paper: '#424242',
      },
    },
  },
  typography: {
    fontFamily: 'Raleway, sans-serif',
    h1: {
      fontSize: '4.5rem',
    },
    h2: {
      fontSize: '3.8rem',
    },
    h3: {
      fontSize: '3.1rem',
    },
    h4: {
      fontSize: '2.6rem',
    },
    h5: {
      fontSize: '2.1rem',
    },
    h6: {
      fontSize: '1.6rem',
    },
    subtitle1: {
      fontSize: '1.3rem',
    },
    subtitle2: {
      fontSize: '1.1rem',
    },
  },
})

export default theme