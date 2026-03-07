import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Typography, 
    TextField, 
    Button, 
    Avatar, 
    Paper, 
    Grid, 
    Divider,
    CircularProgress,
    Stack,
    IconButton
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { getMyProfile, updateMyProfile } from '../../services/userService';
import { toast } from 'react-toastify';

const ProfileView = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: ''
    });

    const fetchProfile = async () => {
        setLoading(true);
        try {
            const data = await getMyProfile();
            setUser(data);
            setFormData({
                name: data.name,
                email: data.email,
                phoneNumber: data.phoneNumber || ''
            });
        } catch (error) {
            toast.error("Failed to load profile");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updated = await updateMyProfile(formData);
            setUser(updated);
            setEditing(false);
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error("Failed to update profile");
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>;

    return (
        <Box sx={{ maxWidth: '800px', margin: '0 auto' }}>
            <Paper elevation={0} sx={{ p: 4, borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', bgcolor: 'background.paper' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, position: 'relative' }}>
                    <Box sx={{ position: 'relative' }}>
                        <Avatar 
                            src={user?.imageUrl} 
                            sx={{ width: 100, height: 100, border: '4px solid rgba(255,255,255,0.1)', boxShadow: '0 4px 14px rgba(0,0,0,0.3)' }}
                        >
                            {user?.name?.charAt(0)}
                        </Avatar>
                        <IconButton 
                            sx={{ 
                                position: 'absolute', 
                                bottom: 0, 
                                right: 0, 
                                bgcolor: 'primary.main', 
                                color: 'white',
                                '&:hover': { bgcolor: 'primary.dark' },
                                width: 32,
                                height: 32
                            }}
                            size="small"
                        >
                            <PhotoCameraIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                    </Box>
                    <Box sx={{ ml: 3 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                            {user?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {user?.role} • {user?.email}
                        </Typography>
                    </Box>
                    {!editing && (
                        <Button 
                            startIcon={<EditIcon />} 
                            onClick={() => setEditing(true)}
                            sx={{ ml: 'auto', borderRadius: '12px', px: 3 }}
                            variant="outlined"
                        >
                            Edit Profile
                        </Button>
                    )}
                </Box>

                <Divider sx={{ mb: 4 }} />

                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>Full Name</Typography>
                            <TextField
                                fullWidth
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={!editing}
                                variant="outlined"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>Email Address</Typography>
                            <TextField
                                fullWidth
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={!editing}
                                variant="outlined"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>Phone Number</Typography>
                            <TextField
                                fullWidth
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                disabled={!editing}
                                placeholder="Not provided"
                                variant="outlined"
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                            />
                        </Grid>
                    </Grid>

                    {editing && (
                        <Stack direction="row" spacing={2} sx={{ mt: 4, justifyContent: 'flex-end' }}>
                            <Button 
                                startIcon={<CancelIcon />} 
                                onClick={() => {
                                    setEditing(false);
                                    setFormData({
                                        name: user.name,
                                        email: user.email,
                                        phoneNumber: user.phoneNumber || ''
                                    });
                                }}
                                color="inherit"
                                sx={{ borderRadius: '12px', px: 3 }}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit"
                                variant="contained" 
                                startIcon={<SaveIcon />}
                                sx={{ borderRadius: '12px', px: 4 }}
                            >
                                Save Changes
                            </Button>
                        </Stack>
                    )}
                </Box>
            </Paper>
        </Box>
    );
};

export default ProfileView;
