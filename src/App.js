import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeModeProvider } from './context/ThemeContext';
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
import ServiceList from './components/services/ServiceList';
import PrivacyPolicy from './components/legal/PrivacyPolicy';
import TermsOfService from './components/legal/TermsOfService';
import SecurityPolicy from './components/legal/SecurityPolicy';
import CookiePolicy from './components/legal/CookiePolicy';
import CookieConsentBanner from './components/common/CookieConsentBanner';

function App() {
    return (
        <ThemeModeProvider>
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
                    <Route path="/services" element={<Layout><ServiceList /></Layout>} />

                    {/* Legal, Privacy & Compliance Routes */}
                    <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
                    <Route path="/terms" element={<Layout><TermsOfService /></Layout>} />
                    <Route path="/security" element={<Layout><SecurityPolicy /></Layout>} />
                    <Route path="/cookies" element={<Layout><CookiePolicy /></Layout>} />

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
                <CookieConsentBanner />
            </Router>
            <ToastContainer />
        </ThemeModeProvider>
    );
}

export default App;
