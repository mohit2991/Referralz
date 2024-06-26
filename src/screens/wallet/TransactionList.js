import React, { useRef, useState, useEffect, useCallback } from 'react';
import { FlatList, StyleSheet, View, Image, Text } from 'react-native';
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
import { getWallet, getWalletSearch } from '../../services/apiService';

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
  const [walletFilterData, setWalletFilterData] = useState(null);
  const [searchWalletData, setSearchWalletData] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFiltered, setisFiltered] = useState(false);

  const getWalletData = async (userPayload = {}, filterStatus) => {
    await handleApiCall(
      () => getWallet(userPayload),
      async (response) => {
        if (response) {
          if (filterStatus) {
            setWalletFilterData(response?.data);
            setisFiltered(true)
          } else {
            setWalletData(response?.data);
            setisFiltered(false)
          }
        }
      },
      null,
    );
  };

  const getWalletSearchHandle = async (searchValue) => {
    const userPayload = {};
    await handleApiCall(
      () => getWalletSearch(userPayload, searchValue),
      async (response) => {
        if (response) {
          setSearchWalletData(response?.data === null ? [] : response?.data);
        } else {
          setSearchWalletData([]);
        }
      },
      null,
    );
  };

  useEffect(() => {
    getWalletData();
  }, []);

  const renderTransactionList = ({ item }) => {
    return <WalletItem item={item} />;
  };

  const handleBlurTextInput = () => {
    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }
  };

  const debouncedSearch = useCallback(
    debounce((text) => {
      if (text === '') {
        setSearchWalletData([]);
      } else {
        getWalletSearchHandle(text);
      }
    }, 300),
    [],
  );

  const handleSearchTextChange = (text) => {
    setSearchText(text);
    debouncedSearch(text);
  };
  const handleSearchClose = (text) => {
    setSearchText('');
    setSearchWalletData([]);
  };

  const applyFilters = (selectedFilters) => {
    const { fromDate, toDate, leadStatus, period, transactionType } = selectedFilters;

    const periodMapping = {
      allTime: "ALL_TIME",
      custom: "CUSTOM",
      last30days: "ONE_MONTH",
      last7days: "ONE_WEEK",
      last90days: "THREE_MONTHS",
    };

    const transactionTypeMapping = {
      ach: "ACH",
      check: "CHECK",
      venmo: "VENMO",
      virtualCard: "VIRTUAL_CARD",
    };

    const selectedPeriod = Object.keys(period).find((key) => period[key]);
    const selectedTransactionTypes = Object.keys(transactionType)
      .filter((key) => transactionType[key])
      .map((key) => transactionTypeMapping[key]);

    const payload = {
      startDate: selectedPeriod === 'custom' ? fromDate.toISOString().split('T')[0] : null,
      endDate: selectedPeriod === 'custom' ? toDate.toISOString().split('T')[0] : null,
      payment_method: selectedTransactionTypes,
    };
    if (periodMapping[selectedPeriod] !== "ALL_TIME") {
      payload.filter_by_date = periodMapping[selectedPeriod];
    }
    getWalletData(payload, true);
    setIsFilterOpen(false)
  };

  const resetFiltersHandle = () => {
    setWalletFilterData(null)
    setisFiltered(false)
  }

  return (
    <View style={commonStyles.flex}>
      {!isSearchFocused && (
        <Header
          isBackButton
          title={'Transactions'}
        />
      )}
      <SearchBar
        ref={searchInputRef}
        value={searchText}
        isFiltered={false}
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
      <View style={styles.container}>
        {!isSearchFocused && searchText === '' && !isFiltered ? (
          <FlatList
            data={walletData?.transactions}
            showsVerticalScrollIndicator={false}
            renderItem={renderTransactionList}
            ItemSeparatorComponent={() => <View style={{ height: hp(8) }} />}
            contentContainerStyle={{ paddingBottom: insets.bottom + hp(16) }}
          />
        ) : !searchWalletData?.length && !isFiltered ? (
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
        ) : isFiltered ? (
          walletFilterData?.transactions?.length ? (
            <FlatList
              data={walletFilterData?.transactions}
              showsVerticalScrollIndicator={false}
              renderItem={renderTransactionList}
              ItemSeparatorComponent={() => <View style={{ height: hp(8) }} />}
              contentContainerStyle={{ paddingBottom: insets.bottom + hp(16) }}
            />
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
              <Text style={styles.searchTipText}>
                {'No Record Found'}
              </Text>
            </View>
          )
        ) : (
          <View>
            <Text style={styles.searchResultText}>{'Result'}</Text>
            <FlatList
              data={searchWalletData}
              showsVerticalScrollIndicator={false}
              renderItem={renderTransactionList}
              ItemSeparatorComponent={() => <View style={{ height: hp(8) }} />}
              contentContainerStyle={{ paddingBottom: insets.bottom + hp(16) }}
            />
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
