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
    IconButton,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import StorefrontIcon from '@mui/icons-material/Storefront';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddIcon from '@mui/icons-material/Add';
import { getMyBusinesses, createBusiness } from '../../services/businessService';
import { getBusinessAppointments, updateAppointmentStatus } from '../../services/appointmentService';
import { getServicesByBusiness, createService } from '../../services/serviceService';

const BusinessOwnerDashboard = ({ view }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const businessId = searchParams.get('businessId');
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState({
        businesses: [],
        appointments: [],
        services: []
    });

    const [openBusinessDialog, setOpenBusinessDialog] = React.useState(false);
    const [openServiceDialog, setOpenServiceDialog] = React.useState(false);
    const [newBusiness, setNewBusiness] = React.useState({ name: '', description: '', address: '', phoneNumber: '', email: '' });
    const [newService, setNewService] = React.useState({ name: '', description: '', price: '', durationMinutes: '' });

    const fetchData = async () => {
        setLoading(true);
        try {
            if (view === 'businesses' || view === 'overview') {
                const businesses = await getMyBusinesses();
                setData(prev => ({ ...prev, businesses }));
            }
            if (view === 'appointments') {
                if (businessId) {
                    const appointments = await getBusinessAppointments(businessId);
                    setData(prev => ({ ...prev, appointments }));
                } else {
                    const businesses = await getMyBusinesses();
                    setData(prev => ({ ...prev, businesses }));
                }
            }
            if (view === 'services' && businessId) {
                const services = await getServicesByBusiness(businessId);
                setData(prev => ({ ...prev, services }));
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, [view, businessId]);

    const handleCreateBusiness = async () => {
        try {
            await createBusiness(newBusiness);
            setOpenBusinessDialog(false);
            setNewBusiness({ name: '', description: '', address: '', phoneNumber: '', email: '' });
            fetchData();
        } catch (error) {
            console.error('Error creating business:', error);
        }
    };

    const handleCreateService = async () => {
        try {
            await createService(businessId, newService);
            setOpenServiceDialog(false);
            setNewService({ name: '', description: '', price: '', durationMinutes: '' });
            fetchData();
        } catch (error) {
            console.error('Error creating service:', error);
        }
    };

    const handleUpdateAppointmentStatus = async (id, status) => {
        try {
            await updateAppointmentStatus(id, status);
            fetchData();
        } catch (error) {
            console.error('Error updating appointment status:', error);
        }
    };

    const renderOverview = () => {
        const sections = [
            { 
                title: 'Businesses', 
                desc: 'Manage your enrolled businesses and locations.', 
                icon: <StorefrontIcon sx={{ fontSize: 32 }} />, 
                path: '/dashboard?view=businesses',
                color: '#2196f3'
            },
            { 
                title: 'Appointments', 
                desc: 'Track and update your customer bookings.', 
                icon: <EventNoteIcon sx={{ fontSize: 32 }} />, 
                path: '/dashboard?view=appointments',
                color: '#f44336'
            },
            { 
                title: 'Services', 
                desc: 'Create and edit the services you offer.', 
                icon: <DesignServicesIcon sx={{ fontSize: 32 }} />, 
                path: '/dashboard?view=services',
                color: '#4caf50'
            }
        ];

        return (
            <Grid container spacing={3}>
                {sections.map((section, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Paper 
                            elevation={0} 
                            sx={{ 
                                p: 3, 
                                borderRadius: '16px', 
                                border: '1px solid #eee',
                                transition: 'all 0.2s',
                                '&:hover': { borderColor: section.color, transform: 'translateY(-4px)', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }
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
        );
    };

    const renderBusinesses = () => (
        <Paper sx={{ p: 3, borderRadius: '16px' }}>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Your Businesses</Typography>
                <Button variant="contained" startIcon={<AddIcon />} size="small" onClick={() => setOpenBusinessDialog(true)}>Add Business</Button>
            </Box>
            {data.businesses.length === 0 ? (
                <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                    No businesses found.
                </Typography>
            ) : (
                <List>
                    {data.businesses.map((biz) => (
                        <ListItem key={biz.id} divider>
                            <ListItemText 
                                primary={biz.name} 
                                secondary={biz.description} 
                            />
                            <ListItemSecondaryAction>
                                <Button size="small" onClick={() => navigate(`/dashboard?view=services&businessId=${biz.id}`)} sx={{ mr: 1 }}>
                                    Services
                                </Button>
                                <Button size="small" onClick={() => navigate(`/dashboard?view=appointments&businessId=${biz.id}`)}>
                                    Appointments
                                </Button>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            )}
        </Paper>
    );

    const renderAppointments = () => (
        <Paper sx={{ p: 3, borderRadius: '16px' }}>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Appointments</Typography>
                {!businessId && <Typography variant="body2" color="error">Select a business first</Typography>}
            </Box>
            {!businessId ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" color="text.secondary" gutterBottom>Please select a business from the list to view its appointments.</Typography>
                    <Button variant="outlined" onClick={() => navigate('/dashboard?view=businesses')}>Go to Businesses</Button>
                </Box>
            ) : data.appointments.length === 0 ? (
                <Typography color="text.secondary" align="center" sx={{ py: 4 }}>
                    No appointments found for this business.
                </Typography>
            ) : (
                <List>
                    {data.appointments.map((apt) => (
                        <ListItem key={apt.id} divider>
                            <ListItemText 
                                primary={`${apt.service?.name || 'Service'} - ${apt.client?.name || 'Client'}`} 
                                secondary={`${new Date(apt.startTime).toLocaleString()} - ${apt.status}`} 
                            />
                            <ListItemSecondaryAction>
                                {apt.status === 'PENDING' && (
                                    <Button size="small" color="primary" onClick={() => handleUpdateAppointmentStatus(apt.id, 'CONFIRMED')} sx={{ mr: 1 }}>
                                        Confirm
                                    </Button>
                                )}
                                {apt.status !== 'CANCELLED' && apt.status !== 'COMPLETED' && (
                                    <Button size="small" color="error" onClick={() => handleUpdateAppointmentStatus(apt.id, 'CANCELLED')}>
                                        Cancel
                                    </Button>
                                )}
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            )}
        </Paper>
    );

    const renderServices = () => (
        <Paper sx={{ p: 3, borderRadius: '16px' }}>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Services</Typography>
                {businessId ? (
                    <Button variant="contained" startIcon={<AddIcon />} size="small" onClick={() => setOpenServiceDialog(true)}>Add Service</Button>
                ) : (
                    <Typography variant="body2" color="error">Select a business first</Typography>
                )}
            </Box>
            {!businessId ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" color="text.secondary" gutterBottom>Please select a business from the list to manage its services.</Typography>
                    <Button variant="outlined" onClick={() => navigate('/dashboard?view=businesses')}>Go to Businesses</Button>
                </Box>
            ) : data.services.length === 0 ? (
                <Typography color="text.secondary" align="center" sx={{ py: 4 }}>No services found for this business.</Typography>
            ) : (
                <List>
                    {data.services.map((svc) => (
                        <ListItem key={svc.id} divider>
                            <ListItemText 
                                primary={svc.name} 
                                secondary={`${svc.description} - $${svc.price} (${svc.durationMinutes} min)`} 
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </Paper>
    );

    const renderContent = () => {
        if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;
        
        switch (view) {
            case 'businesses': return renderBusinesses();
            case 'appointments': return renderAppointments();
            case 'services': return renderServices();
            case 'profile': return <Typography>User Profile Management</Typography>;
            default: return renderOverview();
        }
    };

    return (
        <Box sx={{ bgcolor: '#fafafa', minHeight: '90vh', py: 4 }}>
            <Container maxWidth="lg">
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                            {view.charAt(0).toUpperCase() + view.slice(1)}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {view === 'overview' ? 'Overview of your business performance.' : `Manage your ${view}.`}
                        </Typography>
                    </Box>
                    <Stack direction="row" spacing={1}>
                        {view !== 'overview' && (
                            <Button variant="text" onClick={() => navigate('/dashboard')}>Back to Overview</Button>
                        )}
                        <IconButton><NotificationsIcon /></IconButton>
                    </Stack>
                </Box>
                
                {renderContent()}

                {view === 'overview' && (
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
                )}
            </Container>

            {/* Dialogs */}
            <Dialog open={openBusinessDialog} onClose={() => setOpenBusinessDialog(false)}>
                <DialogTitle>Add New Business</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField fullWidth label="Business Name" value={newBusiness.name} onChange={(e) => setNewBusiness({...newBusiness, name: e.target.value})} />
                        <TextField fullWidth label="Description" multiline rows={2} value={newBusiness.description} onChange={(e) => setNewBusiness({...newBusiness, description: e.target.value})} />
                        <TextField fullWidth label="Address" value={newBusiness.address} onChange={(e) => setNewBusiness({...newBusiness, address: e.target.value})} />
                        <TextField fullWidth label="Phone" value={newBusiness.phoneNumber} onChange={(e) => setNewBusiness({...newBusiness, phoneNumber: e.target.value})} />
                        <TextField fullWidth label="Email" value={newBusiness.email} onChange={(e) => setNewBusiness({...newBusiness, email: e.target.value})} />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenBusinessDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleCreateBusiness}>Create</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openServiceDialog} onClose={() => setOpenServiceDialog(false)}>
                <DialogTitle>Add New Service</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField fullWidth label="Service Name" value={newService.name} onChange={(e) => setNewService({...newService, name: e.target.value})} />
                        <TextField fullWidth label="Description" value={newService.description} onChange={(e) => setNewService({...newService, description: e.target.value})} />
                        <TextField fullWidth label="Price" type="number" value={newService.price} onChange={(e) => setNewService({...newService, price: e.target.value})} />
                        <TextField fullWidth label="Duration (min)" type="number" value={newService.durationMinutes} onChange={(e) => setNewService({...newService, durationMinutes: e.target.value})} />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenServiceDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleCreateService}>Create</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default BusinessOwnerDashboard;
