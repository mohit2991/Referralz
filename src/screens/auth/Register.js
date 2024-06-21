import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { createUser } from '../../services/apiService';
import { commonStyles } from '../../styles/styles';
import { Button, TextInputComp, ToastAlert } from '../../components';
import { colors, fontSize, fonts, hp, icons, wp } from '../../utils';
import useApiHandler from '../../hooks/useApiHandler';

export const RadioSelector = ({ text, value, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={commonStyles.flexRowJustify}
    >
      <Text style={styles.radioText}>{text}</Text>
      <Image
        style={commonStyles.icon24}
        source={value ? icons.activeRadio : icons.inActiveRadio}
      />
    </TouchableOpacity>
  );
};

const Register = () => {
  const { handleApiCall } = useApiHandler();
  const { navigate } = useNavigation();

  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [companycode, setCompanycode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [isPwdSecure, setIsPwdSecure] = useState(true);
  const [isConfirmPwdSecure, setIsConfirmPwdSecure] = useState(true);
  const [isHomeOver, setIsHomeOver] = useState(true);
  const [isReferralPartner, setIsReferralPartner] = useState(false);
  const [haveCompanyCode, setHaveCompanyCode] = useState(true);
  const [isPwdErr, setIsPwdErr] = useState(false);

  const onSignInPress = () => {
    navigate('Login');
  };

  const onHomeOwnerPress = () => {
    setIsHomeOver(true);
    setIsReferralPartner(false);
  };

  const onReferralPartnerPress = () => {
    setIsReferralPartner(true);
    setIsHomeOver(false);
  };

  const isReadyToCreate = () => {
    if (
      email !== '' &&
      firstname !== '' &&
      lastname !== '' &&
      password !== '' &&
      confirmpassword !== '' &&
      password === confirmpassword
    ) {
      return false;
    } else {
      return true;
    }
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const onPwdBlur = () => {
    validatePassword(password) ? setIsPwdErr(false) : setIsPwdErr(true);
  };

  const onPasswordChange = (text) => {
    setPassword(text);
    validatePassword(password) ? setIsPwdErr(false) : setIsPwdErr(true);
  };

  const onCreateAccountPress = async () => {
    const userPayload = {
      email_id: email,
      first_name: firstname,
      last_name: lastname,
      password: password,
      status: 'CREATED',
      type: isHomeOver ? 'HOME_OWNER' : 'TECHNICIAN',
      user_unique_code: companycode !== '' ? companycode : null,
      address: null,
      birth_date: null,
      contact_no: null,
    };

    // Register API Call
    handleApiCall(
      () => createUser(userPayload), // Call API
      async (response) => {
        // Callback respose after success
        if (response) {
          navigate('SuccessfullySignup');
          // reset the state
          resetState();
        }
      },
      null, // Success message
    );
  };

  const resetState = () => {
    setEmail('');
    setFirstname('');
    setLastname('');
    setCompanycode('');
    setPassword('');
    setConfirmpassword('');
    setIsPwdSecure(true);
    setIsConfirmPwdSecure(true);
    setIsHomeOver(true);
    setIsReferralPartner(false);
    setHaveCompanyCode(true);
    setIsPwdErr(false);
  };

  return (
    <View style={styles.root}>
      <SafeAreaView />
      <KeyboardAwareScrollView
        bounces={false}
        style={styles.scrollViewStyle}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.keyboardContentContainer}
      >
        <Text style={styles.welcomeText}>{'Create a Referralz account'}</Text>
        <Text style={styles.motoText}>
          {'Refer, track, and earn with ease.'}
        </Text>
        <TextInputComp
          value={email}
          maxLength={100}
          labelText={'Email'}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInputComp
          value={firstname}
          maxLength={20}
          labelText={'First name'}
          onChangeText={(text) => setFirstname(text)}
        />
        <TextInputComp
          value={lastname}
          maxLength={20}
          labelText={'Last name'}
          onChangeText={(text) => setLastname(text)}
        />
        <TextInputComp
          value={password}
          maxLength={16}
          secureTextEntry={isPwdSecure}
          labelText={'Password'}
          onChangeText={onPasswordChange}
          rightIcon={
            <Image
              source={isPwdSecure ? icons.eye : icons.eyeOff}
              style={[commonStyles.icon24, { tintColor: colors.darkGrey }]}
            />
          }
          onRightPress={() => setIsPwdSecure(!isPwdSecure)}
          onBlur={onPwdBlur}
          additionalContainerStyle={{
            borderColor: isPwdErr ? colors.darkRed : colors.grey,
          }}
        />
        {password !== '' && isPwdErr && (
          <Text
            style={{
              ...styles.errText,
              color: isPwdErr ? colors.darkRed : colors.green,
            }}
          >
            {
              'Password must be at least 8 characters with an uppercase letter, lowercase letter, number, and special character'
            }
          </Text>
        )}
        <TextInputComp
          value={confirmpassword}
          maxLength={16}
          secureTextEntry={isConfirmPwdSecure}
          labelText={'Confirm password'}
          onChangeText={(text) => setConfirmpassword(text)}
          rightIcon={
            <Image
              source={isConfirmPwdSecure ? icons.eye : icons.eyeOff}
              style={[commonStyles.icon24, { tintColor: colors.darkGrey }]}
            />
          }
          onRightPress={() => setIsConfirmPwdSecure(!isConfirmPwdSecure)}
        />
        {password !== confirmpassword && confirmpassword !== '' && (
          <Text style={styles.errText}>
            Password and Confirm Password do not match.
          </Text>
        )}

        <Text style={styles.subTitleText}>{'Describe yourself'}</Text>
        <RadioSelector
          value={isHomeOver}
          text={'Homeowner'}
          onPress={onHomeOwnerPress}
        />
        <View style={styles.separator} />
        <RadioSelector
          value={isReferralPartner}
          text={'Referral partner'}
          onPress={onReferralPartnerPress}
        />

        {isReferralPartner && (
          <>
            <Text style={styles.subTitleText}>
              {'Do you have a company code?'}
            </Text>
            <RadioSelector
              value={haveCompanyCode}
              text={'Yes'}
              onPress={() => setHaveCompanyCode(true)}
            />
            <View style={styles.separator} />
            <RadioSelector
              value={!haveCompanyCode}
              text={'No'}
              onPress={() => setHaveCompanyCode(false)}
            />
          </>
        )}

        {isReferralPartner && haveCompanyCode && (
          <TextInputComp
            value={companycode}
            maxLength={6}
            labelText={'Company code'}
            onChangeText={(text) => setCompanycode(text)}
            additionalContainerStyle={{ borderColor: colors.primary }}
          />
        )}

        <Text style={[styles.motoText, styles.termsPolicyText]}>
          {`By clicking "Agree and continue", You agree to Referralz's `}
          <Text onPress={() => {}} style={styles.underLine}>
            {'Terms of Service'}
          </Text>
          {' and '}
          <Text onPress={() => {}} style={styles.underLine}>
            {'Privacy Policy.'}
          </Text>
        </Text>

        <Button
          title={'Create account'}
          onPress={onCreateAccountPress}
          disabled={isReadyToCreate()}
          customBtnStyle={{
            backgroundColor: isReadyToCreate()
              ? colors.mediumGrey
              : colors.darkSaffron,
          }}
        />
        <Text style={[styles.motoText, styles.alreadyAccText]}>
          {`Already have an account? `}
          <Text
            onPress={onSignInPress}
            style={{ textDecorationLine: 'underline' }}
          >
            {'Sign in'}
          </Text>
        </Text>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  scrollViewStyle: {
    flex: 1,
    paddingTop: hp(8),
    paddingHorizontal: wp(16),
  },
  keyboardContentContainer: {
    paddingBottom: hp(50),
  },
  welcomeText: {
    marginTop: hp(24),
    lineHeight: hp(36),
    textAlign: 'center',
    fontSize: fontSize(24),
    fontFamily: fonts.bold,
    color: colors.xDarkGrey,
  },
  separator: {
    height: hp(12),
  },
  motoText: {
    marginTop: hp(8),
    lineHeight: hp(24),
    textAlign: 'center',
    color: colors.grey1,
    fontSize: fontSize(16),
    fontFamily: fonts.regular,
  },
  subTitleText: {
    marginTop: hp(24),
    lineHeight: hp(28),
    marginBottom: hp(16),
    fontSize: fontSize(18),
    color: colors.xDarkGrey,
    fontFamily: fonts.semiBold,
  },
  radioText: {
    lineHeight: hp(24),
    fontSize: fontSize(16),
    color: colors.xDarkGrey,
    fontFamily: fonts.regular,
  },
  errText: {
    marginTop: hp(4),
    lineHeight: hp(16),
    color: colors.darkRed,
    fontSize: fontSize(12),
    fontFamily: fonts.regular,
  },
  termsPolicyText: {
    marginTop: hp(24),
    textAlign: 'left',
    marginBottom: hp(24),
  },
  underLine: {
    textDecorationLine: 'underline',
  },
  alreadyAccText: {
    marginTop: hp(16),
    textAlign: 'center',
  },
});

export default Register;
