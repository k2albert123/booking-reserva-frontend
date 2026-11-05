import React from 'react';
import { Box, Container, Typography, Grid, Stack } from '@mui/material';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import { ActionCard } from './common/ReusableCard';
import AuroraBackground from './animated/AuroraBackground';
import AnimatedGradientText from './animated/AnimatedGradientText';
import GroupsIcon from '@mui/icons-material/Groups';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const values = [
    {
        title: 'Innovation',
        text: 'We design booking experiences that feel effortless for both customers and business owners.',
        icon: <LightbulbIcon />,
        color: '#3b82f6',
        bg: 'rgba(59,130,246,0.12)'
    },
    {
        title: 'Community',
        text: 'We build tools that help local businesses connect with customers in a more human way.',
        icon: <GroupsIcon />,
        color: '#10b981',
        bg: 'rgba(16,185,129,0.12)'
    },
    {
        title: 'Growth',
        text: 'Every workflow is optimized to improve conversion, retention, and operational efficiency.',
        icon: <RocketLaunchIcon />,
        color: '#f59e0b',
        bg: 'rgba(245,158,11,0.12)'
    }
];

const AboutUs = () => {
    return (
        <Box sx={{ bgcolor: 'var(--bg-default)', minHeight: '100vh', display: 'flex', flexDirection: 'column', color: 'text.primary' }}>
            <Navbar />

            <Box sx={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--border-subtle)' }}>
                <AuroraBackground sx={{ py: { xs: 10, md: 13 } }}>
                    <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                        <Stack spacing={2.5} alignItems="center" textAlign="center">
                            <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: 4, fontWeight: 800 }}>
                                ABOUT US
                            </Typography>
                            <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1.15, fontSize: { xs: '2.2rem', md: '3.4rem' } }}>
                                We help local businesses grow with{' '}
                                <AnimatedGradientText>smarter booking</AnimatedGradientText>
                            </Typography>
                            <Typography variant="h6" sx={{ maxWidth: 760, color: 'text.secondary', fontWeight: 400, lineHeight: 1.7 }}>
                                BookingReserva brings customers and service providers together through a seamless, efficient, and beautifully simple scheduling experience.
                            </Typography>
                        </Stack>
                    </Container>
                </AuroraBackground>
            </Box>

            <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 }, flex: 1 }}>
                <Grid container spacing={5} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography variant="h3" sx={{ fontWeight: 800, mb: 3, color: 'text.primary' }}>
                            Built for real businesses and real people.
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', fontSize: '1.08rem', lineHeight: 1.9, mb: 2 }}>
                            BookingReserva started with a simple idea: scheduling should be easy, clear, and stress-free for everyone. We created a platform that allows customers to discover services quickly and lets business owners manage everything from one place.
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', fontSize: '1.08rem', lineHeight: 1.9 }}>
                            From salons and barbershops to clinics and wellness businesses, we support service providers who need better systems and customers who expect a premium booking journey.
                        </Typography>

                        <Stack spacing={1.5} sx={{ mt: 4 }}>
                            {[
                                'Simple appointment management and instant confirmation',
                                'Streamlined staff and service listings with clear pricing',
                                'Better customer trust through secure profiles and verification',
                            ].map((item) => (
                                <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <CheckCircleOutlineIcon sx={{ color: 'primary.main', flexShrink: 0 }} />
                                    <Typography sx={{ color: 'text.secondary', fontWeight: 500 }}>{item}</Typography>
                                </Box>
                            ))}
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 2.5 }}>
                            {values.map((value) => (
                                <ActionCard
                                    key={value.title}
                                    icon={value.icon}
                                    title={value.title}
                                    description={value.text}
                                    color={value.color}
                                    sx={{ minHeight: 140 }}
                                />
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            <Footer />
        </Box>
    );
};

export default AboutUs;

