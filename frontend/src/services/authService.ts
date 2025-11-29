import { LoginCredentials, AuthResponse, User } from '../types';
import { MOCK_USERS } from './mockData';

// Mock authentication service
// Replace with real API calls when backend is ready

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        // Simulate API delay
        await delay(800);

        // Mock authentication
        const user = MOCK_USERS.find(u => u.email === credentials.email);

        if (!user || credentials.password !== 'password') {
            throw new Error('Invalid email or password');
        }

        // Generate mock JWT token
        const token = `mock_jwt_token_${user.id}_${Date.now()}`;

        return {
            access_token: token,
            token_type: 'Bearer',
            user,
        };
    },

    validateToken: async (token: string): Promise<boolean> => {
        // Simulate API delay
        await delay(300);

        // Mock validation - in real app, this would verify JWT
        return token.startsWith('mock_jwt_token_');
    },

    getCurrentUser: async (): Promise<User> => {
        // Simulate API delay
        await delay(300);

        // Mock - in real app, this would decode JWT or fetch from API
        // For now, return the chef user as default
        return MOCK_USERS[0];
    },
};
