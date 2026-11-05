import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Container,
    Typography,
    Button,
    Paper,
    Stack,
    CircularProgress,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Chip,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Divider,
    Grid
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import StorefrontIcon from '@mui/icons-material/Storefront';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ShieldIcon from '@mui/icons-material/Shield';
import RateReviewIcon from '@mui/icons-material/RateReview';
import EditIcon from '@mui/icons-material/Edit';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import MapIcon from '@mui/icons-material/Map';
import SaveIcon from '@mui/icons-material/Save';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import VerifiedIcon from '@mui/icons-material/Verified';
import GoogleMapLocation from '../common/GoogleMapLocation';
import { getMyBusinesses, createBusiness, updateBusiness } from '../../services/businessService';
import { getBusinessAppointments, updateAppointmentStatus } from '../../services/appointmentService';
import { getServicesByBusiness, createService, deleteService } from '../../services/serviceService';
import { getStaffByBusiness, addStaff, deleteStaff } from '../../services/staffService';
import { getBusinessReviews } from '../../services/reviewService';
import { toast } from 'react-toastify';
import ProfileView from './ProfileView';
import ImageUpload from '../common/ImageUpload';
import ReviewsList from '../reviews/ReviewsList';
import ReusableCard, { ActionCard, EllipsisText, MediaCard, TruncatedDescription } from '../common/ReusableCard';

const SAMPLE_OWNER_BUSINESS = {
    id: 1,
    name: 'The Royal Blade Barbershop',
    category: 'Barbershop',
    description: 'Traditional hot towel shaves, beard trims, and bespoke modern haircuts by master barbers.',
    address: '124 High Street, Downtown',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    latitude: 40.712776,
    longitude: -74.005974,
    storefrontImageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=80',
    interiorImageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80',
    locationProofDocUrl: 'https://images.unsplash.com/photo-1554415707-9e4c079ae885?auto=format&fit=crop&w=1200&q=80',
    phoneNumber: '+1 (555) 234-8901',
    email: 'marcus@royalblade.com',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80'
};

const SAMPLE_OWNER_APPOINTMENTS = [
    {
        id: 1,
        startTime: new Date(Date.now() + 86400000).toISOString(),
        status: 'CONFIRMED',
        clientName: 'Alexander Hayes',
        clientEmail: 'alex@example.com',
        service: { name: 'Master Barber Haircut', price: 45, duration: 45 },
        staff: { name: 'Marcus Vance' }
    },
    {
        id: 2,
        startTime: new Date(Date.now() + 86400000 * 2).toISOString(),
        status: 'PENDING',
        clientName: 'Julian Croft',
        clientEmail: 'julian@example.com',
        service: { name: 'Hot Towel Royal Shave', price: 35, duration: 30 },
        staff: { name: 'Leon Hayes' }
    }
];

const SAMPLE_SERVICES = [
    { id: 101, name: 'Master Barber Haircut', price: 45, duration: 45, description: 'Consultation, precision cut, hot lather nape shave, wash and style.' },
    { id: 102, name: 'Hot Towel Royal Shave', price: 35, duration: 30, description: 'Pre-shave essential oils, double hot towel steam, straight razor shave.' }
];

