import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Box,
    Grid,
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
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { getBusinessById, getWorkingHours } from '../../services/businessService';
import { getServicesByBusiness } from '../../services/serviceService';
import { getStaffByBusiness } from '../../services/staffService';
import ReusableCard, { EllipsisText, MediaCard } from '../common/ReusableCard';

const BusinessDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [business, setBusiness] = useState(null);
    const [services, setServices] = useState([]);
    const [staff, setStaff] = useState([]);
    const [workingHours, setWorkingHours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const [biz, servicesData, staffData, hours] = await Promise.all([
                    getBusinessById(id),
                    getServicesByBusiness(id),
                    getStaffByBusiness(id),
                    getWorkingHours(id)
                ]);
                setBusiness(biz);
                setServices(servicesData);
                setStaff(staffData);
                setWorkingHours(hours);
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
            <Paper sx={{ p: 4, borderRadius: 2, mb: 4 }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={4}>
                        <Avatar
                            src={business.imageUrl || undefined}
                            alt={business.name}
                            sx={{ width: 200, height: 200, mx: 'auto', fontSize: 48 }}
                        >
                            {business.name?.charAt(0)}
                        </Avatar>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                            <EllipsisText lines={2} component="span" sx={{ fontSize: 'inherit', fontWeight: 'inherit' }}>{business.name}</EllipsisText>
                        </Typography>
                        <EllipsisText lines={4} sx={{ color: 'text.secondary', mb: 2, fontSize: '1.05rem' }}>
                            {business.description}
                        </EllipsisText>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            {business.address && (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <LocationOnIcon color="action" sx={{ mr: 1 }} />
                                    <Typography variant="body2">{business.address}</Typography>
                                </Box>
                            )}
                            {business.phoneNumber && (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <PhoneIcon color="action" sx={{ mr: 1 }} />
                                    <Typography variant="body2">{business.phoneNumber}</Typography>
                                </Box>
                            )}
                            {business.email && (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <EmailIcon color="action" sx={{ mr: 1 }} />
                                    <Typography variant="body2">{business.email}</Typography>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
                    <Tab label="Services" />
                    <Tab label="Staff" />
                    <Tab label="Opening Hours" />
                </Tabs>
            </Box>

            {tabValue === 0 && (
                <Grid container spacing={3}>
                    {services.map((service) => (
                        <Grid item key={service.id} xs={12} sm={6} sx={{ display: 'flex' }}>
                            <ReusableCard>
                                <CardContent sx={{ flexGrow: 1, minWidth: 0 }}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1} gap={1} minWidth={0}>
                                        <EllipsisText lines={1} sx={{ fontWeight: 'bold', fontSize: '1.05rem', minWidth: 0 }}>{service.name}</EllipsisText>
                                        <Typography variant="h6" color="primary" sx={{ flexShrink: 0 }}>${service.price}</Typography>
                                    </Box>
                                    <EllipsisText lines={3} sx={{ color: 'text.secondary', mb: 2, minHeight: '4.5em' }}>
                                        {service.description}
                                    </EllipsisText>
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
                            </ReusableCard>
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
                <Grid container spacing={2}>
                    {staff.map((member) => (
                        <Grid item xs={12} sm={6} md={4} key={member.id} sx={{ display: 'flex' }}>
                            <MediaCard
                                image={member.imageUrl}
                                imageAlt={member.name}
                                imageHeight={180}
                                title={member.name}
                                subtitle={[member.title, member.specialty].filter(Boolean).join(' · ')}
                                description={member.bio}
                                descriptionLines={4}
                            />
                        </Grid>
                    ))}
                    {staff.length === 0 && (
                        <Grid item xs={12}>
                            <Typography align="center" color="text.secondary">No staff listed for this business.</Typography>
                        </Grid>
                    )}
                </Grid>
            )}

            {tabValue === 2 && (
                <Paper sx={{ p: 3 }}>
                    <List>
                        {workingHours.map((wh, index) => (
                            <React.Fragment key={wh.id || index}>
                                <ListItem>
                                    <ListItemText
                                        primary={wh.dayOfWeek}
                                        secondary={wh.open || wh.isOpen
                                            ? `${wh.startTime} – ${wh.endTime}`
                                            : 'Closed'}
                                    />
                                </ListItem>
                                {index < workingHours.length - 1 && <Divider />}
                            </React.Fragment>
                        ))}
                        {workingHours.length === 0 && (
                            <Typography color="text.secondary">No working hours set.</Typography>
                        )}
                    </List>
                </Paper>
            )}
        </Container>
    );
};

export default BusinessDetails;
