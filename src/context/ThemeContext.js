import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeContext = createContext({
    mode: 'dark',
    toggleTheme: () => {},
    isDark: true,
});

export const getAppTheme = (mode) => {
    const isDark = mode === 'dark';

    return createTheme({
        palette: {
            mode,
            primary: {
                main: '#2563eb',
                light: '#60a5fa',
                dark: '#1d4ed8',
                contrastText: '#ffffff'
            },
            secondary: {
                main: isDark ? '#06b6d4' : '#0891b2',
                light: '#67e8f9',
                dark: '#0e7490',
            },
            success: {
                main: '#10b981',
                light: '#34d399',
                dark: '#059669',
            },
            warning: {
                main: '#f59e0b',
                light: '#fbbf24',
                dark: '#d97706',
            },
            error: {
                main: '#ef4444',
                light: '#f87171',
                dark: '#dc2626',
            },
            background: {
                default: isDark ? '#070a13' : '#f8fafc',
                paper: isDark ? '#0f172a' : '#ffffff',
            },
            text: {
                primary: isDark ? '#f8fafc' : '#0f172a',
                secondary: isDark ? '#94a3b8' : '#475569',
            },
            divider: isDark ? 'rgba(148, 163, 184, 0.14)' : 'rgba(226, 232, 240, 0.9)',
        },
        typography: {
            fontFamily: '"Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            button: {
                textTransform: 'none',
                fontWeight: 700,
            },
            h1: { fontWeight: 800, letterSpacing: '-0.03em' },
            h2: { fontWeight: 800, letterSpacing: '-0.025em' },
            h3: { fontWeight: 800, letterSpacing: '-0.02em' },
            h4: { fontWeight: 700, letterSpacing: '-0.02em' },
            h5: { fontWeight: 700 },
            h6: { fontWeight: 600 },
        },
        shape: {
            borderRadius: 14,
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: '12px',
                        fontWeight: 700,
                        textTransform: 'none',
                        transition: 'all 0.2s ease',
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: '20px',
                        backgroundImage: 'none',
                        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.72)' : '#ffffff',
                        border: isDark ? '1px solid rgba(148, 163, 184, 0.14)' : '1px solid rgba(226, 232, 240, 0.9)',
                        boxShadow: isDark
                            ? '0 12px 30px rgba(0,0,0,0.3)'
                            : '0 8px 24px rgba(15, 23, 42, 0.06)',
                    }
                }
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderRadius: '20px',
                        backgroundImage: 'none',
                    }
                }
            },
            MuiDialog: {
                styleOverrides: {
                    paper: {
                        borderRadius: '24px',
                        backgroundColor: isDark ? 'rgba(15, 23, 42, 0.96)' : '#ffffff',
                        border: isDark ? '1px solid rgba(148, 163, 184, 0.2)' : '1px solid rgba(226, 232, 240, 0.9)',
                        backdropFilter: 'blur(20px)',
                    }
                }
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        borderRadius: '12px',
                        backgroundColor: isDark ? 'rgba(30, 41, 59, 0.45)' : '#ffffff',
                        '& fieldset': {
                            borderColor: isDark ? 'rgba(148, 163, 184, 0.2)' : 'rgba(203, 213, 225, 0.8)',
                        },
                        '&:hover fieldset': {
                            borderColor: '#2563eb',
                        },
                    }
                }
            }
        }
    });
};

export const ThemeModeProvider = ({ children }) => {
    const [mode, setMode] = useState(() => {
        try {
            const saved = localStorage.getItem('bookingreserva_theme');
            if (saved === 'dark' || saved === 'light') return saved;
        } catch (e) {
            // ignore
        }
        return 'dark';
    });

    useEffect(() => {
        try {
            localStorage.setItem('bookingreserva_theme', mode);
            document.documentElement.setAttribute('data-theme', mode);
        } catch (e) {
            // ignore
        }
    }, [mode]);

    const toggleTheme = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const isDark = mode === 'dark';
    const theme = useMemo(() => getAppTheme(mode), [mode]);

    const value = useMemo(() => ({
        mode,
        toggleTheme,
        isDark,
    }), [mode, isDark]);

    return (
        <ThemeContext.Provider value={value}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useThemeMode = () => useContext(ThemeContext);

export default ThemeContext;
