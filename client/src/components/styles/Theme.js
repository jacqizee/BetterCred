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
        defaultContrast: 'rgba(48, 48, 48, 0.50)',
        defaultMoreContrast: 'rgba(48, 48, 48, 0.25)',
        paper: '#ffffff',
        paperContrast: 'rgba(0, 0, 0, 0.10)',
        paperMoreContrast: 'rgba(0, 0, 0, 0.15)',
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
        defaultContrast: 'rgba(48, 48, 48, 0.50)',
        defaultMoreContrast: 'rgba(48, 48, 48, 0.25)',
        paper: '#424242',
        paperContrast: 'rgba(256, 256, 256, 0.15)',
        paperMoreContrast: 'rgba(256, 256, 256, 0.25)',
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