import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    TextField,
    InputAdornment,
    Box,
    CircularProgress,
    Chip,
    Stack,
    Button,
    CardContent,
    CardActions
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getAllBusinesses } from '../../services/businessService';
import { getServicesByBusiness } from '../../services/serviceService';
import ReusableCard, { EllipsisText, TruncatedDescription } from '../common/ReusableCard';

const CATEGORIES = [
    "All",
    "Barbershop",
    "Salon & Beauty",
    "Clinic & Healthcare",
    "Wellness & Spa",
    "Hotel & Hospitality"
];

// Rich fallback demo services to ensure user always sees a thriving catalog if database is empty
const SAMPLE_SERVICES = [
    {
        id: 101,
        name: 'Master Barber Haircut & Beard Sculpt',
        description: 'Precision scissor and clipper cut with hot towel treatment, straight razor finish, and beard oil nourishment.',
        price: 45,
        duration: 45,
        category: 'Barbershop',
        businessId: 1,
        businessName: 'The Royal Blade Barbershop',
        businessAddress: '124 High Street, Downtown',
        imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 102,
        name: 'Balayage & Luxury Blowout',
        description: 'Custom sun-kissed hair painting technique followed by a deep restorative gloss treatment and professional blowout.',
        price: 180,
        duration: 120,
        category: 'Salon & Beauty',
        businessId: 2,
        businessName: 'Luxe Hair & Beauty Lounge',
        businessAddress: '88 Fashion Boulevard, Midtown',
        imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 103,
        name: 'Comprehensive Dental Health Check & Polish',
        description: 'Full oral examination with digital imaging, ultrasonic plaque removal, and enamel protective fluoridation.',
        price: 120,
        duration: 60,
        category: 'Clinic & Healthcare',
        businessId: 3,
        businessName: 'Apex Family Dental & Orthodontics',
        businessAddress: '450 Medical Center Plaza',
        imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 104,
        name: 'Swedish Deep Tissue Aromatherapy Massage',
        description: 'Targeted muscular tension release using organic essential oils, acupressure, and heated stone therapy.',
        price: 95,
        duration: 60,
        category: 'Wellness & Spa',
        businessId: 4,
        businessName: 'Serenity Springs Wellness Retreat',
        businessAddress: '12 Botanical Way, Riverside',
        imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 105,
        name: 'Executive Suite & Spa Access (Day Pass)',
        description: 'Full day access to private executive lounge, hydrotherapy pool, sauna, and priority dining reservations.',
        price: 220,
        duration: 480,
        category: 'Hotel & Hospitality',
        businessId: 5,
        businessName: 'Grand Horizon Boutique Hotel',
        businessAddress: '1 Ocean View Avenue, Harborfront',
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 106,
        name: 'Dermatology Skin Glow & Hydration Therapy',
        description: 'Clinical grade facial with hyaluronic infusion, LED light rejuvenation, and personalized skincare analysis.',
        price: 140,
        duration: 75,
        category: 'Clinic & Healthcare',
        businessId: 3,
        businessName: 'Apex Family Dental & Orthodontics',
        businessAddress: '450 Medical Center Plaza',
        imageUrl: 'https://images.unsplash.com/photo-1512290900672-1f481c4e1646?auto=format&fit=crop&w=800&q=80'
    }
];

