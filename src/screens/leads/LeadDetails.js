import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { colors, fontSize, fonts, hp, icons, wp } from '../../utils';
import { commonStyles } from '../../styles/styles';
import { ItemCard, Shadow } from '../../components';
import { getTagColor } from '../../utils/globalFunctions';
import moment from 'moment';
import { leadsActivityList } from '../../utils/dataConstants';
import { useNavigation } from '@react-navigation/native';

const LeadDetails = () => {
  const { navigate, goBack } = useNavigation();
  const [isDetailShow, setIsDetailShow] = useState(true);
  const [isDescOpen, setIsDescOpen] = useState(false);

  let priorityName = 'Low';

  const DetailItemView = ({ title, detail }) => {
    return (
      <View>
        {title && <Text style={styles.itemTitleText}>{title}</Text>}
        <Text style={styles.itemDetailText}>{detail}</Text>
      </View>
    );
  };

  const renderActivity = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={1} style={styles.todayItemView}>
        <View style={styles.todayItemIconView}>
          <Image
            source={icons.checkShield}
            style={{ ...commonStyles.icon24, tintColor: colors.black }}
          />
        </View>
        <View style={styles.todayItemTextView}>
          <View style={commonStyles.flexRow}>
            <Text style={{ ...styles.itemTitleText, color: colors.xDarkGrey }}>
              {item?.heading}
            </Text>
            <Text style={styles.itemTimeText}>
              {item?.created_on}
              {/* {moment(item?.created_on).fromNow()} */}
            </Text>
          </View>
          <Text style={styles.itemDescText}>{item?.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={commonStyles.flex}>
      <SafeAreaView style={commonStyles.safeAreaView} />
      <View style={styles.headerContainer}>
        <View style={commonStyles.flexRowJustify}>
          <View style={commonStyles.flexRowCenter}>
            <TouchableOpacity
              style={{ padding: wp(8) }}
              onPress={() => goBack()}
            >
              <Image source={icons.backArrow} style={commonStyles.icon24} />
            </TouchableOpacity>
            <Text style={styles.titleIdText}>{'ID 846474'}</Text>
          </View>
          <TouchableOpacity
            style={{ padding: wp(8) }}
            onPress={() => navigate('ContactUsScreen')}
          >
            <Image source={icons.contactUs} style={commonStyles.icon24} />
          </TouchableOpacity>
        </View>
        <View style={styles.tabContainer}>
          <Shadow
            shadowStyle={[
              styles.tabShadow,
              { shadowOpacity: isDetailShow ? 0.1 : 0 },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsDetailShow(true)}
              style={[
                styles.tabView,
                {
                  backgroundColor: !isDetailShow
                    ? colors.transparent
                    : colors.white,
                },
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color: !isDetailShow ? colors.grey1 : colors.xDarkGrey,
                  },
                ]}
              >
                {'Details'}
              </Text>
            </TouchableOpacity>
          </Shadow>
          <Shadow
            shadowStyle={[
              styles.tabShadow,
              { shadowOpacity: !isDetailShow ? 0.1 : 0 },
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setIsDetailShow(false)}
              style={[
                styles.tabView,
                {
                  backgroundColor: isDetailShow
                    ? colors.transparent
                    : colors.white,
                },
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color: isDetailShow ? colors.grey1 : colors.xDarkGrey,
                  },
                ]}
              >
                {'Activity'}
              </Text>
            </TouchableOpacity>
          </Shadow>
        </View>
      </View>
      {isDetailShow ? (
        <ScrollView
          style={styles.scollViewStyle}
          showsVerticalScrollIndicator={false}
        >
          <ItemCard
            shadowStyle={{ shadowOpacity: 0 }}
            cardContainerStyle={styles.listCardView}
          >
            <View style={commonStyles.flexRowJustify}>
              <Text style={styles.referalCardName}>
                {'Kathy'} {'Pacheco'}
              </Text>
              <View
                style={[
                  styles.tagView,
                  {
                    backgroundColor: getTagColor('Submitted')?.light,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.tagText,
                    {
                      color: getTagColor('Submitted')?.dark,
                    },
                  ]}
                >
                  {'Submitted'}
                </Text>
              </View>
            </View>
            <View style={commonStyles.flexRowCenter}>
              <Text style={styles.referalCardDate}>{'ID 846474'}</Text>
              {/* <Text style={[styles.cardTitleText, { marginRight: wp(2) }]}>
              {'4.1'}
            </Text> */}
              {/* {[...Array(filledStars)].map((_, index) => (
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
            ))} */}
              <View style={styles.verticalDevider} />
              <Text style={styles.referalCardDate}>
                {'Aug 8, 2023'}
                {/* {moment('Aug 8, 2023').format('MMM D, YYYY')} */}
              </Text>
              <View style={styles.verticalDevider} />
              <View
                style={[
                  styles.greenDot,
                  {
                    backgroundColor:
                      priorityName === 'Low'
                        ? colors.green
                        : colors.liteSaffron,
                  },
                ]}
              />
              <Text style={styles.referalCardInt}>{priorityName}</Text>
            </View>
          </ItemCard>
          <ItemCard
            shadowStyle={{ shadowOpacity: 0 }}
            cardContainerStyle={styles.listCardView}
          >
            <Text style={styles.cardTitleTextStyle}>
              {'Contact information'}
            </Text>
            <View style={styles.height24} />
            <DetailItemView title={'Full name'} detail={'Kathy Pacheco'} />
            <View style={styles.height16} />
            <DetailItemView title={'Phone number'} detail={'(917) 339-6416'} />
            <View style={styles.height16} />
            <DetailItemView
              title={'Email address'}
              detail={'kathy.pacheco@aol.com'}
            />
          </ItemCard>
          <ItemCard
            shadowStyle={{ shadowOpacity: 0 }}
            cardContainerStyle={styles.listCardView}
          >
            <Text style={styles.cardTitleTextStyle}>{'Lead address'}</Text>
            <View style={styles.height24} />
            <DetailItemView
              title={'Address'}
              detail={'2614 Sweetwood Drive, Arvada, CO 80002'}
            />
          </ItemCard>
          <ItemCard
            shadowStyle={{ shadowOpacity: 0 }}
            cardContainerStyle={styles.listCardView}
          >
            <View style={commonStyles.flexRowJustify}>
              <Text style={styles.cardTitleTextStyle}>{'Description'}</Text>
              <TouchableOpacity
                style={{ padding: wp(8) }}
                onPress={() => setIsDescOpen(!isDescOpen)}
              >
                <Image
                  source={icons.downChevron}
                  style={{
                    ...commonStyles.icon24,
                    transform: [{ rotateX: isDescOpen ? '180deg' : '0deg' }],
                  }}
                />
              </TouchableOpacity>
            </View>
            {isDescOpen && (
              <View style={{ marginTop: hp(24) }}>
                <DetailItemView
                  detail={
                    'Commercial building in downtown suffered water damage from a burst pipe.'
                  }
                />
              </View>
            )}
          </ItemCard>
          <View style={styles.height50} />
        </ScrollView>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={commonStyles.root}
        >
          <FlatList
            data={leadsActivityList}
            renderItem={renderActivity}
            ItemSeparatorComponent={() => (
              <View
                style={{ height: hp(1), backgroundColor: colors.xLiteGrey }}
              />
            )}
          />
          <View style={styles.height50} />
        </ScrollView>
      )}
    </View>
  );
};

export default LeadDetails;

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: wp(16),
    paddingVertical: hp(12),
    backgroundColor: colors.white,
    borderBottomWidth: wp(1),
    borderColor: colors.xLiteGrey,
  },
  titleIdText: {
    fontSize: fontSize(20),
    lineHeight: hp(30),
    fontFamily: fonts.bold,
    color: colors.xDarkGrey,
    marginLeft: wp(8),
  },
  tabContainer: {
    height: hp(38),
    padding: wp(2),
    marginTop: hp(8),
    borderRadius: wp(9),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.xLiteGrey,
  },
  tabShadow: {
    flex: 1,
    shadowRadius: 3,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: hp(1),
    },
  },
  tabView: {
    height: '100%',
    borderRadius: wp(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: fontSize(14),
    fontFamily: fonts.regular,
  },
  listCardView: {
    borderRadius: wp(8),
    marginBottom: hp(8),
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
  scollViewStyle: {
    flex: 1,
    backgroundColor: colors.xLiteGrey,
    paddingHorizontal: wp(16),
    paddingTop: wp(16),
  },
  cardTitleTextStyle: {
    fontSize: fontSize(18),
    lineHeight: hp(28),
    fontFamily: fonts.semiBold,
    color: colors.xDarkGrey,
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
  height16: {
    height: hp(16),
  },
  height24: {
    height: hp(24),
  },
  height50: {
    height: hp(50),
  },
  todayItemView: {
    padding: wp(16),
    flexDirection: 'row',
  },
  todayItemIconView: {
    padding: wp(8),
    borderRadius: wp(8),
    alignSelf: 'flex-start',
    backgroundColor: '#E9F8F0',
    // backgroundColor: colors.litePrimary,
  },
  todayItemTextView: {
    flex: 1,
    marginLeft: wp(12),
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
});
