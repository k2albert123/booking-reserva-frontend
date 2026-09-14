import React from 'react';
import { Box, Container, Typography, Button, Grid, Stack, Avatar } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import bookingImg from '../assets/images/hero_booking_app.jpg';

// Icons
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SecurityIcon from '@mui/icons-material/Security';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SearchIcon from '@mui/icons-material/Search';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReusableCard, { EllipsisText, MediaCard } from './common/ReusableCard';

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 20px rgba(37, 99, 235, 0.3); }
  50% { box-shadow: 0 0 50px rgba(37, 99, 235, 0.6); }
  100% { box-shadow: 0 0 20px rgba(37, 99, 235, 0.3); }
`;

// Styled Components
const PageBackground = styled(Box)({
    backgroundColor: '#070A11',
    color: '#ffffff',
    minHeight: '100vh',
    overflowX: 'hidden',
    position: 'relative'
});

const BackgroundGlow = styled(Box)({
    position: 'absolute',
    width: '800px',
    height: '800px',
    background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, rgba(7, 10, 17, 0) 70%)',
    top: '-300px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 0,
    pointerEvents: 'none'
});

const GradientText = styled(Typography)(({ theme, gradient }) => ({
    background: gradient || 'linear-gradient(to right, #ffffff 0%, #94a3b8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block'
}));

const PremiumCard = styled(ReusableCard)(({ theme }) => ({
    background: 'rgba(15, 23, 42, 0.4)',
    backdropFilter: 'blur(12px)',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    padding: theme.spacing(4),
    transition: 'all 0.3s ease',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
        background: 'rgba(15, 23, 42, 0.7)',
        border: '1px solid rgba(37, 99, 235, 0.3)',
        transform: 'translateY(-5px)',
    }
}));

const GlowButton = styled(Button)(({ theme, variant }) => ({
    borderRadius: '12px',
    textTransform: 'none',
    fontWeight: 700,
    fontSize: '1.1rem',
    padding: '12px 36px',
    transition: 'all 0.3s ease',
    ...(variant === 'contained' ? {
        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
        color: 'white',
        border: '1px solid transparent',
        animation: `${pulseGlow} 3s infinite`,
        '&:hover': {
            background: 'linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 25px rgba(37, 99, 235, 0.5)'
        }
    } : {
        background: 'rgba(255, 255, 255, 0.03)',
        color: 'white',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        '&:hover': {
            background: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            transform: 'translateY(-2px)'
        }
    })
}));

const IconWrapper = styled(Box)(({ color }) => ({
    width: 64,
    height: 64,
    borderRadius: '16px',
    background: `linear-gradient(135deg, ${color}22 0%, ${color}11 100%)`,
    border: `1px solid ${color}44`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: color,
    marginBottom: 24,
    boxShadow: `0 8px 20px ${color}15`
}));

// Data
const FEATURED_BUSINESSES = [
    { name: 'Elite Hair Salon', type: 'Beauty & Styling', img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=900', desc: 'Experience premium hair care and modern styling in a luxury environment.' },
    { name: 'Zen Wellness Spa', type: 'Health & Spa', img: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=900', desc: 'Rejuvenate your body and mind with our professional massage and skin treatments.' },
    { name: 'Modern Dental Care', type: 'Health & Medical', img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=900', desc: 'State-of-the-art dental services for a brighter, healthier smile.' }
];

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <PageBackground>
            <BackgroundGlow />
            <Navbar />
            
            {/* Centered Hero Section */}
            <Box sx={{ position: 'relative', zIndex: 1, pt: { xs: 12, sm: 16, md: 22 }, pb: { xs: 6, md: 10 }, textAlign: 'center' }}>
                <Container maxWidth="md">
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', px: 2, py: 1, borderRadius: '999px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', mb: { xs: 3, md: 4 } }}>
                        <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 600, letterSpacing: { xs: 0.5, md: 1 }, fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                            <Box component="span" sx={{ color: '#60a5fa', mr: 1 }}>✨</Box>
                            THE NEXT GENERATION OF BOOKING
                        </Typography>
                    </Box>
                    <Typography 
                        sx={{ 
                            fontWeight: 800, 
                            lineHeight: 1.1,
                            mb: 3,
                            letterSpacing: '-0.02em',
                            fontSize: { xs: '2.4rem', sm: '3.5rem', md: '4.5rem', lg: '5rem' }
                        }}
                    >
                        Schedule Your World, <br />
                        <GradientText gradient="linear-gradient(to right, #60a5fa 0%, #c084fc 100%)" sx={{ fontSize: 'inherit', fontWeight: 'inherit', letterSpacing: 'inherit', lineHeight: 'inherit' }}>
                            Beautifully.
                        </GradientText>
                    </Typography>
                    <Typography 
                        sx={{ 
                            color: '#94a3b8', 
                            mb: { xs: 4, md: 6 }, 
                            fontWeight: 400,
                            lineHeight: 1.6,
                            maxWidth: '600px',
                            mx: 'auto',
                            fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.15rem' }
                        }}
                    >
                        Experience the most seamless way to discover local services, book appointments, and manage your business. All perfectly organized in one premium platform.
                    </Typography>
                    
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center">
                        <GlowButton variant="contained" onClick={() => navigate('/register')} endIcon={<ArrowForwardIcon />} sx={{ width: { xs: '100%', sm: 'auto' } }}>
                            Start for Free
                        </GlowButton>
                        <GlowButton variant="outlined" onClick={() => navigate('/login')} sx={{ width: { xs: '100%', sm: 'auto' } }}>
                            Explore Demo
                        </GlowButton>
                    </Stack>
                </Container>
                
                {/* Hero Image Centerpiece */}
                <Container maxWidth="lg" sx={{ mt: { xs: 6, md: 12 } }}>
                    <Box sx={{ 
                        position: 'relative',
                        animation: `${float} 8s ease-in-out infinite`,
                        px: { xs: 1, sm: 3, md: 6 }
                    }}>
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '100%',
                            height: '100%',
                            background: 'radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, rgba(0,0,0,0) 60%)',
                            zIndex: -1,
                            filter: 'blur(40px)'
                        }} />
                        <Box 
                            component="img"
                            src={bookingImg}
                            alt="Premium Booking Interface"
                            sx={{ 
                                width: '100%',
                                maxWidth: '1000px',
                                borderRadius: { xs: '16px', sm: '24px', md: '32px' },
                                border: '1px solid rgba(255,255,255,0.08)',
                                boxShadow: { xs: '0 20px 40px rgba(0,0,0,0.7)', md: '0 40px 80px rgba(0,0,0,0.8)' },
                                display: 'block',
                                mx: 'auto'
                            }}
                        />
                    </Box>
                </Container>
            </Box>

            {/* Features Section — uniform 2x2 grid */}
            <Container maxWidth="lg" sx={{ py: { xs: 8, sm: 12, md: 18 } }}>
                <Box sx={{ mb: { xs: 5, md: 8 } }}>
                    <GradientText variant="h3" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '1.8rem', sm: '2.4rem', md: '3rem' } }}>
                        Built for Efficiency
                    </GradientText>
                    <Typography sx={{ color: '#94a3b8', fontWeight: 400, maxWidth: '500px', fontSize: { xs: '0.95rem', md: '1.1rem' } }}>
                        Everything you need to scale your operations, engineered into a single seamless interface.
                    </Typography>
                </Box>

                <Grid container spacing={3} alignItems="stretch">
                    {[
                        { color: '#60a5fa', icon: <CalendarMonthIcon sx={{ fontSize: 32 }} />, title: 'Smart Scheduling', desc: 'Intelligent booking that handles timezones, prevents double-bookings, and works around your custom availability rules.' },
                        { color: '#34d399', icon: <TrendingUpIcon sx={{ fontSize: 32 }} />, title: 'Growth Analytics', desc: 'Track appointments, monitor revenue, and understand client retention with beautiful real-time dashboards.' },
                        { color: '#fbbf24', icon: <BusinessCenterIcon sx={{ fontSize: 32 }} />, title: 'Owner Portals', desc: 'Dedicated admin tools to manage your staff, approve requests, and control your entire business listing.' },
                        { color: '#f87171', icon: <SecurityIcon sx={{ fontSize: 32 }} />, title: 'Bank-Grade Security', desc: 'Data encrypted at rest and in transit. Role-based access ensures only authorized personnel see sensitive info.' }
                    ].map((feature, i) => (
                        <Grid item xs={12} sm={6} key={i} sx={{ display: 'flex' }}>
                            <PremiumCard sx={{ width: '100%' }}>
                                <IconWrapper color={feature.color}>{feature.icon}</IconWrapper>
                                <EllipsisText lines={1} component="h3" sx={{ fontWeight: 800, mb: 1.5, fontSize: { xs: '1.15rem', md: '1.35rem' } }}>{feature.title}</EllipsisText>
                                <EllipsisText lines={4} sx={{ color: '#94a3b8', lineHeight: 1.7, flexGrow: 1, fontSize: { xs: '0.9rem', md: '0.97rem' } }}>{feature.desc}</EllipsisText>
                            </PremiumCard>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* How It Works — always 3 equal columns */}
            <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', bgcolor: 'rgba(11, 15, 25, 0.5)', py: { xs: 8, sm: 12, md: 15 } }}>
                <Container maxWidth="md">
                    <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
                        <GradientText variant="h3" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '1.8rem', sm: '2.4rem', md: '3rem' } }}>
                            A Seamless Journey
                        </GradientText>
                        <Typography sx={{ color: '#94a3b8', fontWeight: 400, fontSize: { xs: '0.95rem', md: '1.1rem' } }}>
                            From discovery to completion in three simple steps.
                        </Typography>
                    </Box>

                    <Grid container spacing={3} justifyContent="center">
                        {[
                            { step: '01', title: 'Discover', desc: 'Browse curated lists of top-rated local professionals.', icon: <SearchIcon sx={{ fontSize: 28 }} /> },
                            { step: '02', title: 'Book', desc: 'Select a time slot and confirm your reservation instantly.', icon: <EventAvailableIcon sx={{ fontSize: 28 }} /> },
                            { step: '03', title: 'Manage', desc: 'Track your schedule or oversee operations from your dashboard.', icon: <BusinessCenterIcon sx={{ fontSize: 28 }} /> }
                        ].map((item, index) => (
                            <Grid item xs={12} sm={4} key={index} sx={{ textAlign: 'center' }}>
                                <Box sx={{ 
                                    width: 72, height: 72, borderRadius: '20px', bgcolor: '#0b0f19',
                                    border: '1px solid rgba(96, 165, 250, 0.3)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3,
                                    boxShadow: '0 10px 30px rgba(37, 99, 235, 0.2)', color: '#60a5fa', position: 'relative'
                                }}>
                                    {item.icon}
                                    <Box sx={{ position: 'absolute', top: -10, right: -10, width: 26, height: 26, borderRadius: '50%', bgcolor: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold', border: '3px solid #0b0f19' }}>
                                        {item.step}
                                    </Box>
                                </Box>
                                <EllipsisText lines={1} component="h3" sx={{ fontWeight: 800, mb: 1, fontSize: { xs: '1.05rem', md: '1.2rem' } }}>{item.title}</EllipsisText>
                                <EllipsisText lines={3} sx={{ color: '#94a3b8', fontSize: { xs: '0.88rem', md: '0.95rem' }, lineHeight: 1.6 }}>{item.desc}</EllipsisText>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Featured Businesses — 3 equal columns */}
            <Container maxWidth="lg" sx={{ py: { xs: 8, sm: 12, md: 18 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'flex-end' }, mb: { xs: 5, md: 8 }, flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                    <Box>
                        <GradientText variant="h3" sx={{ fontWeight: 800, mb: 1, fontSize: { xs: '1.8rem', sm: '2.4rem', md: '3rem' } }}>
                            Featured Services
                        </GradientText>
                        <Typography sx={{ color: '#94a3b8', fontWeight: 400, fontSize: { xs: '0.95rem', md: '1.1rem' } }}>
                            Explore some of the best businesses on our platform.
                        </Typography>
                    </Box>
                    <Button variant="text" sx={{ color: '#60a5fa', fontWeight: 'bold', whiteSpace: 'nowrap', flexShrink: 0 }} onClick={() => navigate('/businesses')} endIcon={<ArrowForwardIcon />}>
                        View All
                    </Button>
                </Box>

                <Grid container spacing={3} alignItems="stretch">
                    {FEATURED_BUSINESSES.map((business, index) => (
                        <Grid item xs={12} sm={4} key={index} sx={{ display: 'flex' }}>
                            <MediaCard
                                image={business.img}
                                imageAlt={business.name}
                                imageHeight={200}
                                title={business.name}
                                description={business.desc}
                                descriptionLines={3}
                                badge={
                                    <Box sx={{ px: 1.5, py: 0.5, borderRadius: '6px', background: 'rgba(15,23,42,0.88)', color: '#93c5fd', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%' }}>
                                        {business.type}
                                    </Box>
                                }
                                sx={{ width: '100%' }}
                                actions={
                                    <Button variant="outlined" fullWidth sx={{ borderRadius: '10px', py: 1.1, color: 'white', borderColor: 'rgba(255,255,255,0.18)', fontSize: '0.9rem', textTransform: 'none', '&:hover': { borderColor: '#60a5fa', bgcolor: 'rgba(96, 165, 250, 0.1)' } }} onClick={() => navigate('/businesses')}>
                                        Book Now
                                    </Button>
                                }
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Testimonials — 3 equal columns */}
            <Box sx={{ py: { xs: 8, sm: 12, md: 15 }, position: 'relative' }}>
                <Container maxWidth="lg">
                    <Typography align="center" sx={{ fontWeight: 800, mb: { xs: 6, md: 10 }, fontSize: { xs: '1.8rem', sm: '2.4rem', md: '3rem' } }}>
                        Trusted by <GradientText gradient="linear-gradient(to right, #34d399 0%, #3b82f6 100%)" sx={{ fontSize: 'inherit', fontWeight: 'inherit' }}>Thousands</GradientText>
                    </Typography>
                    <Grid container spacing={3} alignItems="stretch">
                        {[
                            { name: "Sarah L.", role: "Customer", quote: "BookingReserva made it incredibly easy to find a new salon and book an appointment instantly. Highly recommend!" },
                            { name: "James K.", role: "Business Owner", quote: "Since joining the platform, my barbershop's bookings have increased by 40%. The management dashboard is a lifesaver." },
                            { name: "Emily R.", role: "Customer", quote: "I love the sleek interface. Everything is so intuitive, from discovering new spas to managing my upcoming visits." }
                        ].map((testimonial, i) => (
                            <Grid item xs={12} sm={4} key={i} sx={{ display: 'flex' }}>
                                <PremiumCard sx={{ width: '100%', background: 'rgba(15, 23, 42, 0.25)', border: '1px solid rgba(255,255,255,0.07)' }}>
                                    <Box sx={{ display: 'flex', color: '#fbbf24', mb: 3 }}>
                                        {[1,2,3,4,5].map(star => <StarIcon key={star} fontSize="small" />)}
                                    </Box>
                                    <EllipsisText lines={4} sx={{ color: '#e2e8f0', fontSize: { xs: '0.92rem', md: '0.98rem' }, fontStyle: 'italic', mb: 4, flexGrow: 1, lineHeight: 1.7 }}>
                                        "{testimonial.quote}"
                                    </EllipsisText>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
                                        <Avatar sx={{ bgcolor: '#2563eb', fontWeight: 'bold', width: 38, height: 38, fontSize: '0.9rem', flexShrink: 0 }}>{testimonial.name.charAt(0)}</Avatar>
                                        <Box sx={{ minWidth: 0 }}>
                                            <EllipsisText lines={1} sx={{ fontWeight: 700, color: 'white', fontSize: '0.95rem' }}>{testimonial.name}</EllipsisText>
                                            <EllipsisText lines={1} sx={{ color: '#60a5fa', fontSize: '0.8rem' }}>{testimonial.role}</EllipsisText>
                                        </Box>
                                    </Box>
                                </PremiumCard>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Call to Action */}
            <Box sx={{ py: { xs: 8, sm: 12, md: 15 }, px: { xs: 2, md: 3 } }}>
                <Container maxWidth="md">
                    <Box sx={{ 
                        background: 'linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(139,92,246,0.1) 100%)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: { xs: '24px', md: '32px' },
                        p: { xs: 4, sm: 6, md: 8 },
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <Box sx={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: '100%', background: 'radial-gradient(ellipse at top, rgba(37,99,235,0.2) 0%, rgba(0,0,0,0) 70%)', zIndex: 0 }} />
                        <Box sx={{ position: 'relative', zIndex: 1 }}>
                            <Typography sx={{ fontWeight: 800, mb: 3, fontSize: { xs: '1.6rem', sm: '2rem', md: '2.5rem' } }}>
                                Ready to elevate your experience?
                            </Typography>
                            <Typography sx={{ color: '#94a3b8', fontSize: { xs: '0.95rem', md: '1.1rem' }, mb: { xs: 4, md: 5 }, maxWidth: '600px', mx: 'auto' }}>
                                Join our growing community of professionals and clients. Experience the modern standard of appointment scheduling today.
                            </Typography>
                            <GlowButton variant="contained" size="large" onClick={() => navigate('/register')} sx={{ width: { xs: '100%', sm: 'auto' } }}>
                                Create Your Free Account
                            </GlowButton>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Footer />
        </PageBackground>
    );
};

export default LandingPage;
