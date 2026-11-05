import React from 'react';
import { Container, Box, Typography, Grid, Link, TextField, Button, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { toast } from 'react-toastify';
import { useThemeMode } from '../../context/ThemeContext';

const Footer = () => {
    const { isDark } = useThemeMode();

    const handleSubscribe = (e) => {
        e.preventDefault();
        toast.success('Thank you for subscribing to BookingReserva newsletter!');
    };

    const footerLinkStyle = {
        color: isDark ? '#94a3b8' : '#64748b',
        textDecoration: 'none',
        fontSize: '0.9rem',
        display: 'inline-block',
        transition: 'color 0.2s ease',
        '&:hover': { color: '#2563eb' }
    };

    return (
        <Box
            component="footer"
            sx={{
                bgcolor: isDark ? '#04070e' : '#f1f5f9',
                color: isDark ? '#94a3b8' : '#475569',
                py: { xs: 6, md: 8 },
                borderTop: '1px solid',
                borderColor: isDark ? 'rgba(148,163,184,0.1)' : 'rgba(226, 232, 240, 0.9)',
                transition: 'background-color 0.3s ease, border-color 0.3s ease'
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {/* Brand Info */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 2 }}>
                            <Box
                                component="img"
                                src="/app-logo.png"
                                alt="BookingReserva Logo"
                                sx={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: '8px',
                                    flexShrink: 0,
                                    boxShadow: '0 4px 12px rgba(37,99,235,0.3)',
                                    objectFit: 'cover'
                                }}
                            />
                            <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 800, letterSpacing: '-0.02em' }}>
                                BookingReserva
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ lineHeight: 1.8, mb: 3, maxWidth: 340, color: 'text.secondary' }}>
                            The modern all-in-one platform connecting local businesses with customers. Discover services, choose verified staff, and reserve time slots seamlessly.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1.5 }}>
                            {[
                                { icon: <FacebookIcon fontSize="small" />, href: '#' },
                                { icon: <TwitterIcon fontSize="small" />, href: '#' },
                                { icon: <InstagramIcon fontSize="small" />, href: '#' },
                                { icon: <LinkedInIcon fontSize="small" />, href: '#' }
                            ].map((social, idx) => (
                                <Link
                                    key={idx}
                                    href={social.href}
                                    sx={{
                                        width: 36,
                                        height: 36,
                                        borderRadius: '10px',
                                        bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,23,42,0.05)',
                                        border: '1px solid',
                                        borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.08)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: isDark ? '#cbd5e1' : '#475569',
                                        transition: 'all 0.2s',
                                        '&:hover': {
                                            bgcolor: 'rgba(37,99,235,0.18)',
                                            color: '#2563eb',
                                            borderColor: 'rgba(37,99,235,0.3)'
                                        }
                                    }}
                                >
                                    {social.icon}
                                </Link>
                            ))}
                        </Box>
                    </Grid>

                    {/* Quick Platform Links */}
                    <Grid item xs={12} sm={6} md={2.5}>
                        <Typography variant="subtitle2" sx={{ color: 'text.primary', fontWeight: 800, mb: 2.5, textTransform: 'uppercase', letterSpacing: 1 }}>
                            Platform
                        </Typography>
                        <Stack spacing={1.5}>
                            <Link component={RouterLink} to="/businesses" sx={footerLinkStyle}>
                                Browse Businesses
                            </Link>
                            <Link component={RouterLink} to="/services" sx={footerLinkStyle}>
                                Explore Services
                            </Link>
                            <Link component={RouterLink} to="/about" sx={footerLinkStyle}>
                                About BookingReserva
                            </Link>
                            <Link component={RouterLink} to="/contact" sx={footerLinkStyle}>
                                Contact Support
                            </Link>
                            <Link component={RouterLink} to="/register" sx={footerLinkStyle}>
                                List Your Business
                            </Link>
                        </Stack>
                    </Grid>

                    {/* Supported Industries from README */}
                    <Grid item xs={12} sm={6} md={2.5}>
                        <Typography variant="subtitle2" sx={{ color: 'text.primary', fontWeight: 800, mb: 2.5, textTransform: 'uppercase', letterSpacing: 1 }}>
                            Service Types
                        </Typography>
                        <Stack spacing={1.5}>
                            <Link component={RouterLink} to="/businesses?category=Barbershop" sx={footerLinkStyle}>
                                Barbershops
                            </Link>
                            <Link component={RouterLink} to="/businesses?category=Salon %26 Beauty" sx={footerLinkStyle}>
                                Salons & Beauty
                            </Link>
                            <Link component={RouterLink} to="/businesses?category=Clinic %26 Healthcare" sx={footerLinkStyle}>
                                Clinics & Healthcare
                            </Link>
                            <Link component={RouterLink} to="/businesses?category=Wellness %26 Spa" sx={footerLinkStyle}>
                                Wellness & Spas
                            </Link>
                            <Link component={RouterLink} to="/businesses?category=Hotel %26 Hospitality" sx={footerLinkStyle}>
                                Hotels & Hospitality
                            </Link>
                        </Stack>
                    </Grid>

                    {/* Newsletter Subscription */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle2" sx={{ color: 'text.primary', fontWeight: 800, mb: 2, textTransform: 'uppercase', letterSpacing: 1 }}>
                            Stay Updated
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2.5, lineHeight: 1.6, color: 'text.secondary' }}>
                            Subscribe to receive platform feature releases and curated local specials.
                        </Typography>
                        <Box component="form" onSubmit={handleSubscribe} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            <TextField 
                                variant="outlined" 
                                size="small" 
                                placeholder="name@email.com" 
                                required
                                type="email"
                                sx={{ 
                                    bgcolor: isDark ? 'rgba(255,255,255,0.04)' : '#ffffff', 
                                    borderRadius: '12px',
                                    input: { color: 'text.primary', fontSize: '0.9rem' },
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        '& fieldset': { borderColor: isDark ? 'rgba(148,163,184,0.18)' : 'rgba(203,213,225,0.8)' },
                                        '&:hover fieldset': { borderColor: '#3b82f6' },
                                        '&.Mui-focused fieldset': { borderColor: '#3b82f6' },
                                    }
                                }} 
                            />
                            <Button 
                                type="submit"
                                variant="contained" 
                                sx={{ 
                                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', 
                                    borderRadius: '12px',
                                    py: 1,
                                    textTransform: 'none', 
                                    fontWeight: 700 
                                }}
                            >
                                Subscribe
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 7, borderTop: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', pt: 3.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Typography variant="body2" sx={{ color: isDark ? 'rgba(255,255,255,0.45)' : 'rgba(15,23,42,0.5)', fontSize: '0.85rem' }}>
                        © {new Date().getFullYear()} BookingReserva. All rights reserved.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                        <Link component={RouterLink} to="/privacy" sx={{ color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(15,23,42,0.6)', fontSize: '0.85rem', textDecoration: 'none', '&:hover': { color: '#2563eb' } }}>
                            Privacy Policy
                        </Link>
                        <Link component={RouterLink} to="/terms" sx={{ color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(15,23,42,0.6)', fontSize: '0.85rem', textDecoration: 'none', '&:hover': { color: '#2563eb' } }}>
                            Terms of Service
                        </Link>
                        <Link component={RouterLink} to="/security" sx={{ color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(15,23,42,0.6)', fontSize: '0.85rem', textDecoration: 'none', '&:hover': { color: '#2563eb' } }}>
                            Security
                        </Link>
                        <Link component={RouterLink} to="/cookies" sx={{ color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(15,23,42,0.6)', fontSize: '0.85rem', textDecoration: 'none', '&:hover': { color: '#2563eb' } }}>
                            Cookie Policy
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
