import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { SpendingTrend } from '../../types';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

interface SpendingTrendChartProps {
    data: SpendingTrend[];
}

export const SpendingTrendChart: React.FC<SpendingTrendChartProps> = ({ data }) => {
    const chartData = {
        labels: data.map(d => d.month),
        datasets: [
            {
                label: 'Monthly Spending',
                data: data.map(d => d.amount),
                borderColor: '#007FFF',
                backgroundColor: 'rgba(0, 127, 255, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: '#007FFF',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#0D1C36',
                padding: 12,
                titleFont: {
                    size: 14,
                },
                bodyFont: {
                    size: 13,
                },
                callbacks: {
                    label: (context: any) => `Spending: $${context.parsed.y.toLocaleString()}`,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value: any) => `$${value.toLocaleString()}`,
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };

    return (
        <Card elevation={2}>
            <CardContent>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                    Monthly Spending Trends
                </Typography>
                <div style={{ height: '300px' }}>
                    <Line data={chartData} options={options} />
                </div>
            </CardContent>
        </Card>
    );
};
