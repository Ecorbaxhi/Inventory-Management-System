import axios from 'axios';
import { toast } from 'react-toastify';
import { getAuthToken, removeAuthToken, removeUserData } from '../utils/localStorage';

// Create axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;

            if (status === 401) {
                // Unauthorized - clear auth and redirect to login
                removeAuthToken();
                removeUserData();
                window.location.href = '/login';
                toast.error('Session expired. Please login again.');
            } else if (status === 403) {
                toast.error('You do not have permission to perform this action.');
            } else if (status === 404) {
                toast.error('Resource not found.');
            } else if (status >= 500) {
                toast.error('Server error. Please try again later.');
            } else {
                toast.error(data?.message || 'An error occurred.');
            }
        } else if (error.request) {
            // Request made but no response
            toast.error('Network error. Please check your connection.');
        } else {
            // Something else happened
            toast.error('An unexpected error occurred.');
        }

        return Promise.reject(error);
    }
);

export default api;
