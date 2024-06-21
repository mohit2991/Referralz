import AsyncStorage from '@react-native-async-storage/async-storage';
import { isTokenExpired, regenerateToken } from './tokenUtils'; // Assuming you have tokenUtils with these functions

let navigationRef;

export const setNavigationRef = (ref) => {
  navigationRef = ref;
};

const navigateToLogin = () => {
  navigationRef.navigate('Login');
};

export const checkTokenExpiration = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');

    if (!token || isTokenExpired(token)) {
      // Token is expired or missing, regenerate it
      const newToken = await regenerateToken();

      if (!newToken) {
        navigateToLogin();
        return;
      }

      // Update token in AsyncStorage
      await AsyncStorage.setItem('accessToken', newToken);
    }
  } catch (error) {
    console.error('Error checking/regenerating token:', error);
    navigateToLogin();
  }
};

export const setupTokenExpirationCheck = () => {
  // Optionally, listen to navigation events to check token before each navigation
  const unsubscribe = navigationRef.addListener('beforeRemove', (e) => {
    if (!checkTokenExpiration()) {
      e.preventDefault();
      navigateToLogin();
    }
  });

  return unsubscribe;
};
