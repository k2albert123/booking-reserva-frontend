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
    Alert
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import KeyIcon from '@mui/icons-material/Key';
import StorageIcon from '@mui/icons-material/Storage';
import BugReportIcon from '@mui/icons-material/BugReport';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const SecurityPolicy = () => {
    return (
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
                {/* Header Banner */}
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Chip 
                        icon={<LockIcon sx={{ fontSize: '18px !important', color: '#10b981' }} />} 
                        label="Platform Security" 
                        sx={{ 
                            mb: 2, 
                            fontWeight: 700, 
                            bgcolor: 'rgba(16,185,129,0.1)', 
                            color: '#10b981',
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
                        Security & Trust Overview
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 720, mx: 'auto', mb: 1.5 }}>
                        How BookingReserva protects your data, safeguards identity verification documents, isolates server secrets, and prevents unauthorized access.
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                        Last Updated: November 2, 2026
                    </Typography>
                </Box>

                {/* Pillars Grid */}
                <Grid container spacing={3} sx={{ mb: 6 }}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={{ p: 3, borderRadius: '18px', border: '1px solid var(--border-subtle)', bgcolor: 'var(--bg-card)', height: '100%' }}>
                            <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: 'rgba(37,99,235,0.1)', color: '#2563eb', display: 'inline-flex', mb: 2 }}>
                                <KeyIcon />
                            </Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>BCrypt Password Hashing</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                                User passwords are encrypted with salted BCrypt hashes before database storage. Plaintext passwords are never recorded, logged, or retrievable.
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={{ p: 3, borderRadius: '18px', border: '1px solid var(--border-subtle)', bgcolor: 'var(--bg-card)', height: '100%' }}>
                            <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: 'rgba(16,185,129,0.1)', color: '#10b981', display: 'inline-flex', mb: 2 }}>
                                <StorageIcon />
                            </Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>Isolated Environment Secrets</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                                Application database credentials, SMTP tokens, and JWT secret keys are strictly externalized to untracked environment configurations (`.env`), preventing source leaks.
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={{ p: 3, borderRadius: '18px', border: '1px solid var(--border-subtle)', bgcolor: 'var(--bg-card)', height: '100%' }}>
                            <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: 'rgba(245,158,11,0.1)', color: '#f59e0b', display: 'inline-flex', mb: 2 }}>
                                <AdminPanelSettingsIcon />
                            </Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>Role-Based Access Control</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                                Fine-grained Spring Security filters and JWT claims enforce strict separation between Clients, Business Owners, and Administrators.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Technical Architecture */}
                <Paper sx={{ p: { xs: 3, sm: 5 }, borderRadius: '24px', border: '1px solid var(--border-subtle)', bgcolor: 'var(--bg-card)' }}>
                    <Stack spacing={4}>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
                                1. Data Encryption in Transit & Rest
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 1.5 }}>
                                All network traffic between your web browser and BookingReserva servers is encrypted using modern Transport Layer Security (TLS 1.2 / TLS 1.3) protocols.
                            </Typography>
                            <Box component="ul" sx={{ pl: 3, color: 'text.secondary', lineHeight: 1.8 }}>
                                <li><strong>Stateless Authentication:</strong> User sessions operate through cryptographically signed HMAC-SHA256 JWT tokens with automatic expiration.</li>
                                <li><strong>Cross-Origin Request Filtering (CORS):</strong> Strict CORS policies prevent cross-origin abuse and restrict API calls to authorized origins.</li>
                            </Box>
                        </Box>

                        <Divider />

                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
                                2. Identity Document Storage Security
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 1.5 }}>
                                Personal identification documents (ID cards, passports, business licenses) are stored in sandboxed file storage directories with unique, non-enumerable UUID file signatures.
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                                Access to identity inspection tools is gated strictly behind verified <code>ROLE_ADMIN</code> authentication. No search engine or automated crawler has indexing access to verification files.
                            </Typography>
                        </Box>

                        <Divider />

                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <BugReportIcon sx={{ color: '#ef4444' }} /> 3. Responsible Disclosure Program
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 1.5 }}>
                                We welcome responsible security researchers and ethical hackers who help us identify vulnerabilities. If you discover a potential security flaw in BookingReserva, please report it directly to our security team.
                            </Typography>
                            <Alert severity="info" sx={{ borderRadius: '12px' }}>
                                Please send vulnerability reports to <strong>security@bookingreserva.com</strong>. Include detailed reproduction steps and do not access or tamper with data belonging to other users.
                            </Alert>
                        </Box>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
};

export default SecurityPolicy;
