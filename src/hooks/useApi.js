import { useState } from 'react';
import api from '../services/api';

const useApi = (baseUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post(baseUrl, data);
      return response.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const read = async (id = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`${baseUrl}/${id}`);
      return response.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`${baseUrl}/${id}`, data);
      return response.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.delete(`${baseUrl}/${id}`);
      return response.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { create, read, update, remove, loading, error };
};

export default useApi;
