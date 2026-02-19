import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Container maxWidth="lg">
                <Typography variant="h4" component="h1" gutterBottom>
                    Welcome to Booking Dashboard
                </Typography>
                
                <Grid container spacing={3} sx={{ mt: 3 }}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    My Appointments
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    onClick={() => navigate('/appointments')}
                                >
                                    View Appointments
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    My Businesses
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    onClick={() => navigate('/businesses')}
                                >
                                    View Businesses
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Services
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    onClick={() => navigate('/services')}
                                >
                                    View Services
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                        variant="contained" 
                        color="error" 
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default Dashboard;
