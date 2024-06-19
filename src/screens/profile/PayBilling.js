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
    "download_profile_img_url": null,
    "upload_profile_img_url": "https://storage.googleapis.com/referralz-public/referralz/user_29/profile_img?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=cs-cf-cst-service-account%40homespark-409114.iam.gserviceaccount.com%2F20240619%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240619T051343Z&X-Goog-Expires=604800&X-Goog-SignedHeaders=host&X-Goog-Signature=85139a7fb5fa0e1fddc3e17d6d6ee4613b9052f7912e4463f692e3ef1d5126b04dcfda0bb587569293a97476539d6de75dfc976880665fd139a24c0a6f68c5744916fffc9ce4f217fae4a67d5343f923f82120098d23f31b2c5a4734fe712eed841378c0d6d43d8e8ab7d7eb623c7c406cb9e664ab6e1df7cb38dcb5624e3f28dbd06a15cedf0fdf29b922061e09b33a5ac13231331ba691987472851bc907c0d902c1ef150e07221626a626a678f6972cd776c40bdeeb2ef62304125b28d55d8363d8b612f1f42fa1b5a0f87b87b47df9ba8a10bc413d3c55b2010c1672506061b768c49df495059f888cbbab4426083ee11b933ee35c995c9e2703911bcb85",
    "img_upload_status": false,
    "created_on": "2024-06-19T05:13:11.456653",
    "updated_on": "2024-06-19T05:13:11.508125",
    "address": {
      "address": "checking",
      "name": "aaa",
      "city": "New York",
      "postalCode": 123456,
      "state": "Nevada",
      "country": "US"
    },
    "company": null
  }
  const [payoutMethodsList, setPayoutMethodsList] = useState(
    payoutMethodsListData,
  );
  const [formData, setFormData] = useState(initialState);
  const [isConditionChecked, setIsConditionChecked] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [loading, setLoading] = useState(false);
  const selectedPayoutMethod = payoutMethodsList.find(method => method.isSelected);

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
        postal_code: formData?.address?.postalCode,
        state: formData?.address?.state,
        country: formData?.address?.country
      },
      payment_method: selectedPayoutMethod.value
    };

    try {
      const response = await updateUserDetails(userPayload);
      if (response.status === 200) {
        setHasChanges(false);
        console.log("pay billing successfully", response)
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
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
            maxLength={20}
            labelText={'City'}
            onChangeText={(text) => handleChange('city', text)}
          />
          <TextInputComp
            value={formData?.address?.state}
            maxLength={100}
            labelText={'State'}
            onChangeText={(text) => handleChange('state', text)}
            rightIcon={
              <Image source={icons.downChevron} style={commonStyles.icon24} />
            }
            onRightPress={() => { }}
          />
          <TextInputComp
            value={formData?.address?.postalCode}
            labelText={'Postal code'}
            onChangeText={(text) => handleChange('postal_code', text)}
          />
          <TextInputComp
            value={formData?.address?.country}
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
