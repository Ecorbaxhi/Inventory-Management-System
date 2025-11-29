import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Box,
    ToggleButtonGroup,
    ToggleButton,
    Typography,
    Tab,
    Tabs,
} from '@mui/material';
import {
    AttachMoney,
    ShoppingCart,
    TrendingUp,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { DashboardData, TimeFilter } from '../types';
import { inventoryService } from '../services/inventoryService';
import { StatCard } from '../components/dashboard/StatCard';
import { SpendingTrendChart } from '../components/dashboard/SpendingTrendChart';
import { TopProductsChart } from '../components/dashboard/TopProductsChart';
import { CategoryChart } from '../components/dashboard/CategoryChart';
import { ProductManagement } from '../components/admin/ProductManagement';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';

export const DashboardPage: React.FC = () => {
    const [timeFilter, setTimeFilter] = useState<TimeFilter>('monthly');
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        loadDashboardData();
    }, [timeFilter]);

    const loadDashboardData = async () => {
        setLoading(true);
        try {
            const data = await inventoryService.getDashboardData(timeFilter);
            setDashboardData(data);
        } catch (error) {
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    if (loading || !dashboardData) {
        return (
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <LoadingSkeleton variant="card" count={6} />
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Typography variant="h4" fontWeight={600}>
                    Analytics Dashboard
                </Typography>

                <ToggleButtonGroup
                    value={timeFilter}
                    exclusive
                    onChange={(_, value) => value && setTimeFilter(value)}
                    size="small"
                >
                    <ToggleButton value="weekly">Weekly</ToggleButton>
                    <ToggleButton value="monthly">Monthly</ToggleButton>
                    <ToggleButton value="quarterly">Quarterly</ToggleButton>
                </ToggleButtonGroup>
            </Box>

            <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)} sx={{ mb: 3 }}>
                <Tab label="Analytics" />
                <Tab label="Manage Products" />
            </Tabs>

            {activeTab === 0 && (
                <>
                    {/* Stats Cards */}
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        {/* @ts-ignore - MUI v5 Grid item prop TypeScript issue */}
                        <Grid item xs={12} sm={6} md={4}>
                            <StatCard
                                title="Average Weekly Spend"
                                value={`$${dashboardData.stats.weeklySpend}`}
                                icon={AttachMoney}
                                trend={dashboardData.stats.yoyComparison}
                                trendLabel="YoY"
                            />
                        </Grid>
                        {/* @ts-ignore - MUI v5 Grid item prop TypeScript issue */}
                        <Grid item xs={12} sm={6} md={4}>
                            <StatCard
                                title="Most Ordered Product"
                                value={dashboardData.stats.topProduct}
                                icon={ShoppingCart}
                            />
                        </Grid>
                        {/* @ts-ignore - MUI v5 Grid item prop TypeScript issue */}
                        <Grid item xs={12} sm={6} md={4}>
                            <StatCard
                                title="Year-over-Year Growth"
                                value={`${dashboardData.stats.yoyComparison > 0 ? '+' : ''}${dashboardData.stats.yoyComparison}%`}
                                icon={TrendingUp}
                                trend={dashboardData.stats.yoyComparison}
                            />
                        </Grid>
                    </Grid>

                    {/* Charts */}
                    <Grid container spacing={3}>
                        {/* @ts-ignore - MUI v5 Grid item prop TypeScript issue */}
                        <Grid item xs={12}>
                            <SpendingTrendChart data={dashboardData.spendingTrends} />
                        </Grid>

                        {/* @ts-ignore - MUI v5 Grid item prop TypeScript issue */}
                        <Grid item xs={12} md={6}>
                            <TopProductsChart data={dashboardData.topProducts} />
                        </Grid>

                        {/* @ts-ignore - MUI v5 Grid item prop TypeScript issue */}
                        <Grid item xs={12} md={6}>
                            <CategoryChart data={dashboardData.categorySpending} />
                        </Grid>
                    </Grid>
                </>
            )}

            {activeTab === 1 && <ProductManagement />}
        </Container>
    );
};
