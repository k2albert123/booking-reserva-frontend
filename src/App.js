import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import Register from './components/auth/Register';
import Layout from './components/common/Layout';
import RoleGuard from './components/common/RoleGuard';
import BookingForm from './components/appointments/BookingForm';
import AboutUs from './components/AboutUs';
import BusinessList from './components/business/BusinessList';
import { Box, Typography } from '@mui/material';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#2563eb', // Vibrant electric blue matching design
        },
        secondary: {
            main: '#ec4899', // Pink accent
        },
        background: {
            default: '#0b0f19', // Deep dark blue/black background
            paper: '#1e293b',   // Slate gray for cards and interactive surfaces
        },
    },
    typography: {
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
        h1: { fontWeight: 800 },
        h2: { fontWeight: 800 },
        h3: { fontWeight: 700 },
        h4: { fontWeight: 700 },
        h5: { fontWeight: 600 },
        h6: { fontWeight: 600 },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '16px',
                    backgroundImage: 'none', // Remove default generic overlay
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                }
            }
        }
    }
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/businesses" element={<Layout><BusinessList /></Layout>} />
                    <Route path="/services" element={<Layout><Box sx={{ py: 8, textAlign: 'center' }}><Typography variant="h4">Find Services</Typography><Typography color="text.secondary">Search functionality coming soon. Browse businesses to see their individual services.</Typography></Box></Layout>} />
                    
                    <Route path="/dashboard" element={
                        <RoleGuard allowedRoles={['CLIENT', 'BUSINESS_OWNER']}>
                            <Dashboard />
                        </RoleGuard>
                    } />

                    <Route path="/book/:businessId/:serviceId" element={
                        <RoleGuard allowedRoles={['CLIENT']}>
                            <Layout>
                                <BookingForm />
                            </Layout>
                        </RoleGuard>
                    } />
                </Routes>
            </Router>
            <ToastContainer />
        </ThemeProvider>
    );
}

export default App;
