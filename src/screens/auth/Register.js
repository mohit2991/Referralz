import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { createUser } from '../../services/apiService';
import { commonStyles } from '../../styles/styles';
import {
  Button,
  CheckItem,
  RadioSelector,
  TextInputComp,
} from '../../components';
import { colors, fontSize, fonts, hp, icons, wp } from '../../utils';
import useApiHandler from '../../hooks/useApiHandler';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import messages from '../../constants/messages';
import { isValidEmail, validatePassword } from '../../utils/globalFunctions';

const Register = () => {
  const { navigate } = useNavigation();
  const { handleApiCall } = useApiHandler();
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
  const [loading, setLoading] = useState(false);
  const [checkUpperCase, setCheckUpperCase] = useState(false);
  const [checkLowerCase, setCheckLowerCase] = useState(false);
  const [checkPwdLength, setCheckPwdLength] = useState(false);
  const [checkSpecialChar, setCheckSpecialChar] = useState(false);
  const [checkNumber, setCheckNumber] = useState(false);

  useEffect(() => {
    setCheckUpperCase(/[A-Z]/.test(password));
    setCheckLowerCase(/[a-z]/.test(password));
    setCheckPwdLength(password?.length > 7);
    setCheckSpecialChar(
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password),
    );
    setCheckNumber(/\d/.test(password));
  }, [password]);

  const onSignInPress = () => {
    navigate('Login');
  };

  const onHomeOwnerPress = () => {
    setIsHomeOver(true);
    setIsReferralPartner(false);
    setCompanycode('');
  };

  const onReferralPartnerPress = () => {
    setIsReferralPartner(true);
    setIsHomeOver(false);
  };

  const isReadyToCreate = () => {
    if (
      email !== '' &&
      isValidEmail(email) &&
      firstname !== '' &&
      lastname !== '' &&
      password !== '' &&
      validatePassword(password) &&
      confirmpassword !== '' &&
      password === confirmpassword &&
      (isReferralPartner && haveCompanyCode
        ? companycode !== '' && companycode?.length === 6
        : true)
    ) {
      return false;
    } else {
      return true;
    }
  };

  const onPasswordChange = (text) => {
    setPassword(text);
    setIsPwdErr(!validatePassword(text));
  };

  const onCreateAccountPress = async () => {
    const userPayload = {
      email_id: email,
      first_name: firstname,
      last_name: lastname,
      password: password,
      status: 'CREATED',
      type: isHomeOver ? 'HOME_OWNER' : 'TECHNICIAN',
      unique_code: companycode !== '' && !isHomeOver ? companycode : null,
    };

    const routeData = {
      title: 'Success!',
      description: messages.registerSuccess,
      btnText: 'Sign into Referralz',
      routeName: 'Login',
    };

    setLoading(true);

    // Register API Call
    await handleApiCall(
      () => createUser(userPayload),
      async (response) => {
        if (response) {
          navigate('InboxCheck', routeData);
          resetState();
        }
      },
      null, // Success message
    );

    setLoading(false);
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
      <LoadingSpinner visible={loading} />
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
          additionalContainerStyle={{
            borderColor:
              password === ''
                ? colors.grey
                : isPwdErr
                  ? colors.darkRed
                  : colors.grey,
          }}
        />

        <View style={styles.devider} />
        <Text style={[styles.conditionText, styles.pwdConditionHeader]}>
          {'Your password must contain'}
        </Text>
        <CheckItem value={checkUpperCase} condition={'an uppercase letter'} />
        <CheckItem value={checkLowerCase} condition={'a lowercase letter'} />
        <CheckItem
          value={checkPwdLength}
          condition={'more than 8 characters'}
        />
        <CheckItem value={checkSpecialChar} condition={'a special symbol'} />
        <CheckItem value={checkNumber} condition={'a number'} />

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
            keyboardType={'number-pad'}
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
  devider: {
    height: hp(4),
    marginVertical: hp(6),
    backgroundColor: colors.xLiteGrey,
  },
  pwdConditionHeader: {
    marginLeft: 0,
    marginVertical: hp(4),
  },
  conditionText: {
    fontSize: fontSize(12),
    lineHeight: hp(16),
    fontFamily: fonts.regular,
    color: colors.black,
    marginLeft: wp(8),
  },
});

export default Register;
