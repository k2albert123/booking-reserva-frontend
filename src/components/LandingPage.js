import React from 'react';
import { Box, Container, Typography, Button, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const HeroSection = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    color: 'white',
    padding: theme.spacing(8, 0, 6),
    textAlign: 'center',
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    textAlign: 'center',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
}));

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <Box>
            {/* Hero Section */}
            <HeroSection>
                <Container maxWidth="md">
                    <Typography component="h1" variant="h2" gutterBottom>
                        Welcome to BookingMaster
                    </Typography>
                    <Typography variant="h5" paragraph>
                        Connect with local businesses and manage your appointments easily.
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                onClick={() => navigate('/login')}
                                sx={{ mr: 2 }}
                            >
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                size="large"
                                onClick={() => navigate('/register')}
                            >
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </HeroSection>

            {/* Features Section */}
            <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
                <Typography variant="h3" component="h2" gutterBottom align="center">
                    Why Choose Us
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <FeatureCard>
                            <Typography variant="h5" gutterBottom>
                                Easy Booking
                            </Typography>
                            <Typography paragraph>
                                Quickly find and book appointments with local businesses.
                            </Typography>
                        </FeatureCard>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FeatureCard>
                            <Typography variant="h5" gutterBottom>
                                Business Management
                            </Typography>
                            <Typography paragraph>
                                Manage your business appointments and services efficiently.
                            </Typography>
                        </FeatureCard>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FeatureCard>
                            <Typography variant="h5" gutterBottom>
                                Secure Platform
                            </Typography>
                            <Typography paragraph>
                                Your data is protected with our secure authentication system.
                            </Typography>
                        </FeatureCard>
                    </Grid>
                </Grid>
            </Container>

            {/* Call to Action */}
            <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6 }}>
                <Container maxWidth="md">
                    <Typography variant="h4" gutterBottom align="center">
                        Ready to Get Started?
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/register')}
                        >
                            Register
                        </Button>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default LandingPage;
