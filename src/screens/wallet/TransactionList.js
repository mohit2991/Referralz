import React, { useRef, useState, useEffect, useCallback } from 'react';
import { FlatList, StyleSheet, View, Image, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { isEmpty } from 'lodash';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSize, fonts, hp, icons, wp } from '../../utils';
import { commonStyles } from '../../styles/styles';
import {
  Header,
  SearchBar,
  TransactionFilter,
  WalletItem,
  Shadow,
} from '../../components';
import useApiHandler from '../../hooks/useApiHandler';
import { getWallet } from '../../services/apiService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const TransactionList = () => {
  const { handleApiCall } = useApiHandler();
  const insets = useSafeAreaInsets();
  const searchInputRef = useRef(null);
  const [walletData, setWalletData] = useState(null);
  const [searchWalletData, setSearchWalletData] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFiltered, setisFiltered] = useState(false);
  const [isFilterList, setIsFilterList] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getWalletData = async (userPayload = {}, filterStatus) => {
    setIsLoading(true);
    await handleApiCall(
      () => getWallet(userPayload),
      async (response) => {
        if (response) {
          setIsLoading(false);
          if (filterStatus) {
            setSearchWalletData(response?.data);
            setisFiltered(true);
          } else {
            setWalletData(response?.data);
            setisFiltered(false);
          }
        }
      },
      null,
    );
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      const payload = {
        isPaginationRequired: false,
      };
      getWalletData(payload);
    }, []),
  );

  const renderTransactionList = ({ item }) => {
    return <WalletItem item={item} />;
  };

  const filterMapping = (filterDataList) => {
    const { fromDate, toDate, transactionType, period, searchText } =
      filterDataList;

    const periodMapping = {
      allTime: 'ALL_TIME',
      custom: 'CUSTOM',
      last30days: 'ONE_MONTH',
      last7days: 'ONE_WEEK',
      last90days: 'THREE_MONTHS',
    };

    const transactionTypeMapping = {
      ach: 'ACH',
      check: 'CHECK',
      venmo: 'VENMO',
      virtualCard: 'VIRTUAL_CARD',
    };

    const selectedPeriod = Object.keys(period).find((key) => period[key]);
    const selectedTransactionTypes = Object.keys(transactionType)
      .filter((key) => transactionType[key])
      .map((key) => transactionTypeMapping[key]);

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('en-CA').replace(/-/g, '/');
    };
    const payload = {
      startDate: selectedPeriod === 'custom' ? formatDate(fromDate) : null,
      endDate: selectedPeriod === 'custom' ? formatDate(toDate) : null,
      payment_method: selectedTransactionTypes,
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
      if (payload?.payment_method?.length > 0) {
        getWalletData(payload, true);
      } else if (payload?.searchText !== '') {
        getWalletData(payload, true);
      } else {
        setSearchWalletData([]);
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
      getWalletData(payload, true);
    } else {
      setSearchWalletData([]);
      setisFiltered(false);
    }
  };

  const applyFilters = (selectedFilters) => {
    setIsFilterList(selectedFilters);
    const payload = filterMapping({
      ...selectedFilters,
      searchText: searchText,
    });
    getWalletData(payload, true);
    setIsFilterOpen(false);
  };

  const resetFiltersHandle = () => {
    setIsFilterList({});
    setisFiltered(false);
    if (searchText !== '') {
      let payload = { searchText: searchText };
      getWalletData(payload, true);
    } else {
      setSearchWalletData([]);
    }
  };

  const isFilteredWalletDataList = () => {
    if (!isEmpty(isFilterList)) {
      if (
        isFilterList?.period?.allTime &&
        isFilterList?.transactionType?.check
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  };

  return (
    <View style={commonStyles.flex}>
      {!isSearchFocused && <Header isBackButton title={'Transactions'} />}
      <SearchBar
        ref={searchInputRef}
        value={searchText}
        isFiltered={isFilteredWalletDataList()}
        editable={walletData?.transactions?.length > 0}
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
        placeholder={'Search Transaction ID'}
        onChangeText={handleSearchTextChange}
      />
      <LoadingSpinner visible={isLoading} />
      <View style={styles.container}>
        {!isSearchFocused && searchText === '' && !isFiltered ? (
          <FlatList
            data={walletData?.transactions}
            showsVerticalScrollIndicator={false}
            renderItem={renderTransactionList}
            ItemSeparatorComponent={() => <View style={{ height: hp(8) }} />}
            contentContainerStyle={{ paddingBottom: insets.bottom + hp(16) }}
          />
        ) : !searchWalletData?.transactions?.length && !isFiltered ? (
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
              {'Search by Transaction ID'}
            </Text>
          </View>
        ) : searchWalletData?.transactions?.length ? (
          <View>
            <Text style={styles.searchResultText}>{'Result'}</Text>
            <FlatList
              data={searchWalletData?.transactions}
              showsVerticalScrollIndicator={false}
              renderItem={renderTransactionList}
              ItemSeparatorComponent={() => <View style={{ height: hp(8) }} />}
              contentContainerStyle={{ paddingBottom: insets.bottom + hp(16) }}
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
      {isFilterOpen && (
        <TransactionFilter
          isOpen={isFilterOpen}
          applyFilters={applyFilters}
          resetFiltersHandle={resetFiltersHandle}
          onClose={() => setIsFilterOpen(false)}
        />
      )}
    </View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(16),
    paddingHorizontal: wp(16),
    backgroundColor: colors.xLiteGrey,
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
    marginBottom: hp(12),
  },
});
