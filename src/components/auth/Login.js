import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { 
    Box, 
    Button, 
    TextField, 
    Typography, 
    Container, 
    Paper, 
    Link,
    Divider,
    IconButton,
    InputAdornment
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { login } from '../../services/authService';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const loginRequest = {
                email: formData.email.trim(),
                password: formData.password
            };

            await login(loginRequest);
            toast.success('Welcome back! Login successful.');
            navigate('/dashboard');
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            if (message.toLowerCase().includes('not verified') || error.response?.status === 403) {
                toast.info('Please verify your email first');
                navigate('/verify-otp', { state: { email: formData.email } });
            } else {
                toast.error(message);
            }
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
            overflow: 'hidden',
            py: 6,
            px: 2
        }}>
            {/* Ambient Background Glow */}
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

            <Container component="main" maxWidth="sm">
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 3.5, sm: 5 },
                        borderRadius: '28px',
                        bgcolor: 'var(--bg-card)',
                        backdropFilter: 'blur(16px)',
                        border: '1px solid var(--border-subtle)',
                        boxShadow: 'var(--card-shadow)',
                        position: 'relative'
                    }}
                >
                    <Button 
                        startIcon={<ArrowBackIcon />} 
                        onClick={() => navigate('/')}
                        sx={{
                            color: 'text.secondary',
                            borderRadius: '10px',
                            textTransform: 'none',
                            fontWeight: 600,
                            mb: 2,
                            '&:hover': { color: 'text.primary', bgcolor: 'rgba(148,163,184,0.08)' }
                        }}
                    >
                        Back to Home
                    </Button>

                    <Box sx={{ textAlign: 'center', mb: 3.5 }}>
                        <Box
                            component="img"
                            src="/app-logo.png"
                            alt="BookingReserva Logo"
                            sx={{
                                width: 56,
                                height: 56,
                                borderRadius: '16px',
                                display: 'block',
                                mx: 'auto',
                                mb: 2,
                                boxShadow: '0 8px 25px rgba(37,99,235,0.35)',
                                objectFit: 'cover'
                            }}
                        />
                        <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', mb: 1, letterSpacing: '-0.02em' }}>
                            Welcome Back
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Sign in to manage appointments, staff, or business bookings.
                        </Typography>
                    </Box>

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
                            value={formData.email}
                            onChange={handleChange}
                            sx={inputFieldStyle}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            sx={{ color: '#94a3b8' }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            sx={inputFieldStyle}
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mb: 2 }}>
                            <Link 
                                component={RouterLink}
                                to="/forgot-password" 
                                variant="body2" 
                                sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}
                            >
                                Forgot password?
                            </Link>
                        </Box>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{
                                py: 1.5,
                                borderRadius: '14px',
                                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                fontWeight: 800,
                                fontSize: '1rem',
                                textTransform: 'none',
                                boxShadow: '0 8px 25px rgba(37,99,235,0.4)',
                                '&:hover': { background: 'linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)' }
                            }}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </Button>

                        <Divider sx={{ my: 3, borderColor: 'var(--border-subtle)' }}>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                NEW TO BOOKINGRESERVA?
                            </Typography>
                        </Divider>

                        <Button
                            fullWidth
                            variant="outlined"
                            component={RouterLink}
                            to="/register"
                            sx={{
                                py: 1.3,
                                borderRadius: '14px',
                                borderColor: 'var(--border-subtle)',
                                color: 'text.primary',
                                fontWeight: 700,
                                textTransform: 'none',
                                '&:hover': { borderColor: 'primary.main', bgcolor: 'rgba(37,99,235,0.08)' }
                            }}
                        >
                            Create an Account
                        </Button>
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

export default Login;
