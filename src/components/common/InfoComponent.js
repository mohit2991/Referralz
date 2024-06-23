import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { colors, fontSize, fonts, hp, icons, wp } from '../../utils'

const InfoComponent = ({
  icon,
  title,
  onPress,
  btnText,
  btnStyle,
  description,
  btnTextStyle,
}) => {
  return (
    <View style={styles.container}>
      <Image source={icon ? icon : icons.inbox} style={styles.iconStyle} />
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.descText}>{description}</Text>
      {onPress && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.btnStyle, btnStyle]}
          onPress={onPress}
        >
          <Text style={[styles.btnText, btnTextStyle]}>{btnText}</Text>
        </TouchableOpacity>
      )}
      <View style={styles.bottomMargin} />
    </View>
  );
};

export default InfoComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  iconStyle: {
    width: wp(128),
    height: wp(128),
    resizeMode: 'contain',
  },
  titleText: {
    marginTop: hp(32),
    lineHeight: hp(30),
    fontSize: fontSize(20),
    fontFamily: fonts.bold,
    color: colors.xDarkGrey,
  },
  descText: {
    marginTop: hp(16),
    lineHeight: hp(24),
    textAlign: 'center',
    color: colors.grey1,
    fontSize: fontSize(16),
    fontFamily: fonts.regular,
  },
  btnStyle: {
    borderWidth: wp(1),
    borderRadius: wp(8),
    marginVertical: hp(32),
    paddingVertical: hp(16),
    paddingHorizontal: wp(24),
    borderColor: colors.darkSaffron,
  },
  btnText: {
    lineHeight: hp(20),
    fontSize: fontSize(16),
    fontFamily: fonts.regular,
    color: colors.darkSaffron,
  },
  bottomMargin: {
    height: hp(60),
  },
});