import React from 'react';
import { Box, Button, CardContent } from '@mui/material';
import ReusableCard, { CardImage, EllipsisText } from '../common/ReusableCard';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=80';

const BusinessCard = ({ business, onView }) => (
    <ReusableCard
        sx={{
            minHeight: 430,
            borderRadius: '24px',
            bgcolor: 'rgba(15, 23, 42, 0.72)',
            border: '1px solid rgba(148,163,184,0.14)',
            boxShadow: '0 14px 30px rgba(15,23,42,0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
                transform: 'translateY(-8px)',
                borderColor: 'rgba(96,165,250,0.4)',
                boxShadow: '0 20px 40px rgba(37,99,235,0.18)'
            }
        }}
    >
        <CardImage src={business.imageUrl || FALLBACK_IMAGE} alt={business.name} />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3, minWidth: 0 }}>
            <EllipsisText
                lines={1}
                variant="h5"
                component="h2"
                sx={{ fontWeight: 'bold', color: '#f8fbff', mb: 1 }}
            >
                {business.name}
            </EllipsisText>
            <EllipsisText
                lines={3}
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2, minHeight: '4.5em' }}
            >
                {business.description}
            </EllipsisText>
            <EllipsisText lines={1} variant="subtitle2" sx={{ color: '#cbd5e1', mb: 2 }}>
                {business.address}
            </EllipsisText>
            <Box sx={{ mt: 'auto' }}>
                <Button
                    size="large"
                    variant="contained"
                    fullWidth
                    onClick={onView}
                    sx={{
                        borderRadius: '14px',
                        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                        fontWeight: 700,
                        textTransform: 'none',
                        '&:hover': { background: 'linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)' }
                    }}
                >
                    View Details & Book
                </Button>
            </Box>
        </CardContent>
    </ReusableCard>
);

export default BusinessCard;
