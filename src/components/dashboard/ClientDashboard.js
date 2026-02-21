import React from 'react';
import { 
    Box, 
    Container, 
    Typography, 
    Grid, 
    Card, 
    CardContent, 
    Button, 
    Avatar,
    Paper,
    Divider,
    Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const ClientDashboard = () => {
    const navigate = useNavigate();
    const userName = "Client"; // In a real app, get this from auth context

    const cards = [
        { 
            title: 'My Appointments', 
            desc: 'View and manage your upcoming bookings.', 
            icon: <CalendarMonthIcon sx={{ fontSize: 40 }} />, 
            path: '/appointments',
            color: '#4dabf5'
        },
        { 
            title: 'Find Services', 
            desc: 'Browse local businesses and book new services.', 
            icon: <SearchIcon sx={{ fontSize: 40 }} />, 
            path: '/businesses',
            color: '#66bb6a'
        },
        { 
            title: 'My Profile', 
            desc: 'Update your personal details and preferences.', 
            icon: <PersonIcon sx={{ fontSize: 40 }} />, 
            path: '/profile',
            color: '#ffa726'
        }
    ];

    return (
        <Box sx={{ bgcolor: '#f5f7fa', minHeight: '90vh', py: 6 }}>
            <Container maxWidth="lg">
                <Box sx={{ mb: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant="h3" sx={{ fontWeight: 800, color: '#1a237e' }}>
                            Hello, {userName}!
                        </Typography>
                        <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 300 }}>
                            Welcome back to your dashboard. What would you like to do today?
                        </Typography>
                    </Box>
                    <Avatar 
                        sx={{ width: 80, height: 80, bgcolor: 'primary.main', fontSize: '2rem', boxShadow: 3 }}
                    >
                        {userName[0]}
                    </Avatar>
                </Box>
                
                <Grid container spacing={4}>
                    {cards.map((card, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Card sx={{ 
                                height: '100%', 
                                borderRadius: '20px', 
                                transition: 'all 0.3s ease',
                                '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }
                            }}>
                                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                    <Box sx={{ 
                                        width: 70, 
                                        height: 70, 
                                        borderRadius: '16px', 
                                        bgcolor: `${card.color}15`, 
                                        color: card.color,
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        mx: 'auto',
                                        mb: 3
                                    }}>
                                        {card.icon}
                                    </Box>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                                        {card.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" paragraph>
                                        {card.desc}
                                    </Typography>
                                    <Button 
                                        variant="contained" 
                                        fullWidth 
                                        endIcon={<ChevronRightIcon />}
                                        onClick={() => navigate(card.path)}
                                        sx={{ 
                                            mt: 2, 
                                            borderRadius: '50px', 
                                            py: 1.5,
                                            bgcolor: card.color,
                                            '&:hover': { bgcolor: card.color, opacity: 0.9 }
                                        }}
                                    >
                                        Browse
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Paper sx={{ mt: 6, p: 4, borderRadius: '20px', background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)', color: 'white' }}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={8}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                                Need immediate assistance?
                            </Typography>
                            <Typography variant="body1" sx={{ opacity: 0.8 }}>
                                Our support team is here to help you with any booking issues or questions.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ textAlign: 'right' }}>
                            <Button variant="contained" sx={{ bgcolor: 'white', color: '#1a237e', borderRadius: '50px', px: 4, '&:hover': { bgcolor: '#f5f5f5' } }}>
                                Contact Support
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
};

export default ClientDashboard;
