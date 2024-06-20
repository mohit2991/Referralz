import React from 'react';

import Toast from 'react-native-toast-message';

import { toastConfig } from './components';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return (
    <>
      <AppNavigator />
      <Toast config={toastConfig}/>
    </>
  )
};

export default App;
