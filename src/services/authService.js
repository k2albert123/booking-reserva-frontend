import api from '../utils/api';

export const register = async (userData) => {
    try {
        // Convert role string to enum format
        const role = userData.role.toUpperCase();
        const registerData = {
            ...userData,
            role: role
        };
        
        const response = await api.post('/auth/register', registerData);
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
};

export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    localStorage.setItem('token', response.data.token);
    return response.data;
};

export const forgotPassword = async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
};

export const getCurrentUser = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    return { token };
};

export const getUserRole = () => {
    const user = getCurrentUser();
    return user?.role || 'CLIENT';
};
