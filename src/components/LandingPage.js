import React from 'react';
import { 
    Box, 
    Container, 
    Typography, 
    Button, 
    Paper, 
    Grid, 
    Stack,
    Card,
    CardContent,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled, keyframes } from '@mui/material/styles';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SecurityIcon from '@mui/icons-material/Security';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const HeroSection = styled(Box)(({ theme }) => ({
    background: 'radial-gradient(circle at 50% 50%, #1a237e 0%, #000051 100%)',
    color: 'white',
    padding: theme.spacing(15, 0),
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("https://www.transparenttextures.com/patterns/cubes.png")',
        opacity: 0.1,
    }
}));

const GlassCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '24px',
    color: 'white',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-10px)',
        background: 'rgba(255, 255, 255, 0.1)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
    }
}));

const HeroVisual = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '400px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
    animation: `${float} 6s ease-in-out infinite`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 50px 100px rgba(0,0,0,0.5)',
}));

const LandingPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={{ bgcolor: '#050a30' }}>
            {/* Hero Section */}
            <HeroSection>
                <Container maxWidth="lg">
                    <Grid container spacing={6} alignItems="center">
                        <Grid item xs={12} md={7}>
                            <Box sx={{ textAlign: isMobile ? 'center' : 'left' }}>
                                <Typography 
                                    component="h1" 
                                    variant={isMobile ? "h3" : "h1"} 
                                    gutterBottom 
                                    sx={{ fontWeight: 900, mb: 2, background: 'linear-gradient(to right, #fff, #4dabf5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                                >
                                    The Future of Appointments
                                </Typography>
                                <Typography variant="h5" paragraph sx={{ color: 'rgba(255,255,255,0.7)', mb: 4, fontWeight: 300 }}>
                                    Experience the most seamless way to book services and manage your business. All in one place.
                                </Typography>
                                <Stack direction={isMobile ? "column" : "row"} spacing={2} justifyContent={isMobile ? "center" : "flex-start"}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={() => navigate('/register')}
                                        sx={{ 
                                            borderRadius: '50px', 
                                            px: 4, 
                                            py: 2, 
                                            fontSize: '1.1rem',
                                            textTransform: 'none',
                                            boxShadow: '0 10px 20px rgba(25, 118, 210, 0.3)',
                                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
                                        }}
                                    >
                                        Get Started Free
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        onClick={() => navigate('/login')}
                                        sx={{ 
                                            borderRadius: '50px', 
                                            px: 4, 
                                            py: 2, 
                                            fontSize: '1.1rem',
                                            textTransform: 'none',
                                            borderColor: 'white',
                                            color: 'white',
                                            '&:hover': { borderColor: '#4dabf5', color: '#4dabf5' }
                                        }}
                                    >
                                        Sign In
                                    </Button>
                                </Stack>
                            </Box>
                        </Grid>
                        {!isMobile && (
                            <Grid item md={5}>
                                <HeroVisual>
                                    <CalendarMonthIcon sx={{ fontSize: 180, color: 'white', opacity: 0.9 }} />
                                </HeroVisual>
                            </Grid>
                        )}
                    </Grid>
                </Container>
            </HeroSection>

            {/* Features Section */}
            <Container maxWidth="lg" sx={{ py: 15 }}>
                <Box sx={{ textAlign: 'center', mb: 10 }}>
                    <Typography variant="overline" sx={{ color: '#4dabf5', fontWeight: 'bold', letterSpacing: 4 }}>
                        FEATURES
                    </Typography>
                    <Typography variant="h2" sx={{ color: 'white', fontWeight: 800, mt: 1 }}>
                        Built for Efficiency
                    </Typography>
                </Box>
                
                <Grid container spacing={4}>
                    {[
                        { title: 'Smart Scheduling', desc: 'Intelligent booking system that works around your clock.', icon: <CalendarMonthIcon sx={{ fontSize: 40 }} />, color: '#4dabf5' },
                        { title: 'Grow Fast', desc: 'Powerful analytics to help you scale your business operations.', icon: <TrendingUpIcon sx={{ fontSize: 40 }} />, color: '#66bb6a' },
                        { title: 'Owner Portals', desc: 'Dedicated tools for business owners to manage everything.', icon: <BusinessCenterIcon sx={{ fontSize: 40 }} />, color: '#ffa726' },
                        { title: 'Bank-Grade Security', desc: 'Secure encryption for all your data and transactions.', icon: <SecurityIcon sx={{ fontSize: 40 }} />, color: '#ef5350' }
                    ].map((feature, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <GlassCard>
                                <Box sx={{ 
                                    width: 60, 
                                    height: 60, 
                                    borderRadius: '16px', 
                                    bgcolor: feature.color, 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    mb: 3,
                                    boxShadow: `0 10px 20px ${feature.color}33`
                                }}>
                                    {feature.icon}
                                </Box>
                                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    {feature.title}
                                </Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontWeight: 300 }}>
                                    {feature.desc}
                                </Typography>
                            </GlassCard>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Featured Businesses Section */}
            <Container maxWidth="lg" sx={{ py: 15, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: '40px' }}>
                <Box sx={{ textAlign: 'center', mb: 10 }}>
                    <Typography variant="overline" sx={{ color: '#4dabf5', fontWeight: 'bold', letterSpacing: 4 }}>
                        DISCOVER
                    </Typography>
                    <Typography variant="h2" sx={{ color: 'white', fontWeight: 800, mt: 1 }}>
                        Featured Businesses
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {[
                        { 
                            name: 'Elite Hair Salon', 
                            type: 'Beauty & Styling', 
                            img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800',
                            desc: 'Experience premium hair care and modern styling in a luxury environment.' 
                        },
                        { 
                            name: 'Zen Wellness Spa', 
                            type: 'Health & Spa', 
                            img: 'https://images.unsplash.com/photo-1544161515-436cefb657f8?auto=format&fit=crop&q=80&w=800',
                            desc: 'Rejuvenate your body and mind with our professional massage and skin treatments.' 
                        },
                        { 
                            name: 'Modern Dental Care', 
                            type: 'Health & Medical', 
                            img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
                            desc: 'State-of-the-art dental services for a brighter, healthier smile.' 
                        }
                    ].map((business, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Card sx={{ 
                                height: '100%', 
                                borderRadius: '24px', 
                                bgcolor: 'rgba(255,255,255,0.05)',
                                color: 'white',
                                border: '1px solid rgba(255,255,255,0.1)',
                                overflow: 'hidden',
                                transition: 'transform 0.3s ease',
                                '&:hover': { transform: 'scale(1.02)' }
                            }}>
                                <Box sx={{ height: 240, overflow: 'hidden' }}>
                                    <Box 
                                        component="img" 
                                        src={business.img} 
                                        alt={business.name}
                                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </Box>
                                <CardContent sx={{ p: 4 }}>
                                    <Typography variant="overline" sx={{ color: '#4dabf5', fontWeight: 'bold' }}>
                                        {business.type}
                                    </Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1, mb: 2 }}>
                                        {business.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 3 }}>
                                        {business.desc}
                                    </Typography>
                                    <Button 
                                        variant="outlined" 
                                        fullWidth 
                                        sx={{ 
                                            borderRadius: '50px', 
                                            borderColor: 'rgba(255,255,255,0.2)',
                                            color: 'white',
                                            '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
                                        }}
                                        onClick={() => navigate('/businesses')}
                                    >
                                        View Details
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Call to Action */}
            <Box sx={{ 
                background: 'linear-gradient(135deg, #1a237e 0%, #000051 100%)', 
                py: 10,
                textAlign: 'center',
                position: 'relative',
                mx: 4,
                borderRadius: '40px',
                mb: 10,
                mt: 10,
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
            }}>
                <Container maxWidth="md">
                    <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, mb: 3 }}>
                        Ready to elevate your business?
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)', mb: 4, fontWeight: 300 }}>
                        Join thousands of businesses that trust BookingReserva for their scheduling needs.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/register')}
                        sx={{ 
                            borderRadius: '50px', 
                            px: 10, 
                            py: 2, 
                            background: '#fff', 
                            color: '#000051',
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            '&:hover': { background: '#f5f5f5' }
                        }}
                    >
                        Sign Up Now
                    </Button>
                </Container>
            </Box>
        </Box>
    );
};

export default LandingPage;
