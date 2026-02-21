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
    Divider,
    Alert,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid
} from '@mui/material';
import { register } from '../../services/authService';
import { toast } from 'react-toastify';
import ImageUpload from '../common/ImageUpload';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        phoneNumber: '',
        imageUrl: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError(''); // Clear error when user starts typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.name) {
            setError('Name is required');
            return;
        }

        if (!formData.email) {
            setError('Email is required');
            return;
        }

        if (!formData.role) {
            setError('Role is required');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        try {
            setLoading(true);
            setError('');
            // Create DTO matching backend structure
            const registerRequest = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                password: formData.password,
                role: formData.role.toUpperCase(),
                phoneNumber: formData.phoneNumber?.trim() || '',
                imageUrl: formData.imageUrl
            };

            await register(registerRequest);
            toast.success('Registration successful!');
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error);
            const errorMessage = error.response?.data?.message || 'Registration failed';
            setError(errorMessage);
            
            if (errorMessage.includes('Email already registered')) {
                toast.error('This email is already registered. Please use a different email.');
            } else if (errorMessage.includes('Invalid role')) {
                toast.error('Invalid role selected. Please choose either Client or Business Owner.');
            } else {
                toast.error(errorMessage);
            }
        } finally {
            setLoading(false);
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
                <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
                    <Typography component="h1" variant="h5" align="center" gutterBottom>
                        Create Account
                    </Typography>
                    <Typography variant="body2" align="center" sx={{ mb: 3 }}>
                        Join BookingReserva and start managing your appointments
                    </Typography>
                    
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <ImageUpload 
                            value={formData.imageUrl} 
                            onChange={(url) => setFormData({...formData, imageUrl: url})} 
                            label="Profile Picture"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Full Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={formData.name}
                            onChange={handleChange}
                            error={!formData.name}
                            helperText={formData.name ? '' : 'Name is required'}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!formData.email}
                            helperText={formData.email ? '' : 'Email is required'}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={formData.password}
                            onChange={handleChange}
                            error={formData.password && formData.password.length < 6}
                            helperText={formData.password ? '' : 'Password must be at least 6 characters long'}
                        />
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel id="role-label">Role</InputLabel>
                            <Select
                                labelId="role-label"
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                label="Role"
                                error={!formData.role}
                            >
                                <MenuItem value="CLIENT">Client</MenuItem>
                                <MenuItem value="BUSINESS_OWNER">Business Owner</MenuItem>
                            </Select>
                            <Typography color="error" sx={{ mt: 1 }}>
                                {formData.role ? '' : 'Role is required'}
                            </Typography>
                        </FormControl>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            autoComplete="new-password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={formData.password !== formData.confirmPassword}
                            helperText={formData.password !== formData.confirmPassword ? 'Passwords do not match' : ''}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="phoneNumber"
                            label="Phone Number (Optional)"
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading || !formData.name || !formData.email || !formData.password || !formData.confirmPassword}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </Button>
                        
                        <Divider sx={{ my: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                OR
                            </Typography>
                        </Divider>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Link 
                                    href="/login" 
                                    variant="body2" 
                                    sx={{ display: 'block', textAlign: 'center' }}
                                >
                                    Already have an account? Login
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Register;
