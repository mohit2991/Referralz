// src/api/apiService.js
import { api, authApi } from './api';

export const loginUser = async (userPayload) => {
  try {
    const response = await authApi.post(
      '/realms/referralz/protocol/openid-connect/token',
      userPayload,
    );
    return response;
  } catch (error) {
    return handleError(error);
  }
};

export const createUser = async (userData) => {
  try {
    const response = await api.post('/user', userData);
    return response;
  } catch (error) {
    return handleError(error);
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await api.put(`/user/forget-password/${email}?validation=false`);
    return response;
  } catch (error) {
    return handleError(error);
  }
};

export const getUserDetails = async () => {
  try {
    const response = await api.get('/user');
    return response;
  } catch (error) {
    return handleError(error);
  }
};

export const updateUserDetails = async (userPayload) => {
  try {
    const response = await api.put('/user', userPayload);
    return response;
  } catch (error) {
    return handleError(error);
  }
};

export const deleteUser = async () => {
  try {
    const response = await api.delete('/user');
    return response;
  } catch (error) {
    return handleError(error);
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post('/user/logout');
    return response;
  } catch (error) {
    return handleError(error);
  }
};

export const profileImageUpdate = async () => {
  try {
    const response = await api.put('/user/img-upload-success');
    return response;
  } catch (error) {
    return handleError(error);
  }
};

export const changePassword = async (userPayload) => {
  try {
    const response = await api.post('/user/change-password', userPayload);
    return response;
  } catch (error) {
    return handleError(error);
  }
};


export const dashboardDetails = async (userPayload) => {
  try {
    const response = await api.post('/dashboard/', userPayload);
    return response;
  } catch (error) {
    return handleError(error);
  }
};

const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('API call failed. Response data:', error.response.data);
    console.error('API call failed. Response status:', error.response.status);
    console.error('API call failed. Response headers:', error.response.headers);

    return error.response;
  } else if (error.request) {
    // The request was made but no response was received
    console.error('API call failed. No response received:', error.request);
    return error.response;
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('API call failed. Error message:', error.message);
    return error;
  }
  throw error;
};
