import React from 'react';
import { Skeleton, Box, Card, CardContent, Grid } from '@mui/material';

interface LoadingSkeletonProps {
    variant?: 'table' | 'card' | 'chart';
    count?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
    variant = 'card',
    count = 3,
}) => {
    if (variant === 'table') {
        return (
            <Box>
                {Array.from({ length: count }).map((_, index) => (
                    <Box key={index} sx={{ mb: 1 }}>
                        <Skeleton variant="rectangular" height={60} />
                    </Box>
                ))}
            </Box>
        );
    }

    if (variant === 'chart') {
        return (
            <Card>
                <CardContent>
                    <Skeleton variant="text" width="40%" height={40} sx={{ mb: 2 }} />
                    <Skeleton variant="rectangular" height={300} />
                </CardContent>
            </Card>
        );
    }

    // Default: card variant
    return (
        <Grid container spacing={3}>
            {Array.from({ length: count }).map((_, index) => (
                // @ts-ignore - MUI v5 Grid item prop TypeScript issue
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                        <CardContent>
                            <Skeleton variant="text" width="60%" height={30} />
                            <Skeleton variant="text" width="40%" />
                            <Skeleton variant="rectangular" height={100} sx={{ mt: 2 }} />
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};
