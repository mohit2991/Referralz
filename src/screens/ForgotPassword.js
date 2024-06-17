import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const ForgotPassword = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setTimeout(() => {}, 3000);
  }, []);
  const handleClickForGoBack = () => {
    navigation.navigate('Login');
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <SafeAreaView></SafeAreaView>
      <View style={{ alignItems: 'center', marginTop: 25 }}>
        <View style={{ width: Width / 1.1 }}>
          <TouchableOpacity
            style={{ justifyContent: 'center', height: 40, width: 40 }}
            onPress={handleClickForGoBack}
          >
            <Image
              source={require('../images/back_arrow.png')}
              style={{ height: 24, width: 24 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <View
          style={{ width: Width, height: 0.6, backgroundColor: '#3B4248' }}
        ></View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <View style={{ width: Width / 1.1, marginTop: 20 }}>
          <Text
            style={{
              fontSize: 24,
              color: '#3B4248',
              fontFamily: 'Montserrat-Regular',
              fontWeight: '700',
              marginTop: 12,
            }}
          >
            Forgot password?
          </Text>
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
        <View style={{ width: Width / 1.1, marginTop: 10 }}>
          <Text
            style={{
              fontSize: 16,
              color: '#555B61',
              fontFamily: 'Montserrat-Regular',
              fontWeight: '400',
              marginTop: 12,
            }}
          >
            Enter the email address associated with your account, and we’ll
            email you a link to reset your password.
          </Text>
        </View>
      </View>
      <View style={{ alignItems: 'center' }}>
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
      </View>

      <View style={{ alignItems: 'center', marginTop: 30 }}>
        <TouchableOpacity
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
              fontFamily: 'Montserrat-Regular',
              color: '#FFFFFF',
              fontWeight: '400',
            }}
          >
            Send reset link
          </Text>
        </TouchableOpacity>
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
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
  },
  input: {
    width: Width / 1.11,
    backgroundColor: '#ffffff',
    height: 46,
  },
});

export default ForgotPassword;
