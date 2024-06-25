import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, hp, wp } from '../../utils';
import { commonStyles } from '../../styles/styles';
import { transactionList } from '../../utils/dataConstants';
import {
  Header,
  SearchBar,
  TransactionFilter,
  WalletItem,
} from '../../components';

const TransactionList = () => {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const renderTransactionList = ({ item }) => {
    return <WalletItem item={item} />;
  };

  return (
    <View style={commonStyles.flex}>
      <Header isBackButton title={'Transactions'} />
      <SearchBar
        value={searchText}
        isFiltered={false}
        onFilterPress={() => setIsFilterOpen(true)}
        placeholder={'Search Transaction ID'}
        onChangeText={(text) => setSearchText(text)}
      />
      <View style={styles.container}>
        <FlatList
          data={transactionList}
          showsVerticalScrollIndicator={false}
          renderItem={renderTransactionList}
          ItemSeparatorComponent={() => <View style={{ height: hp(8) }} />}
          contentContainerStyle={{ paddingBottom: insets.bottom + hp(16) }}
        />
      </View>
      {isFilterOpen && (
        <TransactionFilter
          isOpen={isFilterOpen}
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
});
