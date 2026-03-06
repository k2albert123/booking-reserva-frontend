import api from '../utils/api';

export const getServicesByBusiness = async (businessId) => {
    const response = await api.get(`/services/business/${businessId}`);
    return response.data;
};

export const createService = async (businessId, serviceData) => {
    const response = await api.post(`/services/business/${businessId}`, serviceData);
    return response.data;
};

export const updateService = async (id, serviceData) => {
    const response = await api.put(`/services/${id}`, serviceData);
    return response.data;
};

export const deleteService = async (id) => {
    const response = await api.delete(`/services/${id}`);
    return response.data;
};
