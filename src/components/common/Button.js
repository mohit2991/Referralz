import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors, fontSize, fonts, hp, isIos, wp } from '../../utils';

const Button = ({
  title,
  onPress,
  disabled,
  customBtnStyle,
  customTitleStyle,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.btn,
        {
          backgroundColor: disabled ? colors.mediumGrey : colors.primary,
        },
        customBtnStyle,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.titleText,
          {
            color: disabled ? colors.grey : colors.white,
          },
          customTitleStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    borderRadius: wp(8),
    alignItems: 'center',
    paddingVertical: hp(16),
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  titleText: {
    lineHeight: hp(20),
    fontSize: fontSize(16),
    fontFamily: fonts.regular,
  },
});
