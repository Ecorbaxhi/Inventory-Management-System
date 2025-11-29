import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { TopProduct } from '../../types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface TopProductsChartProps {
    data: TopProduct[];
}

export const TopProductsChart: React.FC<TopProductsChartProps> = ({ data }) => {
    const chartData = {
        labels: data.map(d => d.name),
        datasets: [
            {
                label: 'Purchase Count',
                data: data.map(d => d.count),
                backgroundColor: '#007FFF',
                borderRadius: 6,
                barThickness: 30,
            },
        ],
    };

    const options = {
        indexAxis: 'y' as const,
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
                    label: (context: any) => `Orders: ${context.parsed.x}`,
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                },
            },
            y: {
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
                    Top 10 Products
                </Typography>
                <div style={{ height: '400px' }}>
                    <Bar data={chartData} options={options} />
                </div>
            </CardContent>
        </Card>
    );
};
