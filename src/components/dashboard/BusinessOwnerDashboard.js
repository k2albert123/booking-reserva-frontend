import React, { useState, useEffect, useCallback } from 'react';
import { 
    Box, 
    Container, 
    Typography,
    Grid,
    Button,
    Paper,
    Stack,
    IconButton,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    ListItemIcon,
    Drawer,
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
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { getMyBusinesses, createBusiness } from '../../services/businessService';
import { getBusinessAppointments, updateAppointmentStatus } from '../../services/appointmentService';
import { getServicesByBusiness, createService } from '../../services/serviceService';
import { toast } from 'react-toastify';
import ProfileView from './ProfileView';

const BusinessOwnerDashboard = ({ view }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const businessId = searchParams.get('businessId');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        businesses: [],
        appointments: [],
        services: []
    });

    const [openBusinessDialog, setOpenBusinessDialog] = useState(false);
    const [openServiceDialog, setOpenServiceDialog] = useState(false);
    const [newBusiness, setNewBusiness] = useState({ name: '', description: '', address: '', phoneNumber: '', email: '' });
    const [newService, setNewService] = useState({ name: '', description: '', price: '', durationMinutes: '' });

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            // Always fetch businesses for stats if in overview
            const businesses = await getMyBusinesses();
            let appointments = [];
            let services = [];

            if (businessId) {
                if (view === 'appointments') {
                    appointments = await getBusinessAppointments(businessId);
                } else if (view === 'services') {
                    services = await getServicesByBusiness(businessId);
                }
            }
            
            setData({ businesses, appointments, services });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    }, [view, businessId]);

    useEffect(() => {
        fetchData();
    }, [view, businessId, fetchData]);

    const handleCreateBusiness = async () => {
        try {
            await createBusiness(newBusiness);
            setOpenBusinessDialog(false);
            setNewBusiness({ name: '', description: '', address: '', phoneNumber: '', email: '' });
            fetchData();
            toast.success("Business created successfully");
        } catch (error) {
            toast.error("Failed to create business");
        }
    };

    const handleCreateService = async () => {
        try {
            await createService(businessId, newService);
            setOpenServiceDialog(false);
            setNewService({ name: '', description: '', price: '', durationMinutes: '' });
            fetchData();
            toast.success("Service created successfully");
        } catch (error) {
            toast.error("Failed to create service");
        }
    };

    const handleUpdateAppointmentStatus = async (id, status) => {
        try {
            await updateAppointmentStatus(id, status);
            fetchData();
            toast.success(`Appointment ${status.toLowerCase()}ed`);
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const renderOverview = () => {
        const stats = [
            { label: 'Total Businesses', value: data.businesses.length, color: '#2196f3' },
            { label: 'Active Services', value: data.businesses.reduce((acc, b) => acc + (b.services?.length || 0), 0), color: '#4caf50' },
            { label: 'Pending Bookings', value: '...', color: '#ff9800' } // Placeholder for cross-business pending count
        ];

        const sections = [
            { 
                title: 'Businesses', 
                desc: 'Manage your enrolled businesses and locations.', 
                icon: <StorefrontIcon sx={{ fontSize: 28 }} />, 
                path: '/dashboard?view=businesses',
                color: '#2196f3'
            },
            { 
                title: 'Appointments', 
                desc: 'Track and update your customer bookings.', 
                icon: <EventNoteIcon sx={{ fontSize: 28 }} />, 
                path: '/dashboard?view=appointments',
                color: '#f44336'
            },
            { 
                title: 'Services', 
                desc: 'Create and edit the services you offer.', 
                icon: <DesignServicesIcon sx={{ fontSize: 28 }} />, 
                path: '/dashboard?view=services',
                color: '#4caf50'
            }
        ];

        return (
            <Box>
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {stats.map((stat, i) => (
                        <Grid item xs={12} sm={4} key={i}>
                            <Paper elevation={0} sx={{ p: 3, borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', bgcolor: 'background.paper' }}>
                                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium' }}>{stat.label}</Typography>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1, color: stat.color }}>{stat.value}</Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                <Grid container spacing={3}>
                    {sections.map((section, index) => (
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
                                    '&:hover': { 
                                        borderColor: section.color, 
                                        transform: 'translateY(-6px)', 
                                        boxShadow: '0 12px 20px rgba(0,0,0,0.2)' 
                                    }
                                }}
                                onClick={() => navigate(section.path)}
                            >
                                <Box sx={{ 
                                    width: 56, 
                                    height: 56, 
                                    borderRadius: '16px', 
                                    bgcolor: `${section.color}10`, 
                                    color: section.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mb: 3
                                }}>
                                    {section.icon}
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                                    {section.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                    {section.desc}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    };

    const renderBusinesses = () => (
        <Paper sx={{ p: 3, borderRadius: '16px', bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.05)' }}>
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
        <Paper sx={{ p: 3, borderRadius: '16px', bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.05)' }}>
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
        <Paper sx={{ p: 3, borderRadius: '16px', bgcolor: 'background.paper', border: '1px solid rgba(255,255,255,0.05)' }}>
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
            case 'profile': return <ProfileView />;
            default: return renderOverview();
        }
    };

    const drawerWidth = 280;

    const navItems = [
        { title: 'Overview', path: '/dashboard', icon: <HomeIcon /> },
        { title: 'My Businesses', path: '/dashboard?view=businesses', icon: <StorefrontIcon /> },
        { title: 'My Services', path: '/dashboard?view=services', icon: <DesignServicesIcon /> },
        { title: 'Customer Bookings', path: '/dashboard?view=appointments', icon: <EventNoteIcon /> },
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
                        <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', borderRadius: '16px', borderStyle: 'dashed', borderColor: 'rgba(255,255,255,0.2)' }}>
                            <Typography color="text.secondary">
                                No recent activity found. Start by managing your services or businesses.
                            </Typography>
                        </Paper>
                    </Box>
                )}
            </Container>
            </Box>

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
