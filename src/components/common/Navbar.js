import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { logout, getCurrentUser } from '../../services/authService';

const Navbar = () => {
    const navigate = useNavigate();
    const user = getCurrentUser();
    const [menuOpen, setMenuOpen] = React.useState(false);

    const navButtonStyle = {
        color: 'rgba(255,255,255,0.82)',
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: '12px',
        px: 1.8,
        py: 0.8,
        minHeight: '40px',
        '&:hover': {
            bgcolor: 'rgba(96,165,250,0.12)',
            color: '#dbeafe'
        }
    };

    const links = !user
        ? [
            { label: 'Login', to: '/login' },
            { label: 'About Us', to: '/about' },
            { label: 'Businesses', to: '/businesses' },
            { label: 'Services', to: '/services' }
        ]
        : [
            { label: 'About Us', to: '/about' },
            ...(user.role === 'CLIENT' ? [
                { label: 'Dashboard', to: '/dashboard' },
                { label: 'My Appointments', to: '/dashboard?view=appointments' },
                { label: 'Find Businesses', to: '/dashboard?view=businesses' }
            ] : []),
            ...(user.role === 'BUSINESS_OWNER' ? [
                { label: 'Dashboard', to: '/dashboard' },
                { label: 'My Businesses', to: '/dashboard?view=businesses' },
                { label: 'Staff', to: '/dashboard?view=staff' },
                { label: 'My Services', to: '/dashboard?view=services' },
                { label: 'Customer Bookings', to: '/dashboard?view=appointments' }
            ] : []),
            ...(user.role === 'ADMIN' ? [{ label: 'Admin Dashboard', to: '/dashboard' }] : []),
            { label: 'Profile', to: '/dashboard?view=profile' }
        ];

    const closeMenu = () => setMenuOpen(false);
    const toggleMenu = (event) => {
        event.stopPropagation();
        setMenuOpen((open) => !open);
    };
    const handleLogout = () => {
        logout();
        closeMenu();
        navigate('/login');
    };

    return (
        <>
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    top: 0,
                    zIndex: 1300,
                    bgcolor: 'rgba(10, 15, 25, 0.92)',
                    backdropFilter: 'blur(12px)',
                    borderBottom: '1px solid rgba(96,165,250,0.18)',
                    boxShadow: '0 8px 30px rgba(15,23,42,0.25)'
                }}
            >
                <Toolbar sx={{ minHeight: { xs: '64px', md: '78px' }, px: { xs: 1.5, md: 3 }, gap: 1 }}>
                    <IconButton
                        edge="start"
                        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        onClick={toggleMenu}
                        sx={{
                            color: '#dbeafe',
                            bgcolor: 'rgba(96,165,250,0.12)',
                            borderRadius: '12px',
                            display: { xs: 'inline-flex', md: 'none' },
                            flexShrink: 0
                        }}
                    >
                        {menuOpen ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>

                    <Box
                        component={RouterLink}
                        to="/"
                        onClick={closeMenu}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: 'inherit',
                            gap: 1,
                            minWidth: 0,
                            flexGrow: 1
                        }}
                    >
                        <Box sx={{ width: 32, height: 32, flexShrink: 0, borderRadius: '10px', background: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'white', fontSize: '0.9rem' }}>
                            R
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                fontWeight: 800,
                                color: '#f8fbff',
                                letterSpacing: '-0.04em',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            BookingReserva
                        </Typography>
                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1, flexWrap: 'nowrap' }}>
                        {links.filter((link) => link.label !== 'Profile').map((link) => (
                            <Button key={`${link.to}-${link.label}`} sx={navButtonStyle} component={RouterLink} to={link.to}>
                                {link.label}
                            </Button>
                        ))}
                        {user && (
                            <>
                                <Button sx={{ ...navButtonStyle, border: '1px solid rgba(96,165,250,0.2)' }} component={RouterLink} to="/dashboard?view=profile" startIcon={<PersonIcon />}>
                                    Profile
                                </Button>
                                <Button sx={{ ...navButtonStyle, color: '#fca5a5' }} onClick={handleLogout} startIcon={<LogoutIcon />}>
                                    Logout
                                </Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={menuOpen}
                onClose={closeMenu}
                ModalProps={{ keepMounted: true }}
                sx={{ display: { xs: 'block', md: 'none' } }}
                PaperProps={{
                    sx: {
                        width: 'min(320px, 86vw)',
                        bgcolor: '#0f172a',
                        borderRight: '1px solid rgba(96,165,250,0.2)',
                        pt: 1
                    }
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5 }}>
                    <Typography sx={{ fontWeight: 800, color: '#f8fbff' }}>Menu</Typography>
                    <IconButton onClick={closeMenu} sx={{ color: '#dbeafe' }} aria-label="Close menu">
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider sx={{ borderColor: 'rgba(148,163,184,0.16)' }} />
                <List sx={{ p: 1 }}>
                    {links.map((link) => (
                        <ListItem key={`${link.to}-${link.label}`} disablePadding>
                            <ListItemButton
                                component={RouterLink}
                                to={link.to}
                                onClick={closeMenu}
                                sx={{ borderRadius: 2, minWidth: 0 }}
                            >
                                <ListItemText
                                    primary={link.label}
                                    primaryTypographyProps={{
                                        noWrap: true,
                                        sx: { overflow: 'hidden', textOverflow: 'ellipsis' }
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    {user && (
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2, color: '#fca5a5' }}>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </ListItem>
                    )}
                </List>
            </Drawer>
        </>
    );
};

export default Navbar;
