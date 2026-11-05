import React, { useState } from 'react';
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
    Divider,
    Chip,
    Stack
} from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { logout, getCurrentUser } from '../../services/authService';
import { useThemeMode } from '../../context/ThemeContext';
import ThemeToggle from '../animated/ThemeToggle';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = getCurrentUser();
    const { isDark } = useThemeMode();
    const [menuOpen, setMenuOpen] = useState(false);

    const publicNavLinks = [
        { label: 'Businesses', to: '/businesses' },
        { label: 'Services', to: '/services' },
        { label: 'About Us', to: '/about' },
        { label: 'Contact', to: '/contact' }
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

    const navButtonStyle = (path) => {
        const isActive = location.pathname === path;
        return {
            color: isActive ? (isDark ? '#60a5fa' : '#2563eb') : 'text.primary',
            textTransform: 'none',
            fontWeight: isActive ? 700 : 600,
            borderRadius: '12px',
            px: 2,
            py: 0.8,
            fontSize: '0.92rem',
            bgcolor: isActive
                ? (isDark ? 'rgba(37,99,235,0.15)' : 'rgba(37,99,235,0.08)')
                : 'transparent',
            border: isActive
                ? (isDark ? '1px solid rgba(96,165,250,0.3)' : '1px solid rgba(37,99,235,0.25)')
                : '1px solid transparent',
            transition: 'all 0.2s ease',
            '&:hover': {
                bgcolor: isDark ? 'rgba(96,165,250,0.15)' : 'rgba(37,99,235,0.08)',
                color: isDark ? '#93c5fd' : '#1d4ed8',
                borderColor: isDark ? 'rgba(96,165,250,0.3)' : 'rgba(37,99,235,0.3)'
            }
        };
    };

    return (
        <>
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    position: 'sticky',
                    top: 0,
                    left: 0,
                    right: 0,
                    width: '100%',
                    zIndex: 1300,
                    bgcolor: isDark ? 'rgba(7, 10, 19, 0.88)' : 'rgba(255, 255, 255, 0.88)',
                    backdropFilter: 'blur(16px)',
                    borderBottom: isDark ? '1px solid rgba(148,163,184,0.14)' : '1px solid rgba(226, 232, 240, 0.9)',
                    boxShadow: isDark ? '0 8px 30px rgba(0,0,0,0.4)' : '0 4px 20px rgba(15,23,42,0.05)',
                    transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease'
                }}
            >
                <Toolbar sx={{ minHeight: { xs: '66px', md: '78px' }, px: { xs: 2, md: 4 }, gap: 1.5 }}>
                    {/* Mobile Hamburger Menu */}
                    <IconButton
                        edge="start"
                        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        onClick={toggleMenu}
                        sx={{
                            color: isDark ? '#dbeafe' : '#2563eb',
                            bgcolor: isDark ? 'rgba(96,165,250,0.12)' : 'rgba(37,99,235,0.08)',
                            borderRadius: '12px',
                            display: { xs: 'inline-flex', md: 'none' },
                            flexShrink: 0
                        }}
                    >
                        {menuOpen ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>

                    {/* Logo & Brand Name */}
                    <Box
                        component={RouterLink}
                        to="/"
                        onClick={closeMenu}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: 'inherit',
                            gap: 1.2,
                            minWidth: 0,
                            mr: { md: 3 }
                        }}
                    >
                        <Box
                            component="img"
                            src="/app-logo.png"
                            alt="BookingReserva Logo"
                            sx={{
                                width: 36,
                                height: 36,
                                flexShrink: 0,
                                borderRadius: '10px',
                                boxShadow: '0 4px 14px rgba(37,99,235,0.45)',
                                objectFit: 'cover'
                            }}
                        />
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                fontWeight: 800,
                                color: 'text.primary',
                                letterSpacing: '-0.03em',
                                fontSize: '1.25rem'
                            }}
                        >
                            BookingReserva
                        </Typography>
                    </Box>

                    {/* Center Desktop Links */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1, flexGrow: 1 }}>
                        {publicNavLinks.map((link) => (
                            <Button
                                key={link.to}
                                sx={navButtonStyle(link.to)}
                                component={RouterLink}
                                to={link.to}
                            >
                                {link.label}
                            </Button>
                        ))}
                    </Box>

                    {/* Right Desktop Auth Actions & Theme Toggle */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.5, ml: 'auto' }}>
                        {/* Theme Toggle Button */}
                        <ThemeToggle />

                        {!user ? (
                            <>
                                <Button
                                    component={RouterLink}
                                    to="/login"
                                    sx={{
                                        color: 'text.primary',
                                        textTransform: 'none',
                                        fontWeight: 700,
                                        px: 2.2,
                                        py: 0.9,
                                        borderRadius: '12px',
                                        '&:hover': {
                                            color: 'primary.main',
                                            bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(37,99,235,0.06)'
                                        }
                                    }}
                                >
                                    Sign In
                                </Button>
                                <Button
                                    variant="contained"
                                    component={RouterLink}
                                    to="/register"
                                    sx={{
                                        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                        color: 'white',
                                        textTransform: 'none',
                                        fontWeight: 800,
                                        px: 2.5,
                                        py: 0.9,
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 16px rgba(37,99,235,0.35)',
                                        '&:hover': { background: 'linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)' }
                                    }}
                                >
                                    Register
                                </Button>
                            </>
                        ) : (
                            <>
                                <Chip
                                    label={user.role === 'BUSINESS_OWNER' ? 'Owner' : user.role === 'ADMIN' ? 'Admin' : 'Client'}
                                    size="small"
                                    sx={{
                                        bgcolor: user.role === 'ADMIN'
                                            ? 'rgba(71,85,105,0.18)'
                                            : user.role === 'BUSINESS_OWNER' ? 'rgba(37,99,235,0.12)' : 'rgba(16,185,129,0.12)',
                                        color: user.role === 'ADMIN'
                                            ? (isDark ? '#cbd5e1' : '#475569')
                                            : user.role === 'BUSINESS_OWNER' ? (isDark ? '#93c5fd' : '#2563eb') : (isDark ? '#6ee7b7' : '#059669'),
                                        fontWeight: 800,
                                        borderRadius: '8px'
                                    }}
                                />
                                <Button
                                    component={RouterLink}
                                    to="/dashboard"
                                    startIcon={<DashboardIcon />}
                                    sx={{
                                        bgcolor: isDark ? 'rgba(37,99,235,0.15)' : 'rgba(37,99,235,0.08)',
                                        color: isDark ? '#93c5fd' : '#2563eb',
                                        border: isDark ? '1px solid rgba(96,165,250,0.3)' : '1px solid rgba(37,99,235,0.2)',
                                        borderRadius: '12px',
                                        textTransform: 'none',
                                        fontWeight: 700,
                                        px: 2,
                                        py: 0.8,
                                        '&:hover': {
                                            bgcolor: isDark ? 'rgba(37,99,235,0.25)' : 'rgba(37,99,235,0.15)',
                                            color: isDark ? 'white' : '#1d4ed8'
                                        }
                                    }}
                                >
                                    Dashboard
                                </Button>
                                <Button
                                    component={RouterLink}
                                    to="/dashboard?view=profile"
                                    startIcon={<PersonIcon />}
                                    sx={{
                                        color: 'text.secondary',
                                        border: '1px solid var(--border-subtle)',
                                        borderRadius: '12px',
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        px: 1.8,
                                        py: 0.8,
                                        '&:hover': {
                                            bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(15,23,42,0.04)',
                                            color: 'text.primary'
                                        }
                                    }}
                                >
                                    Profile
                                </Button>
                                <Button
                                    onClick={handleLogout}
                                    startIcon={<LogoutIcon />}
                                    sx={{
                                        color: '#ef4444',
                                        borderRadius: '12px',
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        px: 1.5,
                                        py: 0.8,
                                        '&:hover': { bgcolor: 'rgba(239,68,68,0.1)' }
                                    }}
                                >
                                    Logout
                                </Button>
                            </>
                        )}
                    </Box>

                    {/* Mobile Theme Toggle Button in Toolbar */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
                        <ThemeToggle size="small" />
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="left"
                open={menuOpen}
                onClose={closeMenu}
                ModalProps={{ keepMounted: true }}
                sx={{ display: { xs: 'block', md: 'none' } }}
                PaperProps={{
                    sx: {
                        width: 'min(320px, 86vw)',
                        bgcolor: isDark ? '#070a13' : '#ffffff',
                        borderRight: isDark ? '1px solid rgba(96,165,250,0.2)' : '1px solid rgba(226, 232, 240, 0.9)',
                        pt: 2,
                        px: 2
                    }
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 32, height: 32, borderRadius: '10px', background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'white', fontSize: '0.9rem' }}>
                            R
                        </Box>
                        <Typography sx={{ fontWeight: 800, color: 'text.primary' }}>BookingReserva</Typography>
                    </Box>
                    <IconButton onClick={closeMenu} sx={{ color: 'text.primary' }} aria-label="Close menu">
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider sx={{ borderColor: 'var(--border-subtle)', mb: 2 }} />

                <List disablePadding>
                    {publicNavLinks.map((link) => (
                        <ListItem key={link.to} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                component={RouterLink}
                                to={link.to}
                                onClick={closeMenu}
                                sx={{
                                    borderRadius: '12px',
                                    bgcolor: location.pathname === link.to
                                        ? (isDark ? 'rgba(37,99,235,0.15)' : 'rgba(37,99,235,0.08)')
                                        : 'transparent',
                                    color: location.pathname === link.to
                                        ? (isDark ? '#60a5fa' : '#2563eb')
                                        : 'text.primary'
                                }}
                            >
                                <ListItemText primary={link.label} primaryTypographyProps={{ fontWeight: 600 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}

                    <Divider sx={{ borderColor: 'var(--border-subtle)', my: 2 }} />

                    {!user ? (
                        <Stack spacing={1.5} sx={{ mt: 1 }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                component={RouterLink}
                                to="/login"
                                onClick={closeMenu}
                                sx={{ borderRadius: '12px', py: 1.2, textTransform: 'none', fontWeight: 700 }}
                            >
                                Sign In
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                component={RouterLink}
                                to="/register"
                                onClick={closeMenu}
                                sx={{ borderRadius: '12px', py: 1.2, textTransform: 'none', fontWeight: 800, bgcolor: '#2563eb' }}
                            >
                                Create Free Account
                            </Button>
                        </Stack>
                    ) : (
                        <Stack spacing={1}>
                            <Button
                                fullWidth
                                variant="contained"
                                component={RouterLink}
                                to="/dashboard"
                                onClick={closeMenu}
                                startIcon={<DashboardIcon />}
                                sx={{ borderRadius: '12px', py: 1.2, textTransform: 'none', fontWeight: 700, bgcolor: '#2563eb' }}
                            >
                                Go to Dashboard
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                component={RouterLink}
                                to="/dashboard?view=profile"
                                onClick={closeMenu}
                                startIcon={<PersonIcon />}
                                sx={{ borderRadius: '12px', py: 1.2, textTransform: 'none', color: 'text.primary', borderColor: 'var(--border-subtle)' }}
                            >
                                My Profile
                            </Button>
                            <Button
                                fullWidth
                                onClick={handleLogout}
                                startIcon={<LogoutIcon />}
                                sx={{ borderRadius: '12px', py: 1.2, textTransform: 'none', color: '#ef4444' }}
                            >
                                Logout
                            </Button>
                        </Stack>
                    )}
                </List>
            </Drawer>
        </>
    );
};

export default Navbar;
