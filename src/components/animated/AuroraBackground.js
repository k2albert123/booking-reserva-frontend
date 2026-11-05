import React, { useEffect, useRef, useCallback } from 'react';
import { Box } from '@mui/material';
import { useThemeMode } from '../../context/ThemeContext';

/**
 * AuroraBackground Component
 * Combines:
 * 1. Rich, vibrant Aurora nebula gradient orbs with smooth multi-axis orbital movement.
 * 2. An interactive 60fps constellation particle field with glowing nodes, proximity lines, and mouse reactivity.
 * 3. Sweeping luminous light rays and a breathing geometric grid pattern.
 */
const AuroraBackground = ({
    children,
    sx,
    showGrid = true,
    showParticles = true,
    showBeams = true,
    minHeight = 'auto',
    ...props
}) => {
    const { isDark } = useThemeMode();
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

    // Handle mouse movement for interactive particle reaction
    const handleMouseMove = useCallback((e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseRef.current.targetX = e.clientX - rect.left;
        mouseRef.current.targetY = e.clientY - rect.top;
    }, []);

    const handleMouseLeave = useCallback(() => {
        mouseRef.current.targetX = -1000;
        mouseRef.current.targetY = -1000;
    }, []);

    useEffect(() => {
        if (!showParticles) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId;
        let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
        let height = (canvas.height = canvas.parentElement?.offsetHeight || 650);

        // Responsive particle count
        const particleCount = width < 768 ? 24 : 46;
        const connectionDistance = width < 768 ? 85 : 120;

        // Color palettes
        const darkColors = ['#38bdf8', '#60a5fa', '#818cf8', '#22d3ee', '#34d399'];
        const lightColors = ['#2563eb', '#0284c7', '#4f46e5', '#0ea5e9', '#059669'];
        const colors = isDark ? darkColors : lightColors;

        const particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.65,
                vy: (Math.random() - 0.5) * 0.65,
                radius: Math.random() * 2.2 + 1.2,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: Math.random() * 0.55 + 0.35,
                pulseSpeed: Math.random() * 0.03 + 0.015,
                pulseOffset: Math.random() * Math.PI * 2
            });
        }

        const resize = () => {
            if (!canvas.parentElement) return;
            width = canvas.width = canvas.parentElement.offsetWidth;
            height = canvas.height = canvas.parentElement.offsetHeight;
        };

        const resizeObserver = new ResizeObserver(resize);
        if (canvas.parentElement) {
            resizeObserver.observe(canvas.parentElement);
        }

        let time = 0;
        const render = () => {
            time += 0.02;
            ctx.clearRect(0, 0, width, height);

            // Smooth mouse interpolation
            mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.1;
            mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.1;

            // Draw proximity connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        const alpha = (1 - dist / connectionDistance) * (isDark ? 0.30 : 0.22);
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = isDark
                            ? `rgba(96, 165, 250, ${alpha})`
                            : `rgba(37, 99, 235, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            // Update & draw particles
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                // Gentle mouse interaction
                const mdx = mouseRef.current.x - p.x;
                const mdy = mouseRef.current.y - p.y;
                const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
                if (mdist < 140 && mdist > 0) {
                    const force = (1 - mdist / 140) * 0.65;
                    p.x -= (mdx / mdist) * force;
                    p.y -= (mdy / mdist) * force;
                }

                // Wrap around screen boundaries
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                // Pulsing glow
                const pulsingAlpha = p.alpha + Math.sin(time * 2 + p.pulseOffset) * 0.22;
                const clampedAlpha = Math.max(0.18, Math.min(1, pulsingAlpha));

                ctx.save();
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = clampedAlpha;
                ctx.shadowBlur = isDark ? 10 : 6;
                ctx.shadowColor = p.color;
                ctx.fill();
                ctx.restore();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();
        };
    }, [isDark, showParticles]);

    return (
        <Box
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            {...props}
            sx={{
                position: 'relative',
                overflow: 'hidden',
                minHeight,
                width: '100%',
                bgcolor: isDark ? '#060913' : '#f8fafc',
                transition: 'background-color 0.3s ease',
                ...sx
            }}
        >
            {/* Ambient Aurora Wave Blobs */}
            <Box
                aria-hidden="true"
                sx={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                    overflow: 'hidden',
                    zIndex: 0,
                }}
            >
                {/* Wave 1: Vivid Sapphire Blue */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '-10%',
                        left: '-8%',
                        width: { xs: '420px', md: '720px' },
                        height: { xs: '420px', md: '720px' },
                        borderRadius: '50%',
                        background: isDark
                            ? 'radial-gradient(circle, rgba(37, 99, 235, 0.65) 0%, rgba(29, 78, 216, 0.42) 45%, rgba(6, 182, 212, 0.22) 70%, transparent 85%)'
                            : 'radial-gradient(circle, rgba(59, 130, 246, 0.38) 0%, rgba(147, 197, 253, 0.25) 50%, transparent 80%)',
                        filter: 'blur(45px)',
                        animation: 'aurora-wave-1 11s ease-in-out infinite',
                        transformOrigin: 'center center',
                    }}
                />

                {/* Wave 2: Electric Cyan & Aqua */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '15%',
                        right: '-8%',
                        width: { xs: '390px', md: '640px' },
                        height: { xs: '390px', md: '640px' },
                        borderRadius: '50%',
                        background: isDark
                            ? 'radial-gradient(circle, rgba(6, 182, 212, 0.55) 0%, rgba(37, 99, 235, 0.36) 45%, rgba(79, 70, 229, 0.20) 70%, transparent 85%)'
                            : 'radial-gradient(circle, rgba(34, 211, 238, 0.32) 0%, rgba(191, 219, 254, 0.22) 50%, transparent 80%)',
                        filter: 'blur(48px)',
                        animation: 'aurora-wave-2 14s ease-in-out infinite',
                        transformOrigin: 'center center',
                    }}
                />

                {/* Wave 3: Deep Indigo / Violet Ambient Base */}
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '-12%',
                        left: '28%',
                        width: { xs: '350px', md: '560px' },
                        height: { xs: '350px', md: '560px' },
                        borderRadius: '50%',
                        background: isDark
                            ? 'radial-gradient(circle, rgba(79, 70, 229, 0.46) 0%, rgba(37, 99, 235, 0.30) 50%, transparent 80%)'
                            : 'radial-gradient(circle, rgba(165, 180, 252, 0.28) 0%, transparent 75%)',
                        filter: 'blur(45px)',
                        animation: 'aurora-wave-3 10s ease-in-out infinite',
                    }}
                />

                {/* Dynamic Light Beam Sweep */}
                {showBeams && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            width: '45%',
                            pointerEvents: 'none',
                            background: isDark
                                ? 'linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.08) 35%, rgba(37, 99, 235, 0.16) 50%, rgba(99, 102, 241, 0.08) 65%, transparent 100%)'
                                : 'linear-gradient(90deg, transparent 0%, rgba(96, 165, 250, 0.10) 35%, rgba(37, 99, 235, 0.14) 50%, rgba(147, 197, 253, 0.08) 65%, transparent 100%)',
                            animation: 'lightBeamSweep 9s ease-in-out infinite',
                            zIndex: 1,
                            filter: 'blur(15px)',
                        }}
                    />
                )}

                {/* Geometric Grid Mask Overlay with Breathing Pulse */}
                {showGrid && (
                    <Box
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: isDark
                                ? 'radial-gradient(rgba(255, 255, 255, 0.15) 1.2px, transparent 1.2px)'
                                : 'radial-gradient(rgba(15, 23, 42, 0.13) 1.2px, transparent 1.2px)',
                            backgroundSize: '32px 32px',
                            maskImage: 'radial-gradient(ellipse 85% 75% at 50% 50%, black 45%, transparent 90%)',
                            WebkitMaskImage: 'radial-gradient(ellipse 85% 75% at 50% 50%, black 45%, transparent 90%)',
                            animation: 'gridBreathe 6s ease-in-out infinite',
                            zIndex: 1,
                        }}
                    />
                )}

                {/* Constellation Particle Layer */}
                {showParticles && (
                    <canvas
                        ref={canvasRef}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 2,
                            pointerEvents: 'none',
                        }}
                    />
                )}
            </Box>

            {/* Content Layer */}
            <Box sx={{ position: 'relative', zIndex: 10, width: '100%' }}>
                {children}
            </Box>
        </Box>
    );
};

export default AuroraBackground;
