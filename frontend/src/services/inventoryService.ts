import { Product, Order, OrderItem, DashboardData, TimeFilter } from '../types';
import { MOCK_PRODUCTS, MOCK_ORDERS, MOCK_DASHBOARD_DATA } from './mockData';

// Mock inventory service
// Replace with real API calls when backend is ready

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const inventoryService = {
    // Get all products
    getProducts: async (): Promise<Product[]> => {
        await delay(500);
        return MOCK_PRODUCTS.filter(p => p.isActive);
    },

    // Create a new order
    createOrder: async (items: OrderItem[]): Promise<Order> => {
        await delay(800);

        const newOrder: Order = {
            id: `order_${Date.now()}`,
            items,
            createdBy: 'Current User',
            createdAt: new Date().toISOString(),
            status: 'pending',
        };

        return newOrder;
    },

    // Add a new product
    addProduct: async (product: Omit<Product, 'id' | 'isActive'>): Promise<Product> => {
        await delay(600);

        const newProduct: Product = {
            ...product,
            id: `product_${Date.now()}`,
            isActive: true,
        };

        // In real app, this would be added to database
        MOCK_PRODUCTS.push(newProduct);

        return newProduct;
    },

    // Get dashboard data
    getDashboardData: async (_filter: TimeFilter = 'monthly'): Promise<DashboardData> => {
        await delay(700);

        // In real app, filter would affect the data returned
        // For now, return mock data
        return MOCK_DASHBOARD_DATA;
    },

    // Get all orders (for owner)
    getOrders: async (): Promise<Order[]> => {
        await delay(500);
        return MOCK_ORDERS;
    },

    // Update product
    updateProduct: async (id: string, updates: Partial<Product>): Promise<Product> => {
        await delay(500);

        const productIndex = MOCK_PRODUCTS.findIndex(p => p.id === id);
        if (productIndex === -1) {
            throw new Error('Product not found');
        }

        const updatedProduct = {
            ...MOCK_PRODUCTS[productIndex],
            ...updates,
        };

        MOCK_PRODUCTS[productIndex] = updatedProduct;
        return updatedProduct;
    },

    // Archive product (soft delete)
    archiveProduct: async (id: string): Promise<void> => {
        await delay(500);

        const productIndex = MOCK_PRODUCTS.findIndex(p => p.id === id);
        if (productIndex !== -1) {
            MOCK_PRODUCTS[productIndex].isActive = false;
        }
    },
};
