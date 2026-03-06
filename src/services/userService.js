import api from '../utils/api';

export const getMyProfile = async () => {
    const response = await api.get('/users/me');
    return response.data;
};

export const updateMyProfile = async (profileData) => {
    const response = await api.put('/users/me', profileData);
    // Update local storage too to keep it in sync
    const currentUser = JSON.parse(localStorage.getItem('user'));
    localStorage.setItem('user', JSON.stringify({ ...currentUser, ...response.data }));
    return response.data;
};
