import { ToastAlert } from '../components';

const useApiHandler = () => {
  const handleApiCall = async (
    apiCall,
    successCallback,
    defaultSuccessMessage,
    defaultErrorMessage,
  ) => {
    try {
      const response = await apiCall(); // API Call
      if (response.status >= 200 && response.status < 300) {
        successCallback(response); // Call callBack function after success

        // Alert after success
        if (defaultSuccessMessage === null) {
          return;
        }

        ToastAlert({
          type: 'success',
          description: defaultSuccessMessage || response.data,
        });
      } else {
        // Alert after faild/error
        let error = defaultErrorMessage
          ? defaultErrorMessage
          : determineErrorMessage(null, response);

        ToastAlert({
          type: 'error',
          description: error,
        });
      }
    } catch (err) {
      // Alert api faild
      const errorMessage = determineErrorMessage(err, null);
      ToastAlert({
        type: 'error',
        description: errorMessage,
      });
    }
  };

  const determineErrorMessage = (error, response) => {
    if (error) {
      return error.message;
    }

    if (response) {
      if (response.status === 400) {
        return (
          response.data ||
          response.error ||
          'There was a problem with your request. Please check your input and try again.'
        );
      } else if (response.status === 401) {
        return (
          response?.data?.error_description ||
          'Your session has expired. Please log in again.'
        );
      } else if (response.status === 403) {
        return 'Forbidden, You do not have permission to perform this action.';
      } else if (response.status === 404) {
        return 'The resource you are looking for could not be found.';
      } else if (response.status === 500) {
        return 'Oops! Something went wrong on our end. Please try again later.';
      } else {
        return 'An unexpected error occurred. Please try again.';
      }
    }

    return 'An unknown error occurred. Please check your internet connection and try again.';
  };

  return { handleApiCall };
};

export default useApiHandler;
