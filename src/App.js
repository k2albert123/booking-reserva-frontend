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
import BusinessList from './components/business/BusinessList';
import BusinessDetails from './components/business/BusinessDetails';
import BookingForm from './components/appointments/BookingForm';
import AboutUs from './components/AboutUs';

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
                    
                    <Route path="/dashboard" element={
                        <RoleGuard allowedRoles={['CLIENT', 'BUSINESS_OWNER']}>
                            <Dashboard />
                        </RoleGuard>
                    } />

                    {/* Client Routes */}
                    <Route path="/appointments" element={
                        <RoleGuard allowedRoles={['CLIENT']}>
                            <Layout>
                                <div>Client Appointments Page</div>
                            </Layout>
                        </RoleGuard>
                    } />
                    <Route path="/businesses" element={
                        <RoleGuard allowedRoles={['CLIENT']}>
                            <Layout>
                                <BusinessList />
                            </Layout>
                        </RoleGuard>
                    } />
                    <Route path="/businesses/:id" element={
                        <RoleGuard allowedRoles={['CLIENT']}>
                            <Layout>
                                <BusinessDetails />
                            </Layout>
                        </RoleGuard>
                    } />
                    <Route path="/book/:businessId/:serviceId" element={
                        <RoleGuard allowedRoles={['CLIENT']}>
                            <Layout>
                                <BookingForm />
                            </Layout>
                        </RoleGuard>
                    } />
                    <Route path="/profile" element={
                        <RoleGuard allowedRoles={['CLIENT']}>
                            <Layout>
                                <div>Client Profile Page</div>
                            </Layout>
                        </RoleGuard>
                    } />

                    <Route path="/businesses/manage" element={
                        <RoleGuard allowedRoles={['BUSINESS_OWNER']}>
                            <Layout>
                                <div>Business Management Page</div>
                            </Layout>
                        </RoleGuard>
                    } />
                    <Route path="/services" element={
                        <RoleGuard allowedRoles={['BUSINESS_OWNER']}>
                            <Layout>
                                <div>Services Management Page</div>
                            </Layout>
                        </RoleGuard>
                    } />
                    <Route path="/appointments/manage" element={
                        <RoleGuard allowedRoles={['BUSINESS_OWNER']}>
                            <Layout>
                                <div>Appointment Management Page</div>
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
