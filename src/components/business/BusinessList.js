import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Typography, 
    TextField, 
    InputAdornment, 
    Box, 
    CircularProgress, 
    Chip, 
    Stack 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getAllBusinesses } from '../../services/businessService';
import BusinessCard from './BusinessCard';

const CATEGORIES = [
    "All", 
    "Barbershop", 
    "Salon & Beauty", 
    "Clinic & Healthcare", 
    "Wellness & Spa", 
    "Hotel & Hospitality"
];

// Curated demo businesses matching README industries for when backend database is empty or loading
const DEMO_BUSINESSES = [
    {
        id: 1,
        name: 'The Royal Blade Barbershop',
        category: 'Barbershop',
        type: 'Barbershop',
        description: 'Traditional hot towel shaves, beard trims, and bespoke modern haircuts by master barbers in an upscale gentleman’s setting.',
        address: '124 High Street, Downtown',
        phoneNumber: '+1 (555) 234-8901',
        imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80',
        rating: 4.9,
        reviewsCount: 142
    },
    {
        id: 2,
        name: 'Luxe Hair & Beauty Lounge',
        category: 'Salon & Beauty',
        type: 'Salon & Beauty',
        description: 'Full-service hair salon offering balayage, precision styling, keratin treatments, manicures, and bridal makeover packages.',
        address: '88 Fashion Boulevard, Midtown',
        phoneNumber: '+1 (555) 345-6789',
        imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80',
        rating: 4.8,
        reviewsCount: 189
    },
    {
        id: 3,
        name: 'Apex Family Dental & Orthodontics',
        category: 'Clinic & Healthcare',
        type: 'Clinic & Healthcare',
        description: 'Certified doctors providing cosmetic dentistry, teeth whitening, routine checkups, implants, and orthodontic care.',
        address: '450 Medical Center Plaza',
        phoneNumber: '+1 (555) 456-7890',
        imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=900&q=80',
        rating: 4.95,
        reviewsCount: 220
    },
    {
        id: 4,
        name: 'Serenity Springs Wellness Retreat',
        category: 'Wellness & Spa',
        type: 'Wellness & Spa',
        description: 'Holistic wellness center offering Swedish aromatherapy massages, facial hydration therapy, infrared sauna, and acupuncture.',
        address: '12 Botanical Way, Riverside',
        phoneNumber: '+1 (555) 567-8901',
        imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80',
        rating: 4.9,
        reviewsCount: 165
    },
    {
        id: 5,
        name: 'Grand Horizon Boutique Hotel & Suites',
        category: 'Hotel & Hospitality',
        type: 'Hotel & Hospitality',
        description: 'Luxury hospitality destination with rooftop pool appointments, private suite reservations, wellness lounge, and executive dining.',
        address: '1 Ocean View Avenue, Harborfront',
        phoneNumber: '+1 (555) 678-9012',
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80',
        rating: 4.85,
        reviewsCount: 310
    },
    {
        id: 6,
        name: 'Saint Jude Specialty Clinic',
        category: 'Clinic & Healthcare',
        type: 'Clinic & Healthcare',
        description: 'Multidisciplinary outpatient medical clinic with cardiologists, physiotherapists, and dermatologists accepting online appointments.',
        address: '92 Healthcare Avenue, Medical District',
        phoneNumber: '+1 (555) 789-0123',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80',
        rating: 4.92,
        reviewsCount: 98
    }
];

const BusinessList = () => {
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const initialCategory = searchParams.get('category') || 'All';
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const data = await getAllBusinesses();
                if (data && data.length > 0) {
                    setBusinesses(data);
                } else {
                    setBusinesses(DEMO_BUSINESSES);
                }
            } catch (error) {
                console.warn('Error fetching businesses, showing catalog:', error);
                setBusinesses(DEMO_BUSINESSES);
            } finally {
                setLoading(false);
            }
        };

        fetchBusinesses();
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

    const filteredBusinesses = businesses.filter(business => {
        const matchesSearch = 
            business.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
            business.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            business.address?.toLowerCase().includes(searchTerm.toLowerCase());

        const businessCat = (business.category || business.type || '').toLowerCase();
        const matchesCategory = selectedCategory === 'All' || 
            businessCat.includes(selectedCategory.toLowerCase()) ||
            (business.name && business.name.toLowerCase().includes(selectedCategory.toLowerCase()));

        return matchesSearch && matchesCategory;
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
                        Local Service Providers
                    </Typography>
                </Box>
                <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mb: 1.5, letterSpacing: '-0.03em', color: 'text.primary' }}>
                    Discover Verified Local Businesses
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 640, mx: 'auto', mb: 4 }}>
                    Explore top-rated barbershops, clinics, salons, wellness spas, and hotels. View real staff profiles, available hours, and book instantly.
                </Typography>

                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search by business name, city, address, or service..."
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
                    {CATEGORIES.map(category => (
                        <Chip 
                            key={category} 
                            label={category} 
                            onClick={() => handleCategoryClick(category)}
                            sx={{ 
                                bgcolor: selectedCategory === category ? '#2563eb' : 'var(--bg-card)',
                                color: selectedCategory === category ? 'white' : 'text.primary',
                                fontWeight: selectedCategory === category ? 700 : 500,
                                border: '1px solid',
                                borderColor: selectedCategory === category ? '#2563eb' : 'var(--border-subtle)',
                                px: 1.5,
                                py: 2.2,
                                borderRadius: '12px',
                                boxShadow: 'var(--card-shadow)',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    bgcolor: selectedCategory === category ? '#1d4ed8' : 'var(--bg-card-hover)',
                                    transform: 'translateY(-2px)'
                                }
                            }} 
                        />
                    ))}
                </Stack>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3, alignItems: 'stretch' }}>
                {filteredBusinesses.map((business) => (
                    <BusinessCard 
                        key={business.id}
                        business={business} 
                        onView={() => navigate(`/businesses/${business.id}`)} 
                    />
                ))}
            </Box>

            {filteredBusinesses.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h6" color="text.secondary">
                        No businesses found matching "{searchTerm}". Try a different search term or category.
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default BusinessList;
