import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Switch } from 'react-native-paper';
import { Header } from '../../components';
import { commonStyles } from '../../styles/styles';
import { colors, fontSize, fonts, hp, wp } from '../../utils';
import { updateUserDetails } from '../../services/apiService';

const initialState = {
  "id": 29,
  "first_name": "rohit",
  "last_name": "bisht",
  "email_id": "rohitbisht@gmail.com",
  "contact_no": null,
  "contact_verification_status": null,
  "push_notification_enable": true,
  "email_notification_enable": false,
  "company_unique_code": null,
  "user_unique_code": "X8OP9C",
  "birth_date": null,
  "type": "HOME_OWNER",
  "status": "CREATED",
  "download_profile_img_url": null,
  "upload_profile_img_url": "https://storage.googleapis.com/referralz-public/referralz/user_29/profile_img?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=cs-cf-cst-service-account%40homespark-409114.iam.gserviceaccount.com%2F20240619%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240619T051343Z&X-Goog-Expires=604800&X-Goog-SignedHeaders=host&X-Goog-Signature=85139a7fb5fa0e1fddc3e17d6d6ee4613b9052f7912e4463f692e3ef1d5126b04dcfda0bb587569293a97476539d6de75dfc976880665fd139a24c0a6f68c5744916fffc9ce4f217fae4a67d5343f923f82120098d23f31b2c5a4734fe712eed841378c0d6d43d8e8ab7d7eb623c7c406cb9e664ab6e1df7cb38dcb5624e3f28dbd06a15cedf0fdf29b922061e09b33a5ac13231331ba691987472851bc907c0d902c1ef150e07221626a626a678f6972cd776c40bdeeb2ef62304125b28d55d8363d8b612f1f42fa1b5a0f87b87b47df9ba8a10bc413d3c55b2010c1672506061b768c49df495059f888cbbab4426083ee11b933ee35c995c9e2703911bcb85",
  "img_upload_status": false,
  "created_on": "2024-06-19T05:13:11.456653",
  "updated_on": "2024-06-19T05:13:11.508125",
  "address": {
    "address": "checking",
    "name": "aaa",
    "city": "New York",
    "postalCode": 123456,
    "state": "Nevada",
    "country": "US"
  },
  "company": null
}

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
  const [userData, setUserData] = useState(initialState);
  const [isPushNotificationOn, setIsPushNotificationOn] = useState(userData?.push_notification_enable);
  const [isEmailNotificationOn, setIsEmailNotificationOn] = useState(userData?.email_notification_enable);

  const updateNotificationSettings = async (userPayload) => {
    try {
      const response = await updateUserDetails(userPayload);
      if (response.status === 200) {
        console.log("update notification settings", response)
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    updateNotificationSettings({ push_notification_enable: isPushNotificationOn, email_notification_enable: isEmailNotificationOn, });
  }, [isPushNotificationOn, isEmailNotificationOn]);

  return (
    <View style={commonStyles.flex}>
      <Header isBackButton title={'Settings'} />
      <View style={commonStyles.container}>
        <ScrollView style={styles.contentContainer} bounces={false}>
          <Text style={styles.titleText}>{'Notifications'}</Text>
          <SettingItem
            title={'Push notification'}
            switchPress={() => setIsPushNotificationOn(!isPushNotificationOn)}
            switchValue={isPushNotificationOn}
            description={'Receive push notifications on activities.'}
          />
          <View style={styles.separator} />
          <SettingItem
            title={'Email notifications'}
            switchPress={() => setIsEmailNotificationOn(!isEmailNotificationOn)}
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
