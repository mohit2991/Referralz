import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from '../screens/Splash';
import Register from '../screens/auth/Register';
import Login from '../screens/auth/Login';
import ForgotPassword from '../screens/auth/ForgotPassword';
import InboxCheck from '../screens/auth/InboxCheck';
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import EditProfileVerification from '../screens/profile/EditProfileVerification';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AboutAppScreen from '../screens/profile/AboutAppScreen';
import SettingScreen from '../screens/profile/SettingScreen';
import ChangePassword from '../screens/profile/ChangePassword';
import PayBilling from '../screens/profile/PayBilling';
import BottomTabs from './BottomNavigator';
import LeadDetails from '../screens/leads/LeadDetails';
import ContactUsScreen from '../screens/leads/ContactUsScreen';
import TransactionList from '../screens/wallet/TransactionList';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
  });

  if (isLoggedIn === null) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? 'BottomTabs' : 'Login'}
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="BottomTabs"
          component={BottomTabs}
        />
        <Stack.Screen name="InboxCheck" component={InboxCheck} />
        <Stack.Screen name="LeadDetails" component={LeadDetails} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
        <Stack.Screen name="TransactionList" component={TransactionList} />
        <Stack.Screen
          name="ContactUsScreen"
          component={ContactUsScreen}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name="EditProfileVerification"
          component={EditProfileVerification}
        />
        <Stack.Screen name="AboutAppScreen" component={AboutAppScreen} />
        <Stack.Screen name="SettingScreen" component={SettingScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="PayBilling" component={PayBilling} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
