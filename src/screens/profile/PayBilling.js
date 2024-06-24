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
import { updateUserDetails } from '../../services/apiService';
import { useUser } from '../../contexts/userContext';
import useApiHandler from '../../hooks/useApiHandler';
import messages from '../../constants/messages';
import LoadingSpinner from '../../components/common/LoadingSpinner';

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
  const { handleApiCall } = useApiHandler();
  const { userData, setUserData } = useUser();
  const [payoutMethodsList, setPayoutMethodsList] = useState(
    payoutMethodsListData.map((method) => ({
      ...method,
      isSelected: method.value === userData.payment_method,
    })),
  );
  const [formData, setFormData] = useState(userData);
  const [isConditionChecked, setIsConditionChecked] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [loading, setLoading] = useState(false);
  const selectedPayoutMethod = payoutMethodsList.find(
    (method) => method.isSelected,
  );

  const onSelectPayoutMethod = (item) => {
    let updateMethodList = payoutMethodsList?.map((obj) => {
      if (item?.id === obj?.id) {
        return { ...obj, isSelected: true };
      }
      return { ...obj, isSelected: false };
    });
    setPayoutMethodsList(updateMethodList);
    setHasChanges(true);
  };

  const handleChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [field]: value,
      },
    }));
    setHasChanges(true);
  };

  const payBilling = async () => {
    setLoading(true);

    const userPayload = {
      address: {
        address: formData?.address?.address,
        name: formData?.address?.name,
        city: formData?.address?.city,
        postal_code: formData?.address?.postal_code,
        state: formData?.address?.state,
        country: formData?.address?.country,
      },
      payment_method: selectedPayoutMethod.value,
    };
    // Update user deatils API Call
    await handleApiCall(
      () => updateUserDetails(userPayload), // Call API
      async (response) => {
        // Callback respose after success
        if (response) {
          setHasChanges(false);
          setUserData((prevUserData) => ({
            ...prevUserData,
            ...userPayload,
          }));
          navigate('ProfileScreen');
        }
      },
      messages.profileSubmitted,
    );

    setLoading(false);
  };

  return (
    <View style={commonStyles.flex}>
      <LoadingSpinner visible={loading} />
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
            value={formData?.address?.address}
            maxLength={100}
            labelText={'Address'}
            onChangeText={(text) => handleChange('address', text)}
          />
          <TextInputComp
            value={formData?.address?.name}
            maxLength={100}
            labelText={'Apt, suite, etc...'}
            onChangeText={(text) => handleChange('name', text)}
          />
          <TextInputComp
            value={formData?.address?.city}
            maxLength={30}
            labelText={'City'}
            onChangeText={(text) => handleChange('city', text)}
          />
          <TextInputComp
            value={formData?.address?.state}
            maxLength={30}
            labelText={'State'}
            onChangeText={(text) => handleChange('state', text)}
            rightIcon={
              <Image source={icons.downChevron} style={commonStyles.icon24} />
            }
            onRightPress={() => { }}
          />
          <TextInputComp
            value={formData?.address?.postal_code.toString()}
            maxLength={8}
            labelText={'Postal code'}
            onChangeText={(text) => handleChange('postal_code', text)}
          />
          <TextInputComp
            value={formData?.address?.country}
            maxLength={30}
            labelText={'Country'}
            onChangeText={(text) => handleChange('country', text)}
            rightIcon={
              <Image source={icons.downChevron} style={commonStyles.icon24} />
            }
            onRightPress={() => { }}
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
        title={'Update'}
        disabled={loading || !hasChanges}
        onPress={payBilling}
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
