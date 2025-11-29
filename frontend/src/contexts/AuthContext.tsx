import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { authService } from '../services/authService';
import {
    saveAuthToken,
    getAuthToken,
    removeAuthToken,
    saveUserData,
    getUserData,
    removeUserData,
} from '../utils/localStorage';
import { toast } from 'react-toastify';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing auth on mount
    useEffect(() => {
        const checkAuth = async () => {
            const token = getAuthToken();
            const savedUser = getUserData();

            if (token && savedUser) {
                try {
                    const isValid = await authService.validateToken(token);
                    if (isValid) {
                        setUser(savedUser);
                    } else {
                        removeAuthToken();
                        removeUserData();
                    }
                } catch (error) {
                    removeAuthToken();
                    removeUserData();
                }
            }

            setIsLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await authService.login({ email, password });

            saveAuthToken(response.access_token);
            saveUserData(response.user);
            setUser(response.user);

            toast.success(`Welcome back, ${response.user.name}!`);
        } catch (error: any) {
            toast.error(error.message || 'Login failed');
            throw error;
        }
    };

    const logout = () => {
        removeAuthToken();
        removeUserData();
        setUser(null);
        toast.info('Logged out successfully');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
