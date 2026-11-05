import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { 
    Box, 
    Button, 
    TextField, 
    Typography, 
    Container, 
    Paper, 
    Divider,
    Alert,
    Grid,
    IconButton,
    InputAdornment,
    CircularProgress,
    Checkbox,
    Link
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import BadgeIcon from '@mui/icons-material/Badge';
import { register, uploadProofFile } from '../../services/authService';
import { toast } from 'react-toastify';
import ImageUpload from '../common/ImageUpload';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'CLIENT',
        phoneNumber: '',
        imageUrl: '',
        idProofUrl: '',
        businessProofUrl: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadingProof, setUploadingProof] = useState(false);
    const [error, setError] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleRoleSelect = (selectedRole) => {
        setFormData(prev => ({ ...prev, role: selectedRole }));
        setError('');
    };

    const handleProofUpload = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('Please upload a valid image file (JPG, PNG, or WEBP)');
            return;
        }

        setUploadingProof(true);
        setError('');
        try {
            const url = await uploadProofFile(file);
            if (formData.role === 'BUSINESS_OWNER') {
                setFormData(prev => ({ ...prev, businessProofUrl: url }));
                toast.success('Business registration document uploaded successfully');
            } else {
                setFormData(prev => ({ ...prev, idProofUrl: url }));
                toast.success('Valid ID document uploaded successfully');
            }
        } catch (err) {
            console.error('Proof upload error:', err);
            setError('Failed to upload document. Please try again.');
        } finally {
            setUploadingProof(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.name.trim()) {
            setError('Full name is required');
            return;
        }
        if (!formData.email.trim()) {
            setError('Email address is required');
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

        // Verification Proof Enforcement
        if (formData.role === 'BUSINESS_OWNER' && !formData.businessProofUrl) {
            setError('Proof of business registration picture/certificate is required for service owners.');
            return;
        }

        if (formData.role === 'CLIENT' && !formData.idProofUrl) {
            setError('Valid government-issued ID image is required for user verification.');
            return;
        }

        if (!agreedToTerms) {
            setError('You must agree to the Terms of Service and acknowledge the Privacy Policy to create an account.');
            return;
        }

        try {
            setLoading(true);
            setError('');
            const registerRequest = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                password: formData.password,
                role: formData.role.toUpperCase(),
                phoneNumber: formData.phoneNumber?.trim() || '',
                imageUrl: formData.imageUrl,
                idProofUrl: formData.idProofUrl,
                businessProofUrl: formData.businessProofUrl
            };

            const res = await register(registerRequest);
            toast.success('Registration successful! Please verify your email with the OTP code.');
            navigate('/verify-otp', { 
                state: { 
                    email: formData.email.trim(),
                    otpCode: res?.otpCode
                } 
            });
        } catch (err) {
            console.error('Registration error:', err);
            const errorMessage = err.response?.data?.message || 'Registration failed. Please check your details.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const isBusinessOwner = formData.role === 'BUSINESS_OWNER';
    const proofUrl = isBusinessOwner ? formData.businessProofUrl : formData.idProofUrl;

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

            <Container component="main" maxWidth="md">
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 3, sm: 4.5 },
                        borderRadius: '24px',
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
                        <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5, letterSpacing: '-0.02em' }}>
                            Create Your Account
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Join the verified reservation ecosystem. All accounts are reviewed by administrators for security.
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
                            {error}
                        </Alert>
                    )}

                    {/* ROLE SELECTOR CARDS */}
                    <Box sx={{ mb: 3.5 }}>
                        <Typography variant="subtitle2" sx={{ color: 'text.primary', fontWeight: 700, mb: 1.5, textAlign: 'center' }}>
                            Select Account Type:
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Box
                                    onClick={() => handleRoleSelect('CLIENT')}
                                    sx={{
                                        p: 2,
                                        borderRadius: '16px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        bgcolor: formData.role === 'CLIENT' ? 'rgba(37,99,235,0.1)' : 'var(--bg-paper)',
                                        border: '2px solid',
                                        borderColor: formData.role === 'CLIENT' ? '#2563eb' : 'var(--border-subtle)',
                                        transition: 'all 0.2s ease',
                                        '&:hover': { borderColor: '#3b82f6' }
                                    }}
                                >
                                    <Box sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: '10px',
                                        bgcolor: formData.role === 'CLIENT' ? '#2563eb' : 'rgba(148,163,184,0.12)',
                                        color: formData.role === 'CLIENT' ? 'white' : 'text.secondary',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <PersonOutlineIcon sx={{ fontSize: 22 }} />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontWeight: 700, color: 'text.primary' }}>
                                            Client / Customer
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                            Requires valid ID document for booking
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <Box
                                    onClick={() => handleRoleSelect('BUSINESS_OWNER')}
                                    sx={{
                                        p: 2,
                                        borderRadius: '16px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        bgcolor: formData.role === 'BUSINESS_OWNER' ? 'rgba(37,99,235,0.1)' : 'var(--bg-paper)',
                                        border: '2px solid',
                                        borderColor: formData.role === 'BUSINESS_OWNER' ? '#2563eb' : 'var(--border-subtle)',
                                        transition: 'all 0.2s ease',
                                        '&:hover': { borderColor: '#3b82f6' }
                                    }}
                                >
                                    <Box sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: '10px',
                                        bgcolor: formData.role === 'BUSINESS_OWNER' ? '#2563eb' : 'rgba(148,163,184,0.12)',
                                        color: formData.role === 'BUSINESS_OWNER' ? 'white' : 'text.secondary',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <StorefrontIcon sx={{ fontSize: 22 }} />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontWeight: 700, color: 'text.primary' }}>
                                            Service / Business Owner
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                            Requires business registration certificate
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>

                    {/* MANDATORY VERIFICATION PROOF UPLOAD CARD */}
                    <Box
                        sx={{
                            mb: 3.5,
                            p: 2.5,
                            borderRadius: '18px',
                            bgcolor: 'var(--bg-paper)',
                            border: '1px solid var(--border-subtle)'
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                            {isBusinessOwner ? (
                                <BadgeIcon sx={{ color: '#2563eb', fontSize: 24 }} />
                            ) : (
                                <VerifiedUserIcon sx={{ color: '#2563eb', fontSize: 24 }} />
                            )}
                            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'text.primary' }}>
                                {isBusinessOwner 
                                    ? 'Proof of Business Registration (Required)' 
                                    : 'Valid Identity Document Photo (Required)'}
                            </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                            {isBusinessOwner 
                                ? 'Upload an official picture or scan of your business license, tax certificate, or incorporation certificate. Administrators must approve your business before your listing is activated.' 
                                : 'Upload a clear photograph of your government-issued ID (National ID, Passport, or Driver’s License). Administrators verify client accounts to prevent spam and protect service providers.'}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                            <Button
                                component="label"
                                variant="outlined"
                                startIcon={uploadingProof ? <CircularProgress size={18} /> : <CloudUploadIcon />}
                                disabled={uploadingProof}
                                sx={{
                                    borderRadius: '12px',
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    borderColor: proofUrl ? '#10b981' : 'var(--border-subtle)',
                                    color: proofUrl ? '#10b981' : 'text.primary',
                                    '&:hover': { borderColor: '#2563eb' }
                                }}
                            >
                                {uploadingProof ? 'Uploading...' : proofUrl ? 'Change Document Photo' : 'Upload Verification Document'}
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleProofUpload}
                                />
                            </Button>

                            {proofUrl && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Box
                                        component="img"
                                        src={proofUrl}
                                        alt="Proof Document"
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                            border: '1px solid #10b981'
                                        }}
                                    />
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#10b981' }}>
                                        <CheckCircleIcon sx={{ fontSize: 18 }} />
                                        <Typography variant="caption" sx={{ fontWeight: 700 }}>
                                            Document Ready for Admin Review
                                        </Typography>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Box>

                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2.5}>
                            <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                <ImageUpload
                                    value={formData.imageUrl}
                                    onChange={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
                                    label="Upload Avatar / Logo (Optional)"
                                    folder="profiles"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Full Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    sx={inputFieldStyle}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    sx={inputFieldStyle}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    sx={inputFieldStyle}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password (min. 6 chars)"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                    sx={{ color: 'text.secondary' }}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                    sx={inputFieldStyle}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    sx={inputFieldStyle}
                                />
                            </Grid>

                            {/* Legal Consent Checkbox */}
                            <Grid item xs={12}>
                                <Box sx={{ 
                                    display: 'flex', 
                                    alignItems: 'flex-start', 
                                    gap: 1.5, 
                                    p: 1.5, 
                                    borderRadius: '12px',
                                    bgcolor: 'rgba(37,99,235,0.04)',
                                    border: '1px solid var(--border-subtle)'
                                }}>
                                    <Checkbox
                                        checked={agreedToTerms}
                                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                                        size="small"
                                        color="primary"
                                        sx={{ p: 0.25, mt: 0.25 }}
                                    />
                                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.825rem', lineHeight: 1.5 }}>
                                        I agree to the{' '}
                                        <Link 
                                            component={RouterLink} 
                                            to="/terms" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            sx={{ color: '#2563eb', fontWeight: 700, textDecoration: 'underline' }}
                                        >
                                            Terms of Service
                                        </Link>{' '}
                                        and acknowledge the{' '}
                                        <Link 
                                            component={RouterLink} 
                                            to="/privacy" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            sx={{ color: '#2563eb', fontWeight: 700, textDecoration: 'underline' }}
                                        >
                                            Privacy Policy
                                        </Link>
                                        , including administrative verification and secure processing of my submitted identification documents.
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sx={{ mt: 1 }}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    disabled={loading || uploadingProof}
                                    sx={{
                                        py: 1.5,
                                        borderRadius: '14px',
                                        bgcolor: '#2563eb',
                                        fontWeight: 800,
                                        fontSize: '1rem',
                                        textTransform: 'none',
                                        boxShadow: '0 4px 14px rgba(37,99,235,0.3)',
                                        '&:hover': { bgcolor: '#1d4ed8' }
                                    }}
                                >
                                    {loading ? 'Creating Account...' : 'Complete Registration'}
                                </Button>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 3, borderColor: 'var(--border-subtle)' }}>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                ALREADY HAVE AN ACCOUNT?
                            </Typography>
                        </Divider>

                        <Button
                            fullWidth
                            variant="outlined"
                            component={RouterLink}
                            to="/login"
                            sx={{
                                py: 1.3,
                                borderRadius: '14px',
                                borderColor: 'var(--border-subtle)',
                                color: 'text.primary',
                                fontWeight: 700,
                                textTransform: 'none',
                                '&:hover': { borderColor: '#2563eb', bgcolor: 'rgba(37,99,235,0.06)' }
                            }}
                        >
                            Sign In to Existing Account
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

export default Register;
