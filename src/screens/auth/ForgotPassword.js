import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { commonStyles } from '../../styles/styles';
import { colors, fontSize, fonts, hp } from '../../utils';
import { forgotPassword } from '../../services/apiService';
import useApiHandler from '../../hooks/useApiHandler';
import messages from '../../constants/messages';
import { Button, Header, TextInputComp, ToastAlert } from '../../components';

const ForgotPassword = () => {
  const { navigate } = useNavigation();
  const { handleApiCall } = useApiHandler();

  const [email, setEmail] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (email !== '') {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email]);

  const resetLinkPress = async () => {
    // Forgot Password API Call
    handleApiCall(
      () => forgotPassword(email), // Call API
      async (response) => {
        // Callback respose after success
        const { access_token } = response.data;
        if (access_token) {
          navigate('InboxCheck', { email });
          resetState();
        }
      },
      undefined, // Success message
      undefined, // Error message
    );

    try {
      const response = await forgotPassword(email);
      if (response.status === 200) {
        ToastAlert({
          type: 'success',
          description: response?.data,
        });
        navigate('InboxCheck', { email });
        resetState();
      } else {
        ToastAlert({
          type: 'error',
          description: response?.data,
        });
      }
    } catch (error) {
      ToastAlert({
        type: 'error',
        description: error.message,
      });
    }
  };

  const resetState = () => {
    setEmail('');
  };

  return (
    <View style={commonStyles.flex}>
      <Header isBackButton />
      <ScrollView style={commonStyles.container}>
        <Text style={styles.headerText}>{'Forgot password?'}</Text>
        <Text style={styles.descText}>
          {`Enter the email address associated with your account, and we'll email you a link to reset your password.`}
        </Text>
        <TextInputComp
          value={email}
          maxLength={100}
          labelText={'Email'}
          onChangeText={(text) => setEmail(text)}
          additionalContainerStyle={styles.textInputStyle}
        />
        <Button
          title={'Send reset link'}
          onPress={resetLinkPress}
          disabled={isButtonDisabled}
          customBtnStyle={{
            backgroundColor: isButtonDisabled
              ? colors.mediumGrey
              : colors.darkSaffron,
          }}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  headerText: {
    marginTop: hp(24),
    lineHeight: hp(36),
    fontSize: fontSize(24),
    fontFamily: fonts.bold,
    color: colors.xDarkGrey,
  },
  descText: {
    marginTop: hp(8),
    lineHeight: hp(24),
    color: colors.grey1,
    fontSize: fontSize(16),
    fontFamily: fonts.regular,
  },
  textInputStyle: {
    marginTop: hp(32),
    marginVertical: hp(32),
  },
});

export default ForgotPassword;