import api from '../utils/api';

export const getMyAppointments = async () => {
    const response = await api.get('/appointments/my-appointments');
    return response.data;
};

export const getBusinessAppointments = async (businessId) => {
    const response = await api.get(`/appointments/business/${businessId}`);
    return response.data;
};

export const createAppointment = async (appointmentData) => {
    const response = await api.post('/appointments', appointmentData);
    return response.data;
};

export const updateAppointmentStatus = async (id, status) => {
    const response = await api.patch(`/appointments/${id}/status`, { status });
    return response.data;
};
