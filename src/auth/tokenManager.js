import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getToken,
  isTokenExpired,
  isTokenExpiringSoon,
  regenerateToken,
} from './tokenUtils';

let navigationRef;

export const setNavigationRef = (ref) => {
  navigationRef = ref;
};

const navigateToLogin = () => {
  if (navigationRef) {
    navigationRef.navigate('Login');
  }
};

export const checkTokenExpiration = async () => {
  try {
    const token = await getToken(); // get token
    if (!token || isTokenExpired(token) || isTokenExpiringSoon(token)) {
      // Token is expired or about to expire, regenerate it
      const newToken = await regenerateToken();

      if (!newToken) {
        navigateToLogin();
        return false;
      }

      // Update token in AsyncStorage
      await AsyncStorage.setItem('accessToken', newToken);
    }
    return true;
  } catch (error) {
    console.error('Error checking/regenerating token:', error);
    navigateToLogin();
    return false;
  }
};

export const setupTokenExpirationCheck = () => {
  if (!navigationRef) {
    console.error('Navigation ref is not set');
    return;
  }

  const unsubscribe = navigationRef.addListener('state', async () => {
    const isValid = await checkTokenExpiration();
    if (!isValid) {
      navigateToLogin();
    }
  });

  return unsubscribe;
};
