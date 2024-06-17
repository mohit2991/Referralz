import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors, fontSize, fonts, hp, isIos, wp } from '../../utils';

const BottomButton = ({ title, onPress, disabled }) => {
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity
        disabled={disabled}
        style={[
          styles.btn,
          {
            backgroundColor: disabled ? colors.mediumGrey : colors.primary,
          },
        ]}
        onPress={onPress}
      >
        <Text
          style={[
            styles.titleText,
            {
              color: disabled ? colors.grey : colors.white,
            },
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomButton;

const styles = StyleSheet.create({
  btnContainer: {
    paddingTop: hp(12),
    borderTopWidth: wp(1),
    paddingHorizontal: wp(16),
    borderColor: colors.xLiteGrey,
    backgroundColor: colors.white,
    paddingBottom: isIos ? 0 : hp(12),
  },
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
