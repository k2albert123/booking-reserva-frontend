import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { logout, getCurrentUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const user = getCurrentUser();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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
                { label: 'My Appointments', to: '/dashboard?view=appointments' },
                { label: 'Find Businesses', to: '/dashboard?view=businesses' }
            ] : []),
            ...(user.role === 'BUSINESS_OWNER' ? [
                { label: 'My Businesses', to: '/dashboard?view=businesses' },
                { label: 'Staff', to: '/dashboard?view=staff' },
                { label: 'My Services', to: '/dashboard?view=services' },
                { label: 'Customer Bookings', to: '/dashboard?view=appointments' }
            ] : []),
            ...(user.role === 'ADMIN' ? [{ label: 'Admin Dashboard', to: '/dashboard' }] : []),
            { label: 'Profile', to: '/dashboard?view=profile' }
        ];

    const closeMenu = () => setMenuOpen(false);
    const handleLogout = () => {
        logout();
        closeMenu();
        navigate('/login');
    };

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                top: 0,
                zIndex: 1100,
                bgcolor: 'rgba(10, 15, 25, 0.72)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(96,165,250,0.18)',
                boxShadow: '0 8px 30px rgba(15,23,42,0.25)'
            }}
        >
            <Toolbar sx={{ minHeight: '78px', px: { xs: 2, md: 3 } }}>
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <IconButton
                        edge="start"
                        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        onClick={() => setMenuOpen(!menuOpen)}
                        sx={{ color: '#dbeafe', bgcolor: 'rgba(96,165,250,0.08)', borderRadius: '12px', display: { xs: 'inline-flex', md: 'none' } }}
                    >
                        {menuOpen ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>
                    <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', gap: 1 }}>
                        <Box sx={{ width: 32, height: 32, borderRadius: '10px', background: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'white', fontSize: '0.9rem' }}>
                            R
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: '#f8fbff', letterSpacing: '-0.04em' }}>
                            BookingReserva
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.25, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                    {!user ? (
                        <>
                            <Button sx={navButtonStyle} component={RouterLink} to="/login">Login</Button>
                            <Button sx={navButtonStyle} component={RouterLink} to="/about">About Us</Button>
                            <Button sx={navButtonStyle} component={RouterLink} to="/businesses">Businesses</Button>
                            <Button sx={navButtonStyle} component={RouterLink} to="/services">Services</Button>
                        </>
                    ) : (
                        <>
                            <Button sx={navButtonStyle} component={RouterLink} to="/about">About Us</Button>

                            {user.role === 'CLIENT' && (
                                <>
                                    <Button sx={navButtonStyle} component={RouterLink} to="/dashboard?view=appointments">My Appointments</Button>
                                    <Button sx={navButtonStyle} component={RouterLink} to="/dashboard?view=businesses">Find Businesses</Button>
                                </>
                            )}

                            {user.role === 'BUSINESS_OWNER' && (
                                <>
                                    <Button sx={navButtonStyle} component={RouterLink} to="/dashboard?view=businesses">My Businesses</Button>
                                    <Button sx={navButtonStyle} component={RouterLink} to="/dashboard?view=staff">Staff</Button>
                                    <Button sx={navButtonStyle} component={RouterLink} to="/dashboard?view=services">My Services</Button>
                                    <Button sx={navButtonStyle} component={RouterLink} to="/dashboard?view=appointments">Customer Bookings</Button>
                                </>
                            )}

                            {user.role === 'ADMIN' && (
                                <Button sx={navButtonStyle} component={RouterLink} to="/dashboard">Admin Dashboard</Button>
                            )}

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
            <Drawer
                anchor="top"
                open={isMobile && menuOpen}
                onClose={closeMenu}
                PaperProps={{ sx: { mt: '78px', bgcolor: '#0f172a', borderBottom: '1px solid rgba(96,165,250,0.2)' } }}
            >
                <List sx={{ p: 1 }}>
                    {links.map((link) => (
                        <ListItem key={link.to} disablePadding>
                            <ListItemButton component={RouterLink} to={link.to} onClick={closeMenu} sx={{ borderRadius: 2 }}>
                                <ListItemText primary={link.label} />
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
        </AppBar>
    );
};

export default Navbar;
