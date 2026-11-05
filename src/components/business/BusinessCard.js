import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { MediaCard, EllipsisText } from '../common/ReusableCard';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=80';

const BusinessCard = ({ business, onView }) => {
    // Determine category or intelligent fallback
    let categoryName = business.category || business.type;
    if (!categoryName) {
        const text = ((business.name || '') + ' ' + (business.description || '')).toLowerCase();
        if (text.includes('barber')) categoryName = 'Barbershop';
        else if (text.includes('salon') || text.includes('hair') || text.includes('beauty')) categoryName = 'Salon & Beauty';
        else if (text.includes('clinic') || text.includes('doctor') || text.includes('dental')) categoryName = 'Clinic & Healthcare';
        else if (text.includes('spa') || text.includes('massage')) categoryName = 'Wellness & Spa';
        else if (text.includes('hotel') || text.includes('stay')) categoryName = 'Hotel & Hospitality';
        else categoryName = 'Local Service';
    }

    const rating = business.rating || 4.9;
    const reviews = business.reviewsCount || 120;

    return (
        <MediaCard
            image={business.imageUrl || FALLBACK_IMAGE}
            imageAlt={business.name}
            imageHeight={200}
            badge={
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: '8px',
                    bgcolor: 'var(--bg-card)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid var(--border-subtle)',
                    boxShadow: 'var(--card-shadow)'
                }}>
                    <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 800, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                        {categoryName}
                    </Typography>
                </Box>
            }
            title={business.name}
            titleLines={1}
            description={business.description}
            descriptionLines={3}
            sx={{
                width: '100%',
                height: '100%',
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
            }}
            actions={
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'text.secondary', fontSize: '0.82rem', pt: 1, borderTop: '1px solid var(--border-subtle)' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#f59e0b', fontWeight: 700 }}>
                            <StarIcon sx={{ fontSize: 16 }} />
                            <span>{rating}</span>
                            <span style={{ color: 'text.secondary', fontWeight: 400 }}>({reviews})</span>
                        </Box>
                        {business.phoneNumber ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <PhoneIcon sx={{ fontSize: 14 }} />
                                <EllipsisText lines={1}>{business.phoneNumber}</EllipsisText>
                            </Box>
                        ) : (
                            <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 700 }}>Open Now</Typography>
                        )}
                    </Box>

                    <Box sx={{ minHeight: '1.5em', maxHeight: '1.5em', overflow: 'hidden', display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', fontSize: '0.82rem' }}>
                        <LocationOnIcon sx={{ fontSize: 16, color: 'primary.main', flexShrink: 0 }} />
                        <EllipsisText lines={1}>{business.address || 'Local Downtown Area'}</EllipsisText>
                    </Box>

                    <Button
                        size="medium"
                        variant="contained"
                        fullWidth
                        onClick={onView}
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                            mt: 0.5,
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
                        View Details & Book
                    </Button>
                </Box>
            }
        />
    );
};

export default BusinessCard;
