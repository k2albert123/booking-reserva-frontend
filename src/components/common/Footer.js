import React from 'react';
import { Container, Box, Typography, Grid, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    return (
        <Box component="footer" sx={{ bgcolor: '#060a12', color: 'text.secondary', py: 8, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
                            About Us
                        </Typography>
                        <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
                            BookingReserva is your one-stop solution for business appointments and reservations.
                            Connect with local businesses and manage your appointments seamlessly.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
                            Quick Links
                        </Typography>
                        <Link href="/about" sx={{ color: 'inherit', display: 'block', mb: 1, textDecoration: 'none', transition: 'color 0.2s', '&:hover': { color: '#3b82f6' } }}>
                            About
                        </Link>
                        <Link href="/contact" sx={{ color: 'inherit', display: 'block', mb: 1, textDecoration: 'none', transition: 'color 0.2s', '&:hover': { color: '#3b82f6' } }}>
                            Contact
                        </Link>
                        <Link href="/terms" sx={{ color: 'inherit', display: 'block', mb: 1, textDecoration: 'none', transition: 'color 0.2s', '&:hover': { color: '#3b82f6' } }}>
                            Terms & Conditions
                        </Link>
                        <Link href="/privacy" sx={{ color: 'inherit', display: 'block', textDecoration: 'none', transition: 'color 0.2s', '&:hover': { color: '#3b82f6' } }}>
                            Privacy Policy
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
                            Connect With Us
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Link href="#" sx={{ color: 'inherit', transition: 'color 0.2s', '&:hover': { color: '#3b82f6' } }}>
                                <FacebookIcon />
                            </Link>
                            <Link href="#" sx={{ color: 'inherit', transition: 'color 0.2s', '&:hover': { color: '#3b82f6' } }}>
                                <TwitterIcon />
                            </Link>
                            <Link href="#" sx={{ color: 'inherit', transition: 'color 0.2s', '&:hover': { color: '#3b82f6' } }}>
                                <InstagramIcon />
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 6, borderTop: '1px solid rgba(255,255,255,0.05)', pt: 3 }}>
                    <Typography variant="body2" align="center" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                        © {new Date().getFullYear()} BookingReserva. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
