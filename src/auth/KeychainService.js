import * as Keychain from 'react-native-keychain';

// Store credentials
export const storeCredentials = async (username, password) => {
  try {
    await Keychain.setGenericPassword(username, password);
  } catch (error) {
    console.error('Error storing credentials', error);
  }
};

// Retrieve credentials
export const loadCredentials = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return credentials;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error retrieving credentials', error);
    return null;
  }
};

// Delete credentials
export const deleteCredentials = async () => {
  try {
    await Keychain.resetGenericPassword();
  } catch (error) {
    console.error('Error deleting credentials', error);
  }
};
