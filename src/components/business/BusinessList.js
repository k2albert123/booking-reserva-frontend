import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Grid, 
    Card, 
    CardContent, 
    CardMedia, 
    Typography, 
    Button, 
    TextField, 
    InputAdornment, 
    Box,
    CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BusinessList = () => {
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                const response = await axios.get('/api/v1/businesses');
                setBusinesses(response.data);
            } catch (error) {
                console.error('Error fetching businesses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBusinesses();
    }, []);

    const filteredBusinesses = businesses.filter(business =>
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
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
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ backgroundColor: 'white', borderRadius: 1 }}
                />
            </Box>

            <Grid container spacing={3}>
                {filteredBusinesses.map((business) => (
                    <Grid item key={business.id} xs={12} sm={6} md={4}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)' } }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={business.imageUrl || 'https://via.placeholder.com/400x200?text=No+Image'}
                                alt={business.name}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                                    {business.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: '3em', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {business.description}
                                </Typography>
                                <Typography variant="subtitle2" color="text.primary">
                                    {business.address}
                                </Typography>
                            </CardContent>
                            <Box sx={{ p: 2, pt: 0 }}>
                                <Button 
                                    size="large" 
                                    variant="contained" 
                                    fullWidth 
                                    onClick={() => navigate(`/businesses/${business.id}`)}
                                >
                                    View Details & Book
                                </Button>
                            </Box>
                        </Card>
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
