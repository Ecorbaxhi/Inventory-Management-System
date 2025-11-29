import { createTheme } from '@mui/material/styles';

// Azure-inspired color palette
export const theme = createTheme({
    palette: {
        primary: {
            main: '#007FFF', // Azure blue
            light: '#4DA6FF',
            dark: '#0059B2',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#F5F7FA', // Light gray
            light: '#FFFFFF',
            dark: '#E0E4E8',
            contrastText: '#0D1C36',
        },
        background: {
            default: '#FFFFFF',
            paper: '#F5F7FA',
        },
        text: {
            primary: '#0D1C36', // Dark navy
            secondary: '#5A6C7D',
        },
        error: {
            main: '#D32F2F',
        },
        success: {
            main: '#2E7D32',
        },
        warning: {
            main: '#ED6C02',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 600,
            color: '#0D1C36',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
            color: '#0D1C36',
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 600,
            color: '#0D1C36',
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 500,
            color: '#0D1C36',
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 500,
            color: '#0D1C36',
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 500,
            color: '#0D1C36',
        },
        button: {
            textTransform: 'none',
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: '10px 24px',
                    fontSize: '1rem',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 2px 8px rgba(0, 127, 255, 0.2)',
                    },
                },
                contained: {
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(0, 127, 255, 0.3)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    '&:hover': {
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                },
            },
        },
    },
});
