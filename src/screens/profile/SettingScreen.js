import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Switch } from 'react-native-paper';
import { Header, ToastAlert } from '../../components';
import { commonStyles } from '../../styles/styles';
import { colors, fontSize, fonts, hp, wp } from '../../utils';
import { updateUserDetails } from '../../services/apiService';
import { useUser } from '../../contexts/userContext';

export const SettingItem = ({
  title,
  switchPress,
  description,
  switchValue,
}) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemTitleView}>
        <Text style={styles.itemTitleText}>{title}</Text>
        <Text style={styles.itemDescText}>{description}</Text>
      </View>
      <Switch
        value={switchValue}
        color={colors.primary}
        onValueChange={switchPress}
      />
    </View>
  );
};

const SettingScreen = () => {
  const { userData, setUserData } = useUser();
  const [isPushNotificationOn, setIsPushNotificationOn] = useState(userData?.push_notification_enable);
  const [isEmailNotificationOn, setIsEmailNotificationOn] = useState(userData?.email_notification_enable);

  const updateNotificationSettings = async (userPayload) => {
    try {
      const response = await updateUserDetails(userPayload);
      if (response.status === 200) {
        ToastAlert({
          type: 'success',
          description: "Your Details has been submitted successfully!",
        });
        setUserData((prevUserData) => ({
          ...prevUserData,
          ...userPayload,
        }));
      } else {
        ToastAlert({
          type: 'error',
          description: response.data,
        });
      }
    } catch (error) {
      ToastAlert({
        type: 'error',
        description: error.message,
      });
    }
  };

  const pushNotification = () => {
    setIsPushNotificationOn(!isPushNotificationOn)
    updateNotificationSettings({ push_notification_enable: !isPushNotificationOn })
  }

  const emailNotification = () => {
    setIsEmailNotificationOn(!isEmailNotificationOn)
    updateNotificationSettings({ email_notification_enable: !isEmailNotificationOn })
  }

  return (
    <View style={commonStyles.flex}>
      <Header isBackButton title={'Settings'} />
      <View style={commonStyles.container}>
        <ScrollView style={styles.contentContainer} bounces={false}>
          <Text style={styles.titleText}>{'Notifications'}</Text>
          <SettingItem
            title={'Push notification'}
            switchPress={pushNotification}
            switchValue={isPushNotificationOn}
            description={'Receive push notifications on activities.'}
          />
          <View style={styles.separator} />
          <SettingItem
            title={'Email notifications'}
            switchPress={emailNotification}
            switchValue={isEmailNotificationOn}
            description={'Receive email updates on activities.'}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: hp(16),
  },
  titleText: {
    lineHeight: hp(28),
    marginBottom: hp(16),
    fontSize: fontSize(18),
    color: colors.xDarkGrey,
    fontFamily: fonts.semiBold,
  },
  itemTitleText: {
    lineHeight: hp(24),
    fontSize: fontSize(16),
    color: colors.xDarkGrey,
    fontFamily: fonts.medium,
  },
  itemDescText: {
    lineHeight: hp(22),
    fontSize: fontSize(14),
    color: colors.xDarkGrey,
    fontFamily: fonts.regular,
  },
  itemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: hp(16),
    justifyContent: 'space-between',
  },
  separator: {
    height: hp(1),
    backgroundColor: colors.liteGrey,
  },
  itemTitleView: {
    flex: 1,
    marginRight: wp(12),
  },
});
