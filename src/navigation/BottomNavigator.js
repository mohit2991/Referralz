/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { commonStyles } from '../styles/styles';
import Dashboard from '../screens/dashboard/Dashboard';
import WalletScreen from '../screens/wallet/WalletScreen';
import LeadsListScreen from '../screens/leads/LeadsListScreen';
import ActivityScreen from '../screens/activity/ActivityScreen';
import { colors, fontSize, fonts, hp, icons, wp } from '../utils';
import { CreateLeadBottomSheet } from '../components';

const Tab = createBottomTabNavigator();

export const CreateLead = () => <View />;

const BottomTabs = () => {
  const insets = useSafeAreaInsets();
  const [isCreateLeadVisible, setIsCreateLeadVisible] = useState(false);

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
                    ...commonStyles.icon20,
                    tintColor: focused ? colors.primary : colors.grey,
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
            } else if (route.name === 'Create Lead') {
              label = '';
            } else if (route.name === 'Activity') {
              label = 'Activity';
            } else if (route.name === 'Wallet') {
              label = 'Wallet';
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
          },
          tabBarStyle: {
            ...styles.tabBar,
            paddingBottom: insets.bottom,
            height: hp(60) + insets.bottom,
          },
        })}
      >
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Leads" component={LeadsListScreen} />
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
      <CreateLeadBottomSheet
        isOpen={isCreateLeadVisible}
        onClose={() => setIsCreateLeadVisible(false)}
      />
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
