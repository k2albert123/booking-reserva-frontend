import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Typography, 
    Box, 
    Paper, 
    Grid, 
    TextField, 
    Button, 
    CircularProgress,
    Alert,
    Stepper,
    Step,
    StepLabel,
    Card,
    CardContent
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const BookingForm = () => {
    const { businessId, serviceId } = useParams();
    const navigate = useNavigate();
    const [business, setBusiness] = useState(null);
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingDate, setBookingDate] = useState(new Date());
    const [notes, setNotes] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [activeStep, setActiveStep] = useState(0);

    const steps = ['Select Time', 'Confirm Booking'];

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const [businessRes, serviceRes] = await Promise.all([
                    axios.get(`/api/v1/businesses/${businessId}`),
                    axios.get(`/api/v1/services/${serviceId}`)
                ]);
                setBusiness(businessRes.data);
                setService(serviceRes.data);
            } catch (err) {
                console.error('Error fetching booking details:', err);
                setError('Failed to load details. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [businessId, serviceId]);

    const handleBooking = async () => {
        setSubmitting(true);
        setError(null);
        try {
            await axios.post('/api/v1/appointments', {
                businessId,
                serviceId,
                appointmentTime: bookingDate.toISOString(),
                notes
            });
            navigate('/appointments', { state: { message: 'Booking successful!' } });
        } catch (err) {
            console.error('Booking error:', err);
            setError(err.response?.data?.message || 'Failed to complete booking. Please check your time selection.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <Box display="flex" justifyContent="center" m={4}><CircularProgress /></Box>;

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Book Your Appointment
                </Typography>
                
                <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                <Grid container spacing={4}>
                    <Grid item xs={12} md={5}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" color="primary" gutterBottom>
                                    Service Summary
                                </Typography>
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{service?.name}</Typography>
                                <Typography variant="body1" sx={{ mt: 1 }}>{business?.name}</Typography>
                                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                                    ${service?.price}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Duration: {service?.duration} mins
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={7}>
                        {activeStep === 0 ? (
                            <Box>
                                <Typography variant="h6" gutterBottom>Pick a convenient date and time</Typography>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        label="Appointment Date & Time"
                                        value={bookingDate}
                                        onChange={(newValue) => setBookingDate(newValue)}
                                        renderInput={(params) => <TextField {...params} fullWidth sx={{ mt: 2 }} />}
                                        minDateTime={new Date()}
                                    />
                                </LocalizationProvider>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="Additional Notes"
                                    placeholder="Any special requests or details..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    sx={{ mt: 3 }}
                                />
                                <Button 
                                    variant="contained" 
                                    fullWidth 
                                    size="large" 
                                    sx={{ mt: 4 }}
                                    onClick={() => setActiveStep(1)}
                                >
                                    Proceed to Review
                                </Button>
                            </Box>
                        ) : (
                            <Box>
                                <Typography variant="h6" gutterBottom>Confirm Details</Typography>
                                <Typography variant="body1"><strong>Date:</strong> {bookingDate.toLocaleString()}</Typography>
                                <Typography variant="body1" sx={{ mt: 1 }}><strong>Notes:</strong> {notes || 'None'}</Typography>
                                
                                <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                                    <Button 
                                        variant="outlined" 
                                        fullWidth 
                                        onClick={() => setActiveStep(0)}
                                    >
                                        Back
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        fullWidth 
                                        disabled={submitting}
                                        onClick={handleBooking}
                                    >
                                        {submitting ? <CircularProgress size={24} /> : 'Confirm Booking'}
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default BookingForm;
