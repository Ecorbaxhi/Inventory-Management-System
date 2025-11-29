import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: SvgIconComponent;
    trend?: number;
    trendLabel?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    icon: Icon,
    trend,
    trendLabel,
}) => {
    const isPositiveTrend = trend !== undefined && trend > 0;
    const isNegativeTrend = trend !== undefined && trend < 0;

    return (
        <Card elevation={2} sx={{ height: '100%' }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" fontWeight={500}>
                        {title}
                    </Typography>
                    <Icon sx={{ color: 'primary.main', fontSize: 32 }} />
                </Box>

                <Typography variant="h4" fontWeight={600} sx={{ mb: 1 }}>
                    {value}
                </Typography>

                {trend !== undefined && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {isPositiveTrend && <TrendingUp sx={{ color: 'success.main', fontSize: 20 }} />}
                        {isNegativeTrend && <TrendingDown sx={{ color: 'error.main', fontSize: 20 }} />}
                        <Typography
                            variant="body2"
                            sx={{
                                color: isPositiveTrend ? 'success.main' : isNegativeTrend ? 'error.main' : 'text.secondary',
                                fontWeight: 500,
                            }}
                        >
                            {isPositiveTrend ? '+' : ''}{trend}% {trendLabel || 'vs last period'}
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};
