import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, fontSize, fonts, hp, icons, wp } from '../../utils';
import { commonStyles } from '../../styles/styles';

const CustomToast = ({ text1, text2, type }) => {
  const backgroundColor = type === 'error' ? colors.darkBlack : type === 'success' ? 'green' : 'blue';

  return (
    <View style={[styles.container, { backgroundColor }]}>
        <Image source={icons.checkRing} style={[commonStyles.icon24, {tintColor: colors.darkRed}]}/>
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
    zIndex: 999,
    width: '92%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textView:{
    flex:1,
    marginLeft: wp(8)
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
