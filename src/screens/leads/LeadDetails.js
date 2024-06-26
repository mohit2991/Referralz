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
import React, { useState, useEffect } from 'react';
import { colors, fontSize, fonts, hp, icons, wp } from '../../utils';
import { commonStyles } from '../../styles/styles';
import { ItemCard, Shadow } from '../../components';
import { getTagColor } from '../../utils/globalFunctions';
import moment from 'moment';
import { useUser } from '../../contexts/userContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import useApiHandler from '../../hooks/useApiHandler';
import { getLeadActivity } from '../../services/apiService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const LeadDetails = () => {
  const { navigate, goBack } = useNavigation();
  const { params } = useRoute();
  const { item } = params;
  const { handleApiCall } = useApiHandler();
  const { userData } = useUser();
  const [isDetailShow, setIsDetailShow] = useState(true);
  const [isDescOpen, setIsDescOpen] = useState(false);
  const [leadActivityData, setLeadActivityData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getLeadActivityData = async () => {
    const userPayload = {
      isPaginationRequired: false,
    };

    setLoading(true);

    await handleApiCall(
      () => getLeadActivity(userPayload, item?.id),
      async (response) => {
        if (response) {
          setLeadActivityData(response?.data);
        }
      },
      null,
    );

    setLoading(false);
  };

  useEffect(() => {
    getLeadActivityData();
  }, [item]);

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
              {moment(item?.created_on).fromNow()}
            </Text>
          </View>
          <Text style={styles.itemDescText}>{item?.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={commonStyles.flex}>
      <LoadingSpinner visible={loading} />
      <SafeAreaView style={commonStyles.safeAreaView} />
      <View style={styles.headerContainer}>
        <View style={commonStyles.flexRowJustify}>
          <View style={commonStyles.flexRowCenter}>
            <TouchableOpacity
              style={{ padding: wp(8) }}
              onPress={() => navigate('Leads', { renderComponent: false })}
            >
              <Image source={icons.backArrow} style={commonStyles.icon24} />
            </TouchableOpacity>
            <Text style={styles.titleIdText}>{`ID ${item?.id}`}</Text>
          </View>
          {userData?.contact_us?.length > 0 && (
            <TouchableOpacity
              style={{ padding: wp(8) }}
              onPress={() => navigate('ContactUsScreen')}
            >
              <Image source={icons.contactUs} style={commonStyles.icon24} />
            </TouchableOpacity>
          )}
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
            <View style={commonStyles.flexRowCenter}>
              <Text style={styles.referalCardDate}>{`ID ${item?.id}`}</Text>
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
          </ItemCard>

          <ItemCard
            shadowStyle={{ shadowOpacity: 0 }}
            cardContainerStyle={styles.listCardView}
          >
            <Text style={styles.cardTitleTextStyle}>
              {'Contact information'}
            </Text>
            <View style={styles.height24} />
            <DetailItemView
              title={'Full name'}
              detail={`${item?.customer?.first_name} ${item?.customer?.last_name}`}
            />
            <View style={styles.height16} />
            <DetailItemView
              title={'Phone number'}
              detail={item?.customer?.phone_number}
            />
            <View style={styles.height16} />
            <DetailItemView
              title={'Email address'}
              detail={item?.customer?.email_id}
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
              detail={`${item?.address?.address} ${item?.address?.name} ${item?.address?.city}, ${item?.address?.state}, ${item?.address?.postal_code}, ${item?.address?.country}`}
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
                <DetailItemView detail={item?.description} />
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
            data={leadActivityData?.content}
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
