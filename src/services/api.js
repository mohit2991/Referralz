import axios from 'axios';
import config from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authApi = axios.create({
  baseURL: config.apiBaseUrlLogin,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    accept: '*/*',
  },
});

const api = axios.create({
  baseURL: config.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    accept: '*/*',
  },
});

// Add a request interceptor to include the token in headers
authApi.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      // config.headers.Authorization = `Bearer ${token}`;
      config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJNVm9DM3BHX1FDVm5RLV9ST2VWeVprZC1DVk8wSEcwNzBQS05QWDl1LWNjIn0.eyJleHAiOjE3MTg3MzQ0MjEsImlhdCI6MTcxODczNDEyMSwianRpIjoiNDUwMmY5MGYtZTIxNy00ZGRjLWFkOTQtYzJmYWE0ZWU5Y2ViIiwiaXNzIjoiaHR0cDovLzM0LjcyLjEwOC4xODc6ODA4MC9yZWFsbXMvcmVmZXJyYWx6IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjllMjAwZWVjLTU1N2YtNDNkNi05ZGFkLTRkMTFjNzRmNTEwMCIsInR5cCI6IkJlYXJlciIsImF6cCI6InJlZmVycmFsel9tb2JpbGUiLCJzZXNzaW9uX3N0YXRlIjoiOTU1MDlkMjctNzllOS00NWQ1LTkxNGItZWVhZWNhOWI2Y2RjIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1yZWZlcnJhbHoiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiOTU1MDlkMjctNzllOS00NWQ1LTkxNGItZWVhZWNhOWI2Y2RjIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoicm9oaXQgYmlzaHQiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJiaXNodCIsImdpdmVuX25hbWUiOiJyb2hpdCIsImZhbWlseV9uYW1lIjoiYmlzaHQiLCJlbWFpbCI6ImJpc2h0QGdtYWlsLmNvbSJ9.QzhUKRWlrAA6KS6B9JH9v4h6nwU1c3LyndjtQtx-kh2JgqHO_QGPi_NJlUvrRBkNhHeK-XsnCkXufUz3HMO_JRogrdZp8-O2mZj65vFO2AJBAIhFHVxBe6_Bq3wehnYmGr9zsnBX22EMiGl2QqrH-CgksL5dJmR_l0QqKCoGTs3xA5ckDxB80uqHuvqQaZaIFGLKEsYVuMYpZBaJHdhfuwi2iJMinxhkBVrUoX9pdnvFYjYc3ZGHnuSNBWTkLQYd7gpmbQbpeQQPHvSbfeem2C8Sro-zBaO4-uw1CMTqpxAIV0aTrqqmpTFgVwk3hiysEu8w9y_TkFpXkjtfvasOPw`;

    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { api, authApi };
