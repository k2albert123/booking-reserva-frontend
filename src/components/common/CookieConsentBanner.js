import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Typography, 
    Button, 
    Paper, 
    Slide, 
    Stack,
    Link,
    IconButton
} from '@mui/material';
import CookieIcon from '@mui/icons-material/Cookie';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink } from 'react-router-dom';

const CookieConsentBanner = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('reserva_cookie_consent');
        if (!consent) {
            // Small delay for smooth appearance
            const timer = setTimeout(() => setOpen(true), 1200);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem('reserva_cookie_consent', 'all');
        setOpen(false);
    };

    const handleEssentialOnly = () => {
        localStorage.setItem('reserva_cookie_consent', 'essential');
        setOpen(false);
    };

    if (!open) return null;

    return (
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
            <Paper
                elevation={12}
                sx={{
                    position: 'fixed',
                    bottom: { xs: 16, sm: 24 },
                    left: { xs: 16, sm: 24 },
                    right: { xs: 16, sm: 24 },
                    maxWidth: 780,
                    mx: 'auto',
                    zIndex: 9999,
                    p: { xs: 2.5, sm: 3 },
                    borderRadius: '20px',
                    bgcolor: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 20px 40px -15px rgba(0,0,0,0.3)',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box sx={{ 
                        p: 1.25, 
                        borderRadius: '12px', 
                        bgcolor: 'rgba(245,158,11,0.12)', 
                        color: '#f59e0b',
                        display: { xs: 'none', sm: 'flex' }
                    }}>
                        <CookieIcon sx={{ fontSize: 28 }} />
                    </Box>

                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.5, color: 'text.primary' }}>
                            We respect your privacy and transparency
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, mb: 2 }}>
                            BookingReserva uses essential session cookies to keep you safely logged in and functional storage for theme preferences and interactive Google Maps. We do not sell your personal data or track you across other websites. Learn more in our{' '}
                            <Link component={RouterLink} to="/cookies" sx={{ fontWeight: 700, color: '#2563eb' }}>
                                Cookie Policy
                            </Link>{' '}
                            and{' '}
                            <Link component={RouterLink} to="/privacy" sx={{ fontWeight: 700, color: '#2563eb' }}>
                                Privacy Policy
                            </Link>.
                        </Typography>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                            <Button
                                variant="contained"
                                size="small"
                                onClick={handleAcceptAll}
                                sx={{
                                    bgcolor: '#2563eb',
                                    '&:hover': { bgcolor: '#1d4ed8' },
                                    fontWeight: 700,
                                    borderRadius: '10px',
                                    px: 2.5,
                                    py: 0.8,
                                    textTransform: 'none'
                                }}
                            >
                                Accept All Cookies
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={handleEssentialOnly}
                                sx={{
                                    borderColor: 'var(--border-subtle)',
                                    color: 'text.primary',
                                    fontWeight: 600,
                                    borderRadius: '10px',
                                    px: 2,
                                    py: 0.8,
                                    textTransform: 'none',
                                    '&:hover': { bgcolor: 'rgba(255,255,255,0.05)', borderColor: '#2563eb' }
                                }}
                            >
                                Essential Only
                            </Button>
                        </Stack>
                    </Box>

                    <IconButton 
                        size="small" 
                        onClick={handleEssentialOnly}
                        sx={{ color: 'text.secondary', ml: 'auto' }}
                        aria-label="Close cookie banner"
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Paper>
        </Slide>
    );
};

export default CookieConsentBanner;