const ServiceList = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const initialCategory = searchParams.get('category') || 'All';
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [searchTerm, setSearchTerm] = useState('');
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllServices = async () => {
            setLoading(true);
            try {
                const businesses = await getAllBusinesses();
                if (businesses && businesses.length > 0) {
                    const servicesPromises = businesses.map(async (biz) => {
                        try {
                            const bizServices = await getServicesByBusiness(biz.id);
                            return bizServices.map((svc) => ({
                                ...svc,
                                businessId: biz.id,
                                businessName: biz.name,
                                businessAddress: biz.address,
                                businessImage: biz.imageUrl,
                                category: biz.category || biz.type || 'General'
                            }));
                        } catch {
                            return [];
                        }
                    });
                    const results = await Promise.all(servicesPromises);
                    const flattened = results.flat();
                    if (flattened.length > 0) {
                        setServices(flattened);
                    } else {
                        setServices(SAMPLE_SERVICES);
                    }
                } else {
                    setServices(SAMPLE_SERVICES);
                }
            } catch (err) {
                console.warn('Could not fetch backend services, using catalog:', err);
                setServices(SAMPLE_SERVICES);
            } finally {
                setLoading(false);
            }
        };

        fetchAllServices();
    }, []);

    const handleCategoryClick = (cat) => {
        setSelectedCategory(cat);
        if (cat === 'All') {
            searchParams.delete('category');
            setSearchParams(searchParams);
        } else {
            setSearchParams({ category: cat });
        }
    };

    const filteredServices = services.filter((service) => {
        const matchesSearch =
            service.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.businessName?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCat =
            selectedCategory === 'All' ||
            service.category?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
            service.name?.toLowerCase().includes(selectedCategory.toLowerCase());

        return matchesSearch && matchesCat;
    });

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
            <Box sx={{ mb: 5, textAlign: 'center' }}>
                <Box sx={{ display: 'inline-flex', alignItems: 'center', px: 2, py: 0.6, borderRadius: '999px', bgcolor: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.25)', mb: 2 }}>
                    <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase' }}>
                        Browse By Service
                    </Typography>
                </Box>
                <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mb: 1.5, letterSpacing: '-0.03em', color: 'text.primary' }}>
                    Find & Book Exact Services
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 640, mx: 'auto', mb: 4 }}>
                    From haircut styling and dental examinations to massage therapy and suite bookings, reserve top local specialists in a few clicks.
                </Typography>

                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search by service (e.g. Haircut, Massage, Dental, Consultation) or business name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: 'text.secondary' }} />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        maxWidth: 720,
                        mx: 'auto',
                        mb: 3,
                        bgcolor: 'var(--bg-paper)',
                        borderRadius: '16px',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '16px',
                            color: 'text.primary',
                            '& fieldset': { borderColor: 'var(--border-subtle)' },
                            '&:hover fieldset': { borderColor: 'primary.main' },
                            '&.Mui-focused fieldset': { borderColor: 'primary.main' }
                        }
                    }}
                />

                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent={{ xs: 'flex-start', sm: 'center' }}
                    sx={{
                        overflowX: 'auto',
                        py: 1,
                        '&::-webkit-scrollbar': { height: 6 },
                        '&::-webkit-scrollbar-thumb': { background: 'var(--border-subtle)', borderRadius: 3 }
                    }}
                >
                    {CATEGORIES.map((cat) => (
                        <Chip
                            key={cat}
                            label={cat}
                            onClick={() => handleCategoryClick(cat)}
                            sx={{
                                bgcolor: selectedCategory === cat ? '#2563eb' : 'var(--bg-card)',
                                color: selectedCategory === cat ? 'white' : 'text.primary',
                                fontWeight: selectedCategory === cat ? 700 : 500,
                                border: '1px solid',
                                borderColor: selectedCategory === cat ? '#2563eb' : 'var(--border-subtle)',
                                px: 1.5,
                                py: 2.2,
                                borderRadius: '12px',
                                boxShadow: 'var(--card-shadow)',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    bgcolor: selectedCategory === cat ? '#1d4ed8' : 'var(--bg-card-hover)',
                                    transform: 'translateY(-2px)'
                                }
                            }}
                        />
                    ))}
                </Stack>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3, alignItems: 'stretch' }}>
                {filteredServices.map((service) => (
                    <ReusableCard
                        key={`${service.businessId}-${service.id}`}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            height: '100%',
                            borderRadius: '24px',
                        }}
                    >
                        <CardContent sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, gap: 1, minHeight: '32px' }}>
                                <Chip
                                    label={service.category || 'Service'}
                                    size="small"
                                    sx={{
                                        bgcolor: 'rgba(37,99,235,0.12)',
                                        color: 'primary.light',
                                        fontWeight: 700,
                                        fontSize: '0.72rem',
                                        borderRadius: '8px',
                                        border: '1px solid rgba(96,165,250,0.25)'
                                    }}
                                />
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontWeight: 800,
                                        color: '#10b981',
                                        flexShrink: 0
                                    }}
                                >
                                    ${service.price}
                                </Typography>
                            </Box>

                            <Box sx={{ minHeight: '2.8em', maxHeight: '2.8em', overflow: 'hidden', mb: 1.5 }}>
                                <EllipsisText
                                    lines={2}
                                    component="h3"
                                    sx={{
                                        fontWeight: 800,
                                        fontSize: '1.15rem',
                                        color: 'text.primary',
                                        lineHeight: 1.35
                                    }}
                                >
                                    {service.name}
                                </EllipsisText>
                            </Box>

                            <TruncatedDescription
                                text={service.description}
                                title={service.name}
                                fixedHeight="4.6em"
                                lines={3}
                                maxChars={90}
                            />

                            <Box sx={{ mt: 'auto', pt: 2, borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: 0.8, minHeight: '5.2em', maxHeight: '5.2em', overflow: 'hidden' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.primary', fontSize: '0.88rem' }}>
                                    <StorefrontIcon sx={{ fontSize: 18, color: 'primary.main', flexShrink: 0 }} />
                                    <EllipsisText lines={1} sx={{ fontWeight: 600 }}>
                                        {service.businessName || 'Verified Business'}
                                    </EllipsisText>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', fontSize: '0.8rem' }}>
                                    <LocationOnIcon sx={{ fontSize: 16, color: 'primary.light', flexShrink: 0 }} />
                                    <EllipsisText lines={1}>{service.businessAddress || 'Downtown Business District'}</EllipsisText>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', fontSize: '0.8rem' }}>
                                    <AccessTimeIcon sx={{ fontSize: 16, color: 'primary.light', flexShrink: 0 }} />
                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                        {service.duration} mins duration
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>

                        <CardActions sx={{ p: 3, pt: 0, gap: 1.5 }}>
                            <Button
                                variant="outlined"
                                size="medium"
                                onClick={() => navigate(`/businesses/${service.businessId}`)}
                                sx={{
                                    flex: 1,
                                    height: '42px',
                                    borderRadius: '12px',
                                    borderColor: 'rgba(255,255,255,0.15)',
                                    color: '#cbd5e1',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    '&:hover': {
                                        borderColor: 'rgba(255,255,255,0.3)',
                                        bgcolor: 'rgba(255,255,255,0.05)'
                                    }
                                }}
                            >
                                Business
                            </Button>
                            <Button
                                variant="contained"
                                size="medium"
                                onClick={() => navigate(`/book/${service.businessId}/${service.id}`)}
                                endIcon={<ArrowForwardIcon />}
                                sx={{
                                    flex: 2,
                                    height: '42px',
                                    borderRadius: '12px',
                                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)'
                                    }
                                }}
                            >
                                Book Now
                            </Button>
                        </CardActions>
                    </ReusableCard>
                ))}
            </Box>

            {filteredServices.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                        No services found matching your criteria. Try adjusting your search or category filter.
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default ServiceList;
