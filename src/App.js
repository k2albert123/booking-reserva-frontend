import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import VerifyOtp from './components/auth/VerifyOtp';
import Register from './components/auth/Register';
import Layout from './components/common/Layout';
import RoleGuard from './components/common/RoleGuard';
import BookingForm from './components/appointments/BookingForm';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import BusinessList from './components/business/BusinessList';
import BusinessDetails from './components/business/BusinessDetails';
import { Box, Typography } from '@mui/material';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#2563eb',
        },
        secondary: {
            main: '#ec4899',
        },
        background: {
            default: '#0b0f19',
            paper: '#1e293b',
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
                    backgroundImage: 'none',
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
                    <Route path="/verify-otp" element={<VerifyOtp />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/businesses" element={<Layout><BusinessList /></Layout>} />
                    <Route path="/businesses/:id" element={<Layout><BusinessDetails /></Layout>} />
                    <Route path="/services" element={<Layout><Box sx={{ py: 8, textAlign: 'center' }}><Typography variant="h4">Find Services</Typography><Typography color="text.secondary">Browse businesses to see their individual services.</Typography></Box></Layout>} />

                    <Route path="/dashboard" element={
                        <RoleGuard allowedRoles={['CLIENT', 'BUSINESS_OWNER', 'ADMIN']}>
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
