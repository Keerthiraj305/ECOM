import { createTheme } from '@mui/material/styles';

// Example custom theme — modern, warm palette with rounded components
const theme = createTheme({
  palette: {
    mode: 'light',
    // Green-themed palette
    primary: {
      main: '#16a34a', // green-600
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#059669', // emerald-600
      contrastText: '#ffffff'
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff'
    },
    success: {
      main: '#16a34a'
    }
  },
  shape: {
    borderRadius: 12
  },
  spacing: 8,
  typography: {
    fontFamily: [
      'Inter',
      'Segoe UI',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif'
    ].join(','),
    h1: { fontSize: '2rem', fontWeight: 800 },
    h2: { fontSize: '1.5rem', fontWeight: 700 },
    h3: { fontSize: '1.25rem', fontWeight: 700 },
    body1: { fontSize: '0.975rem', lineHeight: 1.6 },
    button: {
      textTransform: 'none',
      fontWeight: 700
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale'
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 18px'
        },
        containedPrimary: {
          backgroundImage: 'linear-gradient(135deg, #16a34a 0%, #10b981 100%)',
          boxShadow: '0 8px 24px rgba(16,163,74,0.12)'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.06)',
          border: '1px solid rgba(15,23,42,0.04)'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 700
        }
      }
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          boxShadow: '0 2px 6px rgba(15,23,42,0.12)'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid rgba(15,23,42,0.04)'
        }
      }
    }
  }
});

export default theme;
