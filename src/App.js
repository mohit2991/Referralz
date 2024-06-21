import React from 'react';
import { UserProvider } from './contexts/userContext';
import AppNavigator from './navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import { toastConfig } from './components';

const App = () => {
  return (
    <>
      <UserProvider>
        <AppNavigator />
        <Toast config={toastConfig} />
      </UserProvider>
    </>
  )
};

export default App;
