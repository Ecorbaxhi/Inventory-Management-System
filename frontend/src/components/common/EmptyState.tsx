import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

interface EmptyStateProps {
    icon: SvgIconComponent;
    title: string;
    description: string;
    action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    icon: Icon,
    title,
    description,
    action,
}) => {
    return (
        <Paper
            elevation={0}
            sx={{
                p: 6,
                textAlign: 'center',
                backgroundColor: 'background.paper',
                borderRadius: 2,
            }}
        >
            <Icon
                sx={{
                    fontSize: 80,
                    color: 'text.secondary',
                    opacity: 0.5,
                    mb: 2,
                }}
            />
            <Typography variant="h5" gutterBottom color="text.primary">
                {title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {description}
            </Typography>
            {action && <Box>{action}</Box>}
        </Paper>
    );
};
