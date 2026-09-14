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
    CardContent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Stack
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getBusinessById } from '../../services/businessService';
import { getServicesByBusiness } from '../../services/serviceService';
import { getStaffByBusiness } from '../../services/staffService';
import { createAppointment, getAvailableSlots } from '../../services/appointmentService';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

const BookingForm = () => {
    const { businessId, serviceId } = useParams();
    const navigate = useNavigate();
    const [business, setBusiness] = useState(null);
    const [service, setService] = useState(null);
    const [staffList, setStaffList] = useState([]);
    const [selectedStaffId, setSelectedStaffId] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [slots, setSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingSlots, setLoadingSlots] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [activeStep, setActiveStep] = useState(0);

    const steps = ['Select Staff & Time', 'Confirm Booking'];

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const [biz, services, staff] = await Promise.all([
                    getBusinessById(businessId),
                    getServicesByBusiness(businessId),
                    getStaffByBusiness(businessId)
                ]);
                setBusiness(biz);
                const svc = services.find((s) => String(s.id) === String(serviceId));
                if (!svc) {
                    const svcRes = await api.get(`/services/${serviceId}`);
                    setService(svcRes.data);
                } else {
                    setService(svc);
                }
                setStaffList(staff);
            } catch (err) {
                console.error(err);
                setError('Failed to load details. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [businessId, serviceId]);

    useEffect(() => {
        const loadSlots = async () => {
            if (!selectedDate || !serviceId) return;
            setLoadingSlots(true);
            setSelectedSlot(null);
            try {
                const dateStr = format(selectedDate, 'yyyy-MM-dd');
                const data = await getAvailableSlots(
                    businessId,
                    serviceId,
                    dateStr,
                    selectedStaffId || null
                );
                setSlots(data);
            } catch (err) {
                setSlots([]);
            } finally {
                setLoadingSlots(false);
            }
        };
        loadSlots();
    }, [selectedDate, selectedStaffId, businessId, serviceId]);

    const handleBooking = async () => {
        if (!selectedSlot) {
            setError('Please select a time slot');
            return;
        }
        setSubmitting(true);
        setError(null);
        try {
            await createAppointment({
                serviceId: Number(serviceId),
                staffId: selectedStaffId ? Number(selectedStaffId) : null,
                startTime: selectedSlot,
                notes
            });
            toast.success('Booking successful!');
            navigate('/dashboard?view=appointments');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to complete booking.');
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
                        <Step key={label}><StepLabel>{label}</StepLabel></Step>
                    ))}
                </Stepper>

                {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                <Grid container spacing={4}>
                    <Grid item xs={12} md={5}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="h6" color="primary" gutterBottom>Service Summary</Typography>
                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{service?.name}</Typography>
                                <Typography variant="body1" sx={{ mt: 1 }}>{business?.name}</Typography>
                                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>${service?.price}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Duration: {service?.duration} mins
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={7}>
                        {activeStep === 0 ? (
                            <Box>
                                {staffList.length > 0 && (
                                    <FormControl fullWidth sx={{ mb: 3 }}>
                                        <InputLabel>Staff / Doctor / Barber</InputLabel>
                                        <Select
                                            value={selectedStaffId}
                                            label="Staff / Doctor / Barber"
                                            onChange={(e) => setSelectedStaffId(e.target.value)}
                                        >
                                            <MenuItem value="">Any available</MenuItem>
                                            {staffList.map((s) => (
                                                <MenuItem key={s.id} value={s.id}>
                                                    {s.name}{s.title ? ` — ${s.title}` : ''}{s.specialty ? ` (${s.specialty})` : ''}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}

                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Appointment Date"
                                        value={selectedDate}
                                        onChange={(v) => setSelectedDate(v)}
                                        minDate={new Date()}
                                        slotProps={{ textField: { fullWidth: true } }}
                                    />
                                </LocalizationProvider>

                                <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>Available slots</Typography>
                                {loadingSlots ? (
                                    <CircularProgress size={24} />
                                ) : slots.length === 0 ? (
                                    <Typography color="text.secondary">No slots available for this date.</Typography>
                                ) : (
                                    <Stack direction="row" flexWrap="wrap" gap={1}>
                                        {slots.map((slot) => (
                                            <Chip
                                                key={slot}
                                                label={new Date(slot).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                color={selectedSlot === slot ? 'primary' : 'default'}
                                                onClick={() => setSelectedSlot(slot)}
                                                variant={selectedSlot === slot ? 'filled' : 'outlined'}
                                            />
                                        ))}
                                    </Stack>
                                )}

                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="Additional Notes"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    sx={{ mt: 3 }}
                                />
                                <Button
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    sx={{ mt: 4 }}
                                    disabled={!selectedSlot}
                                    onClick={() => setActiveStep(1)}
                                >
                                    Proceed to Review
                                </Button>
                            </Box>
                        ) : (
                            <Box>
                                <Typography variant="h6" gutterBottom>Confirm Details</Typography>
                                <Typography variant="body1">
                                    <strong>Date:</strong> {selectedSlot ? new Date(selectedSlot).toLocaleString() : '—'}
                                </Typography>
                                {selectedStaffId && (
                                    <Typography variant="body1" sx={{ mt: 1 }}>
                                        <strong>With:</strong> {staffList.find((s) => String(s.id) === String(selectedStaffId))?.name}
                                    </Typography>
                                )}
                                <Typography variant="body1" sx={{ mt: 1 }}>
                                    <strong>Notes:</strong> {notes || 'None'}
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                                    <Button variant="outlined" fullWidth onClick={() => setActiveStep(0)}>Back</Button>
                                    <Button variant="contained" fullWidth disabled={submitting} onClick={handleBooking}>
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
