import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Box, 
    Button, 
    TextField, 
    Typography, 
    Container, 
    Paper, 
    Link,
    Grid,
    Divider
} from '@mui/material';
import { login } from '../../services/authService';
import { toast } from 'react-toastify';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Create DTO matching backend structure
            const loginRequest = {
                email: formData.email,
                password: formData.password
            };

            await login(loginRequest);
            toast.success('Login successful!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                minHeight: '100vh',
                justifyContent: 'center'
            }}>
                <Paper elevation={3} sx={{ p: 4, width: '100%', position: 'relative' }}>
                    <Button 
                        startIcon={<ArrowBackIcon />} 
                        onClick={() => navigate('/')}
                        sx={{ position: 'absolute', top: 16, left: 16 }}
                    >
                        Back
                    </Button>
                    <Typography component="h1" variant="h5" align="center" gutterBottom sx={{ mt: 2 }}>
                        Welcome Back
                    </Typography>
                    <Typography variant="body2" align="center" sx={{ mb: 3 }}>
                        Sign in to continue to BookingReserva
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
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        
                        <Divider sx={{ my: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                OR
                            </Typography>
                        </Divider>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Link 
                                    href="/register" 
                                    variant="body2" 
                                    sx={{ display: 'block', textAlign: 'center' }}
                                >
                                    Don't have an account? Register
                                </Link>
                            </Grid>
                            <Grid item xs={12}>
                                <Link 
                                    href="/forgot-password" 
                                    variant="body2" 
                                    sx={{ display: 'block', textAlign: 'center' }}
                                >
                                    Forgot Password?
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Login;
