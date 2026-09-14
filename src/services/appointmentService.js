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
    const response = await api.put(`/appointments/${id}/status`, null, {
        params: { status }
    });
    return response.data;
};

export const cancelAppointment = async (id) => {
    const response = await api.delete(`/appointments/${id}`);
    return response.data;
};

export const getAvailableSlots = async (businessId, serviceId, date, staffId = null) => {
    const params = { businessId, serviceId, date };
    if (staffId) params.staffId = staffId;
    const response = await api.get('/appointments/available-slots', { params });
    return response.data;
};
