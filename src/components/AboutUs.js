import React from 'react';
import { Box, Container, Typography, Grid, Stack } from '@mui/material';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import { ActionCard } from './common/ReusableCard';
import GroupsIcon from '@mui/icons-material/Groups';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const values = [
    {
        title: 'Innovation',
        text: 'We design booking experiences that feel effortless for both customers and business owners.',
        icon: <LightbulbIcon />,
        color: '#60a5fa',
        bg: '#dbeafe'
    },
    {
        title: 'Community',
        text: 'We build tools that help local businesses connect with customers in a more human way.',
        icon: <GroupsIcon />,
        color: '#34d399',
        bg: '#d1fae5'
    },
    {
        title: 'Growth',
        text: 'Every workflow is optimized to improve conversion, retention, and operational efficiency.',
        icon: <RocketLaunchIcon />,
        color: '#fbbf24',
        bg: '#fef3c7'
    }
];

const AboutUs = () => {
    return (
        <Box sx={{ bgcolor: '#0b1220', minHeight: '100vh', display: 'flex', flexDirection: 'column', color: 'white' }}>
            <Navbar />

            <Box sx={{
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(37,99,235,0.18), rgba(15,23,42,0.96) 55%, rgba(11,15,25,1))',
                py: { xs: 10, md: 12 },
                borderBottom: '1px solid rgba(148,163,184,0.15)'
            }}>
                <Container maxWidth="lg">
                    <Stack spacing={2} alignItems="center" textAlign="center">
                        <Typography variant="overline" sx={{ color: '#93c5fd', letterSpacing: 4, fontWeight: 700 }}>
                            ABOUT US
                        </Typography>
                        <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
                            We help local businesses grow with smarter booking.
                        </Typography>
                        <Typography variant="h6" sx={{ maxWidth: 760, color: 'rgba(255,255,255,0.76)', fontWeight: 400, lineHeight: 1.7 }}>
                            BookingReserva brings customers and service providers together through a seamless, efficient, and beautifully simple scheduling experience.
                        </Typography>
                    </Stack>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 }, flex: 1 }}>
                <Grid container spacing={5} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography variant="h3" sx={{ fontWeight: 800, mb: 3 }}>
                            Built for real businesses and real people.
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.72)', fontSize: '1.08rem', lineHeight: 1.9, mb: 2 }}>
                            BookingReserva started with a simple idea: scheduling should be easy, clear, and stress-free for everyone. We created a platform that allows customers to discover services quickly and lets business owners manage everything from one place.
                        </Typography>
                        <Typography sx={{ color: 'rgba(255,255,255,0.72)', fontSize: '1.08rem', lineHeight: 1.9 }}>
                            From salons and barbershops to hospitals and wellness businesses, we support service providers who need better systems and customers who expect a premium booking journey.
                        </Typography>

                        <Stack spacing={1.5} sx={{ mt: 4 }}>
                            {[
                                'Simple appointment management',
                                'Streamlined staff and service listings',
                                'Better customer trust through secure profiles and verification',
                            ].map((item) => (
                                <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <CheckCircleOutlineIcon sx={{ color: '#60a5fa' }} />
                                    <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>{item}</Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Grid container spacing={2}>
                            {values.map((value) => (
                                <Grid item xs={12} key={value.title} sx={{ display: 'flex' }}>
                                    <ActionCard
                                        icon={value.icon}
                                        title={value.title}
                                        description={value.text}
                                        color={value.color}
                                        sx={{ minHeight: 160 }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>

            <Footer />
        </Box>
    );
};

export default AboutUs;

