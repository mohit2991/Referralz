import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, fonts, hp, icons, wp } from '../../utils';
import { commonStyles } from '../../styles/styles';

const CheckItem = ({ condition, value }) => {
  return (
    <View style={styles.itemContainer}>
      <Image
        source={icons.checkRing}
        style={[
          commonStyles.icon16,
          { tintColor: value ? colors.green : colors.grey300 },
        ]}
      />
      <Text style={styles.conditionText}>{condition}</Text>
    </View>
  );
};

export default CheckItem;

const styles = StyleSheet.create({
  conditionText: {
    fontSize: fontSize(12),
    lineHeight: hp(16),
    fontFamily: fonts.regular,
    color: colors.black,
    marginLeft: wp(8),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(4),
  },
});
