import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Paper,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material';
import api from '../../utils/api';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                const [statsRes, usersRes] = await Promise.all([
                    api.get('/admin/stats'),
                    api.get('/admin/users')
                ]);
                setStats(statsRes.data);
                setUsers(usersRes.data);
            } catch (error) {
                toast.error('Failed to load admin data');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;
    }

    const cards = [
        { label: 'Total Users', value: stats?.totalUsers ?? 0 },
        { label: 'Clients', value: stats?.clients ?? 0 },
        { label: 'Business Owners', value: stats?.businessOwners ?? 0 },
        { label: 'Businesses', value: stats?.totalBusinesses ?? 0 },
        { label: 'Appointments', value: stats?.totalAppointments ?? 0 },
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>Admin Dashboard</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Platform overview and user management
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                {cards.map((card) => (
                    <Grid item xs={12} sm={6} md={4} key={card.label}>
                        <Paper sx={{ p: 3, borderRadius: 2 }}>
                            <Typography variant="body2" color="text.secondary">{card.label}</Typography>
                            <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1 }}>{card.value}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>All Users</Typography>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Verified</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.emailVerified ? 'Yes' : 'No'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {users.length === 0 && (
                    <List>
                        <ListItem>
                            <ListItemText primary="No users found" />
                        </ListItem>
                    </List>
                )}
            </Paper>
        </Container>
    );
};

export default AdminDashboard;
