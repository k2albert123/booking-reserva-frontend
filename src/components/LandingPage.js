import React from 'react';
import { Box, Container, Typography, Button, Stack, Avatar, Chip } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import bookingImg from '../assets/images/hero_booking_app.jpg';

// Animated Components
import AuroraBackground from './animated/AuroraBackground';
import AnimatedGradientText from './animated/AnimatedGradientText';
import AnimatedGridBackground from './animated/AnimatedGridBackground';

// Icons
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SecurityIcon from '@mui/icons-material/Security';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SearchIcon from '@mui/icons-material/Search';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import SpaIcon from '@mui/icons-material/Spa';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HotelIcon from '@mui/icons-material/Hotel';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import VerifiedIcon from '@mui/icons-material/Verified';
import ReusableCard, { EllipsisText, MediaCard, TruncatedDescription } from './common/ReusableCard';

// Keyframe Animations
const pulseGlow = keyframes`
  0% { box-shadow: 0 0 20px rgba(37, 99, 235, 0.3); }
  50% { box-shadow: 0 0 45px rgba(37, 99, 235, 0.55); }
  100% { box-shadow: 0 0 20px rgba(37, 99, 235, 0.3); }
`;

// Styled Components
const PageBackground = styled(Box)({
    backgroundColor: 'var(--bg-default)',
    color: 'var(--text-primary)',
    minHeight: '100vh',
    overflowX: 'clip',
    position: 'relative',
    transition: 'background-color 0.3s ease, color 0.3s ease'
});

const PremiumCard = styled(ReusableCard)(({ theme }) => ({
    background: 'var(--bg-card)',
    backdropFilter: 'blur(12px)',
    borderRadius: '24px',
    border: '1px solid var(--border-subtle)',
    padding: theme.spacing(3.5),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: 'var(--card-shadow)',
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
    '&:hover': {
        borderColor: 'var(--border-hover)',
        transform: 'translateY(-6px)',
        boxShadow: 'var(--card-shadow-hover)'
    }
}));

const GlowButton = styled(Button)(({ variant }) => ({
    borderRadius: '12px',
    textTransform: 'none',
    fontWeight: 700,
    fontSize: '1rem',
    padding: '12px 28px',
    transition: 'all 0.25s ease',
    ...(variant === 'contained' ? {
        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
        color: 'white',
        border: '1px solid transparent',
        animation: `${pulseGlow} 3.5s infinite`,
        '&:hover': {
            background: 'linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)',
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 25px rgba(37, 99, 235, 0.45)'
        }
    } : {
        background: 'var(--bg-card)',
        color: 'var(--text-primary)',
        border: '1px solid var(--border-subtle)',
        backdropFilter: 'blur(10px)',
        boxShadow: 'var(--card-shadow)',
        '&:hover': {
            background: 'var(--bg-card-hover)',
            borderColor: 'primary.main',
            transform: 'translateY(-2px)'
        }
    })
}));

const IconWrapper = styled(Box)(({ color }) => ({
    width: 58,
    height: 58,
    borderRadius: '16px',
    background: `${color}18`,
    color: color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
    border: `1px solid ${color}33`,
    boxShadow: `0 8px 20px ${color}15`,
    flexShrink: 0
}));

