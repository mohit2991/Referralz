import axios from 'axios';
import config from '../config';

const api = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    accept: '*/*',
  },
});

export default api;
