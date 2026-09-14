import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Paper, Link } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
            toast.error('Invalid reset link');
            return;
        }
        setLoading(true);
        try {
            await resetPassword(token, newPassword);
            toast.success('Password reset successfully. Please log in.');
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to reset password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
                <Typography component="h1" variant="h5" align="center" gutterBottom>
                    Reset Password
                </Typography>
                <Typography variant="body2" align="center" sx={{ mb: 3 }}>
                    Enter your new password below.
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        label="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </Button>
                    <Box sx={{ textAlign: 'center' }}>
                        <Link href="/login" variant="body2">Back to Login</Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default ResetPassword;
