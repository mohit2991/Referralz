/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useRef, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CommonActions } from '@react-navigation/native';

import { commonStyles } from '../styles/styles';
import { CreateLeadBottomSheet } from '../components';
import Dashboard from '../screens/dashboard/Dashboard';
import WalletScreen from '../screens/wallet/WalletScreen';
import LeadsListScreen from '../screens/leads/LeadsListScreen';
import ActivityScreen from '../screens/activity/ActivityScreen';
import { colors, fontSize, fonts, hp, icons, wp } from '../utils';
import {
  setNavigationRef,
  setupTokenExpirationCheck,
} from '../auth/tokenManager';
import { useUser } from '../contexts/userContext';

const Tab = createBottomTabNavigator();

export const CreateLead = () => <View />;

const BottomTabs = ({ navigation }) => {
  const navigationRef = useRef();
  const { isLoggedIn } = useUser();
  const insets = useSafeAreaInsets();
  const [isCreateLeadVisible, setIsCreateLeadVisible] = useState(false);
  const [hasJustLoggedIn, setHasJustLoggedIn] = useState(false);
  const [renderComponent, setRenderComponent] = useState(true);

  useEffect(() => {
    setNavigationRef(navigationRef.current);
    const unsubscribe = setupTokenExpirationCheck();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setHasJustLoggedIn(true);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (hasJustLoggedIn) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        })
      );
      setHasJustLoggedIn(false);
    }
  }, [hasJustLoggedIn, navigation]);

  const getTabIcon = (route, focused) => {
    let iconName;
    switch (route.name) {
      case 'Dashboard':
        iconName = icons.dashboard;
        break;
      case 'Leads':
        iconName = icons.leadsIcon;
        break;
      case 'Activity':
        iconName = icons.activity;
        break;
      case 'Wallet':
        iconName = icons.wallet;
        break;
      default:
        iconName = null;
    }
    return (
      <View style={styles.iconContainer}>
        {iconName && (
          <Image
            source={iconName}
            style={{
              ...commonStyles.icon20,
              tintColor: focused ? colors.primary : colors.grey,
            }}
          />
        )}
      </View>
    );
  };

  const getTabLabel = (route, focused) => {
    let label;
    switch (route.name) {
      case 'Dashboard':
        label = 'Dashboard';
        break;
      case 'Leads':
        label = 'Leads';
        break;
      case 'Activity':
        label = 'Activity';
        break;
      case 'Wallet':
        label = 'Wallet';
        break;
      default:
        label = '';
    }
    return (
      <Text
        style={{
          ...styles.labelText,
          color: focused ? colors.primary : colors.grey,
        }}
      >
        {label}
      </Text>
    );
  };

  return (
    <View style={commonStyles.flex}>
      <Tab.Navigator
        initialRouteName="Dashboard"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => getTabIcon(route, focused),
          tabBarLabel: ({ focused }) => getTabLabel(route, focused),
          tabBarStyle: {
            ...styles.tabBar,
            paddingBottom: insets.bottom,
            height: hp(60) + insets.bottom,
          },
        })}
        ref={navigationRef}
      >
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Leads" component={LeadsListScreen} initialParams={{ renderComponent: true }} />
        <Tab.Screen name="Create Lead" component={CreateLead} />
        <Tab.Screen name="Activity" component={ActivityScreen} />
        <Tab.Screen name="Wallet" component={WalletScreen} />
      </Tab.Navigator>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setIsCreateLeadVisible(true)}
        style={[styles.addIconView, { bottom: insets.bottom + 8 }]}
      >
        <Image
          source={icons.add}
          style={{ ...commonStyles.icon24, tintColor: colors.white }}
        />
      </TouchableOpacity>
      {isCreateLeadVisible && (
        <CreateLeadBottomSheet
          isOpen={isCreateLeadVisible}
          onClose={() => setIsCreateLeadVisible(false)}
        />
      )}
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  tabBar: {
    padding: 0,
    position: 'absolute',
    borderTopWidth: wp(1),
    paddingHorizontal: wp(20),
    backgroundColor: colors.white,
    borderTopColor: colors.xLiteGrey,
  },
  iconContainer: {
    marginTop: hp(4),
    alignItems: 'center',
  },
  addIconView: {
    zIndex: 999,
    bottom: hp(0),
    width: hp(40),
    height: hp(40),
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    borderRadius: hp(40),
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  labelText: {
    lineHeight: hp(16),
    marginBottom: hp(5),
    fontSize: fontSize(12),
    fontFamily: fonts.regular,
  },
});
