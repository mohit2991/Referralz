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

const data = {
  "leads_created_stats": {
    "leads_created_count": 3,
    "leads_created_count_difference": 0,
    "leads_created_count_percent_difference": 0.0
  },
  "jobs_sold_stats": {
    "jobs_sold_count": 2,
    "jobs_sold_count_difference": -1,
    "jobs_sold_count_percent_difference": -33.33333333333333
  },
  "conversion_rate_stats": {
    "conversion_rate": 66.66666666666666,
    "conversion_rate_difference": -33.33333333333334,
    "conversion_rate_percent_difference": -33.33333333333334
  },
  "companies_created_stats": null,
  "users_created_stats": null,
  "sales": null,
  "top_revenue_lead_sources": null,
  "user_lead_stats": null,
  "leads_stat": [
    {
      "leadsStatus": "INSPECTION_SCHEDULED",
      "leadsStatusCount": 0
    },
    {
      "leadsStatus": "REFERRAL_RECEIVED",
      "leadsStatusCount": 0
    },
    {
      "leadsStatus": "JOB_DONE",
      "leadsStatusCount": 2
    },
    {
      "leadsStatus": "INSPECTION_COMPLETED",
      "leadsStatusCount": 0
    }
  ],
  "lead_details": [
    {
      "id": 8,
      "customer": {
        "first_name": "customer",
        "last_name": "cust",
        "email_id": "customer@test.com",
        "phone_number": "11226664533"
      },
      "creator": {
        "id": 11,
        "first_name": "Tech",
        "last_name": "user",
        "email_id": "tech@test.com",
        "contact_no": "+9111223344",
        "contact_verification_status": null,
        "company_unique_code": null,
        "user_unique_code": null,
        "birth_date": null,
        "type": "TECHNICIAN",
        "status": "CREATED",
        "download_profile_img_url": null,
        "upload_profile_img_url": null,
        "img_upload_status": null,
        "created_on": "2024-06-15T11:57:06.456663",
        "updated_on": "2024-06-16T16:33:36.350779",
        "address": {
          "address": "checking",
          "name": "working",
          "city": "New York",
          "postalCode": 123456,
          "state": "Nevada",
          "country": "US"
        },
        "company": {
          "id": 1,
          "name": "Inifni Services",
          "email_id": "def@example.com",
          "status": "CREATED",
          "unique_code": "1234",
          "website": "def.in",
          "industry_type": "PLUMBING",
          "contact_no": "+456",
          "user_group": null,
          "created_on": "2024-06-15T19:23:16.495102",
          "updated_on": "2024-06-15T19:23:16.495136",
          "address": {
            "address": "checking",
            "name": "aaa",
            "city": "New York",
            "postalCode": 123456,
            "state": "Nevada",
            "country": "US"
          },
          "logo": [
            {
              "path": "referralz-public/testfile/1718459565928112"
            }
          ]
        }
      },
      "amount": 110,
      "status": "JOB_WON",
      "priority": {
        "id": 3,
        "createdOn": "2024-06-11T04:55:27.129956",
        "updatedOn": "2024-06-11T04:55:27.129956",
        "name": "high",
        "status": "ACTIVE"
      },
      "source": {
        "id": 1,
        "createdOn": "2024-06-15T17:48:24.649294",
        "updatedOn": "2024-06-15T17:48:24.649326",
        "name": "source 1",
        "status": "ACTIVE"
      },
      "oops_problem": "YES",
      "rating": 4.0,
      "description": "XYZ Services",
      "address": {
        "address": "abc",
        "name": "def",
        "city": "delhi",
        "postalCode": 112233,
        "state": "delhi",
        "country": "India"
      },
      "upload_urls": null,
      "created_on": "2024-06-16T15:15:31.819862"
    },
    {
      "id": 9,
      "customer": {
        "first_name": "customer",
        "last_name": "cust",
        "email_id": "customer@test.com",
        "phone_number": "11226664533"
      },
      "creator": {
        "id": 11,
        "first_name": "Tech",
        "last_name": "user",
        "email_id": "tech@test.com",
        "contact_no": "+9111223344",
        "contact_verification_status": null,
        "company_unique_code": null,
        "user_unique_code": null,
        "birth_date": null,
        "type": "TECHNICIAN",
        "status": "CREATED",
        "download_profile_img_url": null,
        "upload_profile_img_url": null,
        "img_upload_status": null,
        "created_on": "2024-06-15T11:57:06.456663",
        "updated_on": "2024-06-16T16:33:36.350779",
        "address": {
          "address": "checking",
          "name": "working",
          "city": "New York",
          "postalCode": 123456,
          "state": "Nevada",
          "country": "US"
        },
        "company": {
          "id": 1,
          "name": "Inifni Services",
          "email_id": "def@example.com",
          "status": "CREATED",
          "unique_code": "1234",
          "website": "def.in",
          "industry_type": "PLUMBING",
          "contact_no": "+456",
          "user_group": null,
          "created_on": "2024-06-15T19:23:16.495102",
          "updated_on": "2024-06-15T19:23:16.495136",
          "address": {
            "address": "checking",
            "name": "aaa",
            "city": "New York",
            "postalCode": 123456,
            "state": "Nevada",
            "country": "US"
          },
          "logo": [
            {
              "path": "referralz-public/testfile/1718459565928112"
            }
          ]
        }
      },
      "amount": 555,
      "status": "JOB_WON",
      "priority": {
        "id": 3,
        "createdOn": "2024-06-11T04:55:27.129956",
        "updatedOn": "2024-06-11T04:55:27.129956",
        "name": "high",
        "status": "ACTIVE"
      },
      "source": {
        "id": 1,
        "createdOn": "2024-06-15T17:48:24.649294",
        "updatedOn": "2024-06-15T17:48:24.649326",
        "name": "source 1",
        "status": "ACTIVE"
      },
      "oops_problem": "YES",
      "rating": 4.2,
      "description": "XYZ Services",
      "address": {
        "address": "abc",
        "name": "def",
        "city": "delhi",
        "postalCode": 112233,
        "state": "delhi",
        "country": "India"
      },
      "upload_urls": null,
      "created_on": "2024-06-16T15:16:56.891456"
    },
    {
      "id": 1,
      "customer": {
        "first_name": "customer",
        "last_name": "cust",
        "email_id": "customer@test.com",
        "phone_number": "11226664533"
      },
      "creator": {
        "id": 11,
        "first_name": "Tech",
        "last_name": "user",
        "email_id": "tech@test.com",
        "contact_no": "+9111223344",
        "contact_verification_status": null,
        "company_unique_code": null,
        "user_unique_code": null,
        "birth_date": null,
        "type": "TECHNICIAN",
        "status": "CREATED",
        "download_profile_img_url": null,
        "upload_profile_img_url": null,
        "img_upload_status": null,
        "created_on": "2024-06-15T11:57:06.456663",
        "updated_on": "2024-06-16T16:33:36.350779",
        "address": {
          "address": "checking",
          "name": "working",
          "city": "New York",
          "postalCode": 123456,
          "state": "Nevada",
          "country": "US"
        },
        "company": {
          "id": 1,
          "name": "Inifni Services",
          "email_id": "def@example.com",
          "status": "CREATED",
          "unique_code": "1234",
          "website": "def.in",
          "industry_type": "PLUMBING",
          "contact_no": "+456",
          "user_group": null,
          "created_on": "2024-06-15T19:23:16.495102",
          "updated_on": "2024-06-15T19:23:16.495136",
          "address": {
            "address": "checking",
            "name": "aaa",
            "city": "New York",
            "postalCode": 123456,
            "state": "Nevada",
            "country": "US"
          },
          "logo": [
            {
              "path": "referralz-public/testfile/1718459565928112"
            }
          ]
        }
      },
      "amount": 334,
      "status": "JOB_CLOSED_HOMEOWNER_DECLINED",
      "priority": {
        "id": 3,
        "createdOn": "2024-06-11T04:55:27.129956",
        "updatedOn": "2024-06-11T04:55:27.129956",
        "name": "high",
        "status": "ACTIVE"
      },
      "source": {
        "id": 1,
        "createdOn": "2024-06-15T17:48:24.649294",
        "updatedOn": "2024-06-15T17:48:24.649326",
        "name": "source 1",
        "status": "ACTIVE"
      },
      "oops_problem": "YES",
      "rating": 4.1,
      "description": "XYZ Services",
      "address": {
        "address": "abc",
        "name": "def",
        "city": "delhi",
        "postalCode": 112233,
        "state": "delhi",
        "country": "India"
      },
      "upload_urls": null,
      "created_on": "2024-06-19T14:27:18.749503"
    }
  ]
}

