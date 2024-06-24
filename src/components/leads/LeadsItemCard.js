import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import moment from 'moment';

import ItemCard from '../common/ItemCard';
import { commonStyles } from '../../styles/styles';
import { colors, fontSize, fonts, hp, icons, wp } from '../../utils';
import { getTagColor } from '../../utils/globalFunctions';

const LeadsItemCard = ({ item, onItemPress }) => {
  const filledStars = Math.floor(item?.rating);
  const halfStar = item?.rating % 1 !== 0;
  const unfilledStars = 5 - Math.ceil(item?.rating);

  return (
    <ItemCard
      onItemPress={onItemPress}
      shadowStyle={{ shadowOpacity: 0 }}
      cardContainerStyle={styles.listCardView}
    >
      <View style={commonStyles.flexRowJustify}>
        <Text style={styles.referalCardName}>
          {item?.customer?.first_name} {item?.customer?.last_name}
        </Text>
        <View
          style={[
            styles.tagView,
            {
              backgroundColor: getTagColor(item?.internal_status)?.light,
            },
          ]}
        >
          <Text
            style={[
              styles.tagText,
              {
                color: getTagColor(item?.internal_status)?.dark,
              },
            ]}
          >
            {item?.internal_status}
          </Text>
        </View>
      </View>
      <View style={[commonStyles.flexRowCenter, { marginBottom: hp(16) }]}>
        <Text style={[styles.cardTitleText, { marginRight: wp(2) }]}>
          {item?.rating}
        </Text>
        {[...Array(filledStars)].map((_, index) => (
          <Image
            key={`filled-${index}`}
            source={icons.starFill}
            style={commonStyles.icon16}
          />
        ))}
        {halfStar && <Image source={icons.star} style={commonStyles.icon16} />}
        {[...Array(unfilledStars)].map((_, index) => (
          <Image
            key={`filled-${index}`}
            source={icons.star}
            style={commonStyles.icon16}
          />
        ))}
        <View style={styles.verticalDevider} />
        <Text style={styles.referalCardDate}>
          {moment(item?.created_on).format('MMM D, YYYY')}
        </Text>
        <View style={styles.verticalDevider} />
        <View
          style={[
            styles.greenDot,
            {
              backgroundColor:
                item?.priority?.name === 'low'
                  ? colors.green
                  : colors.liteSaffron,
            },
          ]}
        />
        <Text style={styles.referalCardInt}>{item?.priority?.name}</Text>
      </View>
      <Text style={styles.cardTitleText}>
        {item?.address?.address} {item?.address?.name} {item?.address?.city},{' '}
        {item?.address?.postalCode}
      </Text>
    </ItemCard>
  );
};

export default LeadsItemCard;

const styles = StyleSheet.create({
  listCardView: {
    borderRadius: wp(8),
    marginBottom: hp(16),
  },
  verticalDevider: {
    width: wp(1),
    height: hp(12),
    marginHorizontal: wp(8),
    backgroundColor: colors.grey0,
  },
  tagText: {
    fontSize: fontSize(12),
    lineHeight: hp(16),
    fontFamily: fonts.bold,
  },
  tagView: {
    paddingVertical: hp(4),
    paddingHorizontal: wp(8),
    borderRadius: wp(100),
  },
  greenDot: {
    height: wp(8),
    width: wp(8),
    borderRadius: wp(8),
    marginRight: wp(4),
  },
  referalCardName: {
    fontSize: fontSize(16),
    lineHeight: hp(24),
    fontFamily: fonts.bold,
    color: colors.xDarkGrey,
    textTransform: 'capitalize',
  },
  referalCardDate: {
    fontSize: fontSize(14),
    lineHeight: hp(22),
    fontFamily: fonts.regular,
    color: colors.xDarkGrey,
  },
  referalCardInt: {
    fontSize: fontSize(12),
    lineHeight: hp(16),
    fontFamily: fonts.regular,
    color: colors.xDarkGrey,
    textTransform: 'capitalize',
  },
  cardTitleText: {
    fontSize: fontSize(16),
    lineHeight: hp(24),
    fontFamily: fonts.regular,
    color: colors.darkGrey,
    textTransform: 'capitalize',
  },
});
