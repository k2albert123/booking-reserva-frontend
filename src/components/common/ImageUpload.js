import React, { useState } from 'react';
import { 
    Box, 
    Button, 
    CircularProgress, 
    Typography, 
    Avatar,
    IconButton
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from 'axios';

const ImageUpload = ({ value, onChange, label = "Upload Image", folder = "general" }) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Basic validation
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);
        setError(null);
        try {
            const response = await axios.post('/api/v1/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onChange(response.data.url);
        } catch (err) {
            console.error('Upload error:', err);
            setError('Failed to upload image. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <Box sx={{ textAlign: 'center', mb: 2 }}>
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Avatar
                    src={value || ''}
                    sx={{ width: 120, height: 120, mb: 1, border: '2px solid #ddd' }}
                >
                    {!value && <PhotoCamera />}
                </Avatar>
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="icon-button-file"
                    type="file"
                    onChange={handleFileChange}
                />
                <label htmlFor="icon-button-file">
                    <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        sx={{ 
                            position: 'absolute', 
                            bottom: 10, 
                            right: 0, 
                            backgroundColor: 'white',
                            '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                    >
                        <PhotoCamera />
                    </IconButton>
                </label>
            </Box>
            <Typography variant="body2" color="text.secondary">
                {label}
            </Typography>
            {uploading && <CircularProgress size={24} sx={{ mt: 1 }} />}
            {error && <Typography variant="caption" color="error" display="block">{error}</Typography>}
        </Box>
    );
};

export default ImageUpload;
