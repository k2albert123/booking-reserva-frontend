import React from 'react';
import { Typography } from '@mui/material';
import { useThemeMode } from '../../context/ThemeContext';

/**
 * AnimatedGradientText Component
 * Fluid shimmering gradient text inspired by ReactBits and modern SaaS landing pages.
 */
const AnimatedGradientText = ({
    children,
    variant = 'h1',
    component = 'span',
    gradient,
    sx,
    ...props
}) => {
    const { isDark } = useThemeMode();

    const defaultGradient = isDark
        ? 'linear-gradient(135deg, #ffffff 0%, #93c5fd 50%, #60a5fa 100%)'
        : 'linear-gradient(135deg, #0f172a 0%, #1e40af 50%, #2563eb 100%)';

    return (
        <Typography
            variant={variant}
            component={component}
            {...props}
            sx={{
                background: gradient || defaultGradient,
                backgroundSize: '220% 220%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                animation: 'gradientFlow 6s ease-in-out infinite',
                ...sx
            }}
        >
            {children}
        </Typography>
    );
};

export default AnimatedGradientText;
