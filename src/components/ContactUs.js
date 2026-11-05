import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Paper,
    Stack,
    TextField,
    Button,
    Avatar,
} from '@mui/material';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import AuroraBackground from './animated/AuroraBackground';
import AnimatedGradientText from './animated/AnimatedGradientText';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const contactItems = [
    {
        title: 'Call us',
        detail: '+1 (800) 555-0199',
        icon: <PhoneIcon />,
        color: '#2563eb',
        bg: 'rgba(37,99,235,0.1)'
    },
    {
        title: 'Email us',
        detail: 'hello@bookingreserva.com',
        icon: <EmailIcon />,
        color: '#2563eb',
        bg: 'rgba(37,99,235,0.1)'
    },
    {
        title: 'Visit us',
        detail: '45 Market Street, Downtown Plaza',
        icon: <LocationOnIcon />,
        color: '#2563eb',
        bg: 'rgba(37,99,235,0.1)'
    },
    {
        title: 'Hours',
        detail: 'Mon - Sat · 8:00 AM - 6:00 PM',
        icon: <AccessTimeIcon />,
        color: '#2563eb',
        bg: 'rgba(37,99,235,0.1)'
    }
];

const ContactUs = () => {
    return (
        <Box sx={{ bgcolor: 'var(--bg-default)', minHeight: '100vh', display: 'flex', flexDirection: 'column', color: 'text.primary' }}>
            <Navbar />

            <Box sx={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--border-subtle)' }}>
                <AuroraBackground sx={{ py: { xs: 10, md: 13 } }}>
                    <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                        <Stack spacing={2.5} alignItems="center" textAlign="center">
                            <Typography variant="overline" sx={{ color: 'primary.main', letterSpacing: 4, fontWeight: 800 }}>
                                CONTACT US
                            </Typography>
                            <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1.15, fontSize: { xs: '2.2rem', md: '3.4rem' } }}>
                                Let’s build your next{' '}
                                <AnimatedGradientText>booking experience</AnimatedGradientText>
                            </Typography>
                            <Typography variant="h6" sx={{ maxWidth: 760, color: 'text.secondary', fontWeight: 400, lineHeight: 1.7 }}>
                                Whether you’re a business owner, service provider, or customer, we’d love to hear from you.
                            </Typography>
                        </Stack>
                    </Container>
                </AuroraBackground>
            </Box>

            <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 }, flex: 1 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={5}>
                        <Paper sx={{
                            p: 4,
                            height: '100%',
                            borderRadius: '28px',
                            bgcolor: 'var(--bg-card)',
                            border: '1px solid var(--border-subtle)',
                            boxShadow: 'var(--card-shadow)',
                        }}>
                            <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, color: 'text.primary' }}>
                                Get in touch
                            </Typography>
                            <Stack spacing={2.5}>
                                {contactItems.map((item) => (
                                    <Box key={item.title} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar sx={{ bgcolor: item.bg, color: item.color, width: 48, height: 48 }}>
                                            {item.icon}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1.2, fontWeight: 700, display: 'block' }}>
                                                {item.title}
                                            </Typography>
                                            <Typography sx={{ color: 'text.primary', fontWeight: 600 }}>
                                                {item.detail}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Stack>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <Paper sx={{
                            p: { xs: 3, md: 4 },
                            borderRadius: '28px',
                            bgcolor: 'var(--bg-card)',
                            border: '1px solid var(--border-subtle)',
                            boxShadow: 'var(--card-shadow)',
                        }}>
                            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: 'text.primary' }}>
                                Send a message
                            </Typography>
                            <Typography sx={{ color: 'text.secondary', mb: 3.5 }}>
                                Fill in your details and our team will get back to you as soon as possible.
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="First name" variant="outlined" sx={fieldStyle} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Last name" variant="outlined" sx={fieldStyle} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Email" variant="outlined" sx={fieldStyle} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth label="Phone" variant="outlined" sx={fieldStyle} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Subject" variant="outlined" sx={fieldStyle} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Your message"
                                        multiline
                                        minRows={5}
                                        variant="outlined"
                                        sx={fieldStyle}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" size="large" sx={{
                                        px: 4,
                                        py: 1.5,
                                        borderRadius: '12px',
                                        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                        fontWeight: 700,
                                        textTransform: 'none',
                                        '&:hover': { background: '#1d4ed8' }
                                    }}>
                                        Send Message
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            <Footer />
        </Box>
    );
};

const fieldStyle = {
    '& .MuiOutlinedInput-root': {
        background: 'var(--bg-paper)',
        borderRadius: '14px',
        color: 'text.primary',
        '& fieldset': {
            borderColor: 'var(--border-subtle)',
        },
        '&:hover fieldset': {
            borderColor: 'primary.main',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'primary.main',
        },
    },
    '& .MuiInputLabel-root': {
        color: 'text.secondary',
    },
};

export default ContactUs;
