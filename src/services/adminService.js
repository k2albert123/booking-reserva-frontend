import api from '../utils/api';

export const getAdminStats = async () => {
    const response = await api.get('/admin/stats');
    return response.data;
};

export const getAdminUsers = async () => {
    const response = await api.get('/admin/users');
    return response.data;
};

export const createAdminUser = async (userData) => {
    const response = await api.post('/admin/users', userData);
    return response.data;
};

export const updateAdminUser = async (id, userData) => {
    const response = await api.put(`/admin/users/${id}`, userData);
    return response.data;
};

export const toggleUserVerify = async (id) => {
    const response = await api.patch(`/admin/users/${id}/toggle-verify`);
    return response.data;
};

export const approveUser = async (id) => {
    const response = await api.patch(`/admin/users/${id}/approve`);
    return response.data;
};

export const rejectUser = async (id, reason) => {
    const response = await api.patch(`/admin/users/${id}/reject`, { reason });
    return response.data;
};

export const updateUserRole = async (id, role) => {
    const response = await api.patch(`/admin/users/${id}/role`, { role });
    return response.data;
};

export const deleteAdminUser = async (id) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
};

export const getAdminBusinesses = async () => {
    const response = await api.get('/admin/businesses');
    return response.data;
};

export const createAdminBusiness = async (businessData) => {
    const response = await api.post('/admin/businesses', businessData);
    return response.data;
};

export const updateAdminBusiness = async (id, businessData) => {
    const response = await api.put(`/admin/businesses/${id}`, businessData);
    return response.data;
};

export const toggleBusinessActive = async (id) => {
    const response = await api.patch(`/admin/businesses/${id}/toggle-active`);
    return response.data;
};

export const deleteAdminBusiness = async (id) => {
    const response = await api.delete(`/admin/businesses/${id}`);
    return response.data;
};

export const getAdminAppointments = async () => {
    const response = await api.get('/admin/appointments');
    return response.data;
};

export const updateAdminAppointmentStatus = async (id, status) => {
    const response = await api.patch(`/admin/appointments/${id}/status`, { status });
    return response.data;
};

export const deleteAdminAppointment = async (id) => {
    const response = await api.delete(`/admin/appointments/${id}`);
    return response.data;
};
