import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { colors, fontSize, fonts, hp, icons, wp } from '../../utils';
import { commonStyles } from '../../styles/styles';
import { useUser } from '../../contexts/userContext';
import {
  CreateLeadBottomSheet,
  Header,
  InfoComponent,
  LeadsItemCard,
  SearchBar,
  Shadow,
  TransactionFilter,
} from '../../components';
import useApiHandler from '../../hooks/useApiHandler';
import { getLead } from '../../services/apiService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const LeadsListScreen = () => {
  const { handleApiCall } = useApiHandler();
  const { navigate } = useNavigation();
  const searchInputRef = useRef(null);
  const { userData } = useUser();
  const [leadData, setLeadData] = useState(null);
  const [searchLeadData, setSearchLeadData] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isCreateLeadVisible, setIsCreateLeadVisible] = useState(false);
  const [isFiltered, setisFiltered] = useState(false);
  const [isFilterList, setIsFilterList] = useState({});

  const getLeadData = async (userPayload = {}, filterStatus) => {
    await handleApiCall(
      () => getLead(userPayload),
      async (response) => {
        if (response) {
          if (filterStatus) {
            setSearchLeadData(response?.data);
            setisFiltered(true);
          } else {
            setLeadData(response?.data);
            setisFiltered(false);
          }
        }
      },
      null,
    );
  };

  useFocusEffect(
    useCallback(() => {
      const payload = {
        isPaginationRequired: false,
      };
      getLeadData(payload);
    }, []),
  );

  useEffect(() => {
    if (leadData !== null || searchLeadData !== null) {
      setLoading(false);
    }
  }, [leadData, searchLeadData]);

  const renderLeadsByReferrals = ({ item }) => {
    return (
      <LeadsItemCard
        item={item}
        onItemPress={() => navigate('LeadDetails', { item })}
      />
    );
  };

  const filterMapping = (filterDataList) => {
    const { fromDate, toDate, leadStatus, period, searchText } = filterDataList;

    const periodMapping = {
      allTime: 'ALL_TIME',
      custom: 'CUSTOM',
      last30days: 'ONE_MONTH',
      last7days: 'ONE_WEEK',
      last90days: 'THREE_MONTHS',
    };

    const leadStatusMapping = {
      referralReceived: 'REFERRAL RECEIVED',
      inspectionScheduled: 'INSPECTION SCHEDULED',
      inspectionCompleted: 'INSPECTION COMPLETED',
      referralPaid: 'REFERRAL PAID',
      jobWon: 'JOB WON',
      jobClosed: 'JOB CLOSED',
      jobClosedNoOpportunity: 'JOB CLOSED NO OPPORTUNITY',
      jobClosedNoInsuranceNoMoney: 'JOB CLOSED NO INSURANCE NO MONEY',
      jobClosedHomeownerDeclined: 'JOB CLOSED HOMEOWNER DECLINED',
    };

    const selectedPeriod = Object.keys(period).find((key) => period[key]);
    const selectedLeadStatus = Object.keys(leadStatus)
      .filter((key) => leadStatus[key])
      .map((key) => leadStatusMapping[key]);

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-CA').replace(/-/g, '/');
    };
    const payload = {
      startDate: selectedPeriod === 'custom' ? formatDate(fromDate) : null,
      endDate: selectedPeriod === 'custom' ? formatDate(toDate) : null,
      statuses: selectedLeadStatus,
      searchText: searchText ?? '',
      isPaginationRequired: false,
    };
    if (periodMapping[selectedPeriod] !== 'ALL_TIME') {
      payload.filter_by_date = periodMapping[selectedPeriod];
    }
    return payload;
  };

  const handleBlurTextInput = () => {
    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }
  };

  const debouncedSearch = useCallback(
    debounce((payload) => {
      if (payload?.statuses?.length > 0) {
        getLeadData(payload, true);
      } else if (payload?.searchText !== '') {
        getLeadData(payload, true);
      } else {
        setSearchLeadData([]);
        setisFiltered(false);
      }
    }, 300),
    [],
  );

  const handleSearchTextChange = (text) => {
    setSearchText(text);
    let payload = {};
    if (Object.keys(isFilterList).length > 0) {
      payload = filterMapping({ ...isFilterList, searchText: text });
    } else {
      payload = { searchText: text };
    }
    debouncedSearch(payload);
  };

  const handleSearchClose = (text) => {
    setSearchText('');
    if (Object.keys(isFilterList).length > 0) {
      payload = filterMapping({ ...isFilterList, searchText: '' });
      getLeadData(payload, true);
    } else {
      setSearchLeadData([]);
      setisFiltered(false);
    }
  };

  const applyFilters = (selectedFilters) => {
    setIsFilterList(selectedFilters);
    const payload = filterMapping({
      ...selectedFilters,
      searchText: searchText,
    });
    getLeadData(payload, true);
    setIsFilterOpen(false);
  };

  const resetFiltersHandle = () => {
    setIsFilterList({});
    setisFiltered(false);
    if (searchText !== '') {
      let payload = { searchText: searchText };
      getLeadData(payload, true);
    } else {
      setSearchLeadData([]);
    }
  };

  return loading ? (
    <LoadingSpinner visible={loading} />
  ) : (
    <View style={commonStyles.flex}>
      {!isSearchFocused && (
        <Header
          isAvatar
          title={'Leads'}
          profileImage={userData?.download_profile_img_url}
        />
      )}
      <SearchBar
        ref={searchInputRef}
        value={searchText}
        isFiltered={false}
        editable={leadData?.length > 0}
        isFocus={isSearchFocused}
        onCancelPress={() => {
          setIsSearchFocused(false);
          handleBlurTextInput();
        }}
        onFilterPress={() => {
          setIsFilterOpen(true);
        }}
        onClosePress={handleSearchClose}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setIsSearchFocused(false)}
        placeholder={'Search Lead ID, Name'}
        onChangeText={handleSearchTextChange}
      />
      {leadData?.length ? (
        <View style={styles.container}>
          {!isSearchFocused && searchText === '' && !isFiltered ? (
            <FlatList
              data={leadData}
              keyExtractor={(item) => item?.id?.toString()}
              renderItem={renderLeadsByReferrals}
              style={styles.flatListStyle}
              showsVerticalScrollIndicator={false}
            />
          ) : !searchLeadData?.length && !isFiltered ? (
            <View style={styles.searchTipView}>
              <Shadow>
                <View style={styles.searchView}>
                  <Image
                    source={icons.search}
                    style={{
                      ...commonStyles.icon24,
                      tintColor: colors.xDarkGrey,
                    }}
                  />
                </View>
              </Shadow>
              <Text style={styles.searchTipText}>
                {'Search by Lead Id, Name'}
              </Text>
            </View>
          ) : searchLeadData?.length ? (
            <View>
              <Text style={styles.searchResultText}>{'Result'}</Text>
              <FlatList
                data={searchLeadData}
                keyExtractor={(item) => item?.id?.toString()}
                renderItem={renderLeadsByReferrals}
                style={styles.flatListStyle}
                showsVerticalScrollIndicator={false}
              />
            </View>
          ) : (
            <View style={styles.searchTipView}>
              <Shadow>
                <View style={styles.searchView}>
                  <Image
                    source={icons.search}
                    style={{
                      ...commonStyles.icon24,
                      tintColor: colors.xDarkGrey,
                    }}
                  />
                </View>
              </Shadow>
              <Text style={styles.searchTipText}>{'No Record Found'}</Text>
            </View>
          )}
        </View>
      ) : (
        <KeyboardAvoidingView style={styles.emptyContainer}>
          <InfoComponent
            icon={icons.leadsEmpty}
            title={'No leads yet'}
            description={
              'Start creating leads to begin earning. Your first opportunity is just a few clicks away!'
            }
            btnText={'Create lead'}
            btnStyle={{ borderColor: colors.darkBlack }}
            btnTextStyle={{ color: colors.xDarkGrey }}
            onPress={() => {
              setIsCreateLeadVisible(true);
            }}
          />
        </KeyboardAvoidingView>
      )}
      {isFilterOpen && (
        <TransactionFilter
          isLeadsFilter
          isOpen={isFilterOpen}
          applyFilters={applyFilters}
          resetFiltersHandle={resetFiltersHandle}
          onClose={() => setIsFilterOpen(false)}
        />
      )}
      {isCreateLeadVisible && (
        <CreateLeadBottomSheet
          isOpen={isCreateLeadVisible}
          onClose={() => setIsCreateLeadVisible(false)}
        />
      )}
    </View>
  );
};

export default LeadsListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(16),
  },
  flatListStyle: {
    paddingTop: wp(16),
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: hp(60),
    justifyContent: 'center',
    paddingHorizontal: wp(16),
    backgroundColor: colors.white,
  },
  searchTipText: {
    fontSize: fontSize(16),
    lineHeight: hp(24),
    color: colors.grey1,
    marginTop: hp(16),
    fontFamily: fonts.regular,
  },
  searchTipView: {
    alignItems: 'center',
    paddingHorizontal: wp(16),
  },
  searchView: {
    height: wp(56),
    width: wp(56),
    borderRadius: wp(56),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(150),
  },
  searchResultText: {
    fontSize: fontSize(18),
    lineHeight: hp(28),
    fontFamily: fonts.semiBold,
    marginTop: hp(22),
  },
});
