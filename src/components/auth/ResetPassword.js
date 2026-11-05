import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Paper, Link } from '@mui/material';
import { useNavigate, useSearchParams, Link as RouterLink } from 'react-router-dom';
import KeyIcon from '@mui/icons-material/Key';
import { resetPassword } from '../../services/authService';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token') || '';
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        if (newPassword.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }
        if (!token) {
            toast.error('Invalid or expired reset token');
            return;
        }
        setLoading(true);
        try {
            await resetPassword(token, newPassword);
            toast.success('Password updated successfully! Please log in.');
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to reset password');
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
                        <KeyIcon sx={{ fontSize: 28 }} />
                    </Box>

                    <Typography component="h1" variant="h5" sx={{ fontWeight: 800, color: 'text.primary', mb: 1 }}>
                        Create New Password
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3.5 }}>
                        Enter your new secure password below to regain access.
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="password"
                            label="New Password (min. 6 chars)"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            sx={inputFieldStyle}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="password"
                            label="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                            {loading ? 'Updating Password...' : 'Save New Password'}
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

export default ResetPassword;
