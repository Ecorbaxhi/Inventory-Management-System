import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { CategorySpending } from '../../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryChartProps {
    data: CategorySpending[];
}

const COLORS = [
    '#007FFF', // Azure blue
    '#4DA6FF', // Light blue
    '#0059B2', // Dark blue
    '#66B3FF', // Lighter blue
    '#003D7A', // Darker blue
    '#80C1FF', // Very light blue
    '#002952', // Navy
    '#99D0FF', // Pale blue
];

export const CategoryChart: React.FC<CategoryChartProps> = ({ data }) => {
    const chartData = {
        labels: data.map(d => d.category),
        datasets: [
            {
                data: data.map(d => d.amount),
                backgroundColor: COLORS,
                borderColor: '#fff',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right' as const,
                labels: {
                    padding: 15,
                    font: {
                        size: 12,
                    },
                },
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
                    label: (context: any) => {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: $${value.toLocaleString()} (${percentage}%)`;
                    },
                },
            },
        },
    };

    return (
        <Card elevation={2}>
            <CardContent>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                    Spending by Category
                </Typography>
                <div style={{ height: '300px' }}>
                    <Doughnut data={chartData} options={options} />
                </div>
            </CardContent>
        </Card>
    );
};
