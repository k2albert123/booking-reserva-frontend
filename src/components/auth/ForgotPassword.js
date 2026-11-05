import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Paper, Link } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import LockResetIcon from '@mui/icons-material/LockReset';
import { forgotPassword } from '../../services/authService';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await forgotPassword(email.trim());
            toast.success(res?.message || 'Password reset instructions sent to your email.');
            if (res?.resetLink) {
                const tokenPart = res.resetLink.split('token=')[1];
                if (tokenPart) {
                    navigate(`/reset-password?token=${tokenPart}`);
                    return;
                }
            }
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send reset instructions');
        } finally {
            setLoading(false);
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
                        <LockResetIcon sx={{ fontSize: 28 }} />
                    </Box>

                    <Typography component="h1" variant="h5" sx={{ fontWeight: 800, color: 'text.primary', mb: 1 }}>
                        Forgot Password
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3.5, lineHeight: 1.6 }}>
                        Enter your registered email address and we'll send you instructions to reset your password.
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            sx={inputFieldStyle}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{
                                mt: 3,
                                mb: 2.5,
                                py: 1.4,
                                borderRadius: '14px',
                                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                fontWeight: 800,
                                fontSize: '1rem',
                                textTransform: 'none',
                                '&:hover': { background: 'linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)' }
                            }}
                        >
                            {loading ? 'Sending Instructions...' : 'Send Reset Link'}
                        </Button>

                        <Box sx={{ textAlign: 'center' }}>
                            <Link
                                component={RouterLink}
                                to="/login"
                                variant="body2"
                                sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}
                            >
                                Back to Sign In
                            </Link>
                        </Box>
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

export default ForgotPassword;
