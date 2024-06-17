import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keeplogin, setKeeplogin] = useState(true);
  const [passwordtrue, setPasswordtrue] = useState(true);

  useEffect(() => {}, []);
  const handleClickForSignup = () => {
    navigation.navigate('CreateAccount');
  };
  const handleClickForForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };
  const clickKeepMeLogin = () => {
    if (keeplogin) {
      setKeeplogin(false);
    } else {
      setKeeplogin(true);
    }
  };
  const clickChangePasswordIcon = () => {
    if (passwordtrue) {
      setPasswordtrue(false);
    } else {
      setPasswordtrue(true);
    }
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <SafeAreaView></SafeAreaView>
      <View style={{ alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 24,
            color: '#3B4248',
            fontWeight: '700',
            marginTop: 26,
            fontFamily: 'Montserrat-Regular',
          }}
        >
          Welcome to Referralz!
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: '#555B61',
            fontWeight: '400',
            marginTop: 12,
            fontFamily: 'Montserrat-Regular',
          }}
        >
          Refer, track, and earn with ease.
        </Text>
        <View style={styles.inputStyle}>
          <TextInput
            style={styles.input}
            label="Email"
            value={email}
            onChangeText={(email) => setEmail(email)}
            underlineColor="transparent"
            theme={{ colors: { primary: '#ffffff' } }}
          />
        </View>
        <View style={styles.inputStyle}>
          <TextInput
            style={{
              width: Width / 1.22,
              backgroundColor: '#FFFFFF',
              height: 50,
              borderRadius: 9,
              color: '#9B9EA1',
              fontSize: 16,
              fontWeight: '400',
            }}
            label="Password"
            value={password}
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={passwordtrue}
            underlineColor="transparent"
            theme={{ colors: { primary: '#ffffff' } }}
          />
          <TouchableOpacity style={{}} onPress={clickChangePasswordIcon}>
            <Image
              source={
                passwordtrue
                  ? require('../images/password_icon.png')
                  : require('../images/radio_tick.png')
              }
              style={{ height: 24, width: 24, marginRight: 10 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ alignItems: 'center', marginVertical: 25 }}>
        <View style={{ width: Width / 1.1, alignItems: 'center' }}>
          <TouchableOpacity
            style={{ flexDirection: 'row', width: Width / 1.1 }}
            onPress={clickKeepMeLogin}
          >
            <Image
              source={
                keeplogin
                  ? require('../images/checkbox.png')
                  : require('../images/radio_tick.png')
              }
              style={{ height: 24, width: 24 }}
            />
            <Text
              style={{
                fontSize: 16,
                color: '#3B4248',
                fontWeight: '400',
                marginLeft: 15,
                marginTop: 2,
                fontFamily: 'Montserrat-Regular',
              }}
            >
              Keep me signed in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProfileScreen')}
          style={{
            width: Width / 1.1,
            borderRadius: 8,
            height: 52,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#E16032',
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: '#FFFFFF',
              fontWeight: '400',
              fontFamily: 'Montserrat-Regular',
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
        <View
          style={{ alignItems: 'center', width: Width / 1.1, marginTop: 20 }}
        >
          <Text
            style={{
              fontSize: 16,
              color: '#555B61',
              fontWeight: '400',
              alignSelf: 'center',
              fontFamily: 'Montserrat-Regular',
              marginLeft: 12,
            }}
          >
            Don't have an account?
            <TouchableOpacity
              style={{ width: 80, marginLeft: 15, marginTop: -2 }}
              onPress={handleClickForSignup}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: '#3B4248',
                  fontWeight: '400',
                  alignSelf: 'center',
                  fontFamily: 'Montserrat-Regular',
                  textDecorationLine: 'underline',
                }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
        <View
          style={{ alignItems: 'center', width: Width / 1.1, marginTop: 15 }}
        >
          <TouchableOpacity
            style={{ marginLeft: 12, marginTop: -2 }}
            onPress={handleClickForForgotPassword}
          >
            <Text
              style={{
                fontSize: 16,
                color: '#3B4248',
                fontWeight: '400',
                fontFamily: 'Montserrat-Regular',
                alignSelf: 'center',
              }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  inputStyle: {
    width: Width / 1.1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3B4248',
    height: 56,
    marginTop: 18,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
  },
  input: {
    width: Width / 1.11,
    backgroundColor: '#FFFFFF',
    height: 50,
    borderRadius: 9,
    color: '#9B9EA1',
    fontSize: 16,
    fontWeight: '400',
  },
});

export default Login;
