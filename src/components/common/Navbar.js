import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { logout } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Toolbar>
                {/* Logo/Brand */}
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                        BookingReserva
                    </Typography>
                </Box>

                {/* Navigation Links */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button color="inherit" component={RouterLink} to="/about">
                        About Us
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/appointments">
                        Appointments
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/businesses">
                        Businesses
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/services">
                        Services
                    </Button>
                    <Button color="inherit" onClick={() => navigate('/profile')} startIcon={<PersonIcon />}>
                        Profile
                    </Button>
                    <Button color="inherit" onClick={logout} startIcon={<LogoutIcon />}>
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
