import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Paper, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
            // Create DTO matching backend structure
            const resetRequest = {
                email: email
            };

            await forgotPassword(resetRequest);
            toast.success('Password reset instructions sent to your email');
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send reset instructions');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
                <Typography component="h1" variant="h5" align="center" gutterBottom>
                    Forgot Password
                </Typography>
                <Typography variant="body2" align="center" sx={{ mb: 3 }}>
                    Enter your email address and we'll send you instructions to reset your password.
                </Typography>
                
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
                    />
                    
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send Reset Instructions'}
                    </Button>
                    
                    <Box sx={{ textAlign: 'center' }}>
                        <Link href="/login" variant="body2">
                            Back to Login
                        </Link>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default ForgotPassword;
