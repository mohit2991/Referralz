import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { commonStyles } from '../../styles/styles';
import { loginUser } from '../../services/apiService';
import { Button, TextInputComp } from '../../components';
import { colors, fontSize, fonts, hp, icons, wp } from '../../utils';
import useApiHandler from '../../hooks/useApiHandler';
import messages from '../../constants/messages';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import {
  storeCredentials,
  loadCredentials,
  deleteCredentials,
} from '../../auth/KeychainService';

const Login = () => {
  const { navigate } = useNavigation();
  const { handleApiCall } = useApiHandler();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPwdSecure, setIsPwdSecure] = useState(true);
  const [isRemember, setIsRemember] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleClickForSignup = () => {
    navigate('Register');
  };

  const handleClickForForgotPassword = () => {
    navigate('ForgotPassword');
  };

  useEffect(() => {
    if (email !== '' && password !== '') {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);

  useEffect(() => {
    // Load stored credentials if available
    const loadStoredCredentials = async () => {
      const credentials = await loadCredentials();
      if (credentials) {
        setEmail(credentials.username);
        setPassword(credentials.password);
        setIsRemember(true);
      }
    };
    loadStoredCredentials();
  }, []);

  const handleLogin = async () => {
    const userPayload = {
      client_id: 'referralz_mobile',
      grant_type: 'password',
      username: email,
      password,
    };

    setLoading(true); // Set loading to true before API call

    // Login API Call
    const respose = await handleApiCall(
      () => loginUser(userPayload), // Call API
      async (response) => {
        // Callback respose after success
        const { access_token } = response.data;
        if (access_token) {
          await AsyncStorage.setItem('accessToken', access_token);

          // If login is successful and isRemember is true, store the credentials
          if (isRemember) {
            await storeCredentials(email, password);
          } else {
            await deleteCredentials();
          }

          setLoading(false);

          navigate('Dashboard');
        }
      },
      messages.loginSuccess, // Success message
      messages.loginError, // Error message
    );

    if (respose.error) {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <LoadingSpinner visible={loading} />
      <SafeAreaView />
      <Text style={styles.welcomeText}>{'Welcome to Referralz!'}</Text>
      <Text style={styles.motoText}>{'Refer, track, and earn with ease.'}</Text>
      <ScrollView style={styles.scrollViewStyle} bounces={false}>
        <TextInputComp
          value={email}
          maxLength={100}
          labelText={'Email'}
          onChangeText={(text) => setEmail(text)}
        />
        <View style={{ height: hp(16) }} />
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
        />
        <Pressable
          onPress={() => setIsRemember(!isRemember)}
          style={styles.conditionView}
        >
          <View
            style={[
              styles.checkBox,
              {
                backgroundColor: isRemember ? colors.darkSaffron : colors.white,
                borderColor: isRemember ? colors.darkSaffron : colors.grey,
              },
            ]}
          >
            {isRemember && (
              <Image source={icons.checkMark} style={commonStyles.icon24} />
            )}
          </View>
          <Text style={[styles.motoText, { marginTop: 0 }]}>
            {'Keep me signed in'}
          </Text>
        </Pressable>
        <Button
          title={'Continue'}
          onPress={handleLogin}
          disabled={isButtonDisabled}
          customBtnStyle={{
            backgroundColor: isButtonDisabled
              ? colors.mediumGrey
              : colors.darkSaffron,
          }}
        />
        <Text
          style={[styles.motoText, { textAlign: 'center', marginTop: hp(24) }]}
        >
          {`Don't have an account? `}
          <Text
            onPress={handleClickForSignup}
            style={{ textDecorationLine: 'underline' }}
          >
            {'Sign up'}
          </Text>
        </Text>
        <Text
          onPress={handleClickForForgotPassword}
          style={[styles.motoText, { textAlign: 'center' }]}
        >
          {'Forgot Password?'}
        </Text>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  scrollViewStyle: {
    flex: 1,
    paddingHorizontal: wp(16),
    paddingTop: hp(16),
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
  conditionView: {
    flexDirection: 'row',
    marginVertical: hp(32),
    alignSelf: 'flex-start',
  },
  checkBox: {
    width: wp(24),
    height: wp(24),
    borderWidth: wp(1),
    marginRight: wp(16),
    borderRadius: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;
