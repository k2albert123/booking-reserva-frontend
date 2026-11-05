import React, { useState, useRef } from 'react';
import { Box } from '@mui/material';
import { useThemeMode } from '../../context/ThemeContext';

/**
 * SpotlightCard Component
 * Inspired by ReactBits Spotlight Card
 * Renders an interactive radial spotlight that fluidly tracks cursor coordinates across the card surface.
 */
const SpotlightCard = ({
    children,
    spotlightColor,
    spotlightRadius = 350,
    sx,
    onClick,
    ...props
}) => {
    const { isDark } = useThemeMode();
    const cardRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const defaultGlow = spotlightColor || (isDark ? 'rgba(59, 130, 246, 0.16)' : 'rgba(37, 99, 235, 0.09)');
    const defaultBorderGlow = isDark ? 'rgba(96, 165, 250, 0.45)' : 'rgba(37, 99, 235, 0.45)';

    return (
        <Box
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            {...props}
            sx={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                bgcolor: isDark ? 'rgba(15, 23, 42, 0.72)' : '#ffffff',
                border: '1px solid',
                borderColor: isHovered
                    ? defaultBorderGlow
                    : isDark ? 'rgba(148, 163, 184, 0.14)' : 'rgba(226, 232, 240, 0.9)',
                boxShadow: isHovered
                    ? (isDark
                        ? '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(37, 99, 235, 0.18)'
                        : '0 18px 36px rgba(15, 23, 42, 0.1), 0 0 20px rgba(37, 99, 235, 0.1)')
                    : (isDark
                        ? '0 12px 30px rgba(0, 0, 0, 0.3)'
                        : '0 8px 24px rgba(15, 23, 42, 0.05)'),
                transform: isHovered ? 'translateY(-4px)' : 'none',
                transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.28s ease, background-color 0.3s ease',
                cursor: onClick ? 'pointer' : 'default',
                ...sx
            }}
        >
            {/* Interactive Spotlight Layer */}
            <Box
                aria-hidden="true"
                sx={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    zIndex: 0,
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.25s ease',
                    background: `radial-gradient(${spotlightRadius}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${defaultGlow}, transparent 70%)`,
                }}
            />

            {/* Inner Content */}
            <Box sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
                {children}
            </Box>
        </Box>
    );
};

export default SpotlightCard;
