import React from 'react';
import { Button } from '@mui/material';
import { MediaCard } from '../common/ReusableCard';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=80';

const BusinessCard = ({ business, onView }) => (
    <MediaCard
        image={business.imageUrl || FALLBACK_IMAGE}
        imageAlt={business.name}
        imageHeight={200}
        title={business.name}
        subtitle={business.address}
        description={business.description}
        descriptionLines={3}
        sx={{
            minHeight: 390,
            borderRadius: '24px',
            transition: 'all 0.3s ease',
            '&:hover': {
                transform: 'translateY(-8px)',
                borderColor: 'rgba(96,165,250,0.4)',
                boxShadow: '0 20px 40px rgba(37,99,235,0.18)'
            }
        }}
        actions={
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
        }
    />
);

export default BusinessCard;
