import React from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import moment from 'moment';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { commonStyles } from '../../styles/styles';
import { useUser } from '../../contexts/userContext';
import { Header, InfoComponent, ItemCard } from '../../components';
import { colors, fontSize, fonts, hp, icons, wp } from '../../utils';
import {
  thisWeekActivityData,
  todayActivityData,
} from '../../utils/dataConstants';

const ActivityScreen = () => {
  const insets = useSafeAreaInsets();
  const { userData } = useUser();

  const renderTodayItems = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {}}
        activeOpacity={0.8}
        style={styles.todayItemView}
      >
        <View style={styles.todayItemIconView}>
          <Image
            source={item?.icon}
            style={{ ...commonStyles.icon24, tintColor: colors.white }}
          />
        </View>
        <View style={styles.todayItemTextView}>
          <View style={commonStyles.flexRow}>
            <Text style={styles.itemTitleText}>{item?.title}</Text>
            <Text style={styles.itemTimeText}>{item?.time}</Text>
          </View>
          <Text numberOfLines={2} style={styles.itemDescText}>
            {item?.description}
          </Text>
        </View>
        <View style={styles.redDot} />
      </TouchableOpacity>
    );
  };

  const getTagColor = (status) => {
    switch (status) {
      case 'Submitted':
        return { light: '#E9F4FC', dark: '#6399AE' };
      case 'In progress':
        return { light: '#FFF0E9', dark: '#FFB03B' };
      default:
        return { light: '#E9F4FC', dark: '#6399AE' };
    }
  };

  const renderWeekItems = ({ item }) => {
    return (
      <ItemCard
        shadowStyle={{ shadowOpacity: 0 }}
        cardContainerStyle={styles.listCardView}
      >
        <View style={commonStyles.flexRowJustify}>
          <Text style={styles.referalCardName}>{item?.name}</Text>
          <View
            style={[
              styles.tagView,
              {
                backgroundColor: getTagColor(item?.status)?.light,
              },
            ]}
          >
            <Text
              style={[
                styles.tagText,
                {
                  color: getTagColor(item?.status)?.dark,
                },
              ]}
            >
              {item?.status}
            </Text>
          </View>
        </View>
        <View style={[commonStyles.flexRowCenter, { marginBottom: hp(16) }]}>
          <Text style={styles.referalCardDate}>{item?.uniqID}</Text>

          <View style={styles.verticalDevider} />
          <Text style={styles.referalCardDate}>
            {moment(item?.date).format('MMM D, YYYY')}
          </Text>
          <View style={styles.verticalDevider} />
          <View
            style={[
              styles.greenDot,
              {
                backgroundColor:
                  item?.interest === 'Low' ? colors.green : colors.liteSaffron,
              },
            ]}
          />
          <Text style={styles.referalCardInt}>{item?.interest}</Text>
        </View>
        <Text style={styles.cardTitleText}>{item?.address}</Text>
      </ItemCard>
    );
  };

  return (
    <View style={commonStyles.flex}>
      <Header
        isAvatar
        profileImage={userData?.download_profile_img_url}
        title={'Lead activity'}
      />
      {true ? (
        <ScrollView style={{ backgroundColor: colors.white, flex: 1 }}>
          <View style={styles.subTitleView}>
            <Text style={styles.subTitleText}>{'Today'}</Text>
          </View>
          <View>
            <FlatList data={todayActivityData} renderItem={renderTodayItems} />
          </View>
          <View style={styles.subTitleView}>
            <Text style={styles.subTitleText}>{'This week'}</Text>
          </View>
          <View>
            <FlatList
              data={thisWeekActivityData}
              renderItem={renderWeekItems}
            />
          </View>
          <View style={{ height: hp(60) + insets.bottom }} />
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <InfoComponent
            icon={icons.bellEmpty}
            title={'No activity yet'}
            description={
              'You will receive notifications regarding activity such as changes in lead status, card delivery status, and payout status.'
            }
          />
        </View>
      )}
    </View>
  );
};

export default ActivityScreen;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(16),
    backgroundColor: colors.white,
  },
  subTitleText: {
    lineHeight: hp(28),
    fontSize: fontSize(18),
    paddingVertical: wp(6),
    color: colors.xDarkGrey,
    paddingHorizontal: wp(16),
    fontFamily: fonts.semiBold,
  },
  itemTitleText: {
    lineHeight: hp(24),
    fontSize: fontSize(16),
    fontFamily: fonts.bold,
    color: colors.xDarkGrey,
  },
  itemTimeText: {
    lineHeight: hp(24),
    marginLeft: wp(8),
    color: colors.darkGrey,
    fontSize: fontSize(16),
    fontFamily: fonts.regular,
  },
  itemDescText: {
    marginTop: hp(4),
    lineHeight: hp(24),
    fontSize: fontSize(16),
    color: colors.xDarkGrey,
    fontFamily: fonts.regular,
  },
  redDot: {
    top: wp(16),
    width: wp(8),
    right: wp(16),
    height: wp(8),
    position: 'absolute',
    borderRadius: wp(100),
    backgroundColor: colors.darkRed,
  },
  todayItemView: {
    padding: wp(16),
    flexDirection: 'row',
    backgroundColor: colors.litePrimary,
  },
  todayItemIconView: {
    padding: wp(8),
    borderRadius: wp(8),
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
  },
  todayItemTextView: {
    flex: 1,
    marginLeft: wp(12),
  },
  subTitleView: {
    borderBottomWidth: wp(1),
    borderColor: colors.xLiteGrey,
  },
  listCardView: {
    borderRadius: wp(8),
    marginBottom: hp(16),
  },
  referalCardName: {
    lineHeight: hp(24),
    fontSize: fontSize(16),
    fontFamily: fonts.bold,
    color: colors.xDarkGrey,
    textTransform: 'capitalize',
  },
  referalCardDate: {
    lineHeight: hp(22),
    fontSize: fontSize(14),
    color: colors.xDarkGrey,
    fontFamily: fonts.regular,
  },
  referalCardInt: {
    lineHeight: hp(16),
    fontSize: fontSize(12),
    color: colors.xDarkGrey,
    fontFamily: fonts.regular,
    textTransform: 'capitalize',
  },
  verticalDevider: {
    width: wp(1),
    height: hp(12),
    marginHorizontal: wp(8),
    backgroundColor: colors.grey0,
  },
  tagText: {
    lineHeight: hp(16),
    fontSize: fontSize(12),
    fontFamily: fonts.bold,
  },
  tagView: {
    borderRadius: wp(100),
    paddingVertical: hp(4),
    paddingHorizontal: wp(8),
  },
  greenDot: {
    width: wp(8),
    height: wp(8),
    marginRight: wp(4),
    borderRadius: wp(8),
  },
  cardTitleText: {
    lineHeight: hp(24),
    fontSize: fontSize(16),
    color: colors.darkGrey,
    fontFamily: fonts.regular,
    textTransform: 'capitalize',
  },
  footerView: {
    height: hp(60),
  },
});
