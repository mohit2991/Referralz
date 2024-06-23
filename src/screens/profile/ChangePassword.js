import React, { useEffect, useState } from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { commonStyles } from '../../styles/styles';
import {
  BottomButton,
  Header,
  TextInputComp,
  ToastAlert,
} from '../../components';
import { colors, fontSize, fonts, hp, icons, wp } from '../../utils';
import { changePassword } from '../../services/apiService';
import useApiHandler from '../../hooks/useApiHandler';

export const CheckItem = ({ condition, value }) => {
  return (
    <View style={styles.itemContainer}>
      <Image
        source={icons.checkRing}
        style={[
          commonStyles.icon16,
          { tintColor: value ? colors.green : colors.grey300 },
        ]}
      />
      <Text style={styles.conditionText}>{condition}</Text>
    </View>
  );
};

const ChangePassword = () => {
  const { navigate } = useNavigation();
  const { handleApiCall } = useApiHandler();

  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [currentSecure, setCurrentSecure] = useState(true);
  const [newSecure, setNewSecure] = useState(true);
  const [confirmSecure, setConfirmSecure] = useState(true);
  const [checkUpperCase, setCheckUpperCase] = useState(false);
  const [checkLowerCase, setCheckLowerCase] = useState(false);
  const [checkPwdLength, setCheckPwdLength] = useState(false);
  const [checkSpecialChar, setCheckSpecialChar] = useState(false);
  const [checkNumber, setCheckNumber] = useState(false);

  useEffect(() => {
    setCheckUpperCase(/[A-Z]/.test(newPwd));
    setCheckLowerCase(/[a-z]/.test(newPwd));
    setCheckPwdLength(newPwd?.length > 7);
    setCheckSpecialChar(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(newPwd));
    setCheckNumber(/\d/.test(newPwd));
  }, [newPwd]);

  const isEnableTochangePwd = () => {
    if (
      checkUpperCase &&
      checkLowerCase &&
      checkPwdLength &&
      checkSpecialChar &&
      checkNumber &&
      currentPwd !== newPwd &&
      newPwd === confirmPwd &&
      currentPwd !== ''
    ) {
      return false;
    }
    return true;
  };

  const resetState = () => {
    setCurrentPwd('');
    setNewPwd('');
    setConfirmPwd('');
    setCurrentSecure(true);
    setNewSecure(true);
    setConfirmSecure(true);
    setCheckUpperCase(false);
    setCheckLowerCase(false);
    setCheckPwdLength(false);
    setCheckSpecialChar(false);
    setCheckNumber(false);
  };

  const handleChangePassword = async () => {
    const userPayload = {
      current_password: currentPwd,
      new_password: newPwd,
      confirm_password: confirmPwd,
    };

    // Get Dashboard Deatils API Call
    handleApiCall(
      () => changePassword(userPayload), // Call API
      async (response) => {
        // Callback respose after success
        resetState();
        navigate('ProfileScreen');
      },
    );
  };

  return (
    <View style={commonStyles.flex}>
      <Header isBackButton title={'Change password'} />
      <View style={commonStyles.container}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
          <TextInputComp
            value={currentPwd}
            maxLength={16}
            secureTextEntry={currentSecure}
            labelText={'Current password'}
            onChangeText={(text) => setCurrentPwd(text)}
            rightIcon={
              <Image
                source={currentSecure ? icons.eye : icons.eyeOff}
                style={[commonStyles.icon24, { tintColor: colors.darkGrey }]}
              />
            }
            onRightPress={() => setCurrentSecure(!currentSecure)}
          />
          <TextInputComp
            value={newPwd}
            maxLength={16}
            secureTextEntry={newSecure}
            labelText={'Password'}
            onChangeText={(text) => setNewPwd(text)}
            rightIcon={
              <Image
                source={newSecure ? icons.eye : icons.eyeOff}
                style={[commonStyles.icon24, { tintColor: colors.darkGrey }]}
              />
            }
            onRightPress={() => setNewSecure(!newSecure)}
          />
          {currentPwd === newPwd && newPwd !== '' && (
            <Text style={styles.errorText}>
              Current password and new password cannot be the same.
            </Text>
          )}
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
            value={confirmPwd}
            maxLength={16}
            secureTextEntry={confirmSecure}
            labelText={'Confirm password'}
            onChangeText={(text) => setConfirmPwd(text)}
            rightIcon={
              <Image
                source={confirmSecure ? icons.eye : icons.eyeOff}
                style={[commonStyles.icon24, { tintColor: colors.darkGrey }]}
              />
            }
            onRightPress={() => setConfirmSecure(!confirmSecure)}
          />
          {newPwd !== confirmPwd && confirmPwd !== '' && (
            <Text style={styles.errorText}>
              Password and Confirm Password do not match.
            </Text>
          )}
        </ScrollView>
      </View>
      <BottomButton
        disabled={isEnableTochangePwd()}
        title={'Change'}
        onPress={handleChangePassword}
      />
      <SafeAreaView style={styles.safeAreaViewStyle} />
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    backgroundColor: colors.white,
  },
  devider: {
    height: hp(4),
    marginVertical: hp(6),
    backgroundColor: colors.xLiteGrey,
  },
  conditionText: {
    fontSize: fontSize(12),
    lineHeight: hp(16),
    fontFamily: fonts.regular,
    color: colors.black,
    marginLeft: wp(8),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(4),
  },
  pwdConditionHeader: {
    marginLeft: 0,
    marginVertical: hp(4),
  },
  errorText: {
    color: colors.red,
    fontSize: fontSize(12),
    fontFamily: fonts.regular,
    marginTop: hp(2),
    marginLeft: wp(8),
  },
});
