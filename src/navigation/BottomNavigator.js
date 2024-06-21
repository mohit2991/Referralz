/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, fontSize, fonts, hp, icons, isIos, wp } from '../utils';
import Dashboard from '../screens/dashboard/Dashboard';
import LeadsListScreen from '../screens/leads/LeadsListScreen';
import ActivityScreen from '../screens/activity/ActivityScreen';
import WalletScreen from '../screens/wallet/WalletScreen';
import { commonStyles } from '../styles/styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export const Dummy = () => <View />;

const BottomTabs = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={commonStyles.flex}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            let iconName;
            if (route.name === 'Dashboard') {
              iconName = icons.dashboard;
            } else if (route.name === 'Leads') {
              iconName = icons.leadsIcon;
            } else if (route.name === 'Dummy') {
            } else if (route.name === 'Activity') {
              iconName = icons.activity;
            } else if (route.name === 'Wallet') {
              iconName = icons.wallet;
            }

            return (
              <View style={styles.iconContainer}>
                <Image
                  source={iconName}
                  style={{
                    width: wp(20),
                    height: wp(20),
                    tintColor: focused ? colors.primary : colors.grey,
                    resizeMode: 'contain',
                  }}
                />
              </View>
            );
          },
          tabBarLabel: ({ focused }) => {
            let label;
            if (route.name === 'Dashboard') {
              label = 'Dashboard';
            } else if (route.name === 'Leads') {
              label = 'Leads';
            } else if (route.name === 'Dummy') {
              label = '';
            } else if (route.name === 'Activity') {
              label = 'Activity';
            } else if (route.name === 'Wallet') {
              label = 'Wallet';
            }

            return (
              <Text
                style={{
                  color: focused ? colors.primary : colors.grey,
                  fontSize: fontSize(12),
                  lineHeight: hp(16),
                  fontFamily: fonts.regular,
                  marginBottom: hp(5),
                }}
              >
                {label}
              </Text>
            );
          },
          //   tabBarStyle: styles.tabBar,
          tabBarStyle: { ...styles.tabBar, paddingBottom: insets.bottom },
        })}
      >
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Leads" component={LeadsListScreen} />
        <Tab.Screen name="Dummy" component={Dummy} />
        <Tab.Screen name="Activity" component={ActivityScreen} />
        <Tab.Screen name="Wallet" component={WalletScreen} />
      </Tab.Navigator>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => { }}
        style={[styles.addIconView, { bottom: insets.bottom + 8 }]}
      >
        <Image
          source={icons.add}
          style={{ ...commonStyles.icon16, tintColor: colors.white }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  tabBar: {
    padding: 0,
    borderTopWidth: wp(1),
    paddingHorizontal: wp(20),
    borderTopColor: colors.xLiteGrey,
    height: isIos ? hp(90) : hp(60),
    backgroundColor: colors.white,
    position: 'absolute',
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: hp(4),
  },
  addIconView: {
    borderRadius: hp(40),
    position: 'absolute',
    bottom: hp(0),
    height: hp(40),
    width: hp(40),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 999,
    backgroundColor: colors.primary,
  },
});
