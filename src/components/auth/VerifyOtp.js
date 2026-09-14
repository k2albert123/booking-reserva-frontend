import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Paper, Link } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOtp, resendOtp } from '../../services/authService';
import { toast } from 'react-toastify';

const VerifyOtp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState(location.state?.email || '');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await verifyOtp(email.trim(), code.trim());
            toast.success('Email verified successfully!');
            if (data.role === 'ADMIN') {
                navigate('/dashboard');
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Verification failed');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (!email) {
            toast.error('Enter your email first');
            return;
        }
        try {
            await resendOtp(email.trim());
            toast.success('A new OTP has been sent to your email');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to resend OTP');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
                <Typography component="h1" variant="h5" align="center" gutterBottom>
                    Verify Your Email
                </Typography>
                <Typography variant="body2" align="center" sx={{ mb: 3 }}>
                    Enter the 6-digit code sent to your email.
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="OTP Code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        inputProps={{ maxLength: 6 }}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify Email'}
                    </Button>
                    <Box sx={{ textAlign: 'center' }}>
                        <Button onClick={handleResend} size="small">Resend OTP</Button>
                    </Box>
                    <Box sx={{ textAlign: 'center', mt: 1 }}>
                        <Link href="/login" variant="body2">Back to Login</Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default VerifyOtp;
