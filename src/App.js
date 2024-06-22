import React from 'react';
import { PortalProvider } from '@gorhom/portal';
import { UserProvider } from './contexts/userContext';
import AppNavigator from './navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import { toastConfig } from './components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserProvider>
        <PortalProvider>
          <AppNavigator />
          <Toast config={toastConfig} />
        </PortalProvider>
      </UserProvider>
    </GestureHandlerRootView>
  );
};

export default App;
