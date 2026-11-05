import React from 'react';
import { 
    Box, 
    Container, 
    Typography, 
    Paper, 
    Stack, 
    Divider, 
    Chip, 
    Grid, 
    Alert,
    Link
} from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonIcon from '@mui/icons-material/Person';
import StarRateIcon from '@mui/icons-material/StarRate';
import { Link as RouterLink } from 'react-router-dom';

const TermsOfService = () => {
    return (
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
                {/* Header Banner */}
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Chip 
                        icon={<GavelIcon sx={{ fontSize: '18px !important', color: '#2563eb' }} />} 
                        label="User Agreement" 
                        sx={{ 
                            mb: 2, 
                            fontWeight: 700, 
                            bgcolor: 'rgba(37,99,235,0.1)', 
                            color: '#2563eb',
                            px: 1.5,
                            py: 0.5
                        }} 
                    />
                    <Typography 
                        variant="h3" 
                        component="h1" 
                        sx={{ 
                            fontWeight: 900, 
                            mb: 2, 
                            letterSpacing: '-0.02em',
                            fontSize: { xs: '2rem', md: '2.8rem' }
                        }}
                    >
                        Terms of Service
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 720, mx: 'auto', mb: 1.5 }}>
                        The contractual rules, responsibilities, and standards governing your use of BookingReserva as a client, independent business owner, or administrator.
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                        Effective Date: November 2, 2026 • Version 2.4
                    </Typography>
                </Box>

                {/* Important Notice */}
                <Alert severity="warning" sx={{ mb: 5, borderRadius: '16px', border: '1px solid rgba(245,158,11,0.3)', bgcolor: 'rgba(245,158,11,0.08)' }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        Important Legal Notice: By accessing or creating an account on BookingReserva, you agree to be bound by these Terms of Service. If you do not agree to all terms, you must not use or access our platform.
                    </Typography>
                </Alert>

                {/* Main Content */}
                <Paper sx={{ p: { xs: 3, sm: 5 }, borderRadius: '24px', border: '1px solid var(--border-subtle)', bgcolor: 'var(--bg-card)' }}>
                    <Stack spacing={4}>
                        {/* Section 1 */}
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
                                1. Nature of the Platform
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 1.5 }}>
                                BookingReserva provides a technology platform and software marketplace that connects individual clients ("Clients") seeking appointment-based services with independent third-party businesses and service specialists ("Business Owners").
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                                <strong>Independent Contractors & Venues:</strong> BookingReserva does not own, operate, or provide direct barbering, cosmetology, medical, dental, wellness, hospitality, or physical services. All services are performed independently by the respective business. BookingReserva is not an employer, partner, or joint venturer of any registered business.
                            </Typography>
                        </Box>

                        <Divider />

                        {/* Section 2 */}
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
                                2. Account Registration & Mandatory Verification
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2 }}>
                                To ensure high trust and prevent fraud, BookingReserva enforces a role-based identity verification protocol:
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Paper variant="outlined" sx={{ p: 3, borderRadius: '16px', height: '100%' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                            <PersonIcon sx={{ color: '#2563eb' }} />
                                            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Client Accounts</Typography>
                                        </Box>
                                        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                                            Clients must upload a valid, unexpired government-issued identification document during registration. Accounts remain in a <code>PENDING</code> status until verified by an administrator. Unapproved clients cannot book appointments.
                                        </Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Paper variant="outlined" sx={{ p: 3, borderRadius: '16px', height: '100%' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                            <StorefrontIcon sx={{ color: '#10b981' }} />
                                            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Business Owner Accounts</Typography>
                                        </Box>
                                        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                                            Business owners must upload authentic business registration certificates, commercial licenses, storefront photos, and physical address documentation. Unapproved owners cannot publish listings or accept appointments.
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Typography variant="body2" sx={{ color: 'error.main', fontWeight: 600, mt: 2 }}>
                                Document Authenticity Warranty: You warrant that all uploaded documents are genuine, current, and legally belong to you. Submission of forged, altered, or stolen documents constitutes fraud and will result in immediate termination, blacklisting, and reporting to law enforcement authorities.
                            </Typography>
                        </Box>

                        <Divider />

                        {/* Section 3 */}
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
                                3. Business Location, Maps & Directions
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 1.5 }}>
                                Businesses listing their services on BookingReserva must provide accurate street addresses, cities, states, postal codes, and GPS coordinates.
                            </Typography>
                            <Box component="ul" sx={{ pl: 3, color: 'text.secondary', lineHeight: 1.8 }}>
                                <li>Businesses are strictly forbidden from submitting fraudulent or residential addresses as commercial venues.</li>
                                <li>Storefront exterior and interior photos uploaded to the platform must represent the actual physical location of the business.</li>
                                <li>The platform displays embedded Google Maps for customer navigation. We do not guarantee real-time traffic conditions or external routing accuracy provided by third-party navigation apps.</li>
                            </Box>
                        </Box>

                        <Divider />

                        {/* Section 4 */}
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <StarRateIcon sx={{ color: '#f59e0b' }} /> 4. Customer Reviews & Anti-Manipulation Policy
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 1.5 }}>
                                BookingReserva maintains strict review integrity to protect consumers and honest local enterprises:
                            </Typography>
                            <Box component="ul" sx={{ pl: 3, color: 'text.secondary', lineHeight: 1.8 }}>
                                <li><strong>Verified Booking Requirement:</strong> A client may submit a review <strong>only for appointments that are marked <code>COMPLETED</code></strong> by the business, with a limit of one review per appointment.</li>
                                <li><strong>Truthfulness & Authenticity:</strong> Reviews must be based on firsthand personal experience. Submitting fictitious, incentivized, paid, or competitor reviews is strictly prohibited.</li>
                                <li><strong>Prohibited Content:</strong> Reviews containing profanity, hate speech, harassment, extortion, private personal data, or defamatory accusations are prohibited.</li>
                                <li><strong>Platform Moderation:</strong> Platform administrators retain full authority to investigate, moderate, or remove reviews that violate our policies or constitute unlawful defamation.</li>
                            </Box>
                        </Box>

                        <Divider />

                        {/* Section 5 */}
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
                                5. Appointments, Cancellations, and No-Shows
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 1.5 }}>
                                When an appointment is booked through BookingReserva, a direct service agreement is formed between the Client and the Business Owner:
                            </Typography>
                            <Box component="ul" sx={{ pl: 3, color: 'text.secondary', lineHeight: 1.8 }}>
                                <li><strong>Punctuality:</strong> Clients agree to arrive promptly at the scheduled time. Businesses agree to accommodate the client at the booked time slot.</li>
                                <li><strong>Cancellations:</strong> Clients must cancel appointments through the platform at least 24 hours in advance, or in accordance with the specific business's stated policy.</li>
                                <li><strong>No-Shows:</strong> Repeated unexcused failure to attend confirmed appointments may result in the suspension or restriction of a Client's booking privileges.</li>
                            </Box>
                        </Box>

                        <Divider />

                        {/* Section 6 */}
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
                                6. Disclaimer of Warranties & Limitation of Liability
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 1.5 }}>
                                <strong>Provided "AS IS":</strong> The BookingReserva platform, directory, and tools are provided on an "as is" and "as available" basis without warranties of any kind, whether express, statutory, or implied.
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 1.5 }}>
                                <strong>Service Quality Disclaimer:</strong> While BookingReserva verifies documents and physical premises to promote safety, we do not guarantee the quality, safety, legality, medical outcome, or satisfaction of services provided by independent businesses.
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                                <strong>Limitation of Liability:</strong> To the maximum extent permitted by applicable law, BookingReserva and its operators, affiliates, directors, and employees shall not be liable for any indirect, incidental, special, punitive, or consequential damages resulting from user disputes, in-person service appointments, personal injury, property damage, or service interruptions.
                            </Typography>
                        </Box>

                        <Divider />

                        {/* Section 7 */}
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
                                7. Intellectual Property & User Content
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 1.5 }}>
                                The BookingReserva name, logos, software architecture, UI design, and branding are the exclusive property of BookingReserva.
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                                <strong>User Content License:</strong> By uploading business storefront photos, logos, service descriptions, and reviews, you grant BookingReserva a non-exclusive, royalty-free, worldwide license to display, adapt, and host such content on our platform for directory and promotional purposes.
                            </Typography>
                        </Box>

                        <Divider />

                        {/* Section 8 */}
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
                                8. Termination & Governing Law
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 1.5 }}>
                                <strong>Termination:</strong> We reserve the right to suspend or terminate any user account without notice for fraudulent documentation, abusive behavior, harassment, repeat no-shows, or violation of these Terms.
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                                <strong>Governing Law:</strong> These Terms shall be governed by and construed in accordance with applicable laws, without regard to its conflict of law principles. Any legal action or proceeding arising under these Terms will be brought exclusively in competent courts.
                            </Typography>
                        </Box>

                        <Divider />

                        {/* Questions */}
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>Questions About Our Terms?</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                For inquiries or legal notices, contact our legal counsel at <Link href="mailto:legal@bookingreserva.com">legal@bookingreserva.com</Link> or visit our <Link component={RouterLink} to="/contact">Support Center</Link>.
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
};

export default TermsOfService;
