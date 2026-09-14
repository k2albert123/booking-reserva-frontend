import React from 'react';
import { Card, CardMedia, Typography } from '@mui/material';

const ReusableCard = ({ children, sx, ...props }) => (
    <Card
        {...props}
        sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            ...sx
        }}
    >
        {children}
    </Card>
);

export const CardImage = ({ src, alt, height = 220, sx, ...props }) => (
    <CardMedia
        {...props}
        component="img"
        image={src}
        alt={alt}
        sx={{
            height,
            flexShrink: 0,
            objectFit: 'cover',
            ...sx
        }}
    />
);

export const EllipsisText = ({ children, lines = 3, sx, ...props }) => (
    <Typography
        {...props}
        sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: lines,
            overflowWrap: 'anywhere',
            ...sx
        }}
    >
        {children}
    </Typography>
);

export default ReusableCard;
