import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, fontSize, fonts, hp, icons, wp } from '../../utils';
import { commonStyles } from '../../styles/styles';

const CustomToast = ({ text1, text2, type }) => {
  const icon =
    type === 'error'
      ? icons.block
      : type === 'success'
        ? icons.checkRing
        : icons.info;
  const iconColor =
    type === 'error'
      ? colors.darkRed
      : type === 'success'
        ? colors.white
        : colors.grey;

  return (
    <View style={[styles.container, { backgroundColor: type === 'success' ? colors.green : colors.darkBlack }]}>
      <Image
        source={icon}
        style={[commonStyles.icon24, { tintColor: iconColor }]}
      />
      <View style={styles.textView}>
        {text1 && <Text style={styles.text1}>{text1}</Text>}
        {text2 && <Text style={styles.text2}>{text2}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: wp(12),
    borderRadius: wp(8),
    zIndex: 99999,
    width: '92%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.darkBlack,
  },
  textView: {
    flex: 1,
    marginLeft: wp(8),
  },
  text1: {
    fontSize: fontSize(16),
    lineHeight: hp(24),
    fontFamily: fonts.semiBold,
    color: colors.white,
  },
  text2: {
    fontSize: fontSize(14),
    lineHeight: hp(22),
    fontFamily: fonts.regular,
    color: colors.white,
  },
});

export default CustomToast;
