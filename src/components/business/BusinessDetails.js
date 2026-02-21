import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Typography, 
    Box, 
    Grid, 
    Card, 
    CardContent, 
    Button, 
    Tabs, 
    Tab,
    List,
    ListItem,
    ListItemText,
    Divider,
    CircularProgress,
    Paper,
    Avatar
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const BusinessDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [business, setBusiness] = useState(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const [businessRes, servicesRes] = await Promise.all([
                    axios.get(`/api/v1/businesses/${id}`),
                    axios.get(`/api/v1/services/business/${id}`)
                ]);
                setBusiness(businessRes.data);
                setServices(servicesRes.data);
            } catch (error) {
                console.error('Error fetching details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!business) return <Typography>Business not found</Typography>;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p: 4, borderRadius: 2, mb: 4, background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <Avatar
                            src={business.imageUrl || 'https://via.placeholder.com/300'}
                            alt={business.name}
                            sx={{ width: 250, height: 250, boxShadow: 3, mx: 'auto' }}
                        />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                            {business.name}
                        </Typography>
                        <Typography variant="h6" color="text.secondary" paragraph>
                            {business.description}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LocationOnIcon color="action" sx={{ mr: 1 }} />
                                <Typography variant="body2">{business.address}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <PhoneIcon color="action" sx={{ mr: 1 }} />
                                <Typography variant="body2">{business.phoneNumber}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <EmailIcon color="action" sx={{ mr: 1 }} />
                                <Typography variant="body2">{business.email}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
                    <Tab label="Services" />
                    <Tab label="Opening Hours" />
                </Tabs>
            </Box>

            {tabValue === 0 && (
                <Grid container spacing={3}>
                    {services.map((service) => (
                        <Grid item key={service.id} xs={12} sm={6}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                            {service.name}
                                        </Typography>
                                        <Typography variant="h6" color="primary">
                                            ${service.price}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        {service.description}
                                    </Typography>
                                    <Box display="flex" alignItems="center">
                                        <AccessTimeIcon fontSize="small" color="disabled" sx={{ mr: 0.5 }} />
                                        <Typography variant="caption" color="text.secondary">
                                            {service.duration} mins
                                        </Typography>
                                    </Box>
                                </CardContent>
                                <Box sx={{ p: 2, pt: 0 }}>
                                    <Button 
                                        variant="outlined" 
                                        fullWidth 
                                        onClick={() => navigate(`/book/${id}/${service.id}`)}
                                    >
                                        Book Now
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                    {services.length === 0 && (
                        <Grid item xs={12}>
                            <Typography align="center" color="text.secondary">No services available.</Typography>
                        </Grid>
                    )}
                </Grid>
            )}

            {tabValue === 1 && (
                <Paper sx={{ p: 3 }}>
                    <List>
                        {business.workingHours?.map((wh, index) => (
                            <React.Fragment key={index}>
                                <ListItem>
                                    <ListItemText 
                                        primary={wh.dayOfWeek} 
                                        secondary={`${wh.openTime} - ${wh.closeTime}`}
                                    />
                                </ListItem>
                                {index < business.workingHours.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                        {(!business.workingHours || business.workingHours.length === 0) && (
                            <Typography color="text.secondary">No working hours set.</Typography>
                        )}
                    </List>
                </Paper>
            )}
        </Container>
    );
};

export default BusinessDetails;
