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
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
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