const initialState = {
  "id": 29,
  "first_name": "rohit",
  "last_name": "bisht",
  "email_id": "rohitbisht@gmail.com",
  "contact_no": null,
  "contact_verification_status": null,
  "company_unique_code": null,
  "user_unique_code": "X8OP9C",
  "birth_date": null,
  "type": "HOME_OWNER",
  "status": "CREATED",
  "download_profile_img_url": "https://storage.googleapis.com/referralz-public/referralz/user_29/profile_img?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=cs-cf-cst-service-account%40homespark-409114.iam.gserviceaccount.com%2F20240619%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240619T093558Z&X-Goog-Expires=604800&X-Goog-SignedHeaders=host&X-Goog-Signature=11b9b8a72d81dce37ac69be55beb6ed84621a4e5de996e8026cb6daf53b68f584277e8da3762e8e06af283a595401ef20c032718f42289782175c8b4aabe20d32dd310b7d34649b8091d4c097df322294021997961080c8401a8093c64e20eeb2f902bc171557ecdc44ae640585e7baa3a92917f47b663d3128ff8d0d957b43f87626fde0c309fde1fabdf0cf6e4135452f2f5dcc296beea588178e245853c10ad499593adae74f8157ddd64f490d58b972fbe29a903442f7c04fdc0b0a8c737354fcbe36e203069aad500cf4c3906a7c09266f4e8e5b10aeb94819b088b7c6d1da8e266d6e0a5f58ea61235e201f4643e94740a81615914c9a4f1a290039690",
  "upload_profile_img_url": "https://storage.googleapis.com/referralz-public/referralz/user_29/profile_img?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=cs-cf-cst-service-account%40homespark-409114.iam.gserviceaccount.com%2F20240619%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240619T083217Z&X-Goog-Expires=604800&X-Goog-SignedHeaders=host&X-Goog-Signature=32b97859170df7b35f78c7d621fd935a6456dcd64d6d70eed4d6634befef93f7241c055b673119f5c705f104de621624c11479ee38b7b94a1d9c4b7ce8d42a509724248ec5dc681e57e6a61c0e1b3e5af76335518cf95974848e136a7e8af5885e1585119ebed14fd6302c6372a1bfbb38b5c42d7ba538e13f388746c0b76781f69139e774fe731145b83ccd279b1dd24bb79f6287b1432335ed8ab7de057692b0a3722e7eb4788ade4472b53b0e20051b3cf3f534a21fc5eee2220654490a215a38a4dbd9f0974ae43d60cece422003bde71e08441bf363b6cedf41c67a32072617c25a8f1ea7574cf8d5635b566e5be7e6e98393a6068b84b169f6306f6fdc",
  "img_upload_status": false,
  "created_on": "2024-06-19T05:13:11.456653",
  "updated_on": "2024-06-19T05:13:11.508125",
  "address": null,
  "company": null
}

const Dashboard = () => {
  const [filterOptions, setFilterOptions] = useState(
    dashboardFilterOptionsList,
  );
  const [dashboardData, setdashboardData] = useState(data);
  const [userData, setUserData] = useState(initialState);

  const getUserData = async () => {
    try {
      const response = await getUserDetails();
      if (response.status === 200) {
        console.log('User details response:', response);
      } else {
        console.log(response.data);
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
        console.log('dsahboard details response:', response);
        setdashboardData(data)
      } else {
        console.log(response.data);
        setdashboardData(null)
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
