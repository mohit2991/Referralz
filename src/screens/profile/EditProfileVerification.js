import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { commonStyles } from '../../styles/styles';
import { colors, fontSize, fonts, hp, wp } from '../../utils';
import { Button, Header } from '../../components';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {
  updateUserDetails,
  contactVerificationOtp,
} from '../../services/apiService';
import { useUser } from '../../contexts/userContext';
import useApiHandler from '../../hooks/useApiHandler';
import messages from '../../constants/messages';

const EditProfileVerification = () => {
  const { navigate } = useNavigation();
  const { handleApiCall } = useApiHandler();
  const otpInputRef = useRef(null);
  const { params } = useRoute();
  const { userPayload } = params;
  const { setUserData } = useUser();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOtpChange = (code) => {
    setCode(code);
  };

  const handleOtpComplete = async (otp) => {
    console.log(`OTP is ${otp}`);
  };

  const updateProfile = async () => {
    setLoading(true);

    // API Call
    await handleApiCall(
      () => contactVerificationOtp(code), // Call API
      async (response) => {
        // Callback respose after success
        if (response) {
          await handleApiCall(
            () => updateUserDetails(userPayload), // Call API
            async (results) => {
              // Callback respose after success
              if (results) {
                setUserData((prevUserData) => ({
                  ...prevUserData,
                  ...userPayload,
                }));
                // navigate('EditProfileScreen', { fromVerification: true });
                navigate('ProfileScreen')
              }
            },
            messages.profileSubmitted,
          );
        }
      },
      messages.profileSubmitted,
    );

    setLoading(false);
  };

  useEffect(() => {
    if (otpInputRef.current) {
      setTimeout(() => {
        otpInputRef.current.focusField(0);
      }, 500);
    }
  }, []);

  return (
    <View style={commonStyles.flex}>
      <Header isBackButton />
      <View style={styles.container}>
        <Text style={styles.titleText}>{'Enter code'}</Text>
        <Text style={styles.descText}>
          {`We sent a verification code to your phone number +91 ${userPayload?.contact_no}`}
        </Text>
        <View style={styles.otpInputView}>
          <OTPInputView
            ref={otpInputRef}
            style={styles.otpInput}
            pinCount={5}
            code={code}
            autoFocusOnLoad={false}
            onCodeChanged={handleOtpChange}
            codeInputFieldStyle={styles.underlineStyleBase}
            onCodeFilled={handleOtpComplete}
            keyboardType="number-pad"
            placeholderCharacter="—"
            placeholderTextColor={colors.grey}
            selectionColor={colors.transparent}
          />
        </View>
        <Button
          title={'Verify'}
          customBtnStyle={{ marginTop: hp(32) }}
          disabled={code.length < 5}
          onPress={updateProfile}
        />
      </View>
    </View>
  );
};

export default EditProfileVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(16),
    backgroundColor: colors.white,
  },
  titleText: {
    fontSize: fontSize(24),
    lineHeight: hp(36),
    fontFamily: fonts.bold,
    color: colors.darkBlack,
    marginTop: hp(24),
  },
  descText: {
    fontSize: fontSize(16),
    lineHeight: hp(24),
    fontFamily: fonts.regular,
    color: colors.darkBlack,
    marginTop: hp(8),
  },
  otpInputView: {
    borderRadius: wp(8),
    borderWidth: wp(1),
    borderColor: colors.grey,
    marginTop: hp(32),
  },
  otpInput: {
    width: '92%',
    height: hp(54),
    alignSelf: 'center',
    color: colors.black,
  },
  underlineStyleBase: {
    width: wp(53),
    height: hp(56),
    borderColor: colors.transparent,
    fontSize: fontSize(16),
    color: colors.darkBlack,
    fontFamily: fonts.regular,
  },
});
