import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { Header, ItemCard } from '../../components';
import { commonStyles } from '../../styles/styles';
import { colors, fontSize, fonts, hp, icons, wp } from '../../utils';
import {
  dashboardFilterOptionsList,
  homeLeadsList,
} from '../../utils/dataConstants';
import { getUserDetails, dashboardDetails } from '../../services/apiService';
import { useUser } from '../../contexts/userContext';

const Dashboard = () => {
  const [filterOptions, setFilterOptions] = useState(dashboardFilterOptionsList);
  const [dashboardData, setdashboardData] = useState(null);
  const { userData, setUserData } = useUser();

  const getUserData = async () => {
    try {
      const response = await getUserDetails();
      if (response.status === 200) {
        setUserData(response.data)
      } else {
        console.log("user detailserror", response.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getDasboardData = async (selectedFilter) => {
    const userPayload = {
      filter_by_date: selectedFilter ? selectedFilter.value : "ONE_WEEK",
      isPaginationRequired: false
    };
    try {
      const response = await dashboardDetails(userPayload);
      if (response.status === 201) {
        setdashboardData(response?.data)
      } else {
        console.log("dsahboard details error", response.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserData();
    getDasboardData();
  }, []);

  const onFilterPress = (item) => {
    let updateFilterOptions = filterOptions?.map((obj) => {
      if (item?.id === obj?.id) {
        return { ...obj, isSelected: true };
      }
      return { ...obj, isSelected: false };
    });
    setFilterOptions(updateFilterOptions);
    const selectedFilter = updateFilterOptions.find(method => method.isSelected);
    getDasboardData(selectedFilter);
  };

  const FilterOption = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onFilterPress(item)}
        style={[
          styles.filterBtn,
          {
            backgroundColor: item?.isSelected
              ? colors.darkSaffron
              : colors.liteGrey,
          },
        ]}
      >
        <Text
          style={[
            styles.filterText,
            {
              color: item?.isSelected ? colors.white : colors.darkGrey,
            },
          ]}
        >
          {item?.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const getTagColor = (status) => {
    switch (status) {
      case 'Recieved':
        return { light: '#E9F4FC', dark: '#6399AE' };
      case 'Scheduled':
        return { light: '#FFF0E9', dark: '#FFB03B' };
      case 'Inspection':
        return { light: '#E9F4FC', dark: '#4FD2D2' };
      case 'Job Sold':
        return { light: '#FAEAEA', dark: '#E16032' };
      case 'Referral Paid':
        return { light: '#E9F8F0', dark: '#54A77B' };
    }
  };

  const renderLeadsByReferrals = ({ item }) => {
    return (
      <ItemCard
        shadowStyle={{ shadowOpacity: 0 }}
        cardContainerStyle={styles.listCardView}
      >
        <View style={commonStyles.flexRowJustify}>
          <Text style={styles.referalCardName}>{item?.customer?.first_name} {item?.customer?.last_name}</Text>
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
          <Text style={styles.cardTitleText}>{item?.rating}</Text>
          <View style={styles.verticalDevider} />
          <Text style={styles.referalCardDate}>{moment(item?.created_on).format('MMM D, YYYY')}</Text>
          <View style={styles.verticalDevider} />
          <View
            style={[
              styles.greenDot,
              {
                backgroundColor:
                  item?.priority?.name === 'low' ? colors.green : colors.liteSaffron,
              },
            ]}
          />
          <Text style={styles.referalCardInt}>{item?.priority?.name}</Text>
        </View>
        <Text style={styles.cardTitleText}>{item?.address?.address} {item?.address?.name} {item?.address?.city}, {item?.address?.postalCode}</Text>
      </ItemCard>
    );
  };

  return (
    <View style={commonStyles.flex}>
      <Header isAvatar profileImage={userData?.download_profile_img_url} title={`Welcome, ${userData?.first_name} ${userData?.last_name}`} />
      {dashboardData?.lead_details?.length ?
        <View style={styles.container}>
          <View style={styles.filterContainer}>
            <Text style={[styles.filterText, { marginRight: wp(14) }]}>
              {'Filter by'}
            </Text>
            <ScrollView
              horizontal
              bounces={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: wp(16) }}
            >
              {filterOptions?.map((item) => (
                <FilterOption item={item} />
              ))}
            </ScrollView>
          </View>
          <ScrollView style={styles.scrollViewContainer}>
            <View style={commonStyles.flexRowCenter}>
              <ItemCard>
                <Text style={styles.cardTitleText}>{'Leads created'}</Text>
                <View style={commonStyles.flexRowCenter}>
                  <Text style={styles.cardValueText}>{dashboardData?.leads_created_stats?.leads_created_count}</Text>
                  <Image source={dashboardData?.leads_created_stats?.leads_created_count_difference < 0 ? icons.dropDown : icons.dropUp} style={commonStyles.icon24} />
                  <Text style={[styles.cardDiffText, dashboardData?.leads_created_stats?.leads_created_count_difference < 0 && { color: colors.darkRed }]}>{Math.abs(dashboardData?.leads_created_stats?.leads_created_count_difference).toFixed(2)} ({Math.abs(dashboardData?.leads_created_stats?.leads_created_count_percent_difference).toFixed(2)}%)</Text>
                </View>
              </ItemCard>
              <View style={{ width: wp(16) }} />
              <ItemCard>
                <Text style={styles.cardTitleText}>{'Jobs sold'}</Text>
                <View style={commonStyles.flexRowCenter}>
                  <Text style={styles.cardValueText}>{dashboardData?.jobs_sold_stats?.jobs_sold_count}</Text>
                  <Image source={dashboardData?.jobs_sold_stats?.jobs_sold_count_difference < 0 ? icons.dropDown : icons.dropUp} style={commonStyles.icon24} />
                  <Text style={[styles.cardDiffText, dashboardData?.jobs_sold_stats?.jobs_sold_count_difference < 0 && { color: colors.darkRed }]}>{Math.abs(dashboardData?.jobs_sold_stats?.jobs_sold_count_difference).toFixed(2)} ({Math.abs(dashboardData?.jobs_sold_stats?.jobs_sold_count_percent_difference).toFixed(2)}%)</Text>
                </View>
              </ItemCard>
            </View>
            <ItemCard cardContainerStyle={{ marginTop: hp(16) }}>
              <Text style={styles.cardTitleText}>{'Conversion rate'}</Text>
              <View style={commonStyles.flexRowCenter}>
                <Text style={styles.cardValueText}>{dashboardData?.conversion_rate_stats?.conversion_rate.toFixed(2)}%</Text>
                <Image source={dashboardData?.conversion_rate_stats?.conversion_rate_difference < 0 ? icons.dropDown : icons.dropUp} style={commonStyles.icon24} />
                <Text style={[styles.cardDiffText, dashboardData?.conversion_rate_stats?.conversion_rate_difference < 0 && { color: colors.darkRed }]}>{Math.abs(dashboardData?.conversion_rate_stats?.conversion_rate_difference).toFixed(2)} ({Math.abs(dashboardData?.conversion_rate_stats?.conversion_rate_percent_difference).toFixed(2)}%)</Text>
              </View>
            </ItemCard>
            <ItemCard cardContainerStyle={{ marginTop: hp(16) }}>
              <Text style={styles.chartHeaderText}>{'Leads'}</Text>
            </ItemCard>
            <Text style={[styles.chartHeaderText, { marginVertical: hp(16) }]}>
              {'Individual leads by referrals'}
            </Text>
            <FlatList
              data={dashboardData?.lead_details}
              keyExtractor={(item) => item?.id?.toString()}
              renderItem={renderLeadsByReferrals}
            />
          </ScrollView>
        </View>
        :
        <View>
          <Text> No Data</Text>
        </View>
      }
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.xLiteGrey,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(16),
    paddingVertical: hp(18),
  },
  filterText: {
    fontSize: fontSize(16),
    lineHeight: hp(24),
    fontFamily: fonts.regular,
    color: colors.xDarkGrey,
  },
  filterBtn: {
    borderRadius: wp(8),
    height: hp(36),
    width: wp(98),
    marginLeft: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flex: 1,
    paddingHorizontal: wp(16),
  },
  cardTitleText: {
    fontSize: fontSize(16),
    lineHeight: hp(24),
    fontFamily: fonts.regular,
    color: colors.darkGrey,
    textTransform: "capitalize"
  },
  cardValueText: {
    fontSize: fontSize(32),
    lineHeight: hp(44),
    fontFamily: fonts.bold,
    color: colors.xDarkGrey,
  },
  cardDiffText: {
    fontSize: fontSize(11),
    fontFamily: fonts.semiBold,
    color: colors.green,
  },
  chartHeaderText: {
    fontSize: fontSize(18),
    lineHeight: hp(28),
    fontFamily: fonts.semiBold,
    color: colors.xDarkGrey,
  },
  listCardView: {
    borderRadius: wp(8),
    marginBottom: hp(16),
  },
  referalCardName: {
    fontSize: fontSize(16),
    lineHeight: hp(24),
    fontFamily: fonts.bold,
    color: colors.xDarkGrey,
    textTransform: "capitalize"
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
    textTransform: "capitalize"
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
});
