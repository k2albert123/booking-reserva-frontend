import React, { useState, useRef } from 'react';
import { 
    Box, 
    Card, 
    CardContent, 
    Typography, 
    Button, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    IconButton 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useThemeMode } from '../../context/ThemeContext';

const cardShellSx = {
    height: '100%',
    width: '100%',
    minWidth: 0,
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    bgcolor: 'var(--bg-card, rgba(15, 23, 42, 0.72))',
    border: '1px solid var(--border-subtle, rgba(148,163,184,0.14))',
    borderRadius: '20px',
    boxShadow: 'var(--card-shadow, 0 12px 30px rgba(15,23,42,0.18))',
    transition: 'transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, background-color 0.3s ease',
};

const ReusableCard = ({ children, sx, onClick, enableSpotlight = true, spotlightColor, ...props }) => {
    const { isDark } = useThemeMode();
    const cardRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!enableSpotlight || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const glowColor = spotlightColor || (isDark ? 'rgba(59, 130, 246, 0.16)' : 'rgba(37, 99, 235, 0.08)');
    const borderHover = isDark ? 'rgba(96, 165, 250, 0.45)' : 'rgba(37, 99, 235, 0.45)';

    return (
        <Card
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            {...props}
            sx={{
                ...cardShellSx,
                position: 'relative',
                cursor: onClick ? 'pointer' : 'default',
                borderColor: isHovered ? borderHover : 'var(--border-subtle)',
                transform: isHovered ? 'translateY(-4px)' : 'none',
                boxShadow: isHovered ? 'var(--card-shadow-hover)' : 'var(--card-shadow)',
                ...sx
            }}
        >
            {/* ReactBits Dynamic Spotlight Layer */}
            {enableSpotlight && (
                <Box
                    aria-hidden="true"
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        pointerEvents: 'none',
                        zIndex: 0,
                        opacity: isHovered ? 1 : 0,
                        transition: 'opacity 0.25s ease',
                        background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 70%)`,
                    }}
                />
            )}

            {/* Inner Content */}
            <Box sx={{ position: 'relative', zIndex: 1, height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
                {children}
            </Box>
        </Card>
    );
};

export const CardImage = ({ src, alt = '', height = 200, sx, ...props }) => (
    <Box
        sx={{
            height,
            width: '100%',
            flexShrink: 0,
            overflow: 'hidden',
            position: 'relative',
            bgcolor: 'var(--border-subtle, #1e293b)'
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
                    transition: 'transform 0.4s ease',
                    '&:hover': {
                        transform: 'scale(1.04)',
                    },
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

/**
 * TruncatedDescription Component
 * Guarantees identical vertical height across all cards while providing an accessible
 * "Read more" dialog to display overflow text without stretching or misaligning the grid.
 */
export const TruncatedDescription = ({
    text = '',
    lines = 3,
    maxChars = 95,
    title = 'Full Description',
    color = 'text.secondary',
    fixedHeight = '4.5em',
    sx
}) => {
    const { isDark } = useThemeMode();
    const [open, setOpen] = useState(false);
    const content = typeof text === 'string' ? text : '';
    const isLong = content.length > maxChars;

    return (
        <>
            <Box
                sx={{
                    height: fixedHeight,
                    minHeight: fixedHeight,
                    maxHeight: fixedHeight,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    overflow: 'hidden',
                    ...sx
                }}
            >
                <Box
                    title={content}
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: isLong ? lines - 1 : lines,
                        lineHeight: 1.55,
                        fontSize: '0.9rem',
                        color: color,
                        wordBreak: 'break-word',
                        m: 0
                    }}
                >
                    {content}
                </Box>
                {isLong && (
                    <Box sx={{ mt: 'auto', pt: 0.2 }}>
                        <Button
                            variant="text"
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpen(true);
                            }}
                            sx={{
                                p: 0,
                                minWidth: 'auto',
                                fontSize: '0.78rem',
                                fontWeight: 700,
                                color: isDark ? '#60a5fa' : '#2563eb',
                                textTransform: 'none',
                                '&:hover': {
                                    bgcolor: 'transparent',
                                    textDecoration: 'underline',
                                    color: isDark ? '#93c5fd' : '#1d4ed8'
                                }
                            }}
                        >
                            Read more...
                        </Button>
                    </Box>
                )}
            </Box>

            <Dialog
                open={open}
                onClose={(e) => {
                    e.stopPropagation();
                    setOpen(false);
                }}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: '24px',
                        bgcolor: isDark ? 'rgba(15, 23, 42, 0.96)' : '#ffffff',
                        backdropFilter: 'blur(20px)',
                        border: isDark ? '1px solid rgba(148, 163, 184, 0.2)' : '1px solid rgba(226, 232, 240, 0.9)',
                        boxShadow: isDark ? '0 25px 60px rgba(0,0,0,0.7)' : '0 20px 45px rgba(15,23,42,0.15)',
                        p: 1
                    }
                }}
            >
                <DialogTitle sx={{ fontWeight: 800, color: 'text.primary', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {title}
                    <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: 'text.secondary' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: '0.98rem' }}>
                        {content}
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button
                        variant="contained"
                        onClick={() => setOpen(false)}
                        sx={{
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                            fontWeight: 700,
                            textTransform: 'none',
                            px: 3
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

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
        spotlightColor={`${color}22`}
        sx={{
            p: 0,
            height: '100%',
            minHeight: 250,
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
                        width: 54,
                        height: 54,
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
            <Box sx={{ minHeight: '1.6em', maxHeight: '1.6em', overflow: 'hidden', mb: 1 }}>
                <EllipsisText lines={1} component="h3" sx={{ fontWeight: 800, fontSize: '1.12rem', color: 'text.primary' }}>
                    {title}
                </EllipsisText>
            </Box>
            
            {description && (
                <TruncatedDescription
                    text={description}
                    title={title}
                    fixedHeight="4.5em"
                    lines={3}
                    maxChars={85}
                />
            )}

            {footer && <Box sx={{ mt: 'auto', pt: 2, minWidth: 0 }}>{footer}</Box>}
        </CardContent>
    </ReusableCard>
);

export const MediaCard = ({
    image,
    imageAlt,
    imageHeight = 200,
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
    <ReusableCard onClick={onClick} sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column', ...sx }}>
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
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden', p: 3 }}>
            {title && (
                <Box sx={{ minHeight: '1.6em', maxHeight: '1.6em', overflow: 'hidden', mb: 0.5 }}>
                    <EllipsisText lines={titleLines} component="h3" sx={{ fontWeight: 800, fontSize: '1.15rem', color: 'text.primary' }}>
                        {title}
                    </EllipsisText>
                </Box>
            )}
            {subtitle && (
                <Box sx={{ minHeight: '1.4em', maxHeight: '1.4em', overflow: 'hidden', mb: 1 }}>
                    <EllipsisText lines={subtitleLines} component="p" sx={{ color: 'primary.light', fontSize: '0.84rem' }}>
                        {subtitle}
                    </EllipsisText>
                </Box>
            )}
            {description && (
                <TruncatedDescription
                    text={description}
                    title={title || 'Description'}
                    fixedHeight="4.6em"
                    lines={descriptionLines}
                    maxChars={90}
                />
            )}
            {actions && (
                <Box sx={{ mt: 'auto', pt: 2, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {actions}
                </Box>
            )}
        </CardContent>
    </ReusableCard>
);

export default ReusableCard;
