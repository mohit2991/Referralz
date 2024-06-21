// src/hooks/useApiHandler.js
import { ConfirmationModal, Header, ToastAlert } from '../components';
import { messages } from '../constants/messages';

const useApiHandler = () => {
  const handleApiCall = async (
    apiCall,
    successMessage,
    errorMessage,
    successCallback,
  ) => {
    try {
      const response = await apiCall(); // API Call
      if (response.status >= 200 && response.status < 300) {
        successCallback(response); // Call callBack function after success
        // Alert after success
        ToastAlert({
          type: 'success',
          title: 'Success',
          description: successMessage,
        });
      } else {
        // Alert after faild/error
        ToastAlert({
          type: 'error',
          title: 'Error',
          description: errorMessage,
        });
      }
    } catch (error) {
      // Alert api faild
      ToastAlert({
        type: 'error',
        title: 'Error',
        description: error.message || errorMessage,
      });
    }
  };

  return { handleApiCall };
};

export default useApiHandler;
