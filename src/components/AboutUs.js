import React from 'react';
import { Box, Container, Typography, Grid, Paper, Avatar, Stack } from '@mui/material';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import GroupsIcon from '@mui/icons-material/Groups';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const AboutUs = () => {
    return (
        <Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            
            <Box sx={{ 
                background: 'linear-gradient(135deg, #1976d2 0%, #4dabf5 100%)', 
                color: 'white', 
                py: 12, 
                textAlign: 'center' 
            }}>
                <Container maxWidth="md">
                    <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>
                        Our Story
                    </Typography>
                    <Typography variant="h5" sx={{ opacity: 0.9, fontWeight: 300 }}>
                        We are on a mission to simplify scheduling for everyone, from local boutiques to global enterprises.
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: 10, flex: 1 }}>
                <Grid container spacing={6} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3, color: '#333' }}>
                            Who We Are
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ color: '#555', fontSize: '1.1rem', lineHeight: 1.8 }}>
                            BookingReserva started with a simple observation: managing appointments shouldn't be a full-time job. 
                            Our team of passionate designers and engineers came together to build a platform that is 
                            not only powerful but also incredibly intuitive.
                        </Typography>
                        <Typography variant="body1" paragraph sx={{ color: '#555', fontSize: '1.1rem', lineHeight: 1.8 }}>
                            Today, we help thousands of businesses automate their booking process, reducing no-shows 
                            and increasing customer satisfaction through seamless digital experiences.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={0} sx={{ p: 4, borderRadius: '24px', bgcolor: 'white', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                            <Stack spacing={4}>
                                <Box sx={{ display: 'flex', gap: 3 }}>
                                    <Avatar sx={{ bgcolor: '#e3f2fd', color: '#1976d2', width: 56, height: 56 }}>
                                        <LightbulbIcon />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 700 }}>Innovation</Typography>
                                        <Typography variant="body2" sx={{ color: '#666' }}>Always pushing boundaries to create better tools.</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 3 }}>
                                    <Avatar sx={{ bgcolor: '#f1f8e9', color: '#4caf50', width: 56, height: 56 }}>
                                        <GroupsIcon />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 700 }}>Community</Typography>
                                        <Typography variant="body2" sx={{ color: '#666' }}>Built for businesses, by people who care.</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 3 }}>
                                    <Avatar sx={{ bgcolor: '#fff3e0', color: '#ff9800', width: 56, height: 56 }}>
                                        <RocketLaunchIcon />
                                    </Avatar>
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 700 }}>Growth</Typography>
                                        <Typography variant="body2" sx={{ color: '#666' }}>We scale as you scale, every step of the way.</Typography>
                                    </Box>
                                </Box>
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            <Footer />
        </Box>
    );
};

export default AboutUs;
