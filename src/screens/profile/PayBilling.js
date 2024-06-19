import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { BottomButton, Header, TextInputComp } from '../../components';
import { commonStyles } from '../../styles/styles';
import { colors, fontSize, fonts, hp, icons, wp } from '../../utils';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { payoutMethodsListData } from '../../utils/dataConstants';

export const PaymentMethodItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.itemContainer}
      onPress={onPress}
    >
      <View style={styles.itemTopView}>
        <View style={styles.itemTextContainer}>
          <Image source={item?.icon} style={commonStyles.icon24} />
          <View style={styles.itemTextView}>
            <Text style={styles.itemTitleText}>{item?.title}</Text>
            <Text style={styles.itemDescText}>{item?.desc}</Text>
          </View>
        </View>
        <Image
          source={item?.isSelected ? icons.activeRadio : icons.inActiveRadio}
          style={commonStyles.icon24}
        />
      </View>
    </TouchableOpacity>
  );
};

const PayBilling = () => {
  const { navigate } = useNavigation();

  const [payoutMethodsList, setPayoutMethodsList] = useState(
    payoutMethodsListData,
  );
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [isConditionChecked, setIsConditionChecked] = useState(false);

  const onSelectPayoutMethod = (item) => {
    let updateMethodList = payoutMethodsList?.map((obj) => {
      if (item?.id === obj?.id) {
        return { ...obj, isSelected: true };
      }
      return { ...obj, isSelected: false };
    });
    setPayoutMethodsList(updateMethodList);
  };

  return (
    <View style={commonStyles.flex}>
      <Header isBackButton title={'Payout and billing '} />
      <View style={commonStyles.container}>
        <KeyboardAwareScrollView
          bounces={false}
          style={styles.scrollViewStyle}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}
        >
          <Text style={styles.subTitleText}>{'Payout method'}</Text>
          <View style={styles.itemContainer}>
            {payoutMethodsList?.map((item) => {
              return (
                <>
                  <PaymentMethodItem
                    item={item}
                    onPress={() => onSelectPayoutMethod(item)}
                  />
                  <View style={styles.separator} />
                </>
              );
            })}
          </View>
          <Text style={[styles.subTitleText, { marginTop: hp(8) }]}>
            {'Billing address'}
          </Text>
          <TextInputComp
            value={fullName}
            labelText={'Full name'}
            onChangeText={(text) => setFullName(text)}
          />
          <TextInputComp
            value={address}
            labelText={'Apt, suite, etc...'}
            onChangeText={(text) => setAddress(text)}
          />
          <TextInputComp
            value={city}
            labelText={'City'}
            onChangeText={(text) => setCity(text)}
          />
          <TextInputComp
            value={state}
            labelText={'State'}
            onChangeText={(text) => setState(text)}
            rightIcon={
              <Image source={icons.downChevron} style={commonStyles.icon24} />
            }
            onRightPress={() => {}}
          />
          <TextInputComp
            value={postalCode}
            labelText={'Postal code'}
            onChangeText={(text) => setPostalCode(text)}
          />
          <TextInputComp
            value={country}
            labelText={'Country'}
            onChangeText={(text) => setCountry(text)}
            rightIcon={
              <Image source={icons.downChevron} style={commonStyles.icon24} />
            }
            onRightPress={() => {}}
          />
          <Pressable
            onPress={() => setIsConditionChecked(!isConditionChecked)}
            style={styles.conditionView}
          >
            <View
              style={[
                styles.checkBox,
                {
                  backgroundColor: !isConditionChecked
                    ? colors.primary
                    : colors.white,
                },
              ]}
            >
              {!isConditionChecked && (
                <Image source={icons.checkMark} style={commonStyles.icon24} />
              )}
            </View>
            <Text style={styles.itemTitleText}>
              {'Virtual card is the same as billing information'}
            </Text>
          </Pressable>
          <View style={styles.footerStyle} />
        </KeyboardAwareScrollView>
      </View>
      <BottomButton
        disabled={false}
        title={'Update'}
        onPress={() => navigate('ProfileScreen')}
      />
      <SafeAreaView style={styles.safeAreaViewStyle} />
    </View>
  );
};

export default PayBilling;

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    backgroundColor: colors.white,
  },
  subTitleText: {
    fontSize: fontSize(18),
    lineHeight: hp(28),
    fontFamily: fonts.semiBold,
    color: colors.xDarkGrey,
  },
  scrollViewStyle: {
    flex: 1,
    paddingTop: hp(16),
  },
  itemTitleText: {
    fontSize: fontSize(16),
    lineHeight: hp(24),
    fontFamily: fonts.medium,
    color: colors.xDarkGrey,
  },
  itemDescText: {
    fontSize: fontSize(14),
    lineHeight: hp(22),
    fontFamily: fonts.regular,
    color: colors.xDarkGrey,
  },
  separator: {
    height: hp(1),
    backgroundColor: colors.liteGrey,
  },
  itemContainer: {
    marginVertical: hp(16),
  },
  itemTopView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTextContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  itemTextView: {
    flex: 1,
    marginLeft: wp(8),
  },
  footerStyle: {
    height: hp(35),
  },
  conditionView: {
    marginTop: hp(24),
    flexDirection: 'row',
  },
  checkBox: {
    width: wp(24),
    height: wp(24),
    borderWidth: wp(1),
    marginRight: wp(16),
    borderRadius: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.primary,
  },
});
