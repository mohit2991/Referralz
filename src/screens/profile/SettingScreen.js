import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Switch } from 'react-native-paper';
import { Header } from '../../components';
import { commonStyles } from '../../styles/styles';
import { colors, fontSize, fonts, hp, wp } from '../../utils';
import { updateUserDetails } from '../../services/apiService';
import { useUser } from '../../contexts/userContext';
import useApiHandler from '../../hooks/useApiHandler';
import messages from '../../constants/messages';
import LoadingSpinner from '../../components/common/LoadingSpinner';

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
  const { handleApiCall } = useApiHandler();
  const { userData, setUserData } = useUser();
  const [isPushNotificationOn, setIsPushNotificationOn] = useState(
    userData?.push_notification_enable,
  );
  const [isEmailNotificationOn, setIsEmailNotificationOn] = useState(
    userData?.email_notification_enable,
  );
  const [loading, setLoading] = useState(false);

  const updateNotificationSettings = async (userPayload) => {
    // Update user deatils API Call
    setLoading(true);

    await handleApiCall(
      () => updateUserDetails(userPayload), // Call API
      async (response) => {
        // Callback respose after success
        if (response) {
          setUserData((prevUserData) => ({
            ...prevUserData,
            ...userPayload,
          }));
        }
      },
      messages.profileSubmitted,
    );

    setLoading(false);
  };

  const pushNotification = () => {
    setIsPushNotificationOn(!isPushNotificationOn);
    updateNotificationSettings({
      push_notification_enable: !isPushNotificationOn,
    });
  };

  const emailNotification = () => {
    setIsEmailNotificationOn(!isEmailNotificationOn);
    updateNotificationSettings({
      email_notification_enable: !isEmailNotificationOn,
    });
  };

  return (
    <View style={commonStyles.flex}>
      <LoadingSpinner visible={loading} />
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
