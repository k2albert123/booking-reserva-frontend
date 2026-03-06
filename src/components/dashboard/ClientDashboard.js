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
    CircularProgress,
    List,
    ListItem,
    ListItemText
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { getMyAppointments } from '../../services/appointmentService';
import BusinessList from '../business/BusinessList';

const ClientDashboard = ({ view }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [appointments, setAppointments] = React.useState([]);
    const userName = JSON.parse(localStorage.getItem('user'))?.name || "Client";

    React.useEffect(() => {
        const fetchAppointments = async () => {
            if (view === 'appointments' || view === 'overview') {
                setLoading(true);
                try {
                    const data = await getMyAppointments();
                    setAppointments(data);
                } catch (error) {
                    console.error('Error fetching appointments:', error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchAppointments();
    }, [view]);

    const renderOverview = () => {
        const cards = [
            { 
                title: 'My Appointments', 
                desc: 'View and manage your upcoming bookings.', 
                icon: <CalendarMonthIcon sx={{ fontSize: 40 }} />, 
                path: '/dashboard?view=appointments',
                color: '#4dabf5'
            },
            { 
                title: 'Find Services', 
                desc: 'Browse local businesses and book new services.', 
                icon: <SearchIcon sx={{ fontSize: 40 }} />, 
                path: '/dashboard?view=businesses',
                color: '#66bb6a'
            },
            { 
                title: 'My Profile', 
                desc: 'Update your personal details and preferences.', 
                icon: <PersonIcon sx={{ fontSize: 40 }} />, 
                path: '/dashboard?view=profile',
                color: '#ffa726'
            }
        ];

        return (
            <>
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
            </>
        );
    };

    const renderContent = () => {
        if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;

        switch (view) {
            case 'appointments': return (
                <Paper sx={{ p: 4, borderRadius: '20px' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>My Appointments</Typography>
                    {appointments.length === 0 ? (
                        <Typography color="text.secondary">You have no upcoming appointments.</Typography>
                    ) : (
                        <List>
                            {appointments.map((apt) => (
                                <ListItem key={apt.id} divider>
                                    <ListItemText 
                                        primary={apt.service?.name} 
                                        secondary={`${apt.business?.name} - ${new Date(apt.startTime).toLocaleString()}`} 
                                    />
                                    <Typography variant="body2" sx={{ 
                                        color: apt.status === 'CONFIRMED' ? 'success.main' : 
                                               apt.status === 'PENDING' ? 'warning.main' : 'error.main',
                                        fontWeight: 'bold'
                                    }}>
                                        {apt.status}
                                    </Typography>
                                </ListItem>
                            ))}
                        </List>
                    )}
                    <Button variant="text" onClick={() => navigate('/dashboard')} sx={{ mt: 2 }}>Back to Overview</Button>
                </Paper>
            );
            case 'businesses': return (
                <Box>
                    <Button variant="text" onClick={() => navigate('/dashboard')} sx={{ mb: 2 }}>Back to Overview</Button>
                    <BusinessList />
                </Box>
            );
            case 'profile': return (
                <Paper sx={{ p: 4, borderRadius: '20px' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>My Profile</Typography>
                    <Typography>Profile settings coming soon.</Typography>
                    <Button variant="text" onClick={() => navigate('/dashboard')} sx={{ mt: 2 }}>Back to Overview</Button>
                </Paper>
            );
            default: return renderOverview();
        }
    };

    return (
        <Box sx={{ bgcolor: '#f5f7fa', minHeight: '90vh', py: 6 }}>
            <Container maxWidth="lg">
                {renderContent()}
            </Container>
        </Box>
    );
};

export default ClientDashboard;
