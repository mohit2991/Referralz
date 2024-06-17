import { useState } from 'react';
import axiosInstance from '../services/api';

const useApi = (apiFunc) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFunc(...args);
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, request };
};

export const useCreateUser = () => {
  const createUser = async (userData) => {
    return await axiosInstance.post('/user', userData);
  };
  return useApi(createUser);
};
