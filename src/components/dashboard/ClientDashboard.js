import React, { useState, useEffect, useCallback } from 'react';
import { 
    Box, 
    Container, 
    Typography, 
    Button, 
    CircularProgress,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Paper,
    Chip,
    Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import { getMyAppointments } from '../../services/appointmentService';
import { getMyReviews } from '../../services/reviewService';
import BusinessList from '../business/BusinessList';
import ReusableCard, { ActionCard, EllipsisText } from '../common/ReusableCard';
import ProfileView from './ProfileView';
import WriteReviewModal from '../reviews/WriteReviewModal';

// Fallback demo appointments if backend is not yet populated
const SAMPLE_APPOINTMENTS = [
    {
        id: 1,
        startTime: new Date(Date.now() + 86400000 * 2).toISOString(),
        status: 'CONFIRMED',
        service: { name: 'Master Barber Haircut & Beard Sculpt', price: 45, duration: 45 },
        business: { id: 1, name: 'The Royal Blade Barbershop', address: '124 High Street, Downtown', imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=400&q=80' },
        staff: { name: 'Marcus Vance', title: 'Master Barber' }
    },
    {
        id: 2,
        startTime: new Date(Date.now() - 86400000 * 5).toISOString(),
        status: 'COMPLETED',
        service: { name: 'Comprehensive Dental Health Check', price: 120, duration: 60 },
        business: { id: 3, name: 'Apex Family Dental & Orthodontics', address: '450 Medical Center Plaza', imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=400&q=80' },
        staff: { name: 'Dr. Sarah Bennett', title: 'Lead Dentist' }
    }
];

const ClientDashboard = ({ view }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [selectedAptToReview, setSelectedAptToReview] = useState(null);
    const [reviewedAptIds, setReviewedAptIds] = useState(new Set());

    const currentUser = JSON.parse(localStorage.getItem('user')) || {};
    const userName = currentUser.name || "Valued Client";
    const isApproved = currentUser.verificationStatus === 'APPROVED' || currentUser.role === 'ADMIN';
    const isRejected = currentUser.verificationStatus === 'REJECTED';

    const fetchAppointments = useCallback(async () => {
        setLoading(true);
        try {
            const [data, reviews] = await Promise.all([
                getMyAppointments().catch(() => null),
                getMyReviews().catch(() => [])
            ]);

            if (data && data.length > 0) {
                setAppointments(data);
            } else {
                setAppointments(SAMPLE_APPOINTMENTS);
            }

            if (reviews && Array.isArray(reviews)) {
                setReviewedAptIds(new Set(reviews.map(r => r.appointmentId)));
            }
        } catch (error) {
            console.warn('Backend getMyAppointments fallback:', error);
            setAppointments(SAMPLE_APPOINTMENTS);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAppointments();
    }, [fetchAppointments]);

    const activeApts = appointments.filter(a => a.status === 'CONFIRMED' || a.status === 'PENDING');
    const completedApts = appointments.filter(a => a.status === 'COMPLETED');

    const filteredAppointments = appointments.filter(apt => {
        if (statusFilter === 'ALL') return true;
        return apt.status === statusFilter;
    });

    const renderOverview = () => {
        const stats = [
            { label: 'Total Bookings', value: appointments.length, color: '#2563eb' },
            { label: 'Active & Upcoming', value: activeApts.length, color: '#10b981' },
            { label: 'Completed', value: completedApts.length, color: '#64748b' }
        ];

        const cards = [
            {
                title: 'My Appointments',
                desc: 'Review schedule, check times, and view specialist details.',
                icon: <CalendarMonthIcon sx={{ fontSize: 28 }} />,
                path: '/dashboard?view=appointments',
                color: '#2563eb'
            },
            {
                title: 'Book a Service',
                desc: isApproved ? 'Explore curated local businesses and pick available slots.' : 'Locked pending administrative ID verification.',
                icon: <SearchIcon sx={{ fontSize: 28 }} />,
                path: isApproved ? '/dashboard?view=businesses' : '#',
                color: isApproved ? '#2563eb' : '#94a3b8',
                locked: !isApproved
            },
            {
                title: 'Profile & Security',
                desc: 'Manage your contact information, phone, and profile photo.',
                icon: <PersonIcon sx={{ fontSize: 28 }} />,
                path: '/dashboard?view=profile',
                color: '#2563eb'
            }
        ];

        return (
            <Box>
                {/* Administrative Verification Notice for Clients */}
                {!isApproved && (
                    <Paper
                        sx={{
                            p: 3,
                            mb: 4,
                            borderRadius: '16px',
                            bgcolor: isRejected ? 'rgba(239, 68, 68, 0.08)' : 'var(--bg-card)',
                            border: '1px solid',
                            borderColor: isRejected ? '#ef4444' : 'var(--border-subtle)',
                            boxShadow: 'var(--card-shadow)'
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, flexWrap: 'wrap' }}>
                            <Box
                                sx={{
                                    p: 1.5,
                                    borderRadius: '12px',
                                    bgcolor: isRejected ? 'rgba(239, 68, 68, 0.15)' : 'rgba(37, 99, 235, 0.1)',
                                    color: isRejected ? '#ef4444' : '#2563eb',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <AccessTimeIcon sx={{ fontSize: 28 }} />
                            </Box>
                            <Box sx={{ flex: 1, minWidth: 260 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5, flexWrap: 'wrap' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary' }}>
                                        {isRejected ? 'ID Verification Rejected' : 'Account Under Administrative Verification'}
                                    </Typography>
                                    <Chip
                                        size="small"
                                        label={isRejected ? 'REJECTED' : 'PENDING REVIEW'}
                                        sx={{
                                            fontWeight: 800,
                                            bgcolor: isRejected ? 'rgba(239,68,68,0.15)' : 'rgba(251,191,36,0.15)',
                                            color: isRejected ? '#ef4444' : '#d97706',
                                            borderRadius: '6px'
                                        }}
                                    />
                                </Box>
                                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.6 }}>
                                    {isRejected
                                        ? `Reason: ${currentUser.rejectionReason || 'The submitted government ID image did not pass our security guidelines. Please update your document or contact support.'}`
                                        : 'Your government-issued ID image has been submitted to Reserva administration. To ensure trust and safety, appointment booking features are locked until an administrator reviews and verifies your ID.'}
                                </Typography>

                                {currentUser.idProofUrl && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1.5, borderRadius: '10px', bgcolor: 'var(--bg-paper)', border: '1px solid var(--border-subtle)', width: 'fit-content' }}>
                                        <Box
                                            component="img"
                                            src={currentUser.idProofUrl}
                                            alt="Submitted ID Proof"
                                            sx={{ width: 48, height: 48, borderRadius: '8px', objectFit: 'cover' }}
                                        />
                                        <Box>
                                            <Typography variant="caption" sx={{ fontWeight: 700, display: 'block', color: 'text.primary' }}>
                                                Submitted ID Document
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                Under administrative review
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </Paper>
                )}

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', mb: 1 }}>
                        Welcome back, {userName}!
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Manage your upcoming appointments and discover new local service providers.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                        gap: 3,
                        mb: 5,
                        alignItems: 'stretch'
                    }}
                >
                    {stats.map((stat, i) => (
                        <ReusableCard key={i} sx={{ p: 3, height: '100%' }}>
                            <EllipsisText lines={1} sx={{ fontWeight: 600, color: 'text.secondary', mb: 1 }}>
                                {stat.label}
                            </EllipsisText>
                            <Typography variant="h3" sx={{ fontWeight: 800, color: stat.color }}>
                                {stat.value}
                            </Typography>
                        </ReusableCard>
                    ))}
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary', mb: 2.5 }}>
                    Quick Actions
                </Typography>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                        gap: 3,
                        mb: 5,
                        alignItems: 'stretch'
                    }}
                >
                    {cards.map((card, index) => (
                        <ActionCard
                            key={index}
                            icon={card.icon}
                            title={card.title}
                            description={card.desc}
                            color={card.color}
                            onClick={() => {
                                if (card.locked) {
                                    alert('Your account is currently pending administrative ID verification. Booking features are locked until approved.');
                                } else {
                                    navigate(card.path);
                                }
                            }}
                            footer={
                                <Box sx={{ display: 'flex', alignItems: 'center', color: card.color, fontWeight: 700, fontSize: '0.875rem' }}>
                                    {card.locked ? 'Locked (Pending Verification)' : 'Open'} {!card.locked && <ChevronRightIcon sx={{ ml: 0.5, fontSize: 18 }} />}
                                </Box>
                            }
                        />
                    ))}
                </Box>

                {/* Upcoming Appointment Spotlight if any */}
                {activeApts.length > 0 && (
                    <Paper
                        sx={{
                            p: 3.5,
                            borderRadius: '20px',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-subtle)',
                            color: 'text.primary'
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                            <Chip label="Upcoming Appointment" sx={{ bgcolor: 'rgba(37,99,235,0.12)', color: '#2563eb', fontWeight: 700 }} />
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                {new Date(activeApts[0].startTime).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
                            </Typography>
                        </Box>

                        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                            {activeApts[0].service?.name}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                            At <strong>{activeApts[0].business?.name}</strong> with {activeApts[0].staff?.name || 'Assigned Specialist'}
                        </Typography>

                        <Button
                            variant="contained"
                            size="medium"
                            onClick={() => navigate('/dashboard?view=appointments')}
                            sx={{
                                borderRadius: '12px',
                                background: '#2563eb',
                                fontWeight: 700,
                                textTransform: 'none',
                                '&:hover': { background: '#1d4ed8' }
                            }}
                        >
                            View Appointment Details
                        </Button>
                    </Paper>
                )}
            </Box>
        );
    };

    const renderAppointmentsView = () => {
        return (
            <Box>
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5 }}>
                            My Appointments
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Track, view details, and manage your service reservations.
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        onClick={() => {
                            if (!isApproved) {
                                alert('Your account is awaiting administrative ID verification. Booking new appointments is locked until approved.');
                            } else {
                                navigate('/dashboard?view=businesses');
                            }
                        }}
                        startIcon={<SearchIcon />}
                        sx={{
                            borderRadius: '12px',
                            background: isApproved ? '#2563eb' : '#64748b',
                            fontWeight: 700,
                            textTransform: 'none',
                            '&:hover': { background: isApproved ? '#1d4ed8' : '#64748b' }
                        }}
                    >
                        {isApproved ? 'Book New Appointment' : 'Book New Appointment (Locked)'}
                    </Button>
                </Box>

                {/* Filter Chips */}
                <Stack direction="row" spacing={1} sx={{ mb: 4, overflowX: 'auto', pb: 1 }}>
                    {['ALL', 'CONFIRMED', 'PENDING', 'COMPLETED', 'CANCELLED'].map((st) => (
                        <Chip
                            key={st}
                            label={st}
                            onClick={() => setStatusFilter(st)}
                            sx={{
                                bgcolor: statusFilter === st ? '#2563eb' : 'var(--bg-card)',
                                color: statusFilter === st ? 'white' : 'text.primary',
                                fontWeight: statusFilter === st ? 700 : 500,
                                border: '1px solid',
                                borderColor: statusFilter === st ? '#2563eb' : 'var(--border-subtle)',
                                '&:hover': { bgcolor: statusFilter === st ? '#1d4ed8' : 'var(--bg-card-hover)' }
                            }}
                        />
                    ))}
                </Stack>

                {filteredAppointments.length === 0 ? (
                    <Paper sx={{ p: 6, textAlign: 'center', borderRadius: '24px', bgcolor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
                        <Typography color="text.secondary" sx={{ mb: 2, fontSize: '1.1rem' }}>
                            No {statusFilter.toLowerCase()} appointments found.
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => navigate('/dashboard?view=businesses')}
                            sx={{ borderRadius: '12px', px: 3, fontWeight: 700 }}
                        >
                            Browse Local Businesses
                        </Button>
                    </Paper>
                ) : (
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                            gap: 3,
                            alignItems: 'stretch'
                        }}
                    >
                        {filteredAppointments.map((apt) => {
                            const dateObj = new Date(apt.startTime);
                            const formattedDate = dateObj.toLocaleDateString(undefined, {
                                weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
                            });
                            const formattedTime = dateObj.toLocaleTimeString(undefined, {
                                hour: '2-digit', minute: '2-digit'
                            });

                            const statusColor =
                                apt.status === 'CONFIRMED' ? '#10b981' :
                                apt.status === 'PENDING' ? '#f59e0b' :
                                apt.status === 'COMPLETED' ? '#3b82f6' : '#ef4444';

                            return (
                                <ReusableCard
                                    key={apt.id}
                                    sx={{
                                        p: 3,
                                        borderRadius: '24px',
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2, gap: 1 }}>
                                        <Chip
                                            label={apt.status}
                                            size="small"
                                            sx={{
                                                bgcolor: `${statusColor}22`,
                                                color: statusColor,
                                                fontWeight: 800,
                                                borderRadius: '8px',
                                                border: `1px solid ${statusColor}44`
                                            }}
                                        />
                                        <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontWeight: 700 }}>
                                            ${apt.service?.price || '0'}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ minHeight: '1.6em', maxHeight: '1.6em', overflow: 'hidden', mb: 1 }}>
                                        <EllipsisText lines={1} component="h3" sx={{ fontWeight: 800, fontSize: '1.15rem', color: 'text.primary' }}>
                                            {apt.service?.name}
                                        </EllipsisText>
                                    </Box>

                                    <Box sx={{ minHeight: '1.5em', maxHeight: '1.5em', overflow: 'hidden', display: 'flex', alignItems: 'center', gap: 1, color: 'primary.main', mb: 1.5, fontSize: '0.9rem' }}>
                                        <StorefrontIcon sx={{ fontSize: 18, flexShrink: 0 }} />
                                        <EllipsisText lines={1} sx={{ fontWeight: 600 }}>{apt.business?.name}</EllipsisText>
                                    </Box>

                                    <Box sx={{ pt: 1.5, borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: 0.8, color: 'text.secondary', fontSize: '0.85rem', minHeight: '4.8em', mb: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <CalendarMonthIcon sx={{ fontSize: 16, color: 'text.primary', flexShrink: 0 }} />
                                            <EllipsisText lines={1}>{formattedDate} at {formattedTime}</EllipsisText>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <PersonIcon sx={{ fontSize: 16, color: 'text.primary', flexShrink: 0 }} />
                                            <EllipsisText lines={1}>
                                                {apt.staff ? `Specialist: ${apt.staff.name} (${apt.staff.title || 'Staff'})` : 'Specialist: Assigned Partner'}
                                            </EllipsisText>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <AccessTimeIcon sx={{ fontSize: 16, color: 'text.primary', flexShrink: 0 }} />
                                            <span>Duration: {apt.service?.duration || 45} mins</span>
                                        </Box>
                                    </Box>

                                    {apt.status === 'COMPLETED' && (
                                        <Box sx={{ mb: 1.5, pt: 1.5, borderTop: '1px dashed var(--border-subtle)' }}>
                                            {reviewedAptIds.has(apt.id) ? (
                                                <Chip
                                                    icon={<VerifiedIcon sx={{ color: '#10b981 !important', fontSize: 16 }} />}
                                                    label="Review Submitted ★"
                                                    size="small"
                                                    sx={{
                                                        width: '100%',
                                                        fontWeight: 700,
                                                        bgcolor: 'rgba(16,185,129,0.1)',
                                                        color: '#10b981',
                                                        border: '1px solid rgba(16,185,129,0.3)'
                                                    }}
                                                />
                                            ) : (
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    fullWidth
                                                    startIcon={<StarIcon sx={{ color: '#000' }} />}
                                                    onClick={() => {
                                                        setSelectedAptToReview(apt);
                                                        setReviewModalOpen(true);
                                                    }}
                                                    sx={{
                                                        borderRadius: '10px',
                                                        textTransform: 'none',
                                                        fontWeight: 800,
                                                        bgcolor: '#f59e0b',
                                                        color: '#000',
                                                        boxShadow: '0 4px 12px rgba(245,158,11,0.25)',
                                                        '&:hover': { bgcolor: '#d97706' }
                                                    }}
                                                >
                                                    Rate & Review Service
                                                </Button>
                                            )}
                                        </Box>
                                    )}

                                    <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto' }}>
                                        {apt.business?.id && (
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                onClick={() => navigate(`/businesses/${apt.business.id}`)}
                                                sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600 }}
                                            >
                                                View Business
                                            </Button>
                                        )}
                                        {apt.business?.id && apt.service?.id && (
                                            <Button
                                                variant="contained"
                                                size="small"
                                                fullWidth
                                                onClick={() => {
                                                    if (!isApproved) {
                                                        alert('Your account is awaiting administrative ID verification. Booking is locked until approved.');
                                                    } else {
                                                        navigate(`/book/${apt.business.id}/${apt.service.id}`);
                                                    }
                                                }}
                                                sx={{
                                                    borderRadius: '10px',
                                                    textTransform: 'none',
                                                    fontWeight: 700,
                                                    bgcolor: isApproved ? '#2563eb' : '#64748b',
                                                    '&:hover': { bgcolor: isApproved ? '#1d4ed8' : '#64748b' }
                                                }}
                                            >
                                                {isApproved ? 'Book Again' : 'Book (Locked)'}
                                            </Button>
                                        )}
                                    </Box>
                                </ReusableCard>
                            );
                        })}
                    </Box>
                )}
            </Box>
        );
    };

    const renderContent = () => {
        if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;

        switch (view) {
            case 'appointments':
                return renderAppointmentsView();
            case 'businesses':
                return (
                    <Box>
                        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h4" sx={{ fontWeight: 800 }}>Explore Local Businesses</Typography>
                            <Button variant="text" onClick={() => navigate('/dashboard')} sx={{ borderRadius: '12px' }}>
                                Back to Overview
                            </Button>
                        </Box>
                        <BusinessList />
                    </Box>
                );
            case 'profile':
                return <ProfileView />;
            default:
                return renderOverview();
        }
    };

    const navItems = [
        { title: 'Overview', path: '/dashboard', icon: <HomeIcon /> },
        { title: 'Appointments', path: '/dashboard?view=appointments', icon: <CalendarMonthIcon /> },
        { title: 'Browse Businesses', path: '/dashboard?view=businesses', icon: <SearchIcon /> },
        { title: 'Profile Settings', path: '/dashboard?view=profile', icon: <PersonIcon /> }
    ];

    return (
        <Box sx={{ display: 'flex', bgcolor: 'var(--bg-default)', minHeight: 'calc(100vh - 160px)', transition: 'background-color 0.3s ease' }}>
            {/* Sticky in-flow desktop sidebar that NEVER overlaps footer */}
            <Box
                sx={{
                    display: { xs: 'none', md: 'block' },
                    width: 260,
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
                    Client Portal
                </Typography>
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
                                    bgcolor: isActive ? 'rgba(37,99,235,0.18)' : 'transparent',
                                    color: isActive ? '#60a5fa' : '#94a3b8',
                                    border: isActive ? '1px solid rgba(96,165,250,0.3)' : '1px solid transparent',
                                    '&:hover': {
                                        bgcolor: isActive ? 'rgba(37,99,235,0.25)' : 'rgba(255,255,255,0.04)',
                                        color: isActive ? '#60a5fa' : '#f8fafc',
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

            {/* Write Review Dialog */}
            <WriteReviewModal
                open={reviewModalOpen}
                onClose={() => setReviewModalOpen(false)}
                appointment={selectedAptToReview}
                onReviewSubmitted={(aptId) => setReviewedAptIds(prev => new Set([...prev, aptId]))}
            />
        </Box>
    );
};

export default ClientDashboard;
