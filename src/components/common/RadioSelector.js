import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { commonStyles } from '../../styles/styles';
import { colors, fontSize, fonts, hp, icons } from '../../utils';

const RadioSelector = ({ text, value, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={commonStyles.flexRowJustify}
    >
      <Text style={styles.radioText}>{text}</Text>
      <Image
        style={commonStyles.icon24}
        source={value ? icons.activeRadio : icons.inActiveRadio}
      />
    </TouchableOpacity>
  );
};

export default RadioSelector;

const styles = StyleSheet.create({
  radioText: {
    lineHeight: hp(24),
    fontSize: fontSize(16),
    color: colors.xDarkGrey,
    fontFamily: fonts.regular,
  },
});
