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
    Avatar,
    Chip,
    Stack
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import VerifiedIcon from '@mui/icons-material/Verified';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MapIcon from '@mui/icons-material/Map';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { getBusinessById, getWorkingHours } from '../../services/businessService';
import { getServicesByBusiness } from '../../services/serviceService';
import { getStaffByBusiness } from '../../services/staffService';
import { getBusinessReviews } from '../../services/reviewService';
import LocationProofGallery from './LocationProofGallery';
import ReviewsList from '../reviews/ReviewsList';
import ReusableCard, { EllipsisText, MediaCard, TruncatedDescription } from '../common/ReusableCard';

const DEMO_FALLBACKS = {
    1: {
        name: 'The Royal Blade Barbershop',
        category: 'Barbershop',
        description: 'Traditional hot towel shaves, beard trims, and bespoke modern haircuts by master barbers in an upscale gentleman’s setting.',
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
        email: 'info@royalblade.com',
        imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80',
        services: [
            { id: 101, name: 'Master Barber Haircut', price: 45, duration: 45, description: 'Consultation, precision scissor cut, hot lather nape shave, style & wash.' },
            { id: 102, name: 'Hot Towel Royal Shave', price: 35, duration: 30, description: 'Pre-shave essential oils, double hot towel steam, straight razor shave & cooling balm.' },
            { id: 103, name: 'Beard Sculpt & Fade', price: 25, duration: 25, description: 'Line up with razor, trim to desired length, and treatment with organic beard oils.' }
        ],
        staff: [
            { id: 201, name: 'Marcus Vance', title: 'Master Barber', specialty: 'Classic Scissor Cuts & Fades', bio: 'Over 12 years of craftsmanship in London and New York barbershops.', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
            { id: 202, name: 'Leon Hayes', title: 'Senior Stylist', specialty: 'Beard Sculpting & Straight Razor', bio: 'Specialist in modern texture work and luxury straight razor treatments.', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' }
        ],
        hours: [
            { dayOfWeek: 'Monday', startTime: '09:00', endTime: '19:00', open: true },
            { dayOfWeek: 'Tuesday', startTime: '09:00', endTime: '19:00', open: true },
            { dayOfWeek: 'Wednesday', startTime: '09:00', endTime: '19:00', open: true },
            { dayOfWeek: 'Thursday', startTime: '09:00', endTime: '20:00', open: true },
            { dayOfWeek: 'Friday', startTime: '09:00', endTime: '20:00', open: true },
            { dayOfWeek: 'Saturday', startTime: '09:00', endTime: '18:00', open: true },
            { dayOfWeek: 'Sunday', startTime: '10:00', endTime: '16:00', open: false }
        ]
    }
};

const BusinessDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [business, setBusiness] = useState(null);
    const [services, setServices] = useState([]);
    const [staff, setStaff] = useState([]);
    const [workingHours, setWorkingHours] = useState([]);
    const [reviewsSummary, setReviewsSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const [biz, servicesData, staffData, hours, reviews] = await Promise.all([
                    getBusinessById(id).catch(() => null),
                    getServicesByBusiness(id).catch(() => []),
                    getStaffByBusiness(id).catch(() => []),
                    getWorkingHours(id).catch(() => []),
                    getBusinessReviews(id).catch(() => null)
                ]);

                if (biz) {
                    setBusiness(biz);
                    setServices(servicesData || []);
                    setStaff(staffData || []);
                    setWorkingHours(hours || []);
                    setReviewsSummary(reviews);
                } else {
                    // Check fallback demo
                    const fallback = DEMO_FALLBACKS[id] || {
                        name: 'Premier Service Provider',
                        category: 'Verified Partner',
                        description: 'Top rated local business offering premium services with verified professional staff.',
                        address: '124 Metropolitan Avenue',
                        phoneNumber: '+1 (555) 234-8901',
                        email: 'contact@bookingreserva.com',
                        imageUrl: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=80',
                        services: [
                            { id: 1, name: 'Standard Service Consultation', price: 50, duration: 45, description: 'Full service consultation and treatment with certified staff.' }
                        ],
                        staff: [
                            { id: 1, name: 'Alex Morgan', title: 'Senior Specialist', specialty: 'General Practice', bio: 'Certified specialist dedicated to exceptional client care.' }
                        ],
                        hours: [
                            { dayOfWeek: 'Monday - Friday', startTime: '09:00', endTime: '18:00', open: true },
                            { dayOfWeek: 'Saturday - Sunday', startTime: '10:00', endTime: '16:00', open: true }
                        ]
                    };
                    setBusiness(fallback);
                    setServices(fallback.services || []);
                    setStaff(fallback.staff || []);
                    setWorkingHours(fallback.hours || []);
                }
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

    if (!business) return (
        <Container sx={{ py: 8, textAlign: 'center' }}>
            <Typography variant="h5" color="text.secondary">Business not found.</Typography>
            <Button sx={{ mt: 2 }} variant="outlined" onClick={() => navigate('/businesses')}>
                Back to Businesses
            </Button>
        </Container>
    );

    return (
        <Container maxWidth="lg" sx={{ mt: 2, mb: 8 }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/businesses')}
                sx={{ mb: 3, color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
            >
                Back to All Businesses
            </Button>

            {/* Business Hero Banner */}
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 3, md: 5 },
                    borderRadius: '28px',
                    mb: 5,
                    bgcolor: 'var(--bg-card)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid var(--border-subtle)',
                    boxShadow: 'var(--card-shadow)',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} sm={4} md={3} sx={{ textAlign: 'center' }}>
                        <Avatar
                            src={business.imageUrl || undefined}
                            alt={business.name}
                            sx={{
                                width: { xs: 130, sm: 160, md: 190 },
                                height: { xs: 130, sm: 160, md: 190 },
                                mx: 'auto',
                                border: '4px solid rgba(96,165,250,0.3)',
                                boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
                                fontSize: 48,
                                bgcolor: 'var(--bg-paper)',
                                color: 'primary.main'
                            }}
                        >
                            {business.name?.charAt(0)}
                        </Avatar>
                    </Grid>

                    <Grid item xs={12} sm={8} md={9}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1.5, mb: 1 }}>
                            <Chip
                                label={business.category || business.type || 'Verified Business'}
                                size="small"
                                sx={{
                                    bgcolor: 'rgba(37,99,235,0.12)',
                                    color: 'primary.main',
                                    fontWeight: 700,
                                    borderRadius: '8px',
                                    border: '1px solid rgba(96,165,250,0.3)'
                                }}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#10b981', fontSize: '0.85rem', fontWeight: 600 }}>
                                <VerifiedIcon sx={{ fontSize: 18 }} />
                                <span>Verified Partner</span>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#f59e0b', fontSize: '0.85rem', fontWeight: 700 }}>
                                <StarIcon sx={{ fontSize: 18 }} />
                                <span>
                                    {reviewsSummary && reviewsSummary.totalReviews > 0
                                        ? `${reviewsSummary.averageRating.toFixed(1)} (${reviewsSummary.totalReviews} ${reviewsSummary.totalReviews === 1 ? 'review' : 'reviews'})`
                                        : '5.0 (New Partner)'}
                                </span>
                            </Box>
                        </Box>

                        <Typography variant="h3" component="h1" sx={{ fontWeight: 800, color: 'text.primary', mb: 1.5, letterSpacing: '-0.02em', fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
                            {business.name}
                        </Typography>

                        <Typography sx={{ color: 'text.secondary', mb: 3, fontSize: '1.02rem', lineHeight: 1.7, maxWidth: 780 }}>
                            {business.description}
                        </Typography>

                        <Grid container spacing={2}>
                            {business.address && (
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', fontSize: '0.9rem' }}>
                                        <LocationOnIcon sx={{ color: 'primary.main', fontSize: 20, flexShrink: 0 }} />
                                        <span>{business.address}</span>
                                    </Box>
                                </Grid>
                            )}
                            {business.phoneNumber && (
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', fontSize: '0.9rem' }}>
                                        <PhoneIcon sx={{ color: 'primary.main', fontSize: 20, flexShrink: 0 }} />
                                        <span>{business.phoneNumber}</span>
                                    </Box>
                                </Grid>
                            )}
                            {business.email && (
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', fontSize: '0.9rem' }}>
                                        <EmailIcon sx={{ color: 'primary.main', fontSize: 20, flexShrink: 0 }} />
                                        <span>{business.email}</span>
                                    </Box>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>

            {/* Navigation Tabs */}
            <Box sx={{ borderBottom: '1px solid var(--border-subtle)', mb: 4 }}>
                <Tabs
                    value={tabValue}
                    onChange={(e, val) => setTabValue(val)}
                    textColor="inherit"
                    sx={{
                        '& .MuiTabs-indicator': { bgcolor: '#2563eb', height: 3 },
                        '& .MuiTab-root': {
                            color: 'text.secondary',
                            fontWeight: 700,
                            fontSize: '1rem',
                            textTransform: 'none',
                            px: 3,
                            py: 1.5,
                            '&.Mui-selected': { color: 'primary.main' }
                        }
                    }}
                >
                    <Tab label={`Services (${services.length})`} />
                    <Tab label={`Staff Members (${staff.length})`} />
                    <Tab label="Opening Hours & Info" />
                    <Tab icon={<MapIcon sx={{ fontSize: 18 }} />} iconPosition="start" label="Location & Proof Map" />
                    <Tab icon={<RateReviewIcon sx={{ fontSize: 18 }} />} iconPosition="start" label={`Customer Reviews (${reviewsSummary?.totalReviews || 0})`} />
                </Tabs>
            </Box>

            {/* TAB 0: Services */}
            {tabValue === 0 && (
                <Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, alignItems: 'stretch' }}>
                        {services.map((service) => (
                            <ReusableCard
                                key={service.id}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    borderRadius: '20px',
                                    p: 3,
                                    transition: 'all 0.25s ease',
                                    '&:hover': {
                                        borderColor: 'rgba(96,165,250,0.4)',
                                        boxShadow: '0 12px 30px rgba(37,99,235,0.12)'
                                    }
                                }}
                            >
                                <CardContent sx={{ p: 0, mb: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5} gap={2} minHeight="32px">
                                        <Box sx={{ minHeight: '1.6em', maxHeight: '1.6em', overflow: 'hidden', flexGrow: 1 }}>
                                            <EllipsisText lines={1} component="h3" sx={{ fontWeight: 800, fontSize: '1.2rem', color: 'text.primary' }}>
                                                {service.name}
                                            </EllipsisText>
                                        </Box>
                                        <Typography variant="h5" sx={{ fontWeight: 800, color: '#10b981', flexShrink: 0 }}>
                                            ${service.price}
                                        </Typography>
                                    </Box>

                                    <TruncatedDescription
                                        text={service.description}
                                        title={service.name}
                                        fixedHeight="4.6em"
                                        lines={3}
                                        maxChars={90}
                                        sx={{ mb: 2 }}
                                    />

                                    <Box display="flex" alignItems="center" gap={1} color="text.secondary" sx={{ mt: 'auto', minHeight: '1.8em' }}>
                                        <AccessTimeIcon sx={{ fontSize: 18, color: 'primary.main' }} />
                                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                            {service.duration} mins duration
                                        </Typography>
                                    </Box>
                                </CardContent>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => navigate(`/book/${id}/${service.id}`)}
                                    endIcon={<ArrowForwardIcon />}
                                    sx={{
                                        height: '42px',
                                        borderRadius: '12px',
                                        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                        fontWeight: 700,
                                        textTransform: 'none',
                                        '&:hover': { background: 'linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)' }
                                    }}
                                >
                                    Book This Service
                                </Button>
                            </ReusableCard>
                        ))}
                    </Box>
                    {services.length === 0 && (
                        <Typography align="center" color="text.secondary" sx={{ py: 6 }}>
                            No services listed yet for this business.
                        </Typography>
                    )}
                </Box>
            )}

            {/* TAB 1: Staff */}
            {tabValue === 1 && (
                <Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3, alignItems: 'stretch' }}>
                        {staff.map((member) => (
                            <MediaCard
                                key={member.id}
                                image={member.imageUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                                imageAlt={member.name}
                                imageHeight={200}
                                badge={
                                    <Chip
                                        label={member.title || 'Staff Specialist'}
                                        size="small"
                                        sx={{
                                            bgcolor: 'var(--bg-paper)',
                                            color: 'primary.main',
                                            fontWeight: 700,
                                            border: '1px solid var(--border-subtle)'
                                        }}
                                    />
                                }
                                title={member.name}
                                subtitle={member.specialty}
                                description={member.bio || 'Dedicated professional specialist with verified client reviews.'}
                                descriptionLines={3}
                                sx={{
                                    width: '100%',
                                    borderRadius: '20px'
                                }}
                                actions={
                                    services.length > 0 ? (
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            onClick={() => navigate(`/book/${id}/${services[0].id}?staffId=${member.id}`)}
                                            sx={{
                                                borderRadius: '10px',
                                                borderColor: 'var(--border-subtle)',
                                                color: 'primary.main',
                                                textTransform: 'none',
                                                fontWeight: 600,
                                                '&:hover': { bgcolor: 'rgba(37,99,235,0.08)', borderColor: 'primary.main' }
                                            }}
                                        >
                                            Book with {member.name.split(' ')[0]}
                                        </Button>
                                    ) : null
                                }
                            />
                        ))}
                    </Box>
                    {staff.length === 0 && (
                        <Typography align="center" color="text.secondary" sx={{ py: 6 }}>
                            No staff profiles listed yet.
                        </Typography>
                    )}
                </Box>
            )}

            {/* TAB 2: Working Hours & Info */}
            {tabValue === 2 && (
                <Grid container spacing={4}>
                    <Grid item xs={12} md={7}>
                        <Paper
                            sx={{
                                p: 4,
                                borderRadius: '20px',
                                bgcolor: 'var(--bg-card)',
                                border: '1px solid var(--border-subtle)',
                                boxShadow: 'var(--card-shadow)'
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                <CalendarMonthIcon sx={{ color: 'primary.main' }} />
                                <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary' }}>
                                    Standard Operating Hours
                                </Typography>
                            </Box>
                            <List disablePadding>
                                {workingHours.map((wh, index) => {
                                    const isOpen = wh.open || wh.isOpen;
                                    return (
                                        <React.Fragment key={wh.id || index}>
                                            <ListItem sx={{ py: 1.5, px: 0 }}>
                                                <ListItemText
                                                    primary={wh.dayOfWeek}
                                                    primaryTypographyProps={{ fontWeight: 600, color: 'text.primary' }}
                                                />
                                                <Chip
                                                    label={isOpen ? `${wh.startTime} – ${wh.endTime}` : 'Closed'}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: isOpen ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                                        color: isOpen ? '#10b981' : '#ef4444',
                                                        fontWeight: 700,
                                                        border: '1px solid',
                                                        borderColor: isOpen ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'
                                                    }}
                                                />
                                            </ListItem>
                                            {index < workingHours.length - 1 && <Divider sx={{ borderColor: 'var(--border-subtle)' }} />}
                                        </React.Fragment>
                                    );
                                })}
                                {workingHours.length === 0 && (
                                    <Typography color="text.secondary">Contact business for seasonal availability.</Typography>
                                )}
                            </List>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <Paper
                            sx={{
                                p: 4,
                                borderRadius: '20px',
                                bgcolor: 'var(--bg-card)',
                                border: '1px solid var(--border-subtle)',
                                boxShadow: 'var(--card-shadow)'
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary', mb: 2 }}>
                                Booking & Cancellation Guidelines
                            </Typography>
                            <Stack spacing={2} sx={{ color: 'text.secondary', fontSize: '0.92rem', lineHeight: 1.6 }}>
                                <Typography>
                                    • <strong>Instant Confirmation:</strong> Your booking is instantly reserved and an email notification with full details will be sent.
                                </Typography>
                                <Typography>
                                    • <strong>Free Cancellation:</strong> You can reschedule or cancel up to 2 hours prior to the scheduled start time directly from your dashboard.
                                </Typography>
                                <Typography>
                                    • <strong>Arrival:</strong> Please arrive 5-10 minutes prior to your appointment time to check in smoothly.
                                </Typography>
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
            )}

            {/* TAB 3: Location Proof & Interactive Map */}
            {tabValue === 3 && (
                <LocationProofGallery business={business} />
            )}

            {/* TAB 4: Customer Reviews */}
            {tabValue === 4 && (
                <ReviewsList summary={reviewsSummary} businessName={business.name} />
            )}
        </Container>
    );
};

export default BusinessDetails;
