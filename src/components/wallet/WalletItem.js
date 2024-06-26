import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { commonStyles } from '../../styles/styles';
import { colors, fontSize, fonts, hp, icons, wp } from '../../utils';

const WalletItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconView}>
        <Image
          source={item?.isCard ? icons.creditCard : icons.dollarSquare}
          style={{ ...commonStyles.icon24, tintColor: colors.primary }}
        />
      </View>
      <View style={styles.textView}>
        <Text style={styles.titleText}>{`Payout: ${item?.payment_method}`}</Text>
        <View style={commonStyles.flexRow}>
          <Text style={styles.amountText}>{`Check No. ${item?.id}`}</Text>
          <View style={styles.vericalDevider} />
          <Text style={styles.amountText}>{`$${item?.amount}`}</Text>
        </View>
      </View>
    </View>
  );
};

export default WalletItem;

const styles = StyleSheet.create({
  container: {
    padding: wp(16),
    borderRadius: wp(8),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  iconView: {
    padding: wp(8),
    borderRadius: wp(8),
    backgroundColor: colors.litePrimary,
  },
  textView: {
    marginLeft: wp(12),
  },
  vericalDevider: {
    width: wp(1),
    height: hp(12),
    marginHorizontal: wp(8),
    backgroundColor: colors.grey0,
    marginTop: hp(5)
  },
  titleText: {
    lineHeight: hp(22),
    fontSize: fontSize(14),
    fontFamily: fonts.bold,
    color: colors.xDarkGrey,
  },
  amountText: {
    lineHeight: hp(22),
    fontSize: fontSize(14),
    color: colors.darkGrey,
    fontFamily: fonts.regular,
  },
});
