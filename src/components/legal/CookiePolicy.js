import React from 'react';
import { 
    Box, 
    Container, 
    Typography, 
    Paper, 
    Stack, 
    Divider, 
    Chip, 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import CookieIcon from '@mui/icons-material/Cookie';

const CookiePolicy = () => {
    return (
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
                {/* Header Banner */}
                <Box sx={{ mb: 6, textAlign: 'center' }}>
                    <Chip 
                        icon={<CookieIcon sx={{ fontSize: '18px !important', color: '#f59e0b' }} />} 
                        label="Cookie Transparency" 
                        sx={{ 
                            mb: 2, 
                            fontWeight: 700, 
                            bgcolor: 'rgba(245,158,11,0.1)', 
                            color: '#f59e0b',
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
                        Cookie & Storage Policy
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 720, mx: 'auto', mb: 1.5 }}>
                        Information on the essential browser storage and third-party technologies used across BookingReserva to deliver secure user sessions and interactive maps.
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                        Last Updated: November 2, 2026
                    </Typography>
                </Box>

                <Paper sx={{ p: { xs: 3, sm: 5 }, borderRadius: '24px', border: '1px solid var(--border-subtle)', bgcolor: 'var(--bg-card)' }}>
                    <Stack spacing={4}>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
                                1. What Are Cookies and Local Storage?
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                                Cookies are small text files stored by your web browser when you visit websites. Local Storage is a modern web browser technology allowing websites to store key-value data directly on your device. BookingReserva uses these technologies exclusively to maintain secure authentication and remember interface preferences.
                            </Typography>
                        </Box>

                        <Divider />

                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
                                2. Storage Elements Used by BookingReserva
                            </Typography>
                            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '14px', overflow: 'hidden' }}>
                                <Table>
                                    <TableHead sx={{ bgcolor: 'rgba(37,99,235,0.06)' }}>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 800 }}>Key / Cookie</TableCell>
                                            <TableCell sx={{ fontWeight: 800 }}>Category</TableCell>
                                            <TableCell sx={{ fontWeight: 800 }}>Purpose</TableCell>
                                            <TableCell sx={{ fontWeight: 800 }}>Duration</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 700 }}><code>token</code></TableCell>
                                            <TableCell><Chip label="Essential" size="small" color="primary" /></TableCell>
                                            <TableCell>Cryptographically signed JWT bearer token maintaining your secure logged-in session.</TableCell>
                                            <TableCell>Session / 24 Hours</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 700 }}><code>user</code></TableCell>
                                            <TableCell><Chip label="Essential" size="small" color="primary" /></TableCell>
                                            <TableCell>Stores your user profile ID, role, name, and verification state for UI routing.</TableCell>
                                            <TableCell>Persistent until Logout</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 700 }}><code>theme_mode</code></TableCell>
                                            <TableCell><Chip label="Preference" size="small" color="success" /></TableCell>
                                            <TableCell>Remembers your chosen interface color scheme (Light or Dark mode).</TableCell>
                                            <TableCell>Persistent</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 700 }}><code>reserva_cookie_consent</code></TableCell>
                                            <TableCell><Chip label="Functional" size="small" color="default" /></TableCell>
                                            <TableCell>Records your cookie preferences and consent acknowledgment.</TableCell>
                                            <TableCell>1 Year</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 700 }}>Google Maps (iframe)</TableCell>
                                            <TableCell><Chip label="Third-Party" size="small" color="warning" /></TableCell>
                                            <TableCell>Set by Google LLC when viewing embedded maps, physical venues, and directions.</TableCell>
                                            <TableCell>Per Google Policy</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>

                        <Divider />

                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
                                3. Managing and Disabling Cookies
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 1.5 }}>
                                You have the ability to accept or decline cookies through your browser settings:
                            </Typography>
                            <Box component="ul" sx={{ pl: 3, color: 'text.secondary', lineHeight: 1.8 }}>
                                <li>In <strong>Google Chrome</strong>: Settings → Privacy and Security → Third-party cookies.</li>
                                <li>In <strong>Mozilla Firefox</strong>: Settings → Privacy & Security → Enhanced Tracking Protection.</li>
                                <li>In <strong>Apple Safari</strong>: Preferences → Privacy → Block all cookies.</li>
                            </Box>
                            <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1.5 }}>
                                Note: Disabling local storage or essential authentication tokens will prevent you from logging into your account or booking appointments.
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
};

export default CookiePolicy;
