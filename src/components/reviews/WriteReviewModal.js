import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    TextField,
    Rating,
    IconButton,
    CircularProgress,
    Chip
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import { createReview } from '../../services/reviewService';
import { toast } from 'react-toastify';

const RATING_LABELS = {
    1: 'Poor Experience',
    2: 'Fair / Below Expectation',
    3: 'Good Service',
    4: 'Very Good / Satisfied',
    5: 'Excellent / Highly Recommended'
};

const WriteReviewModal = ({ open, onClose, appointment, onReviewSubmitted }) => {
    const [rating, setRating] = useState(5);
    const [hoverRating, setHoverRating] = useState(-1);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    if (!appointment) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!rating || rating < 1) {
            toast.error('Please select a star rating from 1 to 5.');
            return;
        }

        setSubmitting(true);
        try {
            await createReview({
                appointmentId: appointment.id,
                rating: Number(rating),
                comment: comment.trim()
            });

            toast.success('Your verified review has been submitted successfully! Thank you for your feedback.');
            if (onReviewSubmitted) {
                onReviewSubmitted(appointment.id);
            }
            onClose();
        } catch (err) {
            const msg = err.response?.data?.message || 'Failed to submit review. Please try again.';
            toast.error(msg);
        } finally {
            setSubmitting(false);
        }
    };

    const activeRating = hoverRating !== -1 ? hoverRating : rating;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '24px',
                    bgcolor: 'var(--bg-card)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid var(--border-subtle)',
                    boxShadow: 'var(--card-shadow-hover)',
                    p: { xs: 1, sm: 2 }
                }
            }}
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary' }}>
                        Write a Verified Review
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mt: 0.5 }}>
                        <VerifiedIcon sx={{ color: '#10b981', fontSize: 16 }} />
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                            Verified Customer Review for Completed Service
                        </Typography>
                    </Box>
                </Box>
                <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <form onSubmit={handleSubmit}>
                <DialogContent sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    {/* Appointment Summary Box */}
                    <Box
                        sx={{
                            p: 2,
                            borderRadius: '16px',
                            bgcolor: 'rgba(37,99,235,0.06)',
                            border: '1px solid rgba(37,99,235,0.18)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.5
                        }}
                    >
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase' }}>
                            Business & Service
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'text.primary' }}>
                            {appointment.business?.name || 'Local Business Partner'}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
                            <Chip
                                size="small"
                                label={appointment.service?.name || 'Provided Service'}
                                sx={{ bgcolor: 'rgba(37,99,235,0.12)', color: 'primary.main', fontWeight: 700 }}
                            />
                            {appointment.staff?.name && (
                                <Chip
                                    size="small"
                                    variant="outlined"
                                    label={`Specialist: ${appointment.staff.name}`}
                                    sx={{ fontWeight: 600, color: 'text.secondary' }}
                                />
                            )}
                        </Box>
                    </Box>

                    {/* Star Rating Selection */}
                    <Box sx={{ textAlign: 'center', py: 1 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', mb: 1.5 }}>
                            How would you rate this service experience?
                        </Typography>
                        <Rating
                            name="appointment-rating"
                            value={rating}
                            precision={1}
                            size="large"
                            onChange={(event, newValue) => {
                                if (newValue) setRating(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                                setHoverRating(newHover);
                            }}
                            emptyIcon={<StarIcon style={{ opacity: 0.3 }} fontSize="inherit" />}
                            sx={{
                                fontSize: '2.8rem',
                                color: '#f59e0b',
                                '& .MuiRating-iconFilled': { color: '#f59e0b' },
                                '& .MuiRating-iconHover': { color: '#fbbf24' }
                            }}
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                mt: 1,
                                fontWeight: 700,
                                color: activeRating >= 4 ? '#10b981' : (activeRating === 3 ? '#2563eb' : '#f59e0b'),
                                minHeight: '24px'
                            }}
                        >
                            {RATING_LABELS[activeRating] || 'Select Rating'}
                        </Typography>
                    </Box>

                    {/* Review Comment Text */}
                    <Box>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 1 }}>
                            Your Honest Review & Feedback (Optional)
                        </Typography>
                        <TextField
                            multiline
                            rows={4}
                            fullWidth
                            placeholder="Share your experience: service quality, staff friendliness, punctuality, cleanliness, or recommendation to others..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            inputProps={{ maxLength: 2000 }}
                            helperText={`${comment.length} / 2000 characters`}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '16px',
                                    bgcolor: 'var(--bg-default)'
                                }
                            }}
                        />
                    </Box>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 3, pt: 1, display: 'flex', gap: 1.5 }}>
                    <Button
                        variant="outlined"
                        onClick={onClose}
                        disabled={submitting}
                        sx={{
                            borderRadius: '12px',
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 3,
                            color: 'text.primary',
                            borderColor: 'var(--border-subtle)'
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={submitting}
                        startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : <StarIcon />}
                        sx={{
                            borderRadius: '12px',
                            textTransform: 'none',
                            fontWeight: 700,
                            px: 3.5,
                            py: 1.2,
                            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                            boxShadow: '0 4px 14px rgba(37,99,235,0.3)'
                        }}
                    >
                        {submitting ? 'Submitting...' : 'Submit Verified Review'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default WriteReviewModal;
