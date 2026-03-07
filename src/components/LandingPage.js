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
//import heroImg from '../assets/images/hero-background.png';
import bookingImg from '../assets/images/Blog_1000x417_Online-Appointment-Booking-removebg-preview.png';
import Navbar from './common/Navbar';
import Footer from './common/Footer';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const HeroSection = styled(Box)(({ theme }) => ({
  color: "white",
  padding: theme.spacing(6, 0, 4), // Reduced top/bottom padding
  position: "relative",
  overflow: "hidden",

  background: `
    linear-gradient(
      to right,
      rgba(3, 22, 49, 0.95) 0%,
      rgba(3, 22, 49, 0.9) 35%,
      rgba(3, 22, 49, 0.7) 50%,
      rgba(3, 22, 49, 0.4) 65%,
      rgba(3, 22, 49, 0.1) 75%,
      rgba(3, 22, 49, 0) 85%
    ),
    url(https://i.pinimg.com/1200x/88/93/52/8893520406c78ff1ba0016316103ccb7.jpg)
  `,

  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat"
}));

const FeatureStatus = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginTop: theme.spacing(4),
}));

const StatusIcon = styled(Box)(({ color }) => ({
    width: 48,
    height: 48,
    borderRadius: '50%',
    backgroundColor: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
}));

const GlassCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    background: 'rgba(30, 41, 59, 0.7)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    color: 'white',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease-in-out',
    border: '1px solid rgba(255,255,255,0.05)',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        border: '1px solid rgba(37, 99, 235, 0.3)',
    }
}));



const LandingPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
            <Navbar />
            {/* Hero Section */}
            <HeroSection>
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Box sx={{ textAlign: isMobile ? 'center' : 'left' }}>
                                <Typography 
                                    component="h1" 
                                    variant={isMobile ? "h3" : "h1"} 
                                    sx={{ 
                                        fontWeight: 800, 
                                        mb: 3, 
                                        lineHeight: 1.1,
                                        fontSize: isMobile ? '2.5rem' : '4rem',
                                        background: 'linear-gradient(to right, #93c5fd, #3b82f6)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        letterSpacing: -1
                                    }}
                                >
                                    The Future 
                                </Typography>
                                <Typography 
                                    component="h1" 
                                    variant={isMobile ? "h3" : "h1"} 
                                    sx={{ 
                                        fontWeight: 800, 
                                        mb: 3, 
                                        lineHeight: 1.1,
                                        fontSize: isMobile ? '2.5rem' : '4rem',
                                        background: 'linear-gradient(to right, #60a5fa, #2563eb)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        letterSpacing: -1
                                    }}
                                >
                                    of Appointments
                                </Typography>
                                <Typography 
                                    variant="h6" 
                                    paragraph 
                                    sx={{ 
                                        color: 'rgba(255,255,255,0.9)', 
                                        mb: 5, 
                                        fontWeight: 400,
                                        lineHeight: 1.6,
                                        maxWidth: '500px'
                                    }}
                                >
                                    Experience the most seamless way to book services and manage your business. All in one place.
                                </Typography>
                                
                                <Stack direction={isMobile ? "column" : "row"} spacing={2} sx={{ mb: 6 }}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        onClick={() => navigate('/register')}
                                        sx={{ 
                                            borderRadius: '8px', 
                                            px: 5, 
                                            py: 2, 
                                            fontSize: '1rem',
                                            textTransform: 'none',
                                            fontWeight: 'bold',
                                            bgcolor: '#0d47a1',
                                            '&:hover': { bgcolor: '#0a3d8d' }
                                        }}
                                    >
                                        Get Started Today
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        onClick={() => navigate('/login')}
                                        sx={{ 
                                            borderRadius: '8px', 
                                            px: 5, 
                                            py: 2, 
                                            fontSize: '1rem',
                                            textTransform: 'none',
                                            fontWeight: 'bold',
                                            borderColor: '#0d47a1',
                                            color: '#0d47a1',
                                            bgcolor: 'rgba(255,255,255,0.7)',
                                            '&:hover': { borderColor: '#0d47a1', bgcolor: 'rgba(255,255,255,0.9)' }
                                        }}
                                    >
                                        Watch Demo
                                    </Button>
                                </Stack>

                                <Grid container spacing={4}>
                                    <Grid item xs={12} sm={6}>
                                        <FeatureStatus>
                                            <StatusIcon color="#2196f3">
                                                <TrendingUpIcon />
                                            </StatusIcon>
                                            <Box>
                                                <Typography sx={{ fontWeight: 'bold', color: 'white' }}>Real-time Tracking</Typography>
                                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>Monitor operations live</Typography>
                                            </Box>
                                        </FeatureStatus>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <FeatureStatus>
                                            <StatusIcon color="#4caf50">
                                                <SecurityIcon />
                                            </StatusIcon>
                                            <Box>
                                                <Typography sx={{ fontWeight: 'bold', color: 'white' }}>Secure Platform</Typography>
                                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>Bank-grade protection</Typography>
                                            </Box>
                                        </FeatureStatus>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        
                        {!isMobile && (
                            <Grid item md={6}>
                                <Box sx={{ 
                                    position: 'relative',
                                    animation: `${float} 6s ease-in-out infinite`,
                                    textAlign: 'right'
                                }}>
                                    <Box 
                                        component="img"
                                        src={bookingImg}
                                        alt="Landing Illustration"
                                        sx={{ 
                                            width: '100%',
                                            maxWidth: '700px',
                                            filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.9))'
                                        }}
                                    />
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                </Container>
            </HeroSection>

            {/* Features Section */}
            <Container maxWidth="lg" sx={{ py: 15 }}>
                <Box sx={{ textAlign: 'center', mb: 10 }}>
                    <Typography variant="overline" sx={{ color: '#2563eb', fontWeight: 'bold', letterSpacing: 4 }}>
                        FEATURES
                    </Typography>
                    <Typography variant="h2" sx={{ 
                        background: 'linear-gradient(to right, #ffffff, #93c5fd)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent', 
                        fontWeight: 800, 
                        mt: 1 
                    }}>
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
                                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
                                    {feature.title}
                                </Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>
                                    {feature.desc}
                                </Typography>
                            </GlassCard>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Featured Businesses Section */}
            <Container maxWidth="lg" sx={{ py: 15, bgcolor: 'background.paper', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Box sx={{ textAlign: 'center', mb: 10 }}>
                    <Typography variant="overline" sx={{ color: '#2563eb', fontWeight: 'bold', letterSpacing: 4 }}>
                        DISCOVER
                    </Typography>
                    <Typography variant="h2" sx={{ 
                        background: 'linear-gradient(to right, #ffffff, #93c5fd)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent', 
                        fontWeight: 800, 
                        mt: 1 
                    }}>
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
                            img: 'https://i.pinimg.com/1200x/ea/cb/d3/eacbd3ac6a3d097d54dd5a6d9c8f47b7.jpg',
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
                                bgcolor: 'rgba(255,255,255,0.03)',
                                color: 'white',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                                border: '1px solid rgba(255,255,255,0.05)',
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                                '&:hover': { 
                                    transform: 'scale(1.02)',
                                    borderColor: '#2563eb'
                                }
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
                                    <Typography variant="overline" sx={{ color: '#60a5fa', fontWeight: 'bold' }}>
                                        {business.type}
                                    </Typography>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 1, mb: 2 }}>
                                        {business.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}>
                                        {business.desc}
                                    </Typography>
                                    <Button 
                                        variant="outlined" 
                                        fullWidth 
                                        sx={{ 
                                            borderRadius: '50px', 
                                            borderColor: '#2563eb',
                                            color: '#60a5fa',
                                            '&:hover': { borderColor: '#3b82f6', bgcolor: 'rgba(37, 99, 235, 0.1)' }
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
                background: 'linear-gradient(135deg, rgba(37,99,235,0.2) 0%, rgba(11,15,25,1) 100%)', 
                py: 10,
                textAlign: 'center',
                position: 'relative',
                mx: 4,
                borderRadius: '40px',
                mb: 10,
                mt: 10,
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                border: '1px solid rgba(37,99,235,0.2)'
            }}>
                <Container maxWidth="md">
                    <Typography variant="h3" sx={{ 
                        background: 'linear-gradient(to right, #ffffff, #60a5fa)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 800, 
                        mb: 3 
                    }}>
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
                            background: '#2563eb', 
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            '&:hover': { background: '#1d4ed8' }
                        }}
                    >
                        Sign Up Now
                    </Button>
                </Container>
            </Box>

            <Footer />
        </Box>
    );
};

export default LandingPage;
