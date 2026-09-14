import api from '../utils/api';

export const register = async (userData) => {
    const role = userData.role.toUpperCase();
    const registerData = {
        ...userData,
        role: role
    };

    const response = await api.post('/auth/register', registerData);
    return response.data;
};

export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
};

export const verifyOtp = async (email, code) => {
    const response = await api.post('/auth/verify-otp', { email, code });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
};

export const resendOtp = async (email) => {
    const response = await api.post('/auth/resend-otp', { email });
    return response.data;
};

export const forgotPassword = async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
};

export const resetPassword = async (token, newPassword) => {
    const response = await api.post('/auth/reset-password', { token, newPassword });
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    return JSON.parse(userStr);
};

export const getUserRole = () => {
    const user = getCurrentUser();
    return user?.role || null;
};
