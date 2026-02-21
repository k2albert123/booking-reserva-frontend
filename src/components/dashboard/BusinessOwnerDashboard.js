import React from 'react';
import { 
    Box, 
    Container, 
    Typography, 
    Grid, 
    Card, 
    CardContent, 
    Button, 
    Paper,
    Stack,
    IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StorefrontIcon from '@mui/icons-material/Storefront';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddIcon from '@mui/icons-material/Add';

const BusinessOwnerDashboard = () => {
    const navigate = useNavigate();

    const sections = [
        { 
            title: 'Businesses', 
            desc: 'Manage your enrolled businesses and locations.', 
            icon: <StorefrontIcon sx={{ fontSize: 32 }} />, 
            path: '/businesses',
            color: '#2196f3'
        },
        { 
            title: 'Appointments', 
            desc: 'Track and update your customer bookings.', 
            icon: <EventNoteIcon sx={{ fontSize: 32 }} />, 
            path: '/appointments',
            color: '#f44336'
        },
        { 
            title: 'Services', 
            desc: 'Create and edit the services you offer.', 
            icon: <DesignServicesIcon sx={{ fontSize: 32 }} />, 
            path: '/services',
            color: '#4caf50'
        }
    ];

    return (
        <Box sx={{ bgcolor: '#fafafa', minHeight: '90vh', py: 4 }}>
            <Container maxWidth="lg">
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                            Owner Dashboard
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Overview of your salon or business performance.
                        </Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
                        <IconButton><NotificationsIcon /></IconButton>
                        <Button 
                            variant="contained" 
                            startIcon={<AddIcon />}
                            onClick={() => navigate('/businesses')}
                            sx={{ borderRadius: '8px' }}
                        >
                            Add New
                        </Button>
                    </Stack>
                </Box>
                
                <Grid container spacing={3}>
                    {sections.map((section, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Paper 
                                elevation={0} 
                                sx={{ 
                                    p: 3, 
                                    borderRadius: '16px', 
                                    border: '1px solid #eee',
                                    transition: 'border-color 0.2s',
                                    '&:hover': { borderColor: section.color }
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <Box sx={{ 
                                        width: 48, 
                                        height: 48, 
                                        borderRadius: '12px', 
                                        bgcolor: `${section.color}15`, 
                                        color: section.color,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mr: 2
                                    }}>
                                        {section.icon}
                                    </Box>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        {section.title}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    {section.desc}
                                </Typography>
                                <Button 
                                    variant="outlined" 
                                    fullWidth 
                                    onClick={() => navigate(section.path)}
                                    sx={{ 
                                        mt: 1, 
                                        color: section.color, 
                                        borderColor: section.color,
                                        borderRadius: '8px',
                                        '&:hover': { borderColor: section.color, bgcolor: `${section.color}05` }
                                    }}
                                >
                                    Manage
                                </Button>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                <Box sx={{ mt: 5 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Recent Activity
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', borderRadius: '16px', borderStyle: 'dashed' }}>
                        <Typography color="text.secondary">
                            No recent activity found. Start by managing your services or businesses.
                        </Typography>
                    </Paper>
                </Box>
            </Container>
        </Box>
    );
};

export default BusinessOwnerDashboard;
