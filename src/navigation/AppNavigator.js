import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Splash from "../screens/Splash";
import CreateAccount from "../screens/CreateAccount";
import Login from "../screens/Login";
import ForgotPassword from "../screens/ForgotPassword";
import SuccessfullySignup from "../screens/SuccessfullySignup";
import InboxCheck from "../screens/InboxCheck";

const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Splash"
          component={Splash}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="CreateAccount"
          component={CreateAccount}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ForgotPassword"
          component={ForgotPassword}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SuccessfullySignup"
          component={SuccessfullySignup}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="InboxCheck"
          component={InboxCheck}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigator;
