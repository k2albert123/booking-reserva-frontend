import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ClientDashboard = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Container maxWidth="lg">
                <Typography variant="h4" component="h1" gutterBottom>
                    Client Dashboard
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
                                    Search Businesses
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    onClick={() => navigate('/businesses')}
                                >
                                    Find Services
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    My Profile
                                </Typography>
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    onClick={() => navigate('/profile')}
                                >
                                    View Profile
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default ClientDashboard;
