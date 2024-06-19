import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../screens/Splash';
import CreateAccount from '../screens/CreateAccount';
import Login from '../screens/Login';
import ForgotPassword from '../screens/ForgotPassword';
import SuccessfullySignup from '../screens/SuccessfullySignup';
import InboxCheck from '../screens/InboxCheck';
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import EditProfileVerification from '../screens/profile/EditProfileVerification';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AboutAppScreen from '../screens/profile/AboutAppScreen';
import SettingScreen from '../screens/profile/SettingScreen';
import ChangePassword from '../screens/profile/ChangePassword';
import PayBilling from '../screens/profile/PayBilling';
import Dashboard from '../screens/dashboard/Dashboard';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="ProfileScreen"
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="Login" component={Login} />
        {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen
          name="SuccessfullySignup"
          component={SuccessfullySignup}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Dashboard"
          component={Dashboard}
        />
        <Stack.Screen name="InboxCheck" component={InboxCheck} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
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
