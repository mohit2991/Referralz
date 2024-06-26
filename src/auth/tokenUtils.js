import AsyncStorage from '@react-native-async-storage/async-storage';

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
  // required decodeToken method
  // const decodedToken = decodeToken(token);
  // if (!decodedToken) {
  //   return true;
  // }

  // // Example: Check if token has expired
  // const expirationTime = decodedToken.exp * 1000; // Convert seconds to milliseconds
  // return Date.now() >= expirationTime;

  return false;
};

// Function to regenerate token
export const regenerateToken = async () => {
  try {
    // API call to refresh token or re-authenticate user
    const newToken = 'new_access_token';

    // Store new token in AsyncStorage
    await AsyncStorage.setItem('accessToken', newToken);

    return newToken;
  } catch (error) {
    console.error('>>>> Error regenerating token:', error);
    return null;
  }
};
