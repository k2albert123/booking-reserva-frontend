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
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const contactItems = [
    {
        title: 'Call us',
        detail: '+1 (800) 555-0199',
        icon: <PhoneIcon />,
        color: '#60a5fa',
        bg: '#dbeafe'
    },
    {
        title: 'Email us',
        detail: 'hello@bookingreserva.com',
        icon: <EmailIcon />,
        color: '#34d399',
        bg: '#d1fae5'
    },
    {
        title: 'Visit us',
        detail: '45 Market Street, Downtown Plaza',
        icon: <LocationOnIcon />,
        color: '#fbbf24',
        bg: '#fef3c7'
    },
    {
        title: 'Hours',
        detail: 'Mon - Sat · 8:00 AM - 6:00 PM',
        icon: <AccessTimeIcon />,
        color: '#f472b6',
        bg: '#fce7f3'
    }
];

const ContactUs = () => {
    return (
        <Box sx={{ bgcolor: '#0b1220', minHeight: '100vh', color: 'white' }}>
            <Navbar />

            <Box sx={{
                background: 'linear-gradient(135deg, rgba(37,99,235,0.18), rgba(15,23,42,0.96) 55%, rgba(11,15,25,1))',
                py: { xs: 10, md: 12 },
                borderBottom: '1px solid rgba(148,163,184,0.15)'
            }}>
                <Container maxWidth="lg">
                    <Stack spacing={2} alignItems="center" textAlign="center">
                        <Typography variant="overline" sx={{ color: '#93c5fd', letterSpacing: 4, fontWeight: 700 }}>
                            CONTACT US
                        </Typography>
                        <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
                            Let’s build your next booking experience.
                        </Typography>
                        <Typography variant="h6" sx={{ maxWidth: 760, color: 'rgba(255,255,255,0.76)', fontWeight: 400, lineHeight: 1.7 }}>
                            Whether you’re a business owner, service provider, or customer, we’d love to hear from you.
                        </Typography>
                    </Stack>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ py: { xs: 8, md: 10 } }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={5}>
                        <Paper sx={{
                            p: 4,
                            height: '100%',
                            borderRadius: '28px',
                            background: 'linear-gradient(180deg, rgba(15,23,42,0.9), rgba(15,23,42,0.7))',
                            border: '1px solid rgba(148,163,184,0.15)',
                            boxShadow: '0 24px 50px rgba(15, 23, 42, 0.5)',
                        }}>
                            <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
                                Get in touch
                            </Typography>
                            <Stack spacing={2.5}>
                                {contactItems.map((item) => (
                                    <Box key={item.title} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar sx={{ bgcolor: item.bg, color: item.color, width: 48, height: 48 }}>
                                            {item.icon}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle2" sx={{ color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 1.2 }}>
                                                {item.title}
                                            </Typography>
                                            <Typography sx={{ color: 'rgba(255,255,255,0.82)', fontWeight: 500 }}>
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
                            background: 'linear-gradient(180deg, rgba(15,23,42,0.9), rgba(15,23,42,0.7))',
                            border: '1px solid rgba(148,163,184,0.15)',
                            boxShadow: '0 24px 50px rgba(15, 23, 42, 0.5)',
                        }}>
                            <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
                                Send a message
                            </Typography>
                            <Typography sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}>
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
        background: 'rgba(15, 23, 42, 0.8)',
        borderRadius: '14px',
        color: 'white',
        '& fieldset': {
            borderColor: 'rgba(148,163,184,0.2)',
        },
        '&:hover fieldset': {
            borderColor: 'rgba(96,165,250,0.45)',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#60a5fa',
        },
    },
    '& .MuiInputLabel-root': {
        color: 'rgba(255,255,255,0.6)',
    },
    '& .MuiInputBase-input': {
        color: 'white',
    },
    '& .MuiInputBase-inputMultiline': {
        color: 'white',
    },
};

export default ContactUs;
