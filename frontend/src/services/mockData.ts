import { Product, Order, DashboardData, User } from '../types';

// Mock users
export const MOCK_USERS: User[] = [
    {
        id: '1',
        email: 'chef@restaurant.com',
        name: 'John Chef',
        role: 'chef',
    },
    {
        id: '2',
        email: 'owner@restaurant.com',
        name: 'Jane Owner',
        role: 'owner',
    },
];

// Mock products database (50+ items)
export const MOCK_PRODUCTS: Product[] = [
    // Vegetables
    { id: '1', name: 'Tomatoes', unit: 'kg', category: 'Vegetables', isActive: true },
    { id: '2', name: 'Onions', unit: 'kg', category: 'Vegetables', isActive: true },
    { id: '3', name: 'Potatoes', unit: 'kg', category: 'Vegetables', isActive: true },
    { id: '4', name: 'Carrots', unit: 'kg', category: 'Vegetables', isActive: true },
    { id: '5', name: 'Bell Peppers', unit: 'kg', category: 'Vegetables', isActive: true },
    { id: '6', name: 'Lettuce', unit: 'pieces', category: 'Vegetables', isActive: true },
    { id: '7', name: 'Cucumbers', unit: 'kg', category: 'Vegetables', isActive: true },
    { id: '8', name: 'Zucchini', unit: 'kg', category: 'Vegetables', isActive: true },
    { id: '9', name: 'Eggplant', unit: 'kg', category: 'Vegetables', isActive: true },
    { id: '10', name: 'Mushrooms', unit: 'kg', category: 'Vegetables', isActive: true },

    // Meats
    { id: '11', name: 'Chicken Breast', unit: 'kg', category: 'Meats', isActive: true },
    { id: '12', name: 'Beef Steak', unit: 'kg', category: 'Meats', isActive: true },
    { id: '13', name: 'Pork Chops', unit: 'kg', category: 'Meats', isActive: true },
    { id: '14', name: 'Ground Beef', unit: 'kg', category: 'Meats', isActive: true },
    { id: '15', name: 'Lamb', unit: 'kg', category: 'Meats', isActive: true },
    { id: '16', name: 'Bacon', unit: 'kg', category: 'Meats', isActive: true },
    { id: '17', name: 'Sausages', unit: 'kg', category: 'Meats', isActive: true },

    // Seafood
    { id: '18', name: 'Salmon', unit: 'kg', category: 'Seafood', isActive: true },
    { id: '19', name: 'Tuna', unit: 'kg', category: 'Seafood', isActive: true },
    { id: '20', name: 'Shrimp', unit: 'kg', category: 'Seafood', isActive: true },
    { id: '21', name: 'Cod', unit: 'kg', category: 'Seafood', isActive: true },
    { id: '22', name: 'Mussels', unit: 'kg', category: 'Seafood', isActive: true },
    { id: '23', name: 'Squid', unit: 'kg', category: 'Seafood', isActive: true },

    // Dairy
    { id: '24', name: 'Milk', unit: 'liters', category: 'Dairy', isActive: true },
    { id: '25', name: 'Butter', unit: 'kg', category: 'Dairy', isActive: true },
    { id: '26', name: 'Cheese (Mozzarella)', unit: 'kg', category: 'Dairy', isActive: true },
    { id: '27', name: 'Cheese (Parmesan)', unit: 'kg', category: 'Dairy', isActive: true },
    { id: '28', name: 'Cream', unit: 'liters', category: 'Dairy', isActive: true },
    { id: '29', name: 'Yogurt', unit: 'kg', category: 'Dairy', isActive: true },
    { id: '30', name: 'Eggs', unit: 'pieces', category: 'Dairy', isActive: true },

    // Grains & Pasta
    { id: '31', name: 'Rice', unit: 'kg', category: 'Grains', isActive: true },
    { id: '32', name: 'Pasta (Spaghetti)', unit: 'kg', category: 'Grains', isActive: true },
    { id: '33', name: 'Pasta (Penne)', unit: 'kg', category: 'Grains', isActive: true },
    { id: '34', name: 'Flour', unit: 'kg', category: 'Grains', isActive: true },
    { id: '35', name: 'Bread', unit: 'pieces', category: 'Grains', isActive: true },
    { id: '36', name: 'Breadcrumbs', unit: 'kg', category: 'Grains', isActive: true },

    // Oils & Condiments
    { id: '37', name: 'Olive Oil', unit: 'liters', category: 'Oils', isActive: true },
    { id: '38', name: 'Vegetable Oil', unit: 'liters', category: 'Oils', isActive: true },
    { id: '39', name: 'Salt', unit: 'kg', category: 'Condiments', isActive: true },
    { id: '40', name: 'Black Pepper', unit: 'kg', category: 'Condiments', isActive: true },
    { id: '41', name: 'Garlic', unit: 'kg', category: 'Condiments', isActive: true },
    { id: '42', name: 'Basil', unit: 'bunches', category: 'Herbs', isActive: true },
    { id: '43', name: 'Oregano', unit: 'kg', category: 'Herbs', isActive: true },
    { id: '44', name: 'Parsley', unit: 'bunches', category: 'Herbs', isActive: true },

    // Sauces
    { id: '45', name: 'Tomato Sauce', unit: 'liters', category: 'Sauces', isActive: true },
    { id: '46', name: 'Soy Sauce', unit: 'liters', category: 'Sauces', isActive: true },
    { id: '47', name: 'Mayonnaise', unit: 'kg', category: 'Sauces', isActive: true },
    { id: '48', name: 'Ketchup', unit: 'liters', category: 'Sauces', isActive: true },
    { id: '49', name: 'Mustard', unit: 'kg', category: 'Sauces', isActive: true },

    // Beverages
    { id: '50', name: 'Coffee Beans', unit: 'kg', category: 'Beverages', isActive: true },
    { id: '51', name: 'Tea', unit: 'kg', category: 'Beverages', isActive: true },
    { id: '52', name: 'Orange Juice', unit: 'liters', category: 'Beverages', isActive: true },
    { id: '53', name: 'Sparkling Water', unit: 'liters', category: 'Beverages', isActive: true },
    { id: '54', name: 'Wine (Red)', unit: 'bottles', category: 'Beverages', isActive: true },
    { id: '55', name: 'Wine (White)', unit: 'bottles', category: 'Beverages', isActive: true },
];

