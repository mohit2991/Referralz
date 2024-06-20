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

import { commonStyles } from '../styles/styles';
import { loginUser } from '../services/apiService';
import { Button, TextInputComp, ToastAlert } from '../components';
import { colors, fontSize, fonts, hp, icons, wp } from '../utils';

const Login = () => {
  const {navigate} = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPwdSecure, setIsPwdSecure] = useState(true);
  const [isRemember, setIsRemember] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleClickForSignup = () => {
    navigate('CreateAccount');
  };

  const handleClickForForgotPassword = () => {
    navigate('ForgotPassword');
    // navigate('ProfileScreen');
  };

  useEffect(() => {
    if (email !== '' && password !== '') {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);

  const handleLogin = async () => {
    const userPayload = {
      client_id: 'referralz_mobile',
      grant_type: 'password',
      username: email,
      password,
    };
    console.log({ userPayload })
    try {
      const response = await loginUser(userPayload);
      const { access_token } = response.data;

      if (access_token) {
        // Store the token in AsyncStorage
        await AsyncStorage.setItem('accessToken', access_token);

        // Navigate to another screen
        navigate('Dashboard');
      } else {
        ToastAlert({
          type:'error',
          description: response.error_description
        })
      }
    } catch (error) {
      ToastAlert({
        type:'error',
        description: `Oops! We couldn't log you in via Facebook, Gmail, or Apple. Please check your details and try again.`
      })
    }
  };

  return (
    <View style={{flex:1, backgroundColor: colors.white, alignItems: 'center'}}>
      <SafeAreaView/>
      <Text style={styles.welcomeText}>{'Welcome to Referralz!'}</Text>
      <Text style={styles.motoText}>{'Refer, track, and earn with ease.'}</Text>
      <ScrollView style={styles.scrollViewStyle} bounces={false}>
          <TextInputComp
            value={email}
            labelText={'Email'}
            onChangeText={(text) => setEmail(text)}
          />
          <View style={{height: hp(16)}}/>
          <TextInputComp
            value={password}
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
                  backgroundColor: isRemember
                    ? colors.darkSaffron
                    : colors.white,
                    borderColor: isRemember ? colors.darkSaffron : colors.grey,
                },
              ]}
            >
              {isRemember && (
                <Image source={icons.checkMark} style={commonStyles.icon24} />
              )}
            </View>
            <Text style={[styles.motoText, {marginTop:0}]}>
              {'Keep me signed in'}
            </Text>
          </Pressable>
          <Button title={'Continue'} onPress={handleLogin} disabled={isButtonDisabled} customBtnStyle={{backgroundColor: isButtonDisabled? colors.lightSaffron : colors.darkSaffron}}/>
          <Text style={[styles.motoText, {textAlign:'center', marginTop: hp(24)}]}>{`Don't have an account? `}
            <Text onPress={handleClickForSignup} style={{textDecorationLine:'underline'}}>{'Sign up'}</Text>
          </Text>
          <Text onPress={handleClickForForgotPassword} style={[styles.motoText, {textAlign:'center'}]}>{'Forgot Password?'}</Text>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  scrollViewStyle:{
    flex: 1, 
    paddingHorizontal: wp(16), 
    paddingTop:hp(16)
  },
  welcomeText:{
    marginTop: hp(24),
    lineHeight: hp(36),
    fontSize: fontSize(24),
    fontFamily: fonts.bold,
    color: colors.xDarkGrey,
  },
  motoText:{
    marginTop: hp(8),
    lineHeight: hp(24),
    color: colors.grey1,
    fontSize: fontSize(16),
    fontFamily: fonts.regular,
  },
  conditionView: {
    flexDirection: 'row',
    marginVertical: hp(32),
    alignSelf:'flex-start',
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
