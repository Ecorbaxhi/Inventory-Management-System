// User types
export interface User {
    id: string;
    email: string;
    name: string;
    role: 'chef' | 'owner';
}

// Product types
export interface Product {
    id: string;
    name: string;
    unit: string;
    category: string;
    isActive: boolean;
}

// Order types
export interface OrderItem {
    productId: string;
    productName: string;
    quantity: number;
    unit: string;
}

export interface Order {
    id: string;
    items: OrderItem[];
    createdBy: string;
    createdAt: string;
    totalCost?: number;
    status: 'pending' | 'approved' | 'completed';
}

// Dashboard types
export interface DashboardStats {
    weeklySpend: number;
    topProduct: string;
    yoyComparison: number;
}

export interface SpendingTrend {
    month: string;
    amount: number;
}

export interface TopProduct {
    name: string;
    count: number;
}

export interface CategorySpending {
    category: string;
    amount: number;
}

export interface DashboardData {
    stats: DashboardStats;
    spendingTrends: SpendingTrend[];
    topProducts: TopProduct[];
    categorySpending: CategorySpending[];
}

// Auth types
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
    user: User;
}

// Time filter type
export type TimeFilter = 'weekly' | 'monthly' | 'quarterly';