// Industries defined in README: Barbershop, Salon, Clinic, Spa, Hotel, Beauty/Fitness
const SUPPORTED_INDUSTRIES = [
    {
        name: 'Barbershops & Grooming',
        category: 'Barbershop',
        desc: 'Precision haircuts, beard trims, and styling. Book top master barbers with open slot pickers.',
        icon: <ContentCutIcon sx={{ fontSize: 28 }} />,
        color: '#60a5fa'
    },
    {
        name: 'Salons & Hairdressers',
        category: 'Salon %26 Beauty',
        desc: 'Hair coloring, balayage, keratin treatments, and manicures from certified hair specialists.',
        icon: <FaceRetouchingNaturalIcon sx={{ fontSize: 28 }} />,
        color: '#f472b6'
    },
    {
        name: 'Clinics & Healthcare',
        category: 'Clinic %26 Healthcare',
        desc: 'General medicine, dental consults, physical therapy, and diagnostics with trusted medical staff.',
        icon: <LocalHospitalIcon sx={{ fontSize: 28 }} />,
        color: '#34d399'
    },
    {
        name: 'Wellness & Spa Centers',
        category: 'Wellness %26 Spa',
        desc: 'Deep tissue massage, aromatherapy, sauna sessions, and skin rejuvenation treatments.',
        icon: <SpaIcon sx={{ fontSize: 28 }} />,
        color: '#a78bfa'
    },
    {
        name: 'Hotels & Hospitality',
        category: 'Hotel %26 Hospitality',
        desc: 'Boutique stay reservations, luxury suite bookings, and concierge dining slot management.',
        icon: <HotelIcon sx={{ fontSize: 28 }} />,
        color: '#fbbf24'
    },
    {
        name: 'Fitness & Body Studios',
        category: 'Fitness %26 Health',
        desc: 'Personal trainer sessions, yoga classes, Pilates, and nutrition consultation appointments.',
        icon: <FitnessCenterIcon sx={{ fontSize: 28 }} />,
        color: '#fb7185'
    }
];

