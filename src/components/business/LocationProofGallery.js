import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Dialog,
    IconButton,
    Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import VerifiedIcon from '@mui/icons-material/Verified';
import StorefrontIcon from '@mui/icons-material/Storefront';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import GoogleMapLocation from '../common/GoogleMapLocation';

const LocationProofGallery = ({ business }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    if (!business) return null;

    const {
        name = 'Business',
        address = '',
        city = '',
        state = '',
        postalCode = '',
        latitude,
        longitude,
        storefrontImageUrl,
        interiorImageUrl
    } = business;

    const proofImages = [
        {
            title: 'Exterior Storefront & Signage Proof',
            desc: 'Physical building front, business signboard, and entrance verification.',
            icon: <StorefrontIcon sx={{ fontSize: 20 }} />,
            url: storefrontImageUrl || 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=800&q=80',
            isUploaded: Boolean(storefrontImageUrl)
        },
        {
            title: 'Interior Facility & Service Floor Proof',
            desc: 'Customer reception, service stations, and active equipment verification.',
            icon: <MeetingRoomIcon sx={{ fontSize: 20 }} />,
            url: interiorImageUrl || 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
            isUploaded: Boolean(interiorImageUrl)
        }
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {/* Location Proof Header Banner */}
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 2.5, sm: 3 },
                    borderRadius: '20px',
                    border: '1px solid rgba(16,185,129,0.3)',
                    bgcolor: 'rgba(16,185,129,0.04)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 2
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                        sx={{
                            width: 44,
                            height: 44,
                            borderRadius: '12px',
                            bgcolor: 'rgba(16,185,129,0.15)',
                            color: '#10b981',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}
                    >
                        <VerifiedIcon sx={{ fontSize: 26 }} />
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'text.primary' }}>
                            Verified Physical Business Premises
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.88rem' }}>
                            This business location has verified exterior storefront and interior facility photographic proof.
                        </Typography>
                    </Box>
                </Box>
                <Chip
                    icon={<VerifiedIcon sx={{ color: '#10b981 !important' }} />}
                    label="Location Authenticated"
                    sx={{
                        bgcolor: 'rgba(16,185,129,0.12)',
                        color: '#10b981',
                        fontWeight: 700,
                        border: '1px solid rgba(16,185,129,0.3)'
                    }}
                />
            </Paper>

            {/* Proof Images Gallery */}
            <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary', mb: 2 }}>
                    Storefront & Interior Photographic Proof
                </Typography>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                        gap: 3
                    }}
                >
                    {proofImages.map((proof, idx) => (
                        <Paper
                            key={idx}
                            elevation={0}
                            onClick={() => setSelectedImage(proof)}
                            sx={{
                                borderRadius: '20px',
                                border: '1px solid var(--border-subtle)',
                                bgcolor: 'var(--bg-card)',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                transition: 'all 0.25s ease',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    transform: 'translateY(-4px)',
                                    boxShadow: 'var(--card-shadow-hover)',
                                    '& .zoom-overlay': { opacity: 1 }
                                }
                            }}
                        >
                            <Box sx={{ position: 'relative', height: 230, overflow: 'hidden' }}>
                                <Box
                                    component="img"
                                    src={proof.url}
                                    alt={proof.title}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.4s ease',
                                        '&:hover': { transform: 'scale(1.04)' }
                                    }}
                                />
                                <Box
                                    className="zoom-overlay"
                                    sx={{
                                        position: 'absolute',
                                        inset: 0,
                                        bgcolor: 'rgba(15,23,42,0.4)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        opacity: 0,
                                        transition: 'opacity 0.2s ease',
                                        color: '#fff',
                                        gap: 1,
                                        fontWeight: 700
                                    }}
                                >
                                    <ZoomInIcon /> Click to Expand Photo
                                </Box>
                                <Chip
                                    size="small"
                                    icon={<VerifiedIcon sx={{ fontSize: '13px !important' }} />}
                                    label="Verified Proof"
                                    sx={{
                                        position: 'absolute',
                                        top: 12,
                                        left: 12,
                                        bgcolor: 'rgba(15,23,42,0.8)',
                                        color: '#34d399',
                                        backdropFilter: 'blur(8px)',
                                        fontWeight: 700,
                                        fontSize: '0.72rem'
                                    }}
                                />
                            </Box>
                            <Box sx={{ p: 2.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'primary.main', mb: 0.5 }}>
                                    {proof.icon}
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.primary' }}>
                                        {proof.title}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
                                    {proof.desc}
                                </Typography>
                            </Box>
                        </Paper>
                    ))}
                </Box>
            </Box>

            {/* Interactive Google Map & Direction Controls */}
            <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary', mb: 2 }}>
                    Interactive Map & Navigation
                </Typography>
                <GoogleMapLocation
                    address={address}
                    city={city}
                    state={state}
                    postalCode={postalCode}
                    latitude={latitude}
                    longitude={longitude}
                    businessName={name}
                    height={380}
                />
            </Box>

            {/* Image Modal Lightbox */}
            <Dialog
                open={Boolean(selectedImage)}
                onClose={() => setSelectedImage(null)}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '24px',
                        bgcolor: 'var(--bg-card)',
                        overflow: 'hidden',
                        p: 0
                    }
                }}
            >
                {selectedImage && (
                    <Box sx={{ position: 'relative' }}>
                        <IconButton
                            onClick={() => setSelectedImage(null)}
                            sx={{
                                position: 'absolute',
                                top: 12,
                                right: 12,
                                bgcolor: 'rgba(0,0,0,0.6)',
                                color: '#fff',
                                zIndex: 10,
                                '&:hover': { bgcolor: 'rgba(0,0,0,0.85)' }
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Box
                            component="img"
                            src={selectedImage.url}
                            alt={selectedImage.title}
                            sx={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', bgcolor: '#000', display: 'block' }}
                        />
                        <Box sx={{ p: 3, bgcolor: 'var(--bg-card)' }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5 }}>
                                {selectedImage.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {selectedImage.desc}
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Dialog>
        </Box>
    );
};

export default LocationProofGallery;
