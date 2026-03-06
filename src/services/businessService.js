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
