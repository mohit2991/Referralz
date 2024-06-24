import React, { useRef, useState, useEffect, useCallback } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, fonts, hp, icons, wp } from '../../utils';
import { commonStyles } from '../../styles/styles';
import { useUser } from '../../contexts/userContext';
import {
  Header,
  InfoComponent,
  LeadsItemCard,
  SearchBar,
  Shadow,
} from '../../components';
import useApiHandler from '../../hooks/useApiHandler';
import { getLead, getLeadSearch, getLeadActivity } from '../../services/apiService';

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const LeadsListScreen = () => {
  const { handleApiCall } = useApiHandler();
  const searchInputRef = useRef(null);
  const { userData } = useUser();
  const [leadData, setLeadData] = useState([]);
  const [searchLeadData, setSearchLeadData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const getLeadData = async () => {
    const userPayload = {
      isPaginationRequired: false,
    };
    handleApiCall(
      () => getLead(userPayload),
      async (response) => {
        console.log({ getLead: response?.data })
        if (response) {
          setLeadData(response?.data);
        }
      },
      null,
    );
  };

  const getLeadSearchHandle = async (searchValue) => {
    const userPayload = {
      isPaginationRequired: false,
    };
    handleApiCall(
      () => getLeadSearch(userPayload, searchValue),
      async (response) => {
        if (response) {
          console.log({ searchValue: response?.data })
          setSearchLeadData(response?.data);
        }
      },
      null,
    );
  };

  useEffect(() => {
    getLeadData();
  }, []);

  const renderLeadsByReferrals = ({ item }) => {
    return <LeadsItemCard item={item} onItemPress={() => { }} />;
  };

  const handleBlurTextInput = () => {
    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }
  };

  const debouncedSearch = useCallback(
    debounce((text) => {
      if (text === '') {
        setSearchLeadData([]);
      } else {
        getLeadSearchHandle(text);
      }
    }, 300),
    []
  );

  const handleSearchTextChange = (text) => {
    setSearchText(text);
    debouncedSearch(text);
  };
  const handleSearchClose = (text) => {
    setSearchText('');
    setSearchLeadData([]);
  };

  return (
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
        isFocus={isSearchFocused}
        onCancelPress={() => {
          setIsSearchFocused(false);
          handleBlurTextInput();
        }}
        onFilterPress={() => { }}
        onClosePress={handleSearchClose}
        onFocus={() => setIsSearchFocused(true)}
        onBlur={() => setIsSearchFocused(false)}
        placeholder={'Search Lead ID, Name'}
        onChangeText={handleSearchTextChange}
      />
      {leadData?.length ? (
        <View style={styles.container}>
          {!isSearchFocused && searchText === '' ? (
            <FlatList
              data={leadData}
              keyExtractor={(item) => item?.id?.toString()}
              renderItem={renderLeadsByReferrals}
              style={styles.flatListStyle}
            />
          ) : !searchLeadData?.length ? (
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
                {'Search by Lead Id, Name, Address'}
              </Text>
            </View>
          ) : (
            <FlatList
              data={searchLeadData}
              keyExtractor={(item) => item?.id?.toString()}
              renderItem={renderLeadsByReferrals}
              style={styles.flatListStyle}
            />
          )}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <InfoComponent
            icon={icons.leadsEmpty}
            title={'No leads yet'}
            description={
              'Start creating leads to begin earning. Your first opportunity is just a few clicks away!'
            }
            btnText={'Create lead'}
            btnStyle={{ borderColor: colors.darkBlack }}
            btnTextStyle={{ color: colors.xDarkGrey }}
            onPress={() => { }}
          />
        </View>
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
    marginTop: hp(130),
  },
});
