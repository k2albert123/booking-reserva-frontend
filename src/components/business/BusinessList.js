import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Grid, 
    Typography, 
    TextField, 
    InputAdornment, 
    Box,
    CircularProgress,
    Chip,
    Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { getAllBusinesses } from '../../services/businessService';
import BusinessCard from './BusinessCard';

const CATEGORIES = ["All", "Beauty & Styling", "Health & Spa", "Health & Medical", "Home Services", "Professional Services"];

const BusinessList = () => {
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const data = await getAllBusinesses();
                setBusinesses(data);
            } catch (error) {
                console.error('Error fetching businesses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBusinesses();
    }, []);

    const filteredBusinesses = businesses.filter(business => {
        const matchesSearch = business.name?.toLowerCase().includes(searchTerm.toLowerCase()) || business.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || business.type === selectedCategory || business.category === selectedCategory;
        // In case the backend doesn't have a category field mapped perfectly, we do a basic check, or we can just filter by search for now if category is missing.
        // Let's assume business.type or business.category exists. Since we used "type" in featured businesses, let's check it.
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
        <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: '800', background: 'linear-gradient(to right, #ffffff, #93c5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.04em' }}>
                    Find Your Next Appointment
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search for businesses or services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        background: 'rgba(15, 23, 42, 0.74)',
                        borderRadius: '16px',
                        mb: 3,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '16px',
                            color: '#fff',
                            '& fieldset': { borderColor: 'rgba(148,163,184,0.2)' },
                            '&:hover fieldset': { borderColor: 'rgba(96,165,250,0.4)' },
                            '&.Mui-focused fieldset': { borderColor: 'rgba(96,165,250,0.75)' }
                        }
                    }}
                />
                
                <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1, '&::-webkit-scrollbar': { height: 6 }, '&::-webkit-scrollbar-thumb': { background: '#1e293b', borderRadius: 3 } }}>
                    {CATEGORIES.map(category => (
                        <Chip 
                            key={category} 
                            label={category} 
                            onClick={() => setSelectedCategory(category)}
                            sx={{ 
                                bgcolor: selectedCategory === category ? '#2563eb' : 'rgba(30, 41, 59, 0.8)',
                                color: selectedCategory === category ? 'white' : '#cbd5e1',
                                fontWeight: selectedCategory === category ? 'bold' : 'normal',
                                border: '1px solid',
                                borderColor: selectedCategory === category ? '#3b82f6' : 'rgba(148, 163, 184, 0.2)',
                                '&:hover': {
                                    bgcolor: selectedCategory === category ? '#1d4ed8' : 'rgba(51, 65, 85, 0.8)',
                                }
                            }} 
                        />
                    ))}
                </Stack>
            </Box>

            <Grid container spacing={3} alignItems="stretch">
                {filteredBusinesses.map((business) => (
                    <Grid item key={business.id} xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
                        <BusinessCard business={business} onView={() => navigate(`/businesses/${business.id}`)} />
                    </Grid>
                ))}
            </Grid>
            {filteredBusinesses.length === 0 && (
                <Typography variant="h6" align="center" sx={{ mt: 4, color: 'text.secondary' }}>
                    No businesses found matching your search.
                </Typography>
            )}
        </Container>
    );
};

export default BusinessList;
