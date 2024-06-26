import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Header, InfoComponent, Shadow, WalletItem } from '../../components';
import { useUser } from '../../contexts/userContext';
import { commonStyles } from '../../styles/styles';
import { colors, fontSize, fonts, hp, icons, wp } from '../../utils';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import useApiHandler from '../../hooks/useApiHandler';
import { getWallet } from '../../services/apiService';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const WalletScreen = () => {
  const { handleApiCall } = useApiHandler();
  const { navigate } = useNavigation();
  const insets = useSafeAreaInsets();
  const { userData } = useUser();
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getWalletData = async () => {
    const userPayload = {
      filter_by_date: 'ONE_WEEK',
    };

    await handleApiCall(
      () => getWallet(userPayload),
      async (response) => {
        if (response) {
          setWalletData(response?.data);
        }
      },
      null,
    );
  };

  useEffect(() => {
    getWalletData();
  }, []);

  useEffect(() => {
    if (walletData) {
      setLoading(false);
    }
  }, [walletData]);

  const renderTransactionList = ({ item }) => {
    return <WalletItem item={item} />;
  };

  return loading ? (
    <LoadingSpinner visible={loading} />
  ) : (
    <View style={commonStyles.flex}>
      <Header
        isAvatar
        profileImage={userData?.download_profile_img_url}
        title={'Wallet'}
      />
      <View style={styles.mainContainer}>
        <Shadow shadowStyle={styles.shadowStyle}>
          <LinearGradient
            colors={['rgba(239, 245, 247, 0.5)', 'rgba(126, 170, 188, 0.5)']}
            start={{ x: 0.4, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientView}
          >
            <Text style={styles.cardTitleText}>{'Lifetime commission'}</Text>
            <Text
              style={styles.cardAmountText}
            >
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(walletData?.left_time_commission <= 0 ? 0 : walletData?.left_time_commission)}
            </Text>
          </LinearGradient>
        </Shadow>
        {walletData?.transactions?.length ? (
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
              data={walletData?.transactions}
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
