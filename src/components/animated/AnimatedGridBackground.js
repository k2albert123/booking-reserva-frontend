import React from 'react';
import { Box } from '@mui/material';
import { useThemeMode } from '../../context/ThemeContext';

/**
 * AnimatedGridBackground Component
 * Geometric dot matrix / grid pattern with vignette mask inspired by Land-book & Supahero.
 */
const AnimatedGridBackground = ({
    children,
    pattern = 'dots', // 'dots' | 'grid'
    sx,
    showGlow = true,
    ...props
}) => {
    const { isDark } = useThemeMode();

    const dotPattern = isDark
        ? 'radial-gradient(rgba(255, 255, 255, 0.12) 1.2px, transparent 1.2px)'
        : 'radial-gradient(rgba(15, 23, 42, 0.10) 1.2px, transparent 1.2px)';

    const gridPattern = isDark
        ? `linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
           linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)`
        : `linear-gradient(to right, rgba(15, 23, 42, 0.07) 1px, transparent 1px),
           linear-gradient(to bottom, rgba(15, 23, 42, 0.07) 1px, transparent 1px)`;

    return (
        <Box
            {...props}
            sx={{
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                ...sx
            }}
        >
            {/* Ambient Background Matrix */}
            <Box
                aria-hidden="true"
                sx={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: pattern === 'grid' ? gridPattern : dotPattern,
                        backgroundSize: pattern === 'grid' ? '40px 40px' : '24px 24px',
                        maskImage: 'radial-gradient(ellipse 85% 75% at 50% 50%, black 45%, transparent 95%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 85% 75% at 50% 50%, black 45%, transparent 95%)',
                    }}
                />

                {/* Animated Radial Ambient Spotlights */}
                {showGlow && (
                    <>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '15%',
                                left: '10%',
                                width: '450px',
                                height: '450px',
                                borderRadius: '50%',
                                background: isDark
                                    ? 'radial-gradient(circle, rgba(37,99,235,0.32) 0%, rgba(29,78,216,0.18) 50%, transparent 75%)'
                                    : 'radial-gradient(circle, rgba(96,165,250,0.25) 0%, transparent 70%)',
                                filter: 'blur(50px)',
                                animation: 'aurora-wave-1 16s ease-in-out infinite',
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: '10%',
                                right: '10%',
                                width: '420px',
                                height: '420px',
                                borderRadius: '50%',
                                background: isDark
                                    ? 'radial-gradient(circle, rgba(6,182,212,0.28) 0%, rgba(37,99,235,0.15) 50%, transparent 75%)'
                                    : 'radial-gradient(circle, rgba(34,211,238,0.22) 0%, transparent 70%)',
                                filter: 'blur(50px)',
                                animation: 'aurora-wave-2 20s ease-in-out infinite',
                            }}
                        />
                    </>
                )}
            </Box>

            {/* Foreground Content */}
            <Box sx={{ position: 'relative', zIndex: 1, width: '100%' }}>
                {children}
            </Box>
        </Box>
    );
};

export default AnimatedGridBackground;
