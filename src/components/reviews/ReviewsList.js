import React from 'react';
import {
    Box,
    Typography,
    Rating,
    LinearProgress,
    Avatar,
    Chip,
    Paper
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import RateReviewIcon from '@mui/icons-material/RateReview';

const ReviewsList = ({
    summary = {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        reviews: []
    },
    businessName = 'this business'
}) => {
    const {
        averageRating = 0,
        totalReviews = 0,
        ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        reviews = []
    } = summary;

    const formatDate = (isoString) => {
        if (!isoString) return '';
        try {
            const date = new Date(isoString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return '';
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {/* Aggregate Score & Distribution Card */}
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 3, sm: 4 },
                    borderRadius: '24px',
                    border: '1px solid var(--border-subtle)',
                    bgcolor: 'var(--bg-card)',
                    backdropFilter: 'blur(12px)'
                }}
            >
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '280px 1fr' },
                        gap: { xs: 4, md: 5 },
                        alignItems: 'center'
                    }}
                >
                    {/* Overall Score Left */}
                    <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                        <Typography variant="h2" sx={{ fontWeight: 800, color: 'text.primary', lineHeight: 1 }}>
                            {averageRating > 0 ? averageRating.toFixed(1) : '5.0'}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, gap: 1, my: 1.5 }}>
                            <Rating
                                value={averageRating > 0 ? averageRating : 5}
                                precision={0.5}
                                readOnly
                                sx={{ color: '#f59e0b', fontSize: '1.8rem' }}
                            />
                        </Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                            Based on {totalReviews} {totalReviews === 1 ? 'verified review' : 'verified customer reviews'}
                        </Typography>
                        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.8, mt: 1.5, px: 1.5, py: 0.5, borderRadius: '999px', bgcolor: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)' }}>
                            <VerifiedIcon sx={{ color: '#10b981', fontSize: 16 }} />
                            <Typography variant="caption" sx={{ color: '#10b981', fontWeight: 700 }}>
                                100% Real Completed Appointments
                            </Typography>
                        </Box>
                    </Box>

                    {/* Star Breakdown Progress Bars Right */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                        {[5, 4, 3, 2, 1].map((star) => {
                            const count = ratingDistribution[star] || 0;
                            const percent = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : (star === 5 ? 100 : 0);
                            return (
                                <Box key={star} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, minWidth: 45 }}>
                                        <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                            {star}
                                        </Typography>
                                        <StarIcon sx={{ color: '#f59e0b', fontSize: 16 }} />
                                    </Box>

                                    <Box sx={{ flexGrow: 1 }}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={percent}
                                            sx={{
                                                height: 8,
                                                borderRadius: 4,
                                                bgcolor: 'rgba(37,99,235,0.08)',
                                                '& .MuiLinearProgress-bar': {
                                                    borderRadius: 4,
                                                    bgcolor: star >= 4 ? '#2563eb' : (star === 3 ? '#60a5fa' : '#94a3b8')
                                                }
                                            }}
                                        />
                                    </Box>

                                    <Typography variant="caption" sx={{ minWidth: 40, textAlign: 'right', fontWeight: 600, color: 'text.secondary' }}>
                                        {percent}%
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            </Paper>

            {/* Individual Reviews List */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.01em' }}>
                    Customer Experiences & Reviews ({reviews.length})
                </Typography>

                {reviews.length === 0 ? (
                    <Paper
                        elevation={0}
                        sx={{
                            p: 5,
                            borderRadius: '20px',
                            border: '1px dashed var(--border-subtle)',
                            textAlign: 'center',
                            bgcolor: 'var(--bg-card)'
                        }}
                    >
                        <RateReviewIcon sx={{ fontSize: 48, color: 'text.secondary', opacity: 0.5, mb: 1.5 }} />
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                            No Reviews Yet for {businessName}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 460, mx: 'auto' }}>
                            Clients can submit reviews and ratings after completing an appointment with this business. Book a service to be the first to leave feedback!
                        </Typography>
                    </Paper>
                ) : (
                    reviews.map((rev) => (
                        <Paper
                            key={rev.id}
                            elevation={0}
                            sx={{
                                p: { xs: 2.5, sm: 3 },
                                borderRadius: '20px',
                                border: '1px solid var(--border-subtle)',
                                bgcolor: 'var(--bg-card)',
                                backdropFilter: 'blur(10px)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    borderColor: 'primary.light',
                                    boxShadow: 'var(--card-shadow)'
                                }
                            }}
                        >
                            {/* Reviewer Header */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1.5 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Avatar
                                        src={rev.clientImageUrl}
                                        sx={{
                                            bgcolor: '#2563eb',
                                            fontWeight: 700,
                                            width: 44,
                                            height: 44,
                                            border: '2px solid rgba(37,99,235,0.3)'
                                        }}
                                    >
                                        {rev.clientName ? rev.clientName.charAt(0).toUpperCase() : 'U'}
                                    </Avatar>
                                    <Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.primary' }}>
                                                {rev.clientName || 'Verified Client'}
                                            </Typography>
                                            <Chip
                                                size="small"
                                                icon={<VerifiedIcon sx={{ fontSize: '13px !important' }} />}
                                                label="Verified Customer"
                                                sx={{
                                                    height: 22,
                                                    fontSize: '0.72rem',
                                                    fontWeight: 700,
                                                    bgcolor: 'rgba(16,185,129,0.1)',
                                                    color: '#10b981',
                                                    border: '1px solid rgba(16,185,129,0.25)'
                                                }}
                                            />
                                        </Box>
                                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                            Reviewed on {formatDate(rev.createdAt)}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Rating Stars & Service Tag */}
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', sm: 'flex-end' }, gap: 0.5 }}>
                                    <Rating
                                        value={rev.rating}
                                        readOnly
                                        size="small"
                                        sx={{ color: '#f59e0b' }}
                                    />
                                    {rev.serviceName && (
                                        <Chip
                                            size="small"
                                            label={`Service: ${rev.serviceName}`}
                                            sx={{
                                                bgcolor: 'rgba(37,99,235,0.08)',
                                                color: 'primary.main',
                                                fontWeight: 600,
                                                fontSize: '0.75rem'
                                            }}
                                        />
                                    )}
                                </Box>
                            </Box>

                            {/* Comment */}
                            {rev.comment && (
                                <Typography variant="body2" sx={{ color: 'text.primary', lineHeight: 1.7, pt: 0.5 }}>
                                    "{rev.comment}"
                                </Typography>
                            )}
                        </Paper>
                    ))
                )}
            </Box>
        </Box>
    );
};

export default ReviewsList;
