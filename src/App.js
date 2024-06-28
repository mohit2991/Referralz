import React from 'react';
import { PortalProvider } from '@gorhom/portal';
import { UserProvider } from './contexts/userContext';
import AppNavigator from './navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import { toastConfig } from './components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <UserProvider>
          <PortalProvider>
            <AppNavigator />
          </PortalProvider>
          <Toast config={toastConfig} />
        </UserProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

export default App;
