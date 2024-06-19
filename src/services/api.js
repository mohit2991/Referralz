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
      // config.headers.Authorization = `Bearer ${token}`;
      config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJNVm9DM3BHX1FDVm5RLV9ST2VWeVprZC1DVk8wSEcwNzBQS05QWDl1LWNjIn0.eyJleHAiOjE3MTg3NzQzMDQsImlhdCI6MTcxODc3NDAwNCwianRpIjoiZGQxZThmN2ItZWI5Yi00MmY4LTk0YTctNjU1OTRlZjBkMzEwIiwiaXNzIjoiaHR0cDovLzM0LjcyLjEwOC4xODc6ODA4MC9yZWFsbXMvcmVmZXJyYWx6IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjY3MDE3ZTk2LWMzZjItNGEyOS05ZWIyLTJlOWYyNzhmNWU5MCIsInR5cCI6IkJlYXJlciIsImF6cCI6InJlZmVycmFsel9tb2JpbGUiLCJzZXNzaW9uX3N0YXRlIjoiMDI0NTZmYTItNTcxNC00MWQwLTllYTktNjNiNWRhZGU2ZmRlIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1yZWZlcnJhbHoiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiMDI0NTZmYTItNTcxNC00MWQwLTllYTktNjNiNWRhZGU2ZmRlIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoicm9oaXQgYmlzaHQiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJyb2hpdGJpc2h0IiwiZ2l2ZW5fbmFtZSI6InJvaGl0IiwiZmFtaWx5X25hbWUiOiJiaXNodCIsImVtYWlsIjoicm9oaXRiaXNodEBnbWFpbC5jb20ifQ.oXKMokjZcm - HzCN4QNZAtMjprIT7CKMVwKXoerrUWviUNtfDLTOFN347fCFTY5LWTN6s2ACvRikl4DwtCpds_zNhF6jDkmaq671xVgwcxmSsChPuJWD3dSh2k_FhA0AVhg12_wr2nIQFsuIJuOeI9ypQ6S_m - MPyhgNucG1jJyNj2WFRLYgMbTOI4I7DaQTpYQWDCrNjBmQr - kGIg_aT8gl_1tONsJzqr - 8OttdRSoyi3CO6CudJNbSsws6PZpSAPx28WZMJMWK5P71wJQIyghw7n23OC8u6i6zkjYw4sbHqBCI5lORM9NA - Ry0j8LKpZd_nvYQumfg1ZKanmYcN1g`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { api, authApi };
