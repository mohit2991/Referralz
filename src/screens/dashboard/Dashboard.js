import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Header, ItemCard } from '../../components';
import { commonStyles } from '../../styles/styles';
import { colors, fontSize, fonts, hp, icons, wp } from '../../utils';
import {
  dashboardFilterOptionsList,
  homeLeadsList,
} from '../../utils/dataConstants';
import { getUserDetails } from '../../services/apiService';
import Toast from 'react-native-toast-message';

const Dashboard = () => {
  const [filterOptions, setFilterOptions] = useState(
    dashboardFilterOptionsList,
  );

  const getUserData = async () => {
    const payload = {
      id: 'mohit2991kumar@gmail.com',
    };
    try {
      const response = await getUserDetails(payload);
      console.log('User details response:', response);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const onFilterPress = (item) => {
    let updateFilterOptions = filterOptions?.map((obj) => {
      if (item?.id === obj?.id) {
        return { ...obj, isSelected: true };
      }
      return { ...obj, isSelected: false };
    });
    setFilterOptions(updateFilterOptions);
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
          <Text style={styles.cardTitleText}>{item?.rating}</Text>
          <View style={styles.verticalDevider} />
          <Text style={styles.referalCardDate}>{item?.date}</Text>
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
      <Header isAvatar title={'Welcome, Adam'} />
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
                <Text style={styles.cardValueText}>{'830'}</Text>
                <Image source={icons.dropUp} style={commonStyles.icon24} />
                <Text style={styles.cardDiffText}>{'25 (2.9%)'}</Text>
              </View>
            </ItemCard>
            <View style={{ width: wp(16) }} />
            <ItemCard>
              <Text style={styles.cardTitleText}>{'Jobs sold'}</Text>
              <View style={commonStyles.flexRowCenter}>
                <Text style={styles.cardValueText}>{'115'}</Text>
                <Image source={icons.dropDown} style={commonStyles.icon24} />
                <Text style={[styles.cardDiffText, { color: colors.darkRed }]}>
                  {'4 (3.4%)'}
                </Text>
              </View>
            </ItemCard>
          </View>
          <ItemCard cardContainerStyle={{ marginTop: hp(16) }}>
            <Text style={styles.cardTitleText}>{'Conversion rate'}</Text>
            <View style={commonStyles.flexRowCenter}>
              <Text style={styles.cardValueText}>{'86%'}</Text>
              <Image source={icons.dropUp} style={commonStyles.icon24} />
              <Text style={styles.cardDiffText}>{'25 (2.9%)'}</Text>
            </View>
          </ItemCard>
          <ItemCard cardContainerStyle={{ marginTop: hp(16) }}>
            <Text style={styles.chartHeaderText}>{'Leads'}</Text>
          </ItemCard>
          <Text style={[styles.chartHeaderText, { marginVertical: hp(16) }]}>
            {'Individual leads by referrals'}
          </Text>
          <FlatList
            data={homeLeadsList}
            keyExtractor={(item) => item?.id?.toString()}
            renderItem={renderLeadsByReferrals}
          />
        </ScrollView>
      </View>
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
