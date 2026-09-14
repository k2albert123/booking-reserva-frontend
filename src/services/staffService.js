import api from '../utils/api';

export const getStaffByBusiness = async (businessId) => {
    const response = await api.get(`/staff/business/${businessId}`);
    return response.data;
};

export const addStaff = async (businessId, staffData) => {
    const response = await api.post(`/staff/business/${businessId}`, staffData);
    return response.data;
};

export const updateStaff = async (staffId, staffData) => {
    const response = await api.put(`/staff/${staffId}`, staffData);
    return response.data;
};

export const deleteStaff = async (staffId) => {
    const response = await api.delete(`/staff/${staffId}`);
    return response.data;
};
