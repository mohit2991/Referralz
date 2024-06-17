/* eslint-disable react-native/no-inline-styles */
// OTPInput.tsx
import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { fontSize, hp, wp } from '../../utils';

// import {  fontSize, hp, wp } from '../../utils';

const OtpInput = ({ onOTPComplete }) => {
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const inputs = useRef([]);

  const focusNext = (index) => {
    if (index < 4) {
      inputs.current[index + 1]?.focus();
    }
  };

  const focusPrevious = (index) => {
    if (index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;

    setOtp(newOtp, () => {
      if (text) {
        focusNext(index + 1);
      }

      if (index === 4 && text) {
        onOTPComplete(newOtp.join(''));
      }
    });
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '') {
      focusPrevious(index);
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <View style={{ flex: 1 }}>
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={{ ...styles.input, marginRight: index < 4 ? wp(8) : 0 }}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            placeholder={'-'}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    height: hp(56),
    textAlign: 'center',
    fontSize: fontSize(14),
  },
});

export default OtpInput;
