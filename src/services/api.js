import axios from 'axios';
import { apiBaseUrlLogin, apiBaseUrl } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authApi = axios.create({
  baseURL: apiBaseUrlLogin,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    accept: '*/*',
  },
});

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    accept: '*/*',
  },
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { api, authApi };