// Mock orders
export const MOCK_ORDERS: Order[] = [
    {
        id: '1',
        items: [
            { productId: '1', productName: 'Tomatoes', quantity: 10, unit: 'kg' },
            { productId: '11', productName: 'Chicken Breast', quantity: 15, unit: 'kg' },
            { productId: '24', productName: 'Milk', quantity: 20, unit: 'liters' },
        ],
        createdBy: 'John Chef',
        createdAt: '2024-11-01T10:00:00Z',
        totalCost: 450,
        status: 'completed',
    },
    {
        id: '2',
        items: [
            { productId: '2', productName: 'Onions', quantity: 8, unit: 'kg' },
            { productId: '12', productName: 'Beef Steak', quantity: 12, unit: 'kg' },
            { productId: '31', productName: 'Rice', quantity: 25, unit: 'kg' },
        ],
        createdBy: 'John Chef',
        createdAt: '2024-11-08T10:00:00Z',
        totalCost: 520,
        status: 'completed',
    },
];

// Mock dashboard data
export const MOCK_DASHBOARD_DATA: DashboardData = {
    stats: {
        weeklySpend: 485,
        topProduct: 'Chicken Breast',
        yoyComparison: 12.5,
    },
    spendingTrends: [
        { month: 'Jan', amount: 1850 },
        { month: 'Feb', amount: 1920 },
        { month: 'Mar', amount: 2100 },
        { month: 'Apr', amount: 1980 },
        { month: 'May', amount: 2250 },
        { month: 'Jun', amount: 2180 },
        { month: 'Jul', amount: 2350 },
        { month: 'Aug', amount: 2420 },
        { month: 'Sep', amount: 2280 },
        { month: 'Oct', amount: 2150 },
        { month: 'Nov', amount: 2380 },
        { month: 'Dec', amount: 2500 },
    ],
    topProducts: [
        { name: 'Chicken Breast', count: 45 },
        { name: 'Tomatoes', count: 42 },
        { name: 'Onions', count: 38 },
        { name: 'Olive Oil', count: 35 },
        { name: 'Rice', count: 32 },
        { name: 'Pasta (Spaghetti)', count: 30 },
        { name: 'Milk', count: 28 },
        { name: 'Cheese (Mozzarella)', count: 25 },
        { name: 'Potatoes', count: 24 },
        { name: 'Beef Steak', count: 22 },
    ],
    categorySpending: [
        { category: 'Meats', amount: 8500 },
        { category: 'Vegetables', amount: 4200 },
        { category: 'Seafood', amount: 3800 },
        { category: 'Dairy', amount: 3200 },
        { category: 'Grains', amount: 2100 },
        { category: 'Oils', amount: 1800 },
        { category: 'Beverages', amount: 1500 },
        { category: 'Sauces', amount: 900 },
    ],
};
