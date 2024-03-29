const theme = (mode) => ({
  palette: {
    mode, 
    ...( mode === 'light') ? {
      primary: {
        main: '#1e88e5',
        lighter: '#63aced',
        shadow: '#b8d7f2',
        contrastText: '#000',
      },
      secondary: {
        main: '#ffeb3b',
        dark: '#ffca3b',
        shadow: '#f7efa6',
        contrastText: '#000',
      },
      background: {
        default: '#f1f1f1',
        defaultContrast: 'rgba(48, 48, 48, 0.50)',
        defaultMoreContrast: 'rgba(48, 48, 48, 0.25)',
        paper: '#ffffff',
        paperContrast: '#e5e5e5',
        paperMoreContrast: '#c3c3c3',
      },
    } : {
      primary: {
        main: '#1a237e',
        lighter: '#2735bd',
        shadow: '#000',
        contrastText: '#fff',
      },
      secondary: {
        main: '#fdd835',
        dark: '#fdb735',
        shadow: '#ffd000',
        contrastText: '#000',
      },
      background: {
        default: '#303030',
        defaultContrast: 'rgba(256, 256, 256, 0.50)',
        defaultMoreContrast: 'rgba(256, 256, 256, 0.25)',
        paper: '#424242',
        paperContrast: '#4f4f4f',
        paperMoreContrast: '#8f8f8f',
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