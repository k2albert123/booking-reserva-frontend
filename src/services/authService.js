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

export const uploadProofFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data?.url;
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

export const getUserVerificationStatus = () => {
    const user = getCurrentUser();
    if (!user) return null;
    if (user.role === 'ADMIN') return 'APPROVED';
    return user.verificationStatus || 'PENDING';
};

export const isUserApproved = () => {
    const status = getUserVerificationStatus();
    return status === 'APPROVED';
};
