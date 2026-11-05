import React from 'react';
import { IconButton, Tooltip, Box } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { useThemeMode } from '../../context/ThemeContext';

/**
 * ThemeToggle Component
 * Smooth animated Sun / Moon mode toggle button with rotation transition and ambient glow.
 */
const ThemeToggle = ({ sx, size = 'medium', showLabel = false, ...props }) => {
    const { mode, toggleTheme, isDark } = useThemeMode();

    return (
        <Tooltip title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'} arrow>
            <IconButton
                onClick={toggleTheme}
                aria-label={`Toggle theme, current is ${mode}`}
                {...props}
                sx={{
                    position: 'relative',
                    color: isDark ? '#fbbf24' : '#2563eb',
                    bgcolor: isDark ? 'rgba(251, 191, 36, 0.1)' : 'rgba(37, 99, 235, 0.08)',
                    border: '1px solid',
                    borderColor: isDark ? 'rgba(251, 191, 36, 0.25)' : 'rgba(37, 99, 235, 0.2)',
                    borderRadius: '12px',
                    p: size === 'small' ? 0.75 : 1,
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    '&:hover': {
                        bgcolor: isDark ? 'rgba(251, 191, 36, 0.2)' : 'rgba(37, 99, 235, 0.16)',
                        borderColor: isDark ? '#fbbf24' : '#2563eb',
                        transform: 'scale(1.05) rotate(15deg)',
                        boxShadow: isDark
                            ? '0 0 15px rgba(251, 191, 36, 0.35)'
                            : '0 0 15px rgba(37, 99, 235, 0.25)',
                    },
                    ...sx
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.4s ease',
                        transform: isDark ? 'rotate(0deg)' : 'rotate(360deg)',
                    }}
                >
                    {isDark ? (
                        <LightModeOutlinedIcon sx={{ fontSize: size === 'small' ? 18 : 22 }} />
                    ) : (
                        <DarkModeOutlinedIcon sx={{ fontSize: size === 'small' ? 18 : 22 }} />
                    )}
                </Box>
            </IconButton>
        </Tooltip>
    );
};

export default ThemeToggle;
