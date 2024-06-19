import React from 'react';
import { UserProvider } from './contexts/userContext';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  return <UserProvider><AppNavigator /></UserProvider>;
};

export default App;
