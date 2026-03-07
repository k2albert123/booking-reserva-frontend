import { 
    Box, 
    Container, 
    Typography, 
    Grid, 
    Button, 
    Avatar,
    Paper,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Drawer
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import { getMyAppointments } from '../../services/appointmentService';
import BusinessList from '../business/BusinessList';

import ProfileView from './ProfileView';

const ClientDashboard = ({ view }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [appointments, setAppointments] = React.useState([]);
    const userName = JSON.parse(localStorage.getItem('user'))?.name || "Client";

    const fetchAppointments = React.useCallback(async () => {
        setLoading(true);
        try {
            const data = await getMyAppointments();
            setAppointments(data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        fetchAppointments();
    }, [fetchAppointments]);

    const renderOverview = () => {
        const stats = [
            { label: 'Total Bookings', value: appointments.length, color: '#2b6cb0' },
            { label: 'Active', value: appointments.filter(a => a.status === 'CONFIRMED' || a.status === 'PENDING').length, color: '#2f855a' },
            { label: 'Completed', value: appointments.filter(a => a.status === 'COMPLETED').length, color: '#4a5568' }
        ];

        const cards = [
            { 
                title: 'My Appointments', 
                desc: 'View and manage your upcoming and past bookings.', 
                icon: <CalendarMonthIcon sx={{ fontSize: 28 }} />, 
                path: '/dashboard?view=appointments',
                color: '#2b6cb0'
            },
            { 
                title: 'Book a Service', 
                desc: 'Explore local businesses and reserve your spot.', 
                icon: <SearchIcon sx={{ fontSize: 28 }} />, 
                path: '/dashboard?view=businesses',
                color: '#2f855a'
            },
            { 
                title: 'Profile Settings', 
                desc: 'Manage your contact info and account settings.', 
                icon: <PersonIcon sx={{ fontSize: 28 }} />, 
                path: '/dashboard?view=profile',
                color: '#805ad5'
            }
        ];

        return (
            <Box>
                <Box sx={{ mb: 5 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', mb: 1 }}>
                        Welcome back, {userName}!
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Heres a summary of your recent activity and bookings.
                    </Typography>
                </Box>

                <Grid container spacing={3} sx={{ mb: 6 }}>
                    {stats.map((stat, i) => (
                        <Grid item xs={12} sm={4} key={i}>
                            <Paper elevation={0} sx={{ p: 3, borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', bgcolor: 'background.paper' }}>
                                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: '600', mb: 1 }}>{stat.label}</Typography>
                                <Typography variant="h4" sx={{ fontWeight: '800', color: stat.color }}>{stat.value}</Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                <Grid container spacing={3}>
                    {cards.map((card, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Paper 
                                elevation={0} 
                                sx={{ 
                                    p: 4, 
                                    borderRadius: '24px', 
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    bgcolor: 'background.paper',
                                    height: '100%',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    '&:hover': { 
                                        borderColor: card.color, 
                                        transform: 'translateY(-8px)', 
                                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)' 
                                    }
                                }}
                                onClick={() => navigate(card.path)}
                            >
                                <Box sx={{ 
                                    width: 56, 
                                    height: 56, 
                                    borderRadius: '16px', 
                                    bgcolor: `${card.color}10`, 
                                    color: card.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mb: 3
                                }}>
                                    {card.icon}
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1.5, color: 'text.primary' }}>
                                    {card.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 3 }}>
                                    {card.desc}
                                </Typography>
                                <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', color: card.color, fontWeight: '700', fontSize: '0.875rem' }}>
                                    View details <ChevronRightIcon sx={{ ml: 0.5, fontSize: 18 }} />
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                <Paper sx={{ mt: 6, p: 4, borderRadius: '24px', background: 'linear-gradient(135deg, rgba(37,99,235,0.2) 0%, rgba(11,15,25,1) 100%)', border: '1px solid rgba(37,99,235,0.2)', color: 'white' }}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={8}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                                Need immediate assistance?
                            </Typography>
                            <Typography variant="body1" sx={{ opacity: 0.9 }}>
                                Our support team is here to help you with any booking issues or questions.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                            <Button variant="contained" sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: '12px', px: 4, fontWeight: 'bold', '&:hover': { bgcolor: 'primary.dark' } }}>
                                Contact Support
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        );
    };

    const renderContent = () => {
        if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;

        switch (view) {
            case 'appointments': return (
                <Paper elevation={0} sx={{ p: 4, borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', bgcolor: 'background.paper' }}>
                    <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>My Appointments</Typography>
                        <Button variant="text" onClick={() => navigate('/dashboard')} sx={{ borderRadius: '12px' }}>Back to Overview</Button>
                    </Box>
                    {appointments.length === 0 ? (
                        <Box sx={{ textAlign: 'center', py: 6 }}>
                            <Typography color="text.secondary" paragraph>You have no appointments yet.</Typography>
                            <Button variant="contained" onClick={() => navigate('/dashboard?view=businesses')} sx={{ borderRadius: '12px', px: 4 }}>Book Now</Button>
                        </Box>
                    ) : (
                        <List sx={{ p: 0 }}>
                            {appointments.map((apt) => (
                                <ListItem 
                                    key={apt.id} 
                                    sx={{ 
                                        mb: 2, 
                                        borderRadius: '16px', 
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        '&:hover': { bgcolor: 'rgba(255,255,255,0.02)' }
                                    }}
                                >
                                    <Avatar sx={{ bgcolor: apt.status === 'CONFIRMED' ? 'rgba(49, 130, 206, 0.2)' : 'rgba(229, 62, 62, 0.2)', color: apt.status === 'CONFIRMED' ? '#63b3ed' : '#fc8181', mr: 2 }}>
                                        <CalendarMonthIcon />
                                    </Avatar>
                                    <ListItemText 
                                        primary={apt.service?.name || "Service"} 
                                        secondary={`${apt.business?.name} • ${new Date(apt.startTime).toLocaleString()}`}
                                        primaryTypographyProps={{ fontWeight: '700' }}
                                    />
                                    <Box sx={{ 
                                        px: 2, 
                                        py: 0.5, 
                                        borderRadius: '12px', 
                                        fontSize: '0.75rem', 
                                        fontWeight: '800',
                                        bgcolor: apt.status === 'CONFIRMED' ? 'rgba(56, 161, 105, 0.2)' : apt.status === 'PENDING' ? 'rgba(221, 107, 32, 0.2)' : 'rgba(229, 62, 62, 0.2)',
                                        color: apt.status === 'CONFIRMED' ? '#68d391' : apt.status === 'PENDING' ? '#f6ad55' : '#fc8181'
                                    }}>
                                        {apt.status}
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Paper>
            );
            case 'businesses': return (
                <Box>
                    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Find Businesses</Typography>
                        <Button variant="text" onClick={() => navigate('/dashboard')} sx={{ borderRadius: '12px' }}>Back to Overview</Button>
                    </Box>
                    <BusinessList />
                </Box>
            );
            case 'profile': return <ProfileView />;
            default: return renderOverview();
        }
    };

    const drawerWidth = 280;

    const navItems = [
        { title: 'Overview', path: '/dashboard', icon: <HomeIcon /> },
        { title: 'Appointments', path: '/dashboard?view=appointments', icon: <CalendarMonthIcon /> },
        { title: 'Browse Businesses', path: '/dashboard?view=businesses', icon: <SearchIcon /> },
        { title: 'Profile', path: '/dashboard?view=profile', icon: <PersonIcon /> }
    ];

    const drawer = (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { 
                    width: drawerWidth, 
                    boxSizing: 'border-box',
                    bgcolor: 'background.paper',
                    borderRight: '1px solid rgba(255,255,255,0.05)',
                    pt: 4
                },
            }}
        >
            <Box sx={{ px: 3, mb: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>Menu</Typography>
            </Box>
            <List sx={{ px: 2 }}>
                {navItems.map((item) => {
                    const isActive = (item.title === 'Overview' && !view) || 
                                   (item.path.includes(`view=${view}`));
                    return (
                        <ListItem 
                            button 
                            key={item.title} 
                            onClick={() => navigate(item.path)}
                            sx={{
                                borderRadius: '12px',
                                mb: 1,
                                bgcolor: isActive ? 'rgba(37,99,235,0.1)' : 'transparent',
                                color: isActive ? '#60a5fa' : 'text.secondary',
                                '&:hover': {
                                    bgcolor: isActive ? 'rgba(37,99,235,0.2)' : 'rgba(255,255,255,0.05)',
                                    color: isActive ? '#60a5fa' : 'white',
                                }
                            }}
                        >
                            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.title} primaryTypographyProps={{ fontWeight: isActive ? 'bold' : 'medium' }} />
                        </ListItem>
                    );
                })}
            </List>
        </Drawer>
    );

    return (
        <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '90vh' }}>
            {drawer}
            <Box component="main" sx={{ flexGrow: 1, p: 6, width: `calc(100% - ${drawerWidth}px)` }}>
                <Container maxWidth="lg">
                    {renderContent()}
                </Container>
            </Box>
        </Box>
    );
};

export default ClientDashboard;
