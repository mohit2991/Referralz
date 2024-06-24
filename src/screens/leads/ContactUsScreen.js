import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Header, ItemCard } from '../../components';
import { commonStyles } from '../../styles/styles';
import { colors, fontSize, fonts, hp, icons, wp } from '../../utils';

const ContactUsScreen = () => {
  const DetailItemView = ({ title, detail, detailTextColor }) => {
    return (
      <View>
        {title && <Text style={styles.itemTitleText}>{title}</Text>}
        <Text style={[styles.itemDetailText, { color: detailTextColor }]}>
          {detail}
        </Text>
      </View>
    );
  };
  return (
    <View style={commonStyles.flex}>
      <Header leftIcon={icons.closeLine} isBackButton title={'Contact us'} />
      <ScrollView
        style={styles.scollViewStyle}
        showsVerticalScrollIndicator={false}
      >
        <ItemCard
          shadowStyle={{ shadowOpacity: 0 }}
          cardContainerStyle={styles.listCardView}
        >
          <Text style={styles.cardTitleTextStyle}>{'Project manager'}</Text>
          <View style={styles.height24} />
          <DetailItemView title={'Full name'} detail={'Kathy Pacheco'} />
          <View style={styles.height16} />
          <DetailItemView
            title={'Phone number'}
            detail={'(917) 339-6416'}
            detailTextColor={colors.blue}
          />
        </ItemCard>
        <ItemCard
          shadowStyle={{ shadowOpacity: 0 }}
          cardContainerStyle={styles.listCardView}
        >
          <Text style={styles.cardTitleTextStyle}>{'Business developer'}</Text>
          <View style={styles.height24} />
          <DetailItemView title={'Full name'} detail={'William Greene'} />
          <View style={styles.height16} />
          <DetailItemView
            title={'Phone number'}
            detail={'(414) 758-0031'}
            detailTextColor={colors.blue}
          />
        </ItemCard>
      </ScrollView>
    </View>
  );
};

export default ContactUsScreen;

const styles = StyleSheet.create({
  scollViewStyle: {
    flex: 1,
    backgroundColor: colors.xLiteGrey,
    paddingHorizontal: wp(16),
    paddingTop: wp(16),
  },
  itemTitleText: {
    fontSize: fontSize(14),
    lineHeight: hp(22),
    fontFamily: fonts.bold,
    color: colors.grey,
  },
  itemDetailText: {
    fontSize: fontSize(16),
    lineHeight: hp(24),
    fontFamily: fonts.regular,
    color: colors.xDarkGrey,
  },
  cardTitleTextStyle: {
    fontSize: fontSize(18),
    lineHeight: hp(28),
    fontFamily: fonts.semiBold,
    color: colors.xDarkGrey,
  },
  listCardView: {
    borderRadius: wp(8),
    marginBottom: hp(12),
  },
  height16: {
    height: hp(16),
  },
  height24: {
    height: hp(24),
  },
});
