import React from 'react';
import { Box, Card, CardContent } from '@mui/material';

const cardShellSx = {
    height: '100%',
    width: '100%',
    minWidth: 0,
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    bgcolor: 'rgba(15, 23, 42, 0.72)',
    border: '1px solid rgba(148,163,184,0.14)',
    borderRadius: '20px',
    boxShadow: '0 12px 30px rgba(15,23,42,0.18)'
};

const ReusableCard = ({ children, sx, onClick, ...props }) => (
    <Card
        {...props}
        onClick={onClick}
        sx={{
            ...cardShellSx,
            cursor: onClick ? 'pointer' : 'default',
            ...sx
        }}
    >
        {children}
    </Card>
);

export const CardImage = ({ src, alt = '', height = 200, sx, ...props }) => (
    <Box
        sx={{
            height,
            width: '100%',
            flexShrink: 0,
            overflow: 'hidden',
            position: 'relative',
            bgcolor: '#0f172a'
        }}
    >
        {src ? (
            <Box
                {...props}
                component="img"
                src={src}
                alt={alt}
                sx={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                    ...sx
                }}
            />
        ) : null}
    </Box>
);

export const EllipsisText = ({ children, lines = 3, sx, component = 'p', ...props }) => (
    <Box
        {...props}
        component={component}
        title={typeof children === 'string' ? children : undefined}
        sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: lines,
            overflowWrap: 'anywhere',
            wordBreak: 'break-word',
            minWidth: 0,
            maxWidth: '100%',
            m: 0,
            ...sx
        }}
    >
        {children}
    </Box>
);

export const ActionCard = ({
    icon,
    title,
    description,
    color = '#60a5fa',
    onClick,
    footer,
    sx
}) => (
    <ReusableCard
        onClick={onClick}
        sx={{
            p: 0,
            minHeight: 220,
            transition: 'all 0.3s ease',
            '&:hover': {
                borderColor: `${color}99`,
                transform: 'translateY(-6px)',
                boxShadow: `0 20px 35px ${color}22`
            },
            ...sx
        }}
    >
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0, p: 3 }}>
            {icon && (
                <Box
                    sx={{
                        width: 56,
                        height: 56,
                        flexShrink: 0,
                        borderRadius: '16px',
                        bgcolor: `${color}18`,
                        color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2
                    }}
                >
                    {icon}
                </Box>
            )}
            <EllipsisText lines={1} component="h3" sx={{ fontWeight: 800, fontSize: '1.1rem', mb: 1, color: 'text.primary' }}>
                {title}
            </EllipsisText>
            {description && (
                <EllipsisText lines={3} component="p" sx={{ color: 'text.secondary', lineHeight: 1.6, flexGrow: 1 }}>
                    {description}
                </EllipsisText>
            )}
            {footer && <Box sx={{ mt: 'auto', pt: 2, minWidth: 0 }}>{footer}</Box>}
        </CardContent>
    </ReusableCard>
);

export const MediaCard = ({
    image,
    imageAlt,
    imageHeight = 180,
    badge,
    title,
    subtitle,
    description,
    titleLines = 1,
    subtitleLines = 1,
    descriptionLines = 3,
    actions,
    onClick,
    sx
}) => (
    <ReusableCard onClick={onClick} sx={{ p: 0, ...sx }}>
        {(image || badge) && (
            <Box sx={{ position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                <CardImage src={image} alt={imageAlt || title} height={imageHeight} />
                {badge && (
                    <Box sx={{ position: 'absolute', top: 12, left: 12, maxWidth: '80%', minWidth: 0 }}>
                        {badge}
                    </Box>
                )}
            </Box>
        )}
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
            {title && (
                <EllipsisText lines={titleLines} component="h3" sx={{ fontWeight: 800, fontSize: '1.05rem', color: '#f8fbff', mb: 0.5 }}>
                    {title}
                </EllipsisText>
            )}
            {subtitle && (
                <EllipsisText lines={subtitleLines} component="p" sx={{ color: '#93c5fd', fontSize: '0.82rem', mb: 0.75 }}>
                    {subtitle}
                </EllipsisText>
            )}
            {description && (
                <EllipsisText lines={descriptionLines} component="p" sx={{ color: 'text.secondary', lineHeight: 1.55, flexGrow: 1 }}>
                    {description}
                </EllipsisText>
            )}
            {actions && (
                <Box sx={{ mt: 'auto', pt: 2, minWidth: 0, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {actions}
                </Box>
            )}
        </CardContent>
    </ReusableCard>
);

export default ReusableCard;
