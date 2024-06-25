import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Header, InfoComponent, Shadow, WalletItem } from '../../components';
import { useUser } from '../../contexts/userContext';
import { commonStyles } from '../../styles/styles';
import { colors, fontSize, fonts, hp, icons, wp } from '../../utils';
import LinearGradient from 'react-native-linear-gradient';
import { transactionList } from '../../utils/dataConstants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const WalletScreen = () => {
  const { navigate } = useNavigation();
  const insets = useSafeAreaInsets();
  const { userData } = useUser();

  const [loading, setLoading] = useState(false);

  const renderTransactionList = ({ item }) => {
    return <WalletItem item={item} />;
  };

  return (
    <View style={commonStyles.flex}>
      <Header
        isAvatar
        profileImage={userData?.download_profile_img_url}
        title={'Wallet'}
      />
      <LoadingSpinner visible={loading} />
      <View style={styles.mainContainer}>
        <Shadow shadowStyle={styles.shadowStyle}>
          <LinearGradient
            colors={['rgba(239, 245, 247, 0.5)', 'rgba(126, 170, 188, 0.5)']}
            start={{ x: 0.4, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientView}
          >
            <Text style={styles.cardTitleText}>{'Lifetime commission'}</Text>
            <Text style={styles.cardAmountText}>{'$0'}</Text>
          </LinearGradient>
        </Shadow>
        {true ? (
          <View style={styles.contentContainer}>
            <View style={styles.transTextView}>
              <Text style={styles.cardTitleText}>{'Transactions'}</Text>
              <TouchableOpacity
                style={styles.seeAllView}
                onPress={() => navigate('TransactionList')}
              >
                <Text style={styles.seeAllText}>{'See all'}</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={transactionList}
              showsVerticalScrollIndicator={false}
              renderItem={renderTransactionList}
              ItemSeparatorComponent={() => <View style={{ height: hp(8) }} />}
              contentContainerStyle={{ paddingBottom: hp(76) + insets.bottom }}
            />
          </View>
        ) : (
          <View
            style={{
              ...styles.emptyContainer,
              marginBottom: hp(76) + insets.bottom,
            }}
          >
            <InfoComponent
              icon={icons.transactionEmpty}
              title={'No transactions yet'}
              description={
                'Once you start creating a lead and earning money, you can keep track of your transactions here.'
              }
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadowStyle: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    zIndex: 999,
  },
  gradientView: {
    padding: wp(16),
    borderRadius: wp(8),
    backgroundColor: colors.white,
  },
  cardTitleText: {
    fontSize: fontSize(18),
    lineHeight: hp(28),
    fontFamily: fonts.semiBold,
    color: colors.xDarkGrey,
  },
  cardAmountText: {
    fontSize: fontSize(32),
    lineHeight: hp(48),
    fontFamily: fonts.bold,
    color: colors.xDarkGrey,
    marginTop: hp(4),
  },
  seeAllText: {
    fontSize: fontSize(16),
    lineHeight: hp(20),
    fontFamily: fonts.regular,
    color: colors.primary,
  },
  seeAllView: {
    paddingVertical: hp(10),
    paddingHorizontal: wp(8),
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: wp(16),
    paddingTop: hp(16),
  },
  contentContainer: {
    flex: 1,
    marginTop: hp(24),
  },
  transTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: wp(6),
  },
});
