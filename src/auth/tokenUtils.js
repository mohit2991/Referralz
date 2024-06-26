import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useApiHandler from '../hooks/useApiHandler';
import { loginUser } from '../services/apiService';
import { loadCredentials } from '../auth/KeychainService';

const TOKEN_EXPIRY_THRESHOLD = 5 * 60 * 1000; // 5 minutes

// Function to retrieve token from AsyncStorage
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      return token;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

// Function to check if token is expired
export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

export const isTokenExpiringSoon = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp - currentTime < TOKEN_EXPIRY_THRESHOLD;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

// Function to regenerate token
export const regenerateToken = async () => {
  const { handleApiCall } = useApiHandler();

  const credentials = await loadCredentials();
  if (credentials) {
    setEmail(credentials.username);
    setPassword(credentials.password);
    setIsRemember(true);
  }

  // API Call TO Genrate Token
  const payload = {
    client_id: 'referralz_mobile',
    grant_type: 'password',
    username: email,
    password,
  };

  await handleApiCall(
    () => loginUser(payload), // Call API
    async (response) => {
      // Callback respose after success
      const { access_token } = response.data;
      if (access_token) {
        await AsyncStorage.setItem('accessToken', access_token);
        return access_token;
      } else {
        return null;
      }
    },
    null, // Success message
    null, // Error message
  );

  return null;
};
