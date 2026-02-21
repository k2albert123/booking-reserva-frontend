import React from 'react';
import { Container, Box, Typography, Grid, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    return (
        <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', py: 6 }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            About Us
                        </Typography>
                        <Typography variant="body2">
                            BookingReserva is your one-stop solution for business appointments and reservations.
                            Connect with local businesses and manage your appointments seamlessly.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Quick Links
                        </Typography>
                        <Link href="/about" color="inherit" display="block" sx={{ mb: 1 }}>
                            About
                        </Link>
                        <Link href="/contact" color="inherit" display="block" sx={{ mb: 1 }}>
                            Contact
                        </Link>
                        <Link href="/terms" color="inherit" display="block" sx={{ mb: 1 }}>
                            Terms & Conditions
                        </Link>
                        <Link href="/privacy" color="inherit" display="block">
                            Privacy Policy
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Connect With Us
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                            <Link href="#" color="inherit">
                                <FacebookIcon />
                            </Link>
                            <Link href="#" color="inherit">
                                <TwitterIcon />
                            </Link>
                            <Link href="#" color="inherit">
                                <InstagramIcon />
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 4, borderTop: 1, borderColor: 'divider', pt: 2 }}>
                    <Typography variant="body2" align="center">
                        © {new Date().getFullYear()} BookingReserva. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