const FEATURED_BUSINESSES = [
    {
        id: 1,
        name: 'The Royal Blade Barbershop',
        type: 'Barbershop',
        img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=900',
        desc: 'Master craft grooming, hot towel beard sculpting, executive scissor cuts, and classic straight razor shaves.',
        rating: 4.9,
        reviews: 148
    },
    {
        id: 2,
        name: 'Luxe Botanica Day Spa & Salon',
        type: 'Salon & Spa',
        img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=900',
        desc: 'Organic scalp revitalizing rituals, hydra-facials, deep tissue massage therapy, and restorative nail care.',
        rating: 4.85,
        reviews: 95
    },
    {
        id: 3,
        name: 'Apex Family Dental & Orthodontics',
        type: 'Clinic & Healthcare',
        img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=900',
        desc: 'Comprehensive oral examinations, painless cosmetic treatments, and specialist dental hygiene.',
        rating: 4.95,
        reviews: 220
    }
];

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <PageBackground>
            <Navbar />

            {/* HERO SECTION — Side by Side with ReactBits Aurora Animated Background */}
            <AuroraBackground
                minHeight="82vh"
                sx={{
                    pt: { xs: 8, sm: 10, md: 12 },
                    pb: { xs: 8, md: 12 },
                    borderBottom: '1px solid var(--border-subtle)'
                }}
            >
                <Container maxWidth="lg">
                    {/* TOP ROW: Words on Left, Image Graphic on Right */}
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
                            gap: { xs: 5, md: 6 },
                            alignItems: 'center'
                        }}
                    >
                        {/* LEFT: Words (Badge, Heading, Description) */}
                        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                            <Box sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                px: 2,
                                py: 0.8,
                                borderRadius: '999px',
                                border: '1px solid',
                                borderColor: 'primary.light',
                                bgcolor: 'rgba(37,99,235,0.1)',
                                mb: 3,
                                gap: 1
                            }}>
                                <Box
                                    component="img"
                                    src="/app-logo.png"
                                    alt="BookingReserva Logo"
                                    sx={{ width: 20, height: 20, borderRadius: '5px', objectFit: 'cover' }}
                                />
                                <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase' }}>
                                    Local Service Booking & Appointments
                                </Typography>
                            </Box>

                            <Typography
                                variant="h1"
                                sx={{
                                    fontWeight: 800,
                                    lineHeight: 1.12,
                                    mb: 2.5,
                                    fontSize: { xs: '2.5rem', sm: '3.4rem', md: '3.6rem', lg: '4rem' },
                                    letterSpacing: '-0.03em',
                                    color: 'text.primary'
                                }}
                            >
                                Schedule Any Service, <br />
                                <AnimatedGradientText variant="inherit" component="span">
                                    Beautifully.
                                </AnimatedGradientText>
                            </Typography>

                            <Typography
                                sx={{
                                    color: 'text.secondary',
                                    fontWeight: 400,
                                    lineHeight: 1.7,
                                    fontSize: { xs: '1rem', md: '1.12rem' },
                                    maxWidth: '560px',
                                    mx: { xs: 'auto', md: '0' }
                                }}
                            >
                                Discover and book trusted local barbershops, clinics, salons, wellness spas, and hotels. View available slots, select your preferred staff specialist, and manage appointments seamlessly.
                            </Typography>
                        </Box>

                        {/* RIGHT: Featured Media Hero Graphic with Floating Micro-Cards */}
                        <Box sx={{
                            position: 'relative',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%'
                        }}>
                            {/* Ambient Glow behind image */}
                            <Box sx={{
                                position: 'absolute',
                                width: '85%',
                                height: '85%',
                                borderRadius: '30px',
                                background: 'radial-gradient(circle, rgba(37,99,235,0.35) 0%, rgba(6,182,212,0.18) 50%, transparent 75%)',
                                filter: 'blur(45px)',
                                zIndex: 0
                            }} />

                            {/* Main Hero Image */}
                            <Box
                                component="img"
                                src={bookingImg}
                                alt="BookingReserva Platform Experience"
                                sx={{
                                    width: '100%',
                                    maxWidth: '540px',
                                    borderRadius: '24px',
                                    border: '1px solid var(--border-subtle)',
                                    boxShadow: 'var(--card-shadow-hover)',
                                    position: 'relative',
                                    zIndex: 1,
                                    display: 'block'
                                }}
                            />

                            {/* Floating Micro-badge 1: Top Right */}
                            <Box sx={{
                                position: 'absolute',
                                top: 20,
                                right: { xs: 0, sm: -12 },
                                zIndex: 2,
                                p: 1.5,
                                borderRadius: '16px',
                                bgcolor: 'var(--bg-card)',
                                backdropFilter: 'blur(12px)',
                                border: '1px solid var(--border-subtle)',
                                boxShadow: 'var(--card-shadow)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5
                            }}>
                                <Avatar sx={{ bgcolor: '#10b981', width: 34, height: 34 }}>
                                    <CheckCircleOutlineIcon sx={{ fontSize: 20 }} />
                                </Avatar>
                                <Box sx={{ textAlign: 'left' }}>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontWeight: 600 }}>
                                        Real-Time Status
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 700 }}>
                                        Slot Confirmed
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Floating Micro-badge 2: Bottom Left */}
                            <Box sx={{
                                position: 'absolute',
                                bottom: 25,
                                left: { xs: 0, sm: -12 },
                                zIndex: 2,
                                p: 1.5,
                                borderRadius: '16px',
                                bgcolor: 'var(--bg-card)',
                                backdropFilter: 'blur(12px)',
                                border: '1px solid var(--border-subtle)',
                                boxShadow: 'var(--card-shadow)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5
                            }}>
                                <Avatar sx={{ bgcolor: '#2563eb', color: '#fff', width: 34, height: 34 }}>
                                    <StarIcon sx={{ fontSize: 20 }} />
                                </Avatar>
                                <Box sx={{ textAlign: 'left' }}>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', fontWeight: 600 }}>
                                        Top Specialists
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 700 }}>
                                        5★ Verified Team
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    {/* BOTTOM: Action Buttons & Trust Badges centered under them */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        mt: { xs: 5, md: 7 },
                        gap: 3
                    }}>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={2.5}
                            justifyContent="center"
                            alignItems="center"
                            sx={{ width: { xs: '100%', sm: 'auto' } }}
                        >
                            <GlowButton
                                variant="contained"
                                onClick={() => navigate('/businesses')}
                                endIcon={<ArrowForwardIcon />}
                                sx={{ minWidth: { xs: '100%', sm: '220px' } }}
                            >
                                Browse Businesses
                            </GlowButton>
                            <GlowButton
                                variant="outlined"
                                onClick={() => navigate('/services')}
                                sx={{ minWidth: { xs: '100%', sm: '200px' } }}
                            >
                                Explore Services
                            </GlowButton>
                        </Stack>

                        {/* Centered Trust Badges */}
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: { xs: 2.5, sm: 4 },
                            pt: 2.5,
                            borderTop: '1px solid var(--border-subtle)',
                            width: '100%',
                            maxWidth: '680px'
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <VerifiedIcon sx={{ color: '#10b981', fontSize: 20 }} />
                                <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                                    Verified Businesses
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <StarIcon sx={{ color: '#2563eb', fontSize: 20 }} />
                                <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                                    4.9 / 5 Client Rating
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CheckCircleOutlineIcon sx={{ color: '#2563eb', fontSize: 20 }} />
                                <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                                    Instant Confirmation
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </AuroraBackground>

            {/* SECTION 2: Supported Industries Showcase — 6 Equal Grid Cards */}
            <AnimatedGridBackground pattern="dots" sx={{ py: { xs: 8, sm: 10, md: 14 } }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 8 } }}>
                        <AnimatedGradientText variant="h3" sx={{ fontWeight: 800, mb: 1.5, fontSize: { xs: '1.9rem', sm: '2.5rem', md: '3rem' } }}>
                            Built For Local Service Industries
                        </AnimatedGradientText>
                        <Typography sx={{ color: 'text.secondary', maxWidth: '640px', mx: 'auto', fontSize: { xs: '0.95rem', md: '1.05rem' } }}>
                            Tailored booking experiences for barbershops, salons, healthcare clinics, wellness centers, and hotels.
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3, alignItems: 'stretch' }}>
                        {SUPPORTED_INDUSTRIES.map((ind, idx) => (
                            <PremiumCard
                                key={idx}
                                onClick={() => navigate(`/businesses?category=${ind.category}`)}
                                sx={{
                                    cursor: 'pointer',
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}
                            >
                                <IconWrapper color={ind.color}>{ind.icon}</IconWrapper>
                                <Box sx={{ minHeight: '1.6em', maxHeight: '1.6em', overflow: 'hidden', mb: 1 }}>
                                    <EllipsisText lines={1} component="h3" sx={{ fontWeight: 800, fontSize: '1.25rem', color: 'text.primary' }}>
                                        {ind.name}
                                    </EllipsisText>
                                </Box>
                                <TruncatedDescription
                                    text={ind.desc}
                                    title={ind.name}
                                    fixedHeight="4.8em"
                                    lines={3}
                                    maxChars={85}
                                />
                                <Box sx={{ mt: 'auto', pt: 2, display: 'flex', alignItems: 'center', gap: 0.5, color: ind.color, fontWeight: 700, fontSize: '0.88rem' }}>
                                    Explore {ind.name} <ArrowForwardIcon sx={{ fontSize: 16 }} />
                                </Box>
                            </PremiumCard>
                        ))}
                    </Box>
                </Container>
            </AnimatedGridBackground>

            {/* SECTION 3: Features Section — Uniform 2x2 Grid */}
            <Box sx={{ py: { xs: 8, sm: 10, md: 14 }, borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
                <Container maxWidth="lg">
                    <Box sx={{ mb: { xs: 5, md: 8 }, textAlign: { xs: 'left', sm: 'center' } }}>
                        <AnimatedGradientText variant="h3" sx={{ fontWeight: 800, mb: 1.5, fontSize: { xs: '1.9rem', sm: '2.5rem', md: '3rem' } }}>
                            Everything You Need In One Platform
                        </AnimatedGradientText>
                        <Typography sx={{ color: 'text.secondary', maxWidth: '600px', mx: { xs: '0', sm: 'auto' }, fontSize: { xs: '0.95rem', md: '1.05rem' } }}>
                            Engineered to give customers a trustworthy booking experience while giving business owners automated operational control.
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3, alignItems: 'stretch' }}>
                        {[
                            {
                                color: '#2563eb',
                                icon: <CalendarMonthIcon sx={{ fontSize: 32 }} />,
                                title: 'Real-Time Slot Scheduling',
                                desc: 'Interactive slot pickers that dynamically check business working hours, specialist availability, and eliminate double-booking.'
                            },
                            {
                                color: '#2563eb',
                                icon: <SecurityIcon sx={{ fontSize: 32 }} />,
                                title: 'Verified Proof & Role Security',
                                desc: 'Mandatory business verification and client ID approval before feature unlocking, backed by secure email OTP and reset delivery.'
                            },
                            {
                                color: '#2563eb',
                                icon: <BusinessCenterIcon sx={{ fontSize: 32 }} />,
                                title: 'Business & Staff Management',
                                desc: 'Business owners can showcase services, add team members (doctors, barbers, specialists), set working hours, and manage bookings.'
                            },
                            {
                                color: '#2563eb',
                                icon: <TrendingUpIcon sx={{ fontSize: 32 }} />,
                                title: 'Live Notifications & Analytics',
                                desc: 'Instant email confirmations and automated reminder triggers keep appointments organized and reduce no-shows.'
                            }
                        ].map((feature, i) => (
                            <PremiumCard key={i} sx={{ width: '100%' }}>
                                <IconWrapper color={feature.color}>{feature.icon}</IconWrapper>
                                <Box sx={{ minHeight: '1.6em', maxHeight: '1.6em', overflow: 'hidden', mb: 1.5 }}>
                                    <EllipsisText lines={1} component="h3" sx={{ fontWeight: 800, fontSize: '1.3rem', color: 'text.primary' }}>
                                        {feature.title}
                                    </EllipsisText>
                                </Box>
                                <TruncatedDescription
                                    text={feature.desc}
                                    title={feature.title}
                                    fixedHeight="5.4em"
                                    lines={4}
                                    maxChars={110}
                                />
                            </PremiumCard>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* SECTION 4: How It Works — 3 Equal Columns with Matrix Background */}
            <AnimatedGridBackground pattern="grid" sx={{ py: { xs: 8, sm: 10, md: 14 } }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 8 } }}>
                        <AnimatedGradientText variant="h3" sx={{ fontWeight: 800, mb: 1.5, fontSize: { xs: '1.9rem', sm: '2.5rem', md: '3rem' } }}>
                            How BookingReserva Works
                        </AnimatedGradientText>
                        <Typography sx={{ color: 'text.secondary', maxWidth: '540px', mx: 'auto', fontSize: { xs: '0.95rem', md: '1.05rem' } }}>
                            From discovery to confirmation in three effortless steps.
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 3, alignItems: 'stretch' }}>
                        {[
                            {
                                step: '01',
                                title: 'Find Businesses & Services',
                                desc: 'Browse verified barbershops, clinics, salons, wellness spas, and hotels filtered by industry or location.',
                                icon: <SearchIcon sx={{ fontSize: 28 }} />
                            },
                            {
                                step: '02',
                                title: 'Select Time & Specialist',
                                desc: 'View real-time open slots, pick your preferred specialist (doctor, barber, stylist), and enter any custom notes.',
                                icon: <EventAvailableIcon sx={{ fontSize: 28 }} />
                            },
                            {
                                step: '03',
                                title: 'Get Instant Confirmation',
                                desc: 'Receive immediate email booking confirmations and manage or reschedule your appointments directly in your dashboard.',
                                icon: <CheckCircleOutlineIcon sx={{ fontSize: 28 }} />
                            }
                        ].map((item, index) => (
                            <PremiumCard key={index} sx={{ textAlign: 'center', alignItems: 'center', width: '100%' }}>
                                <Box sx={{
                                    width: 72,
                                    height: 72,
                                    borderRadius: '20px',
                                    bgcolor: 'var(--bg-paper)',
                                    border: '1px solid var(--border-subtle)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mx: 'auto',
                                    mb: 3,
                                    boxShadow: 'var(--card-shadow)',
                                    color: 'primary.main',
                                    position: 'relative'
                                }}>
                                    {item.icon}
                                    <Box sx={{
                                        position: 'absolute',
                                        top: -10,
                                        right: -10,
                                        width: 28,
                                        height: 28,
                                        borderRadius: '50%',
                                        bgcolor: '#2563eb',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.75rem',
                                        fontWeight: 800,
                                        border: '3px solid var(--bg-default)'
                                    }}>
                                        {item.step}
                                    </Box>
                                </Box>
                                <Box sx={{ minHeight: '1.6em', maxHeight: '1.6em', overflow: 'hidden', mb: 1.5, width: '100%' }}>
                                    <EllipsisText lines={1} component="h3" sx={{ fontWeight: 800, fontSize: '1.25rem', color: 'text.primary' }}>
                                        {item.title}
                                    </EllipsisText>
                                </Box>
                                <TruncatedDescription
                                    text={item.desc}
                                    title={item.title}
                                    fixedHeight="5.2em"
                                    lines={4}
                                    maxChars={105}
                                    sx={{ textAlign: 'center' }}
                                />
                            </PremiumCard>
                        ))}
                    </Box>
                </Container>
            </AnimatedGridBackground>

            {/* SECTION 5: Featured Businesses — 3 Equal Columns */}
            <Container maxWidth="lg" sx={{ py: { xs: 8, sm: 10, md: 14 } }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: { xs: 'flex-start', md: 'flex-end' },
                    mb: { xs: 4, md: 7 },
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 2
                }}>
                    <Box>
                        <AnimatedGradientText variant="h3" sx={{ fontWeight: 800, mb: 1, fontSize: { xs: '1.9rem', sm: '2.5rem', md: '3rem' } }}>
                            Featured Local Businesses
                        </AnimatedGradientText>
                        <Typography sx={{ color: 'text.secondary', fontSize: { xs: '0.95rem', md: '1.05rem' } }}>
                            Explore highly rated service providers ready for online booking today.
                        </Typography>
                    </Box>
                    <Button
                        variant="text"
                        onClick={() => navigate('/businesses')}
                        endIcon={<ArrowForwardIcon />}
                        sx={{ color: 'primary.main', fontWeight: 700, fontSize: '0.95rem', whiteSpace: 'nowrap' }}
                    >
                        View All Businesses
                    </Button>
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3, alignItems: 'stretch' }}>
                    {FEATURED_BUSINESSES.map((business, index) => (
                        <MediaCard
                            key={index}
                            image={business.img}
                            imageAlt={business.name}
                            imageHeight={210}
                            badge={
                                <Box sx={{
                                    px: 1.5,
                                    py: 0.5,
                                    borderRadius: '8px',
                                    bgcolor: 'var(--bg-card)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid var(--border-subtle)',
                                    boxShadow: 'var(--card-shadow)'
                                }}>
                                    <Typography variant="caption" sx={{ color: 'primary.light', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase' }}>
                                        {business.type}
                                    </Typography>
                                </Box>
                            }
                            title={business.name}
                            titleLines={1}
                            description={business.desc}
                            descriptionLines={3}
                            sx={{
                                width: '100%',
                                borderRadius: '24px',
                            }}
                            actions={
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#f59e0b', fontWeight: 700, fontSize: '0.85rem' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <StarIcon sx={{ fontSize: 18 }} />
                                            <span>{business.rating}</span>
                                            <span style={{ color: 'text.secondary', fontWeight: 400 }}>({business.reviews} reviews)</span>
                                        </Box>
                                        <Chip label="Open Now" size="small" sx={{ bgcolor: 'rgba(16,185,129,0.15)', color: '#10b981', fontWeight: 700, fontSize: '0.7rem' }} />
                                    </Box>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={() => navigate(`/businesses/${business.id}`)}
                                        endIcon={<ArrowForwardIcon />}
                                        sx={{
                                            borderRadius: '12px',
                                            py: 1.2,
                                            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                            fontWeight: 700,
                                            textTransform: 'none',
                                            '&:hover': { background: 'linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)' }
                                        }}
                                    >
                                        View Details & Book
                                    </Button>
                                </Box>
                            }
                        />
                    ))}
                </Box>
            </Container>

            {/* SECTION 6: Testimonials — 3 Equal Columns */}
            <Box sx={{ py: { xs: 8, sm: 10, md: 14 }, borderTop: '1px solid var(--border-subtle)', bgcolor: 'var(--bg-default)' }}>
                <Container maxWidth="lg">
                    <Typography align="center" sx={{ fontWeight: 800, mb: { xs: 5, md: 8 }, fontSize: { xs: '1.9rem', sm: '2.5rem', md: '3rem' }, color: 'text.primary' }}>
                        Trusted By Customers & <AnimatedGradientText variant="inherit" component="span">Business Owners</AnimatedGradientText>
                    </Typography>

                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3, alignItems: 'stretch' }}>
                        {[
                            {
                                name: "Marcus Bennett",
                                role: "Barbershop Owner",
                                quote: "BookingReserva eliminated double bookings and phone tag entirely. My clients love picking their slot and receiving confirmation emails automatically."
                            },
                            {
                                name: "Elena Rostova",
                                role: "Client & Salon Regular",
                                quote: "The interface is gorgeous and lightning fast. Finding my favorite stylist, picking an open Saturday morning slot, and receiving reminders is effortless."
                            },
                            {
                                name: "Dr. David Chen",
                                role: "Clinical Director",
                                quote: "Managing our multi-doctor outpatient schedule has never been smoother. Patients appreciate the professional profile cards and instant booking flow."
                            }
                        ].map((testimonial, i) => (
                            <PremiumCard key={i} sx={{ width: '100%' }}>
                                <Box sx={{ display: 'flex', color: '#f59e0b', mb: 2 }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <StarIcon key={star} fontSize="small" />
                                    ))}
                                </Box>
                                <TruncatedDescription
                                    text={`"${testimonial.quote}"`}
                                    title={`${testimonial.name} — Review`}
                                    fixedHeight="5.5em"
                                    lines={4}
                                    maxChars={115}
                                    sx={{ fontStyle: 'italic', color: 'text.secondary', fontSize: '0.96rem', mb: 3 }}
                                />
                                <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar sx={{ bgcolor: '#2563eb', fontWeight: 800, width: 42, height: 42 }}>
                                        {testimonial.name.charAt(0)}
                                    </Avatar>
                                    <Box>
                                        <Typography sx={{ fontWeight: 800, color: 'text.primary', fontSize: '0.98rem' }}>
                                            {testimonial.name}
                                        </Typography>
                                        <Typography sx={{ color: 'primary.main', fontSize: '0.82rem', fontWeight: 600 }}>
                                            {testimonial.role}
                                        </Typography>
                                    </Box>
                                </Box>
                            </PremiumCard>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* SECTION 7: Call to Action with Aurora Accent */}
            <Box sx={{ py: { xs: 8, sm: 10, md: 14 }, px: { xs: 2, md: 3 } }}>
                <Container maxWidth="md">
                    <AuroraBackground
                        showGrid={false}
                        sx={{
                            borderRadius: { xs: '24px', md: '32px' },
                            p: { xs: 4, sm: 6, md: 8 },
                            textAlign: 'center',
                            border: '1px solid var(--border-hover)',
                            boxShadow: 'var(--card-shadow-hover)',
                            overflow: 'hidden'
                        }}
                    >
                        <Typography sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '1.8rem', sm: '2.4rem', md: '2.8rem' }, color: 'text.primary' }}>
                            Ready to Transform Your Booking Experience?
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', fontSize: { xs: '1rem', md: '1.15rem' }, mb: 4, maxWidth: '600px', mx: 'auto', lineHeight: 1.7 }}>
                            Join thousands of happy clients and local businesses today. Create your free account in under 60 seconds.
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
                            <GlowButton
                                variant="contained"
                                size="large"
                                onClick={() => navigate('/register')}
                                sx={{ py: 1.6, px: 4 }}
                            >
                                Get Started Free
                            </GlowButton>
                            <GlowButton
                                variant="outlined"
                                size="large"
                                onClick={() => navigate('/login')}
                                sx={{ py: 1.6, px: 4 }}
                            >
                                Sign In to Portal
                            </GlowButton>
                        </Stack>
                    </AuroraBackground>
                </Container>
            </Box>

            <Footer />
        </PageBackground>
    );
};

export default LandingPage;
