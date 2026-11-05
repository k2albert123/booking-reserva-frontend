import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Paper, Link, Stack } from '@mui/material';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { verifyOtp, resendOtp } from '../../services/authService';
import { toast } from 'react-toastify';

const VerifyOtp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState(location.state?.email || '');
    const [code, setCode] = useState(location.state?.otpCode || '');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await verifyOtp(email.trim(), code.trim());
            toast.success('Email verified successfully! You are now logged in.');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Verification failed. Please check the code.');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (!email) {
            toast.error('Please enter your email first');
            return;
        }
        try {
            await resendOtp(email.trim());
            toast.success('A new 6-digit verification code has been dispatched to your inbox');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to resend code');
        }
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'var(--bg-default)',
            position: 'relative',
            py: 6,
            px: 2
        }}>
            <Box sx={{
                position: 'absolute',
                width: 600,
                height: 600,
                background: 'radial-gradient(circle, var(--spotlight-glow) 0%, transparent 70%)',
                top: '-150px',
                left: '50%',
                transform: 'translateX(-50%)',
                pointerEvents: 'none'
            }} />

            <Container component="main" maxWidth="xs">
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 3.5, sm: 4.5 },
                        borderRadius: '28px',
                        bgcolor: 'var(--bg-card)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid var(--border-subtle)',
                        boxShadow: 'var(--card-shadow)',
                        textAlign: 'center'
                    }}
                >
                    <Box sx={{
                        width: 52,
                        height: 52,
                        borderRadius: '16px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        mx: 'auto',
                        mb: 2,
                        boxShadow: '0 8px 25px rgba(37,99,235,0.4)'
                    }}>
                        <MarkEmailReadIcon sx={{ fontSize: 28 }} />
                    </Box>

                    <Typography component="h1" variant="h5" sx={{ fontWeight: 800, color: 'text.primary', mb: 1 }}>
                        Verify Your Email
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3.5, lineHeight: 1.6 }}>
                        Enter the 6-digit confirmation code sent to your email to activate your account.
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
                            sx={inputFieldStyle}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="6-Digit OTP Code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            inputProps={{ maxLength: 6, style: { textAlign: 'center', letterSpacing: 8, fontSize: '1.25rem', fontWeight: 800 } }}
                            placeholder="123456"
                            sx={inputFieldStyle}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{
                                mt: 3,
                                mb: 2,
                                py: 1.4,
                                borderRadius: '14px',
                                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                fontWeight: 800,
                                fontSize: '1rem',
                                textTransform: 'none',
                                '&:hover': { background: 'linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)' }
                            }}
                        >
                            {loading ? 'Verifying Code...' : 'Verify & Continue'}
                        </Button>

                        <Stack spacing={1.5} sx={{ mt: 2 }}>
                            <Button
                                onClick={handleResend}
                                size="small"
                                sx={{ color: 'primary.main', textTransform: 'none', fontWeight: 700 }}
                            >
                                Didn't receive the code? Resend OTP
                            </Button>

                            <Link
                                component={RouterLink}
                                to="/login"
                                variant="body2"
                                sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'text.primary' } }}
                            >
                                Back to Login
                            </Link>
                        </Stack>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

const inputFieldStyle = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '14px',
        color: 'text.primary',
        bgcolor: 'var(--bg-paper)',
        '& fieldset': { borderColor: 'var(--border-subtle)' },
        '&:hover fieldset': { borderColor: 'primary.main' },
        '&.Mui-focused fieldset': { borderColor: 'primary.main' }
    },
    '& .MuiInputLabel-root': { color: 'text.secondary' },
    '& .MuiInputLabel-root.Mui-focused': { color: 'primary.main' }
};

export default VerifyOtp;
