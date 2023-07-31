import { createTheme } from '@mui/material/styles';

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
    },
    success: {
      main: '#4CAF50',
      light: '#E8F5E9'
    },
    error: {
      main: '#B71C1C',
      light: '#FFEBEE'
    },
    warning: {
      main: '#FFA726',
      light: '#FFF3E0'
    },
    info: {
      main: '#1E88E5',
      light: '#E3F2FD'
    }
  },
  typography: {
    h1: {
      fontSize: '34px',
      lineHeight: '40px',
      letterSpacing: '0.25px',
      fontWeight: 700
    },
    h2: {
      fontSize: '24px',
      lineHeight: '28px',

      '@media (max-width:600px)': {
        fontSize: '20px',
        lineHeight: '32px'
      }
    },
    h3: {
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: '21px',
      letterSpacing: '0.15px'
    },
    h4: {
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: '16px',
      letterSpacing: '0.75px'
    },
    body1: {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0.15px'
    },
    body2: {
      fontSize: '14px',
      lineHeight: '24px'
    },
    subtitle1: {
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: '0.4px'
    },
    button: {
      fontSize: '14px',
      lineHeight: '16px',
      letterSpacing: '0.75px'
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
