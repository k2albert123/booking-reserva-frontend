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
import ShieldIcon from '@mui/icons-material/Shield';
import LockIcon from '@mui/icons-material/Lock';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import BadgeIcon from '@mui/icons-material/Badge';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link as RouterLink } from 'react-router-dom';

const PrivacyPolicy = () => {
    return (
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
                {/* Header Banner */}
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Chip 
                        icon={<ShieldIcon sx={{ fontSize: '18px !important', color: '#2563eb' }} />} 
                        label="Privacy & Data Protection" 
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
                        Privacy Policy
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 720, mx: 'auto', mb: 1.5 }}>
                        How BookingReserva collects, uses, encrypts, and protects your personal data, identity verification documents, and location records in compliance with GDPR, CCPA, and global data privacy standards.
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                        Effective Date: November 2, 2026 • Last Reviewed: November 2, 2026
                    </Typography>
                </Box>

                {/* Key Summary Cards */}
                <Grid container spacing={3} sx={{ mb: 6 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 3, borderRadius: '16px', border: '1px solid var(--border-subtle)', bgcolor: 'var(--bg-card)', height: '100%' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                                <BadgeIcon sx={{ color: '#2563eb' }} />
                                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>ID Verification</Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                                Government IDs and business licenses are reviewed solely by verified administrators to prevent fraudulent activity and fake accounts.
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 3, borderRadius: '16px', border: '1px solid var(--border-subtle)', bgcolor: 'var(--bg-card)', height: '100%' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                                <LockIcon sx={{ color: '#10b981' }} />
                                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Never Sold</Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                                We do not sell, rent, or trade your personal data, contact information, or documents to data brokers or third-party advertisers.
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 3, borderRadius: '16px', border: '1px solid var(--border-subtle)', bgcolor: 'var(--bg-card)', height: '100%' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                                <LocationOnIcon sx={{ color: '#f59e0b' }} />
                                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Location Privacy</Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                                Exact business addresses and map coordinates are published only to help clients locate verified venues with explicit business consent.
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 3, borderRadius: '16px', border: '1px solid var(--border-subtle)', bgcolor: 'var(--bg-card)', height: '100%' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                                <VerifiedUserIcon sx={{ color: '#8b5cf6' }} />
                                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Your Rights</Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                                You have the right to inspect, correct, export, or permanently delete your account, personal data, and uploaded records at any time.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Detailed Sections */}
                <Paper sx={{ p: { xs: 3, sm: 5 }, borderRadius: '24px', border: '1px solid var(--border-subtle)', bgcolor: 'var(--bg-card)' }}>
                    <Stack spacing={4}>
                        {/* Section 1 */}
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
                                1. Information We Collect
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2 }}>
                                BookingReserva collects information necessary to create your account, connect clients with verified service providers, safeguard platform integrity, and deliver booking notifications. The categories of information include:
                            </Typography>
                            <Box component="ul" sx={{ pl: 3, color: 'text.secondary', lineHeight: 1.8 }}>
                                <li><strong>Identity & Account Data:</strong> Full name, email address, encrypted password (hashed via BCrypt with salt), phone number, profile avatar, and assigned platform role (Client, Business Owner, or Administrator).</li>
                                <li><strong>Identification & Proof Documents:</strong> For Clients, a photo of a government-issued identification document (e.g. National ID, Passport, Driver’s License). For Business Owners, an official business registration certificate, operating license, or commercial registry document.</li>
                                <li><strong>Business & Location Details:</strong> Business name, industry category, commercial address, city, state, postal code, GPS coordinates (latitude/longitude), storefront and interior facility photographs, and operating hours.</li>
                                <li><strong>Booking & Transaction Data:</strong> Service booked, appointment date and time, assigned staff member, booking status (Pending, Confirmed, Completed, Cancelled), and appointment history.</li>
                                <li><strong>Reviews & Feedback:</strong> Star ratings (1 to 5), written comments, and verified customer stamps submitted after completed appointments.</li>
                                <li><strong>Technical & Session Data:</strong> IP address, browser type, operating system, and secure session authentication tokens (JSON Web Tokens).</li>
                            </Box>
                        </Box>

                        <Divider />

                        {/* Section 2 */}
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: 'text.primary', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <BadgeIcon sx={{ color: '#2563eb' }} /> 2. Special Safeguards for Identity & Verification Documents
                            </Typography>
                            <Alert severity="info" sx={{ mb: 2.5, borderRadius: '12px', bgcolor: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)' }}>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    Strict Purpose Limitation: Identification documents and business certificates are gathered strictly to verify user legitimacy, eliminate fraudulent businesses, and safeguard customer trust.
                                </Typography>
                            </Alert>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 1.5 }}>
                                We implement rigorous administrative, technical, and physical safeguards for all uploaded verification documents:
                            </Typography>
                            <Box component="ul" sx={{ pl: 3, color: 'text.secondary', lineHeight: 1.8 }}>
                                <li><strong>Restricted Administrative Access:</strong> Only authorized platform administrators with dual-authenticated accounts have permission to review submitted proof images in the Admin Verification Queue.</li>
                                <li><strong>Non-Public Storage:</strong> Personal identification documents (ID cards, passports, driver’s licenses) are never published to public business directories or made accessible to regular clients or search engines.</li>
                                <li><strong>Data Minimization:</strong> Once an account is verified and approved, the verification record is stamped with an approval status and the document is retained strictly for the duration of the account’s standing to prevent ban evasion and identity spoofing.</li>
                                <li><strong>Account Erasure:</strong> When an account is deleted upon user request or admin termination, associated verification documents are permanently purged from the server filesystem.</li>
                            </Box>
                        </Box>

                        <Divider />

                        {/* Section 3 */}
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
                                3. Legal Bases for Data Processing (GDPR & International Law)
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2 }}>
                                In accordance with Article 6 of the General Data Protection Regulation (GDPR) and applicable data privacy frameworks, BookingReserva processes personal information under the following legal bases:
                            </Typography>
                            <Box component="ul" sx={{ pl: 3, color: 'text.secondary', lineHeight: 1.8 }}>
                                <li><strong>Contractual Necessity:</strong> To provide booking capabilities, schedule staff, confirm appointments, and facilitate communication between clients and service businesses.</li>
                                <li><strong>Legitimate Interests:</strong> To authenticate real users, verify physical business premises, prevent fraud, prevent abusive fake reviews, maintain cybersecurity, and enforce our Terms of Service.</li>
                                <li><strong>Legal Compliance:</strong> To comply with applicable tax, financial, and consumer protection reporting obligations when required by law.</li>
                                <li><strong>Explicit Consent:</strong> When you voluntarily register, submit identification documents, enable browser geolocation, or opt-in to marketing communications. You may withdraw consent at any time.</li>
                            </Box>
                        </Box>

                        <Divider />

                        {/* Section 4 */}
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
                                4. Third-Party Integrations & Data Sharing
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2 }}>
                                We do not sell your personal information. We partner only with vetted third-party service providers who comply with industry security standards:
                            </Typography>
                            <Box component="ul" sx={{ pl: 3, color: 'text.secondary', lineHeight: 1.8 }}>
                                <li><strong>Google Maps Platform (Google LLC):</strong> We embed Google Maps to display physical business locations and calculate directions. When you view a map, Google may collect your IP address and device information according to the <Link href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</Link>.</li>
                                <li><strong>Transactional Email Services (SMTP):</strong> We use secure mail transfer protocols to transmit verification OTP codes, appointment confirmations, and password reset instructions.</li>
                                <li><strong>Cloud Infrastructure & Database Hosting:</strong> Encrypted databases and secure file storage systems hosted in enterprise-grade data centers adhering to SOC2 and ISO 27001 standards.</li>
                                <li><strong>Legal Requirements:</strong> We may disclose information if required to do so by a subpoena, warrant, or court order issued by a competent legal authority.</li>
                            </Box>
                        </Box>

                        <Divider />

                        {/* Section 5 */}
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
                                5. Your Privacy Rights (GDPR, CCPA & Global Rights)
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2 }}>
                                Depending on your jurisdiction (including the European Economic Area, the United Kingdom, California, and other jurisdictions), you possess statutory privacy rights:
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: '14px', bgcolor: 'transparent' }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.5, color: '#2563eb' }}>Right of Access & Portability</Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Request a complete export of your personal information, booking history, and profile records.</Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: '14px', bgcolor: 'transparent' }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.5, color: '#10b981' }}>Right to Rectification</Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Update or correct inaccurate or incomplete profile data directly from your dashboard or via support.</Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: '14px', bgcolor: 'transparent' }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.5, color: '#ef4444' }}>Right to Erasure ("To Be Forgotten")</Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Request the permanent deletion of your account, past reviews, and uploaded ID documents.</Typography>
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: '14px', bgcolor: 'transparent' }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.5, color: '#f59e0b' }}>Right to Object & Withdraw Consent</Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Withdraw consent for non-essential processing, cookie tracking, or marketing communications at any time.</Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Box>

                        <Divider />

                        {/* Section 6 */}
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
                                6. Cookies and Storage Policy
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 1.5 }}>
                                BookingReserva uses essential local storage and session mechanisms to provide core functionality:
                            </Typography>
                            <Box component="ul" sx={{ pl: 3, color: 'text.secondary', lineHeight: 1.8 }}>
                                <li><strong>Essential Session Authentication:</strong> Secure JWT tokens stored in browser local storage to maintain your logged-in session.</li>
                                <li><strong>Interface Preferences:</strong> Theme preference (Light or Dark mode) stored locally for seamless user experience.</li>
                                <li><strong>Third-Party Cookies:</strong> Google Maps iframes may set analytical or functional cookies necessary to display interactive maps and directions.</li>
                            </Box>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1.5 }}>
                                You can configure your browser to reject cookies; however, authentication and map rendering may be impacted. See our full <Link component={RouterLink} to="/cookies">Cookie Policy</Link> for details.
                            </Typography>
                        </Box>

                        <Divider />

                        {/* Section 7 */}
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
                                7. Age Limitations (Minors)
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                                BookingReserva is intended for individuals aged 18 and older. We do not knowingly collect personal information or identification documents from minors under the age of 18. If you become aware that a minor has registered an account, please contact us immediately for account termination and data purge.
                            </Typography>
                        </Box>

                        <Divider />

                        {/* Section 8 */}
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
                                8. Contact Our Data Protection Officer (DPO)
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2 }}>
                                If you have questions regarding this Privacy Policy, wish to exercise your statutory rights (such as data export or account erasure), or have privacy inquiries, please contact our privacy team:
                            </Typography>
                            <Paper sx={{ p: 3, borderRadius: '16px', bgcolor: 'rgba(37,99,235,0.05)', border: '1px solid rgba(37,99,235,0.15)' }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.5 }}>BookingReserva Privacy & Legal Office</Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}><strong>Email:</strong> privacy@bookingreserva.com</Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}><strong>Legal Requests:</strong> legal@bookingreserva.com</Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}><strong>Response Time:</strong> Statutory requests are addressed within 30 calendar days.</Typography>
                            </Paper>
                        </Box>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
};

export default PrivacyPolicy;
