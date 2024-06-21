import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { createUser } from '../services/apiService';
import { Button, TextInputComp, ToastAlert } from '../components';
import { colors, fontSize, fonts, hp, icons, wp } from '../utils';
import { commonStyles } from '../styles/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const RadioSelector = ({ text, value, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={commonStyles.flexRowJustify}>
      <Text style={styles.radioText}>{text}</Text>
      <Image style={commonStyles.icon24} source={value ? icons.activeRadio : icons.inActiveRadio} />
    </TouchableOpacity>
  )
}

const CreateAccount = () => {
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
    setIsReferralPartner(false)
  }

  const onReferralPartnerPress = () => {
    setIsReferralPartner(true)
    setIsHomeOver(false);
  }

  const isReadyToCreate = () => {
    if (email !== '' &&
      firstname !== '' &&
      lastname !== '' &&
      password !== '' &&
      confirmpassword !== '' && password === confirmpassword) {
      return false
    } else {
      return true
    }
  }

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }

  const onPwdBlur = () => {
    validatePassword(password) ? setIsPwdErr(false) : setIsPwdErr(true)
  }

  const onCreateAccountPress = async () => {
    const userPayload = {
      email_id: email,
      first_name: firstname,
      last_name: lastname,
      password: password,
      status: 'CREATED',
      type: isHomeOver ? 'HOME_OWNER' : "TECHNICIAN",
      user_unique_code: companycode !== '' ? companycode : null,
      address: null,
      birth_date: null,
      contact_no: null,
    };

    try {
      const response = await createUser(userPayload);
      if (response.status == 201) {
        navigate('SuccessfullySignup');
        resetState();
      } else {
        ToastAlert.show({
          type: 'error',
          description: response.status === 400 ? response.data : response.error,
        });
      }
    } catch (error) {
      ToastAlert.show({
        type: 'error',
        description: error.message,
      });
    }
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
      <Text style={styles.welcomeText}>{'Create a Referralz account'}</Text>
      <Text style={styles.motoText}>{'Refer, track, and earn with ease.'}</Text>
      <KeyboardAwareScrollView
        bounces={false}
        style={styles.scrollViewStyle}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={{ paddingBottom: hp(50) }}
      >
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
          onChangeText={(text) => setPassword(text)}
          rightIcon={
            <Image
              source={isPwdSecure ? icons.eye : icons.eyeOff}
              style={[commonStyles.icon24, { tintColor: colors.darkGrey }]}
            />
          }
          onRightPress={() => setIsPwdSecure(!isPwdSecure)}
          onBlur={onPwdBlur}
          additionalContainerStyle={{ borderColor: isPwdErr ? colors.darkRed : colors.grey }}
        />
        {isPwdErr && <Text style={styles.errText}>{'Password must be at least 8 characters with an uppercase letter, lowercase letter, number, and special character'}</Text>}
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
        {password !== confirmpassword && confirmpassword !== "" && (<Text style={styles.errText}>Password and Confirm Password do not match.</Text>)}

        <Text style={styles.subTitleText}>{'Describe yourself'}</Text>
        <RadioSelector value={isHomeOver} text={'Homeowner'} onPress={onHomeOwnerPress} />
        <View style={{ height: hp(12) }} />
        <RadioSelector value={isReferralPartner} text={'Referral partner'} onPress={onReferralPartnerPress} />

        {isReferralPartner &&
          <>
            <Text style={styles.subTitleText}>{'Do you have a company code?'}</Text>
            <RadioSelector value={haveCompanyCode} text={'Yes'} onPress={() => setHaveCompanyCode(true)} />
            <View style={{ height: hp(12) }} />
            <RadioSelector value={!haveCompanyCode} text={'No'} onPress={() => setHaveCompanyCode(false)} />
          </>}

        {isReferralPartner && haveCompanyCode &&
          <TextInputComp
            value={companycode}
            maxLength={6}
            labelText={'Company code'}
            onChangeText={(text) => setCompanycode(text)}
            additionalContainerStyle={{ borderColor: colors.primary }}
          />
        }

        <Text style={[styles.motoText, { marginTop: hp(24), marginBottom: hp(24) }]}>{`By clicking "Agree and continue", You agree to Referralz's `}
          <Text onPress={() => { }} style={{ textDecorationLine: 'underline' }}>{'Terms of Service'}</Text>{' and '}
          <Text onPress={() => { }} style={{ textDecorationLine: 'underline' }}>{'Privacy Policy.'}</Text>
        </Text>

        <Button title={'Create account'} onPress={onCreateAccountPress} disabled={isReadyToCreate()} customBtnStyle={{ backgroundColor: isReadyToCreate() ? colors.lightSaffron : colors.darkSaffron }} />
        <Text style={[styles.motoText, { textAlign: 'center', marginTop: hp(16) }]}>{`Already have an account? `}
          <Text onPress={onSignInPress} style={{ textDecorationLine: 'underline' }}>{'Sign in'}</Text>
        </Text>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center'
  },
  scrollViewStyle: {
    flex: 1,
    paddingHorizontal: wp(16),
    paddingTop: hp(8)
  },
  welcomeText: {
    marginTop: hp(24),
    lineHeight: hp(36),
    fontSize: fontSize(24),
    fontFamily: fonts.bold,
    color: colors.xDarkGrey,
  },
  motoText: {
    marginTop: hp(8),
    lineHeight: hp(24),
    color: colors.grey1,
    fontSize: fontSize(16),
    fontFamily: fonts.regular,
  },
  subTitleText: {
    fontSize: fontSize(18),
    lineHeight: hp(28),
    fontFamily: fonts.semiBold,
    color: colors.xDarkGrey,
    marginTop: hp(24),
    marginBottom: hp(16)
  },
  radioText: {
    fontSize: fontSize(16),
    lineHeight: hp(24),
    fontFamily: fonts.regular,
    color: colors.xDarkGrey,
  },
  errText: {
    fontSize: fontSize(12),
    lineHeight: hp(16),
    fontFamily: fonts.regular,
    color: colors.darkRed,
    marginTop: hp(4)
  }
});

export default CreateAccount;
