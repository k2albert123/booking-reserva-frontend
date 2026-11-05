import api from '../utils/api';

export const createReview = async (reviewData) => {
    const response = await api.post('/reviews', reviewData);
    return response.data;
};

export const getBusinessReviews = async (businessId) => {
    const response = await api.get(`/reviews/business/${businessId}`);
    return response.data;
};

export const getServiceReviews = async (serviceId) => {
    const response = await api.get(`/reviews/service/${serviceId}`);
    return response.data;
};

export const getMyReviews = async () => {
    const response = await api.get('/reviews/my-reviews');
    return response.data;
};

export const getAppointmentReview = async (appointmentId) => {
    try {
        const response = await api.get(`/reviews/appointment/${appointmentId}`);
        return response.data;
    } catch {
        return null;
    }
};

export const deleteReview = async (id) => {
    const response = await api.delete(`/reviews/${id}`);
    return response.data;
};
