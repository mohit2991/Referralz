// src/services/api.js
import axios from 'axios';

// Create an instance of axios with custom configurations
const api = axios.create({
  baseURL: 'http://34.46.87.137:8082', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include authentication headers if needed
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token'); // Replace with your token logic
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

export default api;
