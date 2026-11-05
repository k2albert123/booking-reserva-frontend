import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Chip,
    Paper,
    Stack,
    Tooltip,
    Alert
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsIcon from '@mui/icons-material/Directions';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import MapIcon from '@mui/icons-material/Map';

/**
 * GoogleMapLocation Component
 * Displays:
 * 1. An interactive Google Map (using REACT_APP_GOOGLE_MAPS_API_KEY if configured).
 * 2. Prominent "Get Directions" button opening Google Maps in a new tab.
 * 3. Exact physical location metadata (street, city, state, postal code, GPS coords).
 * 4. Helper banner guide if the Google Maps API key is not yet set in .env.
 */
const GoogleMapLocation = ({
    address = '',
    city = '',
    state = '',
    postalCode = '',
    latitude,
    longitude,
    businessName = 'Business Location',
    height = 360,
    showDetails = true
}) => {
    const [copied, setCopied] = useState(false);
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';

    // Construct full address string
    const fullAddressParts = [address, city, state, postalCode].filter(Boolean);
    const fullAddressString = fullAddressParts.length > 0
        ? fullAddressParts.join(', ')
        : (latitude && longitude ? `${latitude}, ${longitude}` : 'Location available on request');

    // Directions query
    const destinationQuery = (latitude && longitude)
        ? `${latitude},${longitude}`
        : encodeURIComponent(fullAddressString);

    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destinationQuery}`;

    // Map embed URL
    let embedUrl = '';
    if (apiKey) {
        embedUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${destinationQuery}`;
    } else {
        // Fallback preview embed query
        embedUrl = `https://maps.google.com/maps?q=${destinationQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    }

    const handleCopyAddress = () => {
        if (!fullAddressString) return;
        navigator.clipboard.writeText(fullAddressString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
    };

    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: '20px',
                border: '1px solid var(--border-subtle)',
                bgcolor: 'var(--bg-card)',
                overflow: 'hidden',
                backdropFilter: 'blur(12px)',
                transition: 'border-color 0.25s ease'
            }}
        >
            {/* Header Bar */}
            <Box sx={{
                p: { xs: 2, sm: 2.5 },
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 1.5,
                borderBottom: '1px solid var(--border-subtle)'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <MapIcon sx={{ color: 'primary.main', fontSize: 22 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'text.primary' }}>
                        Physical Location & Map
                    </Typography>
                    <Chip
                        size="small"
                        icon={<LocationOnIcon sx={{ fontSize: '14px !important' }} />}
                        label="Google Maps"
                        sx={{
                            fontWeight: 700,
                            fontSize: '0.75rem',
                            bgcolor: 'rgba(37,99,235,0.1)',
                            color: 'primary.main',
                            border: '1px solid rgba(37,99,235,0.25)'
                        }}
                    />
                </Box>

                <Stack direction="row" spacing={1}>
                    <Tooltip title={copied ? 'Copied to clipboard!' : 'Copy full address'}>
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={handleCopyAddress}
                            startIcon={copied ? <CheckIcon sx={{ color: '#10b981' }} /> : <ContentCopyIcon />}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                borderRadius: '10px',
                                fontSize: '0.82rem',
                                color: copied ? '#10b981' : 'text.primary',
                                borderColor: copied ? '#10b981' : 'var(--border-subtle)'
                            }}
                        >
                            {copied ? 'Copied' : 'Copy Address'}
                        </Button>
                    </Tooltip>

                    <Button
                        size="small"
                        variant="contained"
                        onClick={() => window.open(directionsUrl, '_blank', 'noopener,noreferrer')}
                        startIcon={<DirectionsIcon />}
                        endIcon={<OpenInNewIcon sx={{ fontSize: 15 }} />}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 700,
                            borderRadius: '10px',
                            fontSize: '0.82rem',
                            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                            boxShadow: '0 4px 14px rgba(37,99,235,0.3)'
                        }}
                    >
                        Get Directions
                    </Button>
                </Stack>
            </Box>

            {/* Google Cloud API Key notice if missing */}
            {!apiKey && (
                <Box sx={{ px: { xs: 2, sm: 2.5 }, pt: 2 }}>
                    <Alert
                        severity="info"
                        sx={{
                            borderRadius: '12px',
                            fontSize: '0.85rem',
                            bgcolor: 'rgba(37,99,235,0.08)',
                            color: 'text.primary',
                            border: '1px solid rgba(37,99,235,0.25)',
                            '& .MuiAlert-icon': { color: 'primary.main' }
                        }}
                    >
                        <strong>Google Maps API Setup:</strong> Using standard preview embed. To activate full Google Maps JavaScript API features, paste your Google Cloud API key into <code>frontend/.env</code> as <code>REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_KEY</code>.
                    </Alert>
                </Box>
            )}

            {/* Embedded Interactive Map */}
            <Box
                sx={{
                    width: '100%',
                    height: height,
                    position: 'relative',
                    bgcolor: 'var(--bg-default)',
                    mt: !apiKey ? 1.5 : 0
                }}
            >
                <iframe
                    title={`${businessName} Google Map`}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={embedUrl}
                />
            </Box>

            {/* Location Details Footer */}
            {showDetails && (
                <Box sx={{ p: { xs: 2, sm: 2.5 }, borderTop: '1px solid var(--border-subtle)', bgcolor: 'rgba(37,99,235,0.02)' }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.2fr 0.8fr' }, gap: 2, alignItems: 'center' }}>
                        <Box>
                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block', mb: 0.5, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                Official Street Address
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                {fullAddressString}
                            </Typography>
                        </Box>

                        {(latitude && longitude) && (
                            <Box>
                                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, display: 'block', mb: 0.5, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                                    GPS Coordinates
                                </Typography>
                                <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600, color: 'text.secondary' }}>
                                    {Number(latitude).toFixed(6)}° N, {Number(longitude).toFixed(6)}° E
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
            )}
        </Paper>
    );
};

export default GoogleMapLocation;
