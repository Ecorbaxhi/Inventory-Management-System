// LocalStorage utility functions

const STORAGE_KEYS = {
    AUTH_TOKEN: 'auth_token',
    USER_DATA: 'user_data',
    DRAFT_ORDER: 'draft_order',
};

// Generic storage functions
export const setItem = <T>(key: string, value: T): void => {
    try {
        const serialized = JSON.stringify(value);
        localStorage.setItem(key, serialized);
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
};

export const getItem = <T>(key: string): T | null => {
    try {
        const serialized = localStorage.getItem(key);
        if (serialized === null) {
            return null;
        }
        return JSON.parse(serialized) as T;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
};

export const removeItem = (key: string): void => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing from localStorage:', error);
    }
};

export const clear = (): void => {
    try {
        localStorage.clear();
    } catch (error) {
        console.error('Error clearing localStorage:', error);
    }
};

// Specific storage functions
export const saveAuthToken = (token: string): void => {
    setItem(STORAGE_KEYS.AUTH_TOKEN, token);
};

export const getAuthToken = (): string | null => {
    return getItem<string>(STORAGE_KEYS.AUTH_TOKEN);
};

export const removeAuthToken = (): void => {
    removeItem(STORAGE_KEYS.AUTH_TOKEN);
};

export const saveUserData = (user: any): void => {
    setItem(STORAGE_KEYS.USER_DATA, user);
};

export const getUserData = (): any | null => {
    return getItem(STORAGE_KEYS.USER_DATA);
};

export const removeUserData = (): void => {
    removeItem(STORAGE_KEYS.USER_DATA);
};

export const saveDraftOrder = (order: any): void => {
    setItem(STORAGE_KEYS.DRAFT_ORDER, order);
};

export const getDraftOrder = (): any | null => {
    return getItem(STORAGE_KEYS.DRAFT_ORDER);
};

export const removeDraftOrder = (): void => {
    removeItem(STORAGE_KEYS.DRAFT_ORDER);
};