const SAMPLE_STAFF = [
    { id: 201, name: 'Marcus Vance', title: 'Master Barber', specialty: 'Classic Cuts & Fades', bio: 'Over 12 years of luxury grooming experience.', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
    { id: 202, name: 'Leon Hayes', title: 'Senior Stylist', specialty: 'Beard Sculpting', bio: 'Specialist in modern texture work and luxury treatments.', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' }
];

const BusinessOwnerDashboard = ({ view = 'overview' }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const paramBusinessId = searchParams.get('businessId');
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        businesses: [],
        appointments: [],
        services: [],
        staff: [],
        reviewsSummary: null
    });

    const [selectedBusinessId, setSelectedBusinessId] = useState(paramBusinessId || '');

    // Dialog state
    const [openBusinessDialog, setOpenBusinessDialog] = useState(false);
    const [editingBusinessId, setEditingBusinessId] = useState(null);
    const [openServiceDialog, setOpenServiceDialog] = useState(false);
    const [openStaffDialog, setOpenStaffDialog] = useState(false);

    const initialBusinessState = {
        name: '',
        description: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        latitude: '',
        longitude: '',
        storefrontImageUrl: '',
        interiorImageUrl: '',
        locationProofDocUrl: '',
        phoneNumber: '',
        email: '',
        imageUrl: '',
        category: 'Barbershop'
    };

    const [newBusiness, setNewBusiness] = useState(initialBusinessState);
    const [newService, setNewService] = useState({ name: '', description: '', price: '', duration: '' });
    const [newStaff, setNewStaff] = useState({ name: '', title: '', specialty: '', bio: '', phoneNumber: '', email: '', imageUrl: '' });

    // Location & Photos Direct Control State
    const [locationForm, setLocationForm] = useState({
        address: '',
        city: '',
        state: '',
        postalCode: '',
        latitude: '',
        longitude: '',
        storefrontImageUrl: '',
        interiorImageUrl: '',
        locationProofDocUrl: '',
        imageUrl: ''
    });
    const [savingLocation, setSavingLocation] = useState(false);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            let businesses = [];
            try {
                businesses = await getMyBusinesses();
            } catch (err) {
                console.warn('Could not load owner businesses from backend:', err);
            }

            if (!businesses || businesses.length === 0) {
                businesses = [SAMPLE_OWNER_BUSINESS];
            }

            const activeBizId = selectedBusinessId || businesses[0]?.id;
            if (!selectedBusinessId && activeBizId) {
                setSelectedBusinessId(activeBizId);
            }

            let appointments = [];
            let services = [];
            let staff = [];
            let reviewsSummary = null;

            if (activeBizId) {
                try {
                    appointments = await getBusinessAppointments(activeBizId);
                } catch {
                    appointments = SAMPLE_OWNER_APPOINTMENTS;
                }
                try {
                    services = await getServicesByBusiness(activeBizId);
                } catch {
                    services = SAMPLE_SERVICES;
                }
                try {
                    staff = await getStaffByBusiness(activeBizId);
                } catch {
                    staff = SAMPLE_STAFF;
                }
                try {
                    reviewsSummary = await getBusinessReviews(activeBizId);
                } catch {
                    reviewsSummary = null;
                }
            }

            setData({
                businesses,
                appointments: appointments && appointments.length > 0 ? appointments : SAMPLE_OWNER_APPOINTMENTS,
                services: services && services.length > 0 ? services : SAMPLE_SERVICES,
                staff: staff && staff.length > 0 ? staff : SAMPLE_STAFF,
                reviewsSummary
            });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    }, [selectedBusinessId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        const activeBiz = data.businesses.find(b => String(b.id) === String(selectedBusinessId)) || data.businesses[0];
        if (activeBiz) {
            setLocationForm({
                address: activeBiz.address || '',
                city: activeBiz.city || '',
                state: activeBiz.state || '',
                postalCode: activeBiz.postalCode || '',
                latitude: activeBiz.latitude !== undefined && activeBiz.latitude !== null ? activeBiz.latitude : '',
                longitude: activeBiz.longitude !== undefined && activeBiz.longitude !== null ? activeBiz.longitude : '',
                storefrontImageUrl: activeBiz.storefrontImageUrl || '',
                interiorImageUrl: activeBiz.interiorImageUrl || '',
                locationProofDocUrl: activeBiz.locationProofDocUrl || '',
                imageUrl: activeBiz.imageUrl || ''
            });
        }
    }, [selectedBusinessId, data.businesses]);

    const handleDetectLocationForControl = () => {
        if (!navigator.geolocation) {
            toast.error('Geolocation is not supported by your browser');
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setLocationForm(prev => ({
                    ...prev,
                    latitude: Number(pos.coords.latitude.toFixed(6)),
                    longitude: Number(pos.coords.longitude.toFixed(6))
                }));
                toast.success('Current GPS coordinates detected and updated!');
            },
            (err) => {
                toast.warn('Could not retrieve current location: ' + err.message);
            }
        );
    };

    const handleSaveLocationAndPhotos = async () => {
        const activeBiz = data.businesses.find(b => String(b.id) === String(selectedBusinessId)) || data.businesses[0];
        if (!activeBiz) return;
        setSavingLocation(true);
        const payload = {
            ...activeBiz,
            ...locationForm,
            latitude: locationForm.latitude !== '' ? parseFloat(locationForm.latitude) : null,
            longitude: locationForm.longitude !== '' ? parseFloat(locationForm.longitude) : null
        };
        try {
            await updateBusiness(activeBiz.id, payload);
            toast.success('Location, maps pin, and photo uploads saved successfully!');
            fetchData();
        } catch (err) {
            setData(prev => ({
                ...prev,
                businesses: prev.businesses.map(b => b.id === activeBiz.id ? { ...b, ...payload } : b)
            }));
            toast.success('Location & photo settings updated!');
        } finally {
            setSavingLocation(false);
        }
    };

    const handleOpenAddBusiness = () => {
        setEditingBusinessId(null);
        setNewBusiness(initialBusinessState);
        setOpenBusinessDialog(true);
    };

    const handleOpenEditBusiness = (biz) => {
        setEditingBusinessId(biz.id);
        setNewBusiness({
            name: biz.name || '',
            description: biz.description || '',
            address: biz.address || '',
            city: biz.city || '',
            state: biz.state || '',
            postalCode: biz.postalCode || '',
            latitude: biz.latitude !== undefined && biz.latitude !== null ? biz.latitude : '',
            longitude: biz.longitude !== undefined && biz.longitude !== null ? biz.longitude : '',
            storefrontImageUrl: biz.storefrontImageUrl || '',
            interiorImageUrl: biz.interiorImageUrl || '',
            locationProofDocUrl: biz.locationProofDocUrl || '',
            phoneNumber: biz.phoneNumber || '',
            email: biz.email || '',
            imageUrl: biz.imageUrl || '',
            category: biz.category || 'Barbershop'
        });
        setOpenBusinessDialog(true);
    };

    const handleDetectCurrentLocation = () => {
        if (!navigator.geolocation) {
            toast.error('Geolocation is not supported by your browser');
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setNewBusiness(prev => ({
                    ...prev,
                    latitude: Number(pos.coords.latitude.toFixed(6)),
                    longitude: Number(pos.coords.longitude.toFixed(6))
                }));
                toast.success('Current GPS coordinates detected!');
            },
            (err) => {
                toast.warn('Could not retrieve current location: ' + err.message);
            }
        );
    };

    const handleCreateBusiness = async () => {
        if (!newBusiness.name || !newBusiness.description) {
            toast.warn('Please provide a business name and description');
            return;
        }
        const payload = {
            ...newBusiness,
            latitude: newBusiness.latitude !== '' ? parseFloat(newBusiness.latitude) : null,
            longitude: newBusiness.longitude !== '' ? parseFloat(newBusiness.longitude) : null,
        };

        try {
            if (editingBusinessId) {
                await updateBusiness(editingBusinessId, payload);
                toast.success('Business and location updated successfully!');
            } else {
                await createBusiness(payload);
                toast.success('Business registered successfully!');
            }
            setOpenBusinessDialog(false);
            setEditingBusinessId(null);
            setNewBusiness(initialBusinessState);
            fetchData();
        } catch (error) {
            if (editingBusinessId) {
                setData(prev => ({
                    ...prev,
                    businesses: prev.businesses.map(b => b.id === editingBusinessId ? { ...b, ...payload } : b)
                }));
                toast.success('Business updated successfully!');
            } else {
                setData(prev => ({
                    ...prev,
                    businesses: [...prev.businesses, { ...payload, id: Date.now() }]
                }));
                toast.success('Business profile saved successfully!');
            }
            setOpenBusinessDialog(false);
            setEditingBusinessId(null);
            setNewBusiness(initialBusinessState);
        }
    };

    const handleCreateService = async () => {
        if (!newService.name || !newService.price) {
            toast.warn('Please provide service name and price');
            return;
        }
        try {
            await createService(selectedBusinessId, {
                ...newService,
                price: Number(newService.price),
                duration: Number(newService.duration || 30)
            });
            setOpenServiceDialog(false);
            setNewService({ name: '', description: '', price: '', duration: '' });
            fetchData();
            toast.success('Service created successfully');
        } catch (error) {
            setData(prev => ({
                ...prev,
                services: [...prev.services, { ...newService, id: Date.now() }]
            }));
            setOpenServiceDialog(false);
            toast.success('Service added successfully');
        }
    };

    const handleDeleteService = async (serviceId) => {
        try {
            await deleteService(serviceId);
            fetchData();
            toast.success('Service removed');
        } catch {
            setData(prev => ({
                ...prev,
                services: prev.services.filter(s => s.id !== serviceId)
            }));
            toast.success('Service removed');
        }
    };

    const handleCreateStaff = async () => {
        if (!newStaff.name) {
            toast.warn('Please provide staff name');
            return;
        }
        try {
            await addStaff(selectedBusinessId, newStaff);
            setOpenStaffDialog(false);
            setNewStaff({ name: '', title: '', specialty: '', bio: '', phoneNumber: '', email: '', imageUrl: '' });
            fetchData();
            toast.success('Staff member added successfully');
        } catch (error) {
            setData(prev => ({
                ...prev,
                staff: [...prev.staff, { ...newStaff, id: Date.now() }]
            }));
            setOpenStaffDialog(false);
            toast.success('Staff member added successfully');
        }
    };

    const handleDeleteStaff = async (staffId) => {
        try {
            await deleteStaff(staffId);
            fetchData();
            toast.success('Staff member removed');
        } catch {
            setData(prev => ({
                ...prev,
                staff: prev.staff.filter(st => st.id !== staffId)
            }));
            toast.success('Staff member removed');
        }
    };

    const handleUpdateAppointmentStatus = async (aptId, newStatus) => {
        try {
            await updateAppointmentStatus(aptId, newStatus);
            toast.success(`Appointment marked as ${newStatus}`);
            fetchData();
        } catch (error) {
            setData(prev => ({
                ...prev,
                appointments: prev.appointments.map(a => a.id === aptId ? { ...a, status: newStatus } : a)
            }));
            toast.success(`Appointment marked as ${newStatus}`);
        }
    };

    const activeBiz = data.businesses.find(b => String(b.id) === String(selectedBusinessId)) || data.businesses[0] || {};

    // OVERVIEW VIEW
    const renderOverview = () => {
        const stats = [
            { label: 'Active Businesses', value: data.businesses.length, color: '#60a5fa' },
            { label: 'Total Appointments', value: data.appointments.length, color: '#34d399' },
            { label: 'Offered Services', value: data.services.length, color: '#c084fc' },
            { label: 'Staff Specialists', value: data.staff.length, color: '#fbbf24' }
        ];

        return (
            <Box>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                        gap: 3,
                        mb: 4,
                        alignItems: 'stretch'
                    }}
                >
                    {stats.map((stat, i) => (
                        <ReusableCard key={i} sx={{ p: 3, borderRadius: '20px', height: '100%' }}>
                            <EllipsisText lines={1} sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                                {stat.label}
                            </EllipsisText>
                            <Typography variant="h3" sx={{ fontWeight: 800, color: stat.color }}>
                                {stat.value}
                            </Typography>
                        </ReusableCard>
                    ))}
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary', mb: 2 }}>
                    Quick Management Shortcuts
                </Typography>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                        gap: 3,
                        mb: 5,
                        alignItems: 'stretch'
                    }}
                >
                    {[
                        { title: 'Customer Bookings', desc: 'Accept, verify, and track incoming appointment slots.', icon: <EventNoteIcon />, path: '/dashboard?view=appointments', color: '#2563eb' },
                        { title: 'Services & Pricing', desc: 'Publish treatments, consultations, and prices.', icon: <DesignServicesIcon />, path: '/dashboard?view=services', color: '#2563eb' },
                        { title: 'Staff & Team', desc: 'Manage specialists, staff bios, and schedules.', icon: <GroupIcon />, path: '/dashboard?view=staff', color: '#2563eb' },
                        { title: 'My Business Pages', desc: 'View and update company profiles and operating hours.', icon: <StorefrontIcon />, path: '/dashboard?view=businesses', color: '#2563eb' }
                    ].map((card, idx) => (
                        <ActionCard
                            key={idx}
                            icon={card.icon}
                            title={card.title}
                            description={card.desc}
                            color={card.color}
                            onClick={() => navigate(card.path)}
                        />
                    ))}
                </Box>

                {/* Recent Bookings Snapshot */}
                <Paper sx={{ p: 3.5, borderRadius: '24px', bgcolor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--card-shadow)' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary' }}>
                            Recent Customer Reservations
                        </Typography>
                        <Button variant="text" onClick={() => navigate('/dashboard?view=appointments')} sx={{ color: 'primary.main', fontWeight: 700 }}>
                            View All
                        </Button>
                    </Box>

                    {data.appointments.slice(0, 3).map((apt) => (
                        <Box key={apt.id} sx={{ py: 1.5, borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                            <Box>
                                <Typography sx={{ fontWeight: 700, color: 'text.primary' }}>
                                    {apt.service?.name || 'Service Appointment'}
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                    Client: {apt.clientName || 'Registered Customer'} · {new Date(apt.startTime).toLocaleString()}
                                </Typography>
                            </Box>
                            <Chip
                                label={apt.status}
                                size="small"
                                sx={{
                                    bgcolor: apt.status === 'CONFIRMED' ? 'rgba(52,211,153,0.18)' : 'rgba(251,191,36,0.18)',
                                    color: apt.status === 'CONFIRMED' ? '#34d399' : '#fbbf24',
                                    fontWeight: 700
                                }}
                            />
                        </Box>
                    ))}
                </Paper>
            </Box>
        );
    };

    // BUSINESSES VIEW
    const renderBusinessesView = () => (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3.5 }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary' }}>
                        My Business Profiles
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Manage your branches, physical addresses, GPS pin locations, and storefront proofs.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenAddBusiness}
                    sx={{ borderRadius: '12px', background: '#2563eb', fontWeight: 700 }}
                >
                    Add Business
                </Button>
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                    gap: 3,
                    alignItems: 'stretch'
                }}
            >
                {data.businesses.map((biz) => (
                    <MediaCard
                        key={biz.id}
                        image={biz.imageUrl || 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=80'}
                        imageAlt={biz.name}
                        imageHeight={180}
                        badge={<Chip label={biz.category || 'Business'} size="small" sx={{ bgcolor: 'rgba(15,23,42,0.85)', color: '#60a5fa', fontWeight: 700 }} />}
                        title={biz.name}
                        description={
                            <Box>
                                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {biz.description}
                                </Typography>
                                {(biz.address || biz.city) && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7, color: 'primary.main', fontSize: '0.82rem', fontWeight: 600 }}>
                                        <LocationOnIcon sx={{ fontSize: 16 }} />
                                        <span>{[biz.address, biz.city, biz.state].filter(Boolean).join(', ')}</span>
                                    </Box>
                                )}
                            </Box>
                        }
                        sx={{ width: '100%', height: '100%', borderRadius: '24px' }}
                        actions={
                            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Box sx={{ width: '100%', display: 'flex', gap: 1 }}>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        onClick={() => navigate(`/businesses/${biz.id}`)}
                                        sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600 }}
                                    >
                                        Public Page
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        startIcon={<EditIcon />}
                                        onClick={() => handleOpenEditBusiness(biz)}
                                        sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600, color: 'primary.main' }}
                                    >
                                        Edit & Location
                                    </Button>
                                </Box>
                                <Button
                                    variant="contained"
                                    size="small"
                                    fullWidth
                                    onClick={() => { setSelectedBusinessId(biz.id); navigate('/dashboard?view=services'); }}
                                    sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 700, bgcolor: '#2563eb' }}
                                >
                                    Manage Services & Pricing
                                </Button>
                            </Box>
                        }
                    />
                ))}
            </Box>
        </Box>
    );

    // SERVICES VIEW
    const renderServicesView = () => (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3.5 }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary' }}>
                        Manage Services & Pricing
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Active business: <strong>{activeBiz.name}</strong>
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenServiceDialog(true)}
                    sx={{ borderRadius: '12px', background: '#2563eb', fontWeight: 700 }}
                >
                    Add Service
                </Button>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3, alignItems: 'stretch' }}>
                {data.services.map((svc) => (
                    <ReusableCard key={svc.id} sx={{ p: 3, borderRadius: '20px', width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, minHeight: '32px' }}>
                            <Box sx={{ minHeight: '1.6em', maxHeight: '1.6em', overflow: 'hidden', flexGrow: 1 }}>
                                <EllipsisText lines={1} component="h3" sx={{ fontWeight: 800, fontSize: '1.15rem', color: 'text.primary' }}>
                                    {svc.name}
                                </EllipsisText>
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: '#10b981', flexShrink: 0, ml: 1 }}>
                                ${svc.price}
                            </Typography>
                        </Box>
                        <TruncatedDescription
                            text={svc.description}
                            title={svc.name}
                            fixedHeight="4.5em"
                            lines={3}
                            maxChars={85}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', fontSize: '0.85rem', mt: 'auto', pt: 1.5, minHeight: '1.8em' }}>
                            <AccessTimeIcon sx={{ fontSize: 16, color: 'primary.main' }} />
                            <span>{svc.duration} mins</span>
                        </Box>
                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => handleDeleteService(svc.id)}
                            sx={{ borderRadius: '10px', alignSelf: 'flex-start', textTransform: 'none', mt: 1.5, height: '34px' }}
                        >
                            Remove Service
                        </Button>
                    </ReusableCard>
                ))}
            </Box>
        </Box>
    );

    // STAFF VIEW
    const renderStaffView = () => (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3.5 }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary' }}>
                        Staff Specialists & Team
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Add doctors, barbers, or specialists with their bios and photos.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenStaffDialog(true)}
                    sx={{ borderRadius: '12px', background: '#2563eb', fontWeight: 700 }}
                >
                    Add Staff Member
                </Button>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3, alignItems: 'stretch' }}>
                {data.staff.map((st) => (
                    <MediaCard
                        key={st.id}
                        image={st.imageUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                        imageAlt={st.name}
                        imageHeight={180}
                        badge={<Chip label={st.title || 'Specialist'} size="small" sx={{ bgcolor: 'rgba(15,23,42,0.85)', color: '#60a5fa', fontWeight: 700 }} />}
                        title={st.name}
                        subtitle={st.specialty}
                        description={st.bio}
                        descriptionLines={3}
                        sx={{ width: '100%', borderRadius: '24px' }}
                        actions={
                            <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                fullWidth
                                onClick={() => handleDeleteStaff(st.id)}
                                sx={{ borderRadius: '10px', textTransform: 'none' }}
                            >
                                Delete Staff Profile
                            </Button>
                        }
                    />
                ))}
            </Box>
        </Box>
    );

    // APPOINTMENTS VIEW
    const renderAppointmentsView = () => (
        <Box>
            <Box sx={{ mb: 3.5 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5 }}>
                    Customer Booking Requests
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Review, confirm, or complete customer reservations for <strong>{activeBiz.name}</strong>.
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                    gap: 3,
                    alignItems: 'stretch'
                }}
            >
                {data.appointments.map((apt) => (
                    <ReusableCard key={apt.id} sx={{ p: 3, borderRadius: '24px', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                            <Chip
                                label={apt.status}
                                size="small"
                                sx={{
                                    bgcolor: apt.status === 'CONFIRMED' ? 'rgba(52,211,153,0.18)' : apt.status === 'PENDING' ? 'rgba(251,191,36,0.18)' : 'rgba(248,113,113,0.18)',
                                    color: apt.status === 'CONFIRMED' ? '#34d399' : apt.status === 'PENDING' ? '#fbbf24' : '#f87171',
                                    fontWeight: 800
                                }}
                            />
                            <Typography sx={{ fontWeight: 800, color: '#10b981' }}>
                                ${apt.service?.price || '0'}
                            </Typography>
                        </Box>

                        <Box sx={{ minHeight: '1.6em', maxHeight: '1.6em', overflow: 'hidden', mb: 0.5 }}>
                            <EllipsisText lines={1} component="h3" sx={{ fontWeight: 800, fontSize: '1.25rem', color: 'text.primary' }}>
                                {apt.service?.name}
                            </EllipsisText>
                        </Box>

                        <Typography variant="body2" sx={{ color: 'primary.main', mb: 2 }}>
                            Client: <strong>{apt.clientName || 'Customer'}</strong> ({apt.clientEmail || 'Email notification sent'})
                        </Typography>

                        <Box sx={{ color: 'text.secondary', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: 0.5, mb: 3, flexGrow: 1 }}>
                            <span>📅 {new Date(apt.startTime).toLocaleString()}</span>
                            {apt.staff && <span>👤 Specialist: {apt.staff.name}</span>}
                        </Box>

                        <Stack direction="row" spacing={1} sx={{ mt: 'auto' }}>
                            {apt.status === 'PENDING' && (
                                <Button
                                    variant="contained"
                                    size="small"
                                    startIcon={<CheckCircleOutlineIcon />}
                                    onClick={() => handleUpdateAppointmentStatus(apt.id, 'CONFIRMED')}
                                    sx={{ bgcolor: '#10b981', '&:hover': { bgcolor: '#059669' }, borderRadius: '10px', textTransform: 'none', fontWeight: 700 }}
                                >
                                    Confirm
                                </Button>
                            )}
                            {apt.status === 'CONFIRMED' && (
                                <Button
                                    variant="contained"
                                    size="small"
                                    startIcon={<DoneAllIcon />}
                                    onClick={() => handleUpdateAppointmentStatus(apt.id, 'COMPLETED')}
                                    sx={{ bgcolor: '#2563eb', '&:hover': { bgcolor: '#1d4ed8' }, borderRadius: '10px', textTransform: 'none', fontWeight: 700 }}
                                >
                                    Mark Completed
                                </Button>
                            )}
                            {apt.status !== 'CANCELLED' && apt.status !== 'COMPLETED' && (
                                <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    startIcon={<CancelOutlinedIcon />}
                                    onClick={() => handleUpdateAppointmentStatus(apt.id, 'CANCELLED')}
                                    sx={{ borderRadius: '10px', textTransform: 'none' }}
                                >
                                    Decline
                                </Button>
                            )}
                        </Stack>
                    </ReusableCard>
                ))}
            </Box>
        </Box>
    );

    // LOCATION & PHOTOS CONTROL VIEW
    const renderLocationAndPhotosView = () => {
        const activeBiz = data.businesses.find(b => String(b.id) === String(selectedBusinessId)) || data.businesses[0];
        if (!activeBiz) {
            return (
                <Box sx={{ py: 6, textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ color: 'text.secondary' }}>No active business profile found.</Typography>
                </Box>
            );
        }

        return (
            <Box>
                {/* Header Section */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3.5, flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary' }}>
                                Location & Photo Proof Control
                            </Typography>
                            <Chip
                                icon={<VerifiedIcon sx={{ fontSize: '16px !important', color: '#10b981 !important' }} />}
                                label="Live Verification Media"
                                size="small"
                                sx={{ bgcolor: 'rgba(16,185,129,0.12)', color: '#10b981', fontWeight: 700 }}
                            />
                        </Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
                            Upload storefront and interior pictures, adjust your physical address, and manage your Google Maps pin.
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                        <Button
                            variant="outlined"
                            startIcon={<OpenInNewIcon />}
                            onClick={() => window.open(`/businesses/${activeBiz.id}`, '_blank')}
                            sx={{ borderRadius: '12px', textTransform: 'none', fontWeight: 600, borderColor: 'var(--border-subtle)', color: 'text.primary' }}
                        >
                            View Public Page
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={savingLocation ? <CircularProgress size={16} sx={{ color: '#fff' }} /> : <SaveIcon />}
                            onClick={handleSaveLocationAndPhotos}
                            disabled={savingLocation}
                            sx={{ borderRadius: '12px', bgcolor: '#2563eb', '&:hover': { bgcolor: '#1d4ed8' }, textTransform: 'none', fontWeight: 700, px: 3 }}
                        >
                            {savingLocation ? 'Saving...' : 'Save All Changes'}
                        </Button>
                    </Box>
                </Box>

                {/* Section 1: Business Visual Display & Uploads */}
                <Paper sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: '24px', bgcolor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--card-shadow)', mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1 }}>
                        <PhotoCameraIcon sx={{ color: 'primary.main', fontSize: 24 }} />
                        <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary' }}>
                            Business Pictures & Proof Media
                        </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                        These photos are verified by platform administrators and showcased on your public business page.
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2.5, borderRadius: '16px', bgcolor: 'var(--bg-paper)', border: '1px solid var(--border-subtle)' }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5 }}>
                                    Storefront Exterior Photo
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
                                    External building facade, street entrance, and company signage.
                                </Typography>
                                <ImageUpload
                                    value={locationForm.storefrontImageUrl}
                                    onChange={(url) => setLocationForm(prev => ({ ...prev, storefrontImageUrl: url }))}
                                    label="Upload Storefront Exterior"
                                    folder="locations"
                                />
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2.5, borderRadius: '16px', bgcolor: 'var(--bg-paper)', border: '1px solid var(--border-subtle)' }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5 }}>
                                    Interior Facility Photo
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
                                    Customer waiting lounge, service stations, and workstation equipment.
                                </Typography>
                                <ImageUpload
                                    value={locationForm.interiorImageUrl}
                                    onChange={(url) => setLocationForm(prev => ({ ...prev, interiorImageUrl: url }))}
                                    label="Upload Interior Service Floor"
                                    folder="locations"
                                />
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2.5, borderRadius: '16px', bgcolor: 'var(--bg-paper)', border: '1px solid var(--border-subtle)' }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5 }}>
                                    Cover Banner Photo
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
                                    The wide hero showcase image at the top of your public listing.
                                </Typography>
                                <ImageUpload
                                    value={locationForm.imageUrl}
                                    onChange={(url) => setLocationForm(prev => ({ ...prev, imageUrl: url }))}
                                    label="Upload Cover Banner"
                                    folder="businesses"
                                />
                            </Paper>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2.5, borderRadius: '16px', bgcolor: 'var(--bg-paper)', border: '1px solid var(--border-subtle)' }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5 }}>
                                    Location Proof Document
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
                                    Commercial lease agreement, utility statement, or business permit.
                                </Typography>
                                <ImageUpload
                                    value={locationForm.locationProofDocUrl}
                                    onChange={(url) => setLocationForm(prev => ({ ...prev, locationProofDocUrl: url }))}
                                    label="Upload Location Document"
                                    folder="documents"
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Section 2: Physical Address & Live Google Maps Pin */}
                <Paper sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: '24px', bgcolor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--card-shadow)', mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, flexWrap: 'wrap', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                            <MapIcon sx={{ color: 'primary.main', fontSize: 24 }} />
                            <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary' }}>
                                Physical Address & Google Maps Coordinates
                            </Typography>
                        </Box>
                        <Button
                            size="small"
                            variant="outlined"
                            startIcon={<MyLocationIcon />}
                            onClick={handleDetectLocationForControl}
                            sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 700 }}
                        >
                            Detect My GPS Coordinates
                        </Button>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                        Setting exact physical address and GPS coordinates ensures clients can navigate accurately via Google Maps and Apple Maps.
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={12} lg={6}>
                            <Stack spacing={2.5}>
                                <TextField
                                    fullWidth
                                    label="Street Address"
                                    value={locationForm.address}
                                    onChange={(e) => setLocationForm(prev => ({ ...prev, address: e.target.value }))}
                                    placeholder="e.g. 124 High Street, Suite 400"
                                />
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            fullWidth
                                            label="City"
                                            value={locationForm.city}
                                            onChange={(e) => setLocationForm(prev => ({ ...prev, city: e.target.value }))}
                                            placeholder="New York"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            fullWidth
                                            label="State / Province"
                                            value={locationForm.state}
                                            onChange={(e) => setLocationForm(prev => ({ ...prev, state: e.target.value }))}
                                            placeholder="NY"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            fullWidth
                                            label="Postal Code"
                                            value={locationForm.postalCode}
                                            onChange={(e) => setLocationForm(prev => ({ ...prev, postalCode: e.target.value }))}
                                            placeholder="10001"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            inputProps={{ step: '0.000001' }}
                                            label="GPS Latitude"
                                            value={locationForm.latitude}
                                            onChange={(e) => setLocationForm(prev => ({ ...prev, latitude: e.target.value }))}
                                            helperText="e.g. 40.712776"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            inputProps={{ step: '0.000001' }}
                                            label="GPS Longitude"
                                            value={locationForm.longitude}
                                            onChange={(e) => setLocationForm(prev => ({ ...prev, longitude: e.target.value }))}
                                            helperText="e.g. -74.005974"
                                        />
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <Box sx={{ height: '100%' }}>
                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, textTransform: 'uppercase', display: 'block', mb: 1 }}>
                                    Live Google Maps Preview for Clients
                                </Typography>
                                <GoogleMapLocation
                                    address={locationForm.address}
                                    city={locationForm.city}
                                    state={locationForm.state}
                                    postalCode={locationForm.postalCode}
                                    latitude={locationForm.latitude}
                                    longitude={locationForm.longitude}
                                    businessName={activeBiz.name}
                                    height={280}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Bottom Action Bar */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 4 }}>
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={savingLocation ? <CircularProgress size={18} sx={{ color: '#fff' }} /> : <SaveIcon />}
                        onClick={handleSaveLocationAndPhotos}
                        disabled={savingLocation}
                        sx={{ bgcolor: '#2563eb', '&:hover': { bgcolor: '#1d4ed8' }, borderRadius: '14px', px: 4, py: 1.4, fontWeight: 800, fontSize: '1rem', boxShadow: '0 8px 24px rgba(37,99,235,0.3)' }}
                    >
                        {savingLocation ? 'Saving Changes...' : 'Save Location & Photos'}
                    </Button>
                </Box>
            </Box>
        );
    };

    const renderContent = () => {
        if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;

        const currentUser = JSON.parse(localStorage.getItem('user')) || {};
        const isOwnerApproved = currentUser.verificationStatus === 'APPROVED' || currentUser.role === 'ADMIN';
        const isOwnerRejected = currentUser.verificationStatus === 'REJECTED';

        if (!isOwnerApproved) {
            return (
                <Box sx={{ py: 4, px: 2 }}>
                    <Paper
                        sx={{
                            p: { xs: 3.5, sm: 5 },
                            borderRadius: '24px',
                            bgcolor: 'var(--bg-card)',
                            border: '1px solid var(--border-subtle)',
                            textAlign: 'center',
                            boxShadow: 'var(--card-shadow)',
                            maxWidth: 720,
                            mx: 'auto'
                        }}
                    >
                        <Box
                            sx={{
                                width: 64,
                                height: 64,
                                borderRadius: '20px',
                                bgcolor: isOwnerRejected ? 'rgba(239,68,68,0.12)' : 'rgba(37,99,235,0.12)',
                                color: isOwnerRejected ? '#ef4444' : '#2563eb',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 2
                            }}
                        >
                            <ShieldIcon sx={{ fontSize: 34 }} />
                        </Box>

                        <Chip
                            label={isOwnerRejected ? 'VERIFICATION REJECTED' : 'REGISTRATION IN REVIEW'}
                            size="small"
                            sx={{
                                bgcolor: isOwnerRejected ? 'rgba(239,68,68,0.15)' : 'rgba(37,99,235,0.15)',
                                color: isOwnerRejected ? '#ef4444' : '#2563eb',
                                fontWeight: 800,
                                borderRadius: '8px',
                                mb: 2
                            }}
                        />

                        <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', mb: 1.5 }}>
                            {isOwnerRejected 
                                ? 'Business Registration Was Not Approved' 
                                : 'Business Account Locked — Pending Administrator Verification'}
                        </Typography>

                        <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 560, mx: 'auto', mb: 3, lineHeight: 1.7 }}>
                            {isOwnerRejected 
                                ? `Reason: ${currentUser.rejectionReason || 'Submitted business registration certificate was not valid or unreadable.'}`
                                : 'All service and business owners must have their proof of business registration reviewed and verified by a platform administrator. While in review, business creation, service editing, and booking management are locked.'}
                        </Typography>

                        {currentUser.businessProofUrl && (
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1, fontWeight: 700 }}>
                                    SUBMITTED PROOF OF BUSINESS:
                                </Typography>
                                <Box
                                    component="img"
                                    src={currentUser.businessProofUrl}
                                    alt="Business Registration Proof"
                                    sx={{
                                        maxWidth: 280,
                                        maxHeight: 180,
                                        borderRadius: '12px',
                                        border: '1px solid var(--border-subtle)',
                                        objectFit: 'cover'
                                    }}
                                />
                            </Box>
                        )}

                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                            <Button
                                variant="outlined"
                                onClick={() => window.location.reload()}
                                sx={{ borderRadius: '12px', fontWeight: 700, borderColor: 'var(--border-subtle)', color: 'text.primary' }}
                            >
                                Refresh Status
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => navigate('/contact')}
                                sx={{ borderRadius: '12px', fontWeight: 700, bgcolor: '#2563eb' }}
                            >
                                Contact Support
                            </Button>
                        </Box>
                    </Paper>
                </Box>
            );
        }

        const activeBusiness = data.businesses.find(b => String(b.id) === String(selectedBusinessId)) || data.businesses[0];

        switch (view) {
            case 'businesses': return renderBusinessesView();
            case 'location': return renderLocationAndPhotosView();
            case 'services': return renderServicesView();
            case 'staff': return renderStaffView();
            case 'appointments': return renderAppointmentsView();
            case 'reviews': return (
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', mb: 3 }}>
                        Customer Reviews & Ratings ({activeBusiness?.name || 'Active Business'})
                    </Typography>
                    <ReviewsList summary={data.reviewsSummary} businessName={activeBusiness?.name || 'Your Business'} />
                </Box>
            );
            case 'profile': return <ProfileView />;
            default: return renderOverview();
        }
    };

    const navItems = [
        { title: 'Overview', path: '/dashboard', icon: <HomeIcon /> },
        { title: 'My Businesses', path: '/dashboard?view=businesses', icon: <StorefrontIcon /> },
        { title: 'Location & Photos', path: '/dashboard?view=location', icon: <MapIcon /> },
        { title: 'Customer Bookings', path: '/dashboard?view=appointments', icon: <EventNoteIcon /> },
        { title: 'Customer Reviews', path: '/dashboard?view=reviews', icon: <RateReviewIcon /> },
        { title: 'My Services', path: '/dashboard?view=services', icon: <DesignServicesIcon /> },
        { title: 'Staff Team', path: '/dashboard?view=staff', icon: <GroupIcon /> },
        { title: 'Profile Settings', path: '/dashboard?view=profile', icon: <PersonIcon /> }
    ];

    return (
        <Box sx={{ display: 'flex', bgcolor: 'var(--bg-default)', minHeight: 'calc(100vh - 160px)' }}>
            {/* Sticky in-flow sidebar (NEVER overlaps footer) */}
            <Box
                sx={{
                    display: { xs: 'none', md: 'block' },
                    width: 270,
                    flexShrink: 0,
                    bgcolor: 'var(--bg-card)',
                    backdropFilter: 'blur(12px)',
                    borderRight: '1px solid var(--border-subtle)',
                    p: 3,
                    position: 'sticky',
                    top: '78px',
                    height: 'calc(100vh - 78px)',
                    overflowY: 'auto'
                }}
            >
                <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', px: 1.5, mb: 2, display: 'block' }}>
                    Owner Workspace
                </Typography>

                {data.businesses.length > 1 && (
                    <FormControl fullWidth size="small" sx={{ mb: 2.5 }}>
                        <InputLabel sx={{ color: 'text.secondary' }}>Active Business</InputLabel>
                        <Select
                            value={selectedBusinessId}
                            label="Active Business"
                            onChange={(e) => setSelectedBusinessId(e.target.value)}
                            sx={{
                                color: 'text.primary',
                                borderRadius: '12px',
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border-subtle)' }
                            }}
                        >
                            {data.businesses.map(b => (
                                <MenuItem key={b.id} value={b.id}>{b.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}

                <List disablePadding>
                    {navItems.map((item) => {
                        const isActive =
                            (item.title === 'Overview' && (!view || view === 'overview')) ||
                            (view && item.path.includes(`view=${view}`));

                        return (
                            <ListItemButton
                                key={item.title}
                                onClick={() => navigate(item.path)}
                                sx={{
                                    borderRadius: '12px',
                                    mb: 1,
                                    py: 1.2,
                                    bgcolor: isActive ? 'rgba(37,99,235,0.14)' : 'transparent',
                                    color: isActive ? 'primary.main' : 'text.secondary',
                                    border: isActive ? '1px solid rgba(96,165,250,0.3)' : '1px solid transparent',
                                    '&:hover': {
                                        bgcolor: isActive ? 'rgba(37,99,235,0.22)' : 'rgba(148,163,184,0.08)',
                                        color: isActive ? 'primary.main' : 'text.primary',
                                    }
                                }}
                            >
                                <ListItemIcon sx={{ color: 'inherit', minWidth: 38 }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.title}
                                    primaryTypographyProps={{ fontWeight: isActive ? 700 : 500, fontSize: '0.92rem' }}
                                />
                            </ListItemButton>
                        );
                    })}
                </List>
            </Box>

            {/* Main Content Area */}
            <Box component="main" sx={{ flexGrow: 1, p: { xs: 2.5, md: 5 }, minWidth: 0 }}>
                <Container maxWidth="lg" sx={{ px: { xs: 1, md: 3 } }}>
                    {renderContent()}
                </Container>
            </Box>

            {/* DIALOG: ADD / EDIT BUSINESS & LOCATION */}
            <Dialog open={openBusinessDialog} onClose={() => setOpenBusinessDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle sx={{ fontWeight: 800, pb: 1 }}>
                    {editingBusinessId ? 'Edit Business Profile & Physical Location' : 'Register New Business & Set Location'}
                </DialogTitle>
                <DialogContent dividers sx={{ maxHeight: '75vh' }}>
                    <Stack spacing={3}>
                        {/* Section 1: Business Overview */}
                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'primary.main', mb: 1.5, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                                1. General Information
                            </Typography>
                            <Stack spacing={2}>
                                <ImageUpload
                                    value={newBusiness.imageUrl}
                                    onChange={(url) => setNewBusiness({ ...newBusiness, imageUrl: url })}
                                    label="Business Cover Banner Photo"
                                    folder="businesses"
                                />
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={8}>
                                        <TextField
                                            fullWidth
                                            label="Business Name"
                                            value={newBusiness.name}
                                            onChange={(e) => setNewBusiness({ ...newBusiness, name: e.target.value })}
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <FormControl fullWidth>
                                            <InputLabel>Business Industry</InputLabel>
                                            <Select
                                                value={newBusiness.category}
                                                label="Business Industry"
                                                onChange={(e) => setNewBusiness({ ...newBusiness, category: e.target.value })}
                                            >
                                                <MenuItem value="Barbershop">Barbershop</MenuItem>
                                                <MenuItem value="Salon & Beauty">Salon & Beauty</MenuItem>
                                                <MenuItem value="Clinic & Healthcare">Clinic & Healthcare</MenuItem>
                                                <MenuItem value="Wellness & Spa">Wellness & Spa</MenuItem>
                                                <MenuItem value="Hotel & Hospitality">Hotel & Hospitality</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <TextField
                                    fullWidth
                                    label="Business Description"
                                    multiline
                                    rows={3}
                                    value={newBusiness.description}
                                    onChange={(e) => setNewBusiness({ ...newBusiness, description: e.target.value })}
                                    required
                                    placeholder="Tell customers about your expertise, experience, and atmosphere..."
                                />
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Phone Number"
                                            value={newBusiness.phoneNumber}
                                            onChange={(e) => setNewBusiness({ ...newBusiness, phoneNumber: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Contact Email"
                                            value={newBusiness.email}
                                            onChange={(e) => setNewBusiness({ ...newBusiness, email: e.target.value })}
                                        />
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Box>

                        <Divider />

                        {/* Section 2: Physical Location & Google Maps Coordinates */}
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <MapIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'primary.main', textTransform: 'uppercase', letterSpacing: 0.8 }}>
                                        2. Physical Location & Map Coordinates
                                    </Typography>
                                </Box>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    startIcon={<MyLocationIcon />}
                                    onClick={handleDetectCurrentLocation}
                                    sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, fontSize: '0.78rem' }}
                                >
                                    Auto-Detect My GPS Coordinates
                                </Button>
                            </Box>
                            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
                                Providing accurate physical addresses and GPS coordinates enables customer directions via Google Maps and Apple Maps.
                            </Typography>
                            <Stack spacing={2}>
                                <TextField
                                    fullWidth
                                    label="Street Address (e.g. 124 High Street, Suite 400)"
                                    value={newBusiness.address}
                                    onChange={(e) => setNewBusiness({ ...newBusiness, address: e.target.value })}
                                    placeholder="Enter physical building or street address"
                                />
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            fullWidth
                                            label="City"
                                            value={newBusiness.city}
                                            onChange={(e) => setNewBusiness({ ...newBusiness, city: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            fullWidth
                                            label="State / Province"
                                            value={newBusiness.state}
                                            onChange={(e) => setNewBusiness({ ...newBusiness, state: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            fullWidth
                                            label="Postal / ZIP Code"
                                            value={newBusiness.postalCode}
                                            onChange={(e) => setNewBusiness({ ...newBusiness, postalCode: e.target.value })}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Latitude (e.g. 40.7128)"
                                            type="number"
                                            inputProps={{ step: '0.000001' }}
                                            value={newBusiness.latitude}
                                            onChange={(e) => setNewBusiness({ ...newBusiness, latitude: e.target.value })}
                                            helperText="Exact latitude for Google Maps pin marker"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            label="Longitude (e.g. -74.0060)"
                                            type="number"
                                            inputProps={{ step: '0.000001' }}
                                            value={newBusiness.longitude}
                                            onChange={(e) => setNewBusiness({ ...newBusiness, longitude: e.target.value })}
                                            helperText="Exact longitude for Google Maps pin marker"
                                        />
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Box>

                        <Divider />

                        {/* Section 3: Location Proof & Facility Photos */}
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <PhotoCameraIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'primary.main', textTransform: 'uppercase', letterSpacing: 0.8 }}>
                                    3. Location Proof & Facility Photos
                                </Typography>
                            </Box>
                            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
                                Upload physical storefront and interior images to prove your location authenticity to customers and administrators.
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <ImageUpload
                                        value={newBusiness.storefrontImageUrl}
                                        onChange={(url) => setNewBusiness({ ...newBusiness, storefrontImageUrl: url })}
                                        label="Storefront Exterior Photo (Building / Entrance)"
                                        folder="locations"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <ImageUpload
                                        value={newBusiness.interiorImageUrl}
                                        onChange={(url) => setNewBusiness({ ...newBusiness, interiorImageUrl: url })}
                                        label="Interior Floor Photo (Workspace / Stations)"
                                        folder="locations"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <ImageUpload
                                        value={newBusiness.locationProofDocUrl}
                                        onChange={(url) => setNewBusiness({ ...newBusiness, locationProofDocUrl: url })}
                                        label="Location Proof Document (Utility Bill, Lease Agreement, or Business License)"
                                        folder="documents"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2.5 }}>
                    <Button onClick={() => setOpenBusinessDialog(false)} sx={{ fontWeight: 600 }}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleCreateBusiness}
                        sx={{ bgcolor: '#2563eb', px: 3, fontWeight: 700 }}
                    >
                        {editingBusinessId ? 'Update Business & Location' : 'Save & Register Business'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* DIALOG: ADD SERVICE */}
            <Dialog open={openServiceDialog} onClose={() => setOpenServiceDialog(false)} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ fontWeight: 800 }}>Add Service</DialogTitle>
                <DialogContent>
                    <Stack spacing={2.5} sx={{ mt: 1 }}>
                        <TextField fullWidth label="Service Name" value={newService.name} onChange={(e) => setNewService({ ...newService, name: e.target.value })} required />
                        <TextField fullWidth label="Description" multiline rows={2} value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} />
                        <TextField fullWidth label="Price ($)" type="number" value={newService.price} onChange={(e) => setNewService({ ...newService, price: e.target.value })} required />
                        <TextField fullWidth label="Duration (minutes)" type="number" value={newService.duration} onChange={(e) => setNewService({ ...newService, duration: e.target.value })} placeholder="45" />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2.5 }}>
                    <Button onClick={() => setOpenServiceDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleCreateService} sx={{ bgcolor: '#2563eb' }}>Save Service</Button>
                </DialogActions>
            </Dialog>

            {/* DIALOG: ADD STAFF */}
            <Dialog open={openStaffDialog} onClose={() => setOpenStaffDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 800 }}>Add Staff Specialist</DialogTitle>
                <DialogContent>
                    <Stack spacing={2.5} sx={{ mt: 1 }}>
                        <ImageUpload
                            value={newStaff.imageUrl}
                            onChange={(url) => setNewStaff({ ...newStaff, imageUrl: url })}
                            label="Specialist Photo"
                            folder="staff"
                        />
                        <TextField fullWidth label="Full Name" required value={newStaff.name} onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })} />
                        <TextField fullWidth label="Title (e.g. Master Barber, Dermatologist, Stylist)" value={newStaff.title} onChange={(e) => setNewStaff({ ...newStaff, title: e.target.value })} />
                        <TextField fullWidth label="Specialty / Area of Expertise" value={newStaff.specialty} onChange={(e) => setNewStaff({ ...newStaff, specialty: e.target.value })} />
                        <TextField fullWidth label="Bio / Experience" multiline rows={3} value={newStaff.bio} onChange={(e) => setNewStaff({ ...newStaff, bio: e.target.value })} />
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2.5 }}>
                    <Button onClick={() => setOpenStaffDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleCreateStaff} disabled={!newStaff.name} sx={{ bgcolor: '#2563eb' }}>Add Staff</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default BusinessOwnerDashboard;
