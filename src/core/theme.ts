import { createTheme, Theme } from '@mui/material/styles';

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}

// eslint-disable-next-line import/prefer-default-export
export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#9f2720',
      dark: '#8f231d'
    },
    secondary: {
      main: '#147d78',
      dark: '#116864'
    }
  },
  typography: {
    h1: {
      fontSize: '34px',
      lineHeight: '40px',
      letterSpacing: '0.25px',
      color: 'rgba(0, 0, 0, 0.87)'
    },
    h2: {
      fontSize: '24px',
      lineHeight: '28px',
      color: 'rgba(0, 0, 0, 0.87)'
    },
    h3: {
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: '21px',
      letterSpacing: '0.15px',
      color: 'rgba(0, 0, 0, 0.87)'
    },
    h4: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: '16px',
      letterSpacing: '0.75px',
      color: 'rgba(0, 0, 0, 0.87)'
    },
    body1: {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0.15px',
      color: 'rgba(0, 0, 0, 0.87)'
    },
    body2: {
      fontSize: '14px',
      lineHeight: '24px',
      color: 'rgba(0, 0, 0, 0.87)'
    },
    subtitle1: {
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: '0.4px',
      color: 'rgba(0, 0, 0, 0.87)'
    },
    button: {
      fontSize: '14px',
      lineHeight: '16px',
      letterSpacing: '0.75px',
      color: 'rgba(0, 0, 0, 0.87)'
    }
  },
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          marginTop: '16px',
          marginBottom: '16px',
          backgroundColor: 'rgba(0, 0, 0, 0.12)'
        },
        vertical: {
          margin: 0
        }
      }
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          '&$completed': {
            color: '#147d78'
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: '12px'
        }
      }
    }
  }
});
