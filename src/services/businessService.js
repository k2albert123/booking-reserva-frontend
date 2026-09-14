import api from '../utils/api';

export const getMyBusinesses = async () => {
    const response = await api.get('/businesses/my-businesses');
    return response.data;
};

export const getAllBusinesses = async () => {
    const response = await api.get('/businesses');
    return response.data;
};

export const getBusinessById = async (id) => {
    const response = await api.get(`/businesses/${id}`);
    return response.data;
};

export const createBusiness = async (businessData) => {
    const response = await api.post('/businesses', businessData);
    return response.data;
};

export const getWorkingHours = async (businessId) => {
    const response = await api.get(`/businesses/${businessId}/working-hours`);
    return response.data;
};

export const setWorkingHours = async (businessId, hours) => {
    const response = await api.put(`/businesses/${businessId}/working-hours`, { hours });
    return response.data;
};
