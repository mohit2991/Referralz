import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';

import moment from 'moment';
import axios from 'axios';
import RNFS from 'react-native-fs';
import { Buffer } from 'buffer';
import DatePicker from 'react-native-date-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { commonStyles } from '../../styles/styles';
import { colors, fontSize, fonts, hp, icons, isIos, wp } from '../../utils';
import {
  BottomButton,
  Header,
  TextInputComp,
  ToastAlert,
} from '../../components';
import {
  updateUserDetails,
  profileImageUpdate,
  contactVerification,
} from '../../services/apiService';
import { useUser } from '../../contexts/userContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useApiHandler from '../../hooks/useApiHandler';
import messages from '../../constants/messages';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const EditProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const { navigate } = useNavigation();
  const { handleApiCall } = useApiHandler();
  const route = useRoute();
  const { userData, setUserData } = useUser();
  const [imageUri, setImageUri] = useState(null);
  const [formData, setFormData] = useState(userData);
  const [hasChanges, setHasChanges] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDatePicker, setIsDatePicker] = useState(false);

  useEffect(() => {
    if (route.params?.fromVerification) {
      setHasChanges(false);
    }
  }, [route.params]);

  const pickImage = () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.assets[0].uri;
        setImageUri(uri);
        uploadProfileImage(response.assets[0]);
      }
    });
  };

  const profileImageHandle = async () => {
    setLoading(true);

    // Update User Deatils API Call
    await handleApiCall(
      () => profileImageUpdate(), // Call API
      async (response) => {
        // Callback respose after success
        if (response) {
          const updatedProfileImage = {
            download_profile_img_url: response?.data?.download_profile_img_url,
          };

          setUserData((prevUserData) => ({
            ...prevUserData,
            ...updatedProfileImage,
          }));
        }
      },
      messages.profileSubmitted,
    );

    setLoading(false);
  };

  const uploadProfileImage = async (image) => {
    const binaryFile = await RNFS.readFile(image.uri, 'base64');
    const binaryData = Buffer.from(binaryFile, 'base64');
    try {
      const response = await axios.put(
        formData.upload_profile_img_url,
        binaryData,
        {
          headers: {
            'Content-Type': image.type,
            'Content-Length': binaryData.length,
          },
        },
      );

      if (response.status === 200) {
        profileImageHandle();
      } else {
        ToastAlert({
          type: 'error',
          description: response.data,
        });
      }
    } catch (error) {
      console.log({ error });
      ToastAlert({
        type: 'error',
        description: error.message,
      });
    }
  };

  const handleChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    setHasChanges(true);
  };

  const handlePhoneNumberChange = (text) => {
    if (text === "+91 " || text === "+91") {
      text = "";
    } else if (!text.startsWith("+91 ") && text.length > 0) {
      text = "+91 " + text.replace("+91 ", "");
    }
    handleChange("contact_no", text);
  };


  const isReadyToEdit = () => {
    if (
      formData.first_name !== '' &&
      formData.last_name !== '' &&
      formData.email_id !== '' &&
      formData.contact_no !== '' &&
      formData.birth_date !== '' &&
      formData.contact_no?.length === 14
    ) {
      return false;
    } else {
      return true;
    }
  };

  const updateProfile = async () => {
    setLoading(true);

    const userPayload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email_id: formData.email_id,
      contact_no: formData.contact_no.replace("+91 ", ""),
      birth_date: formData.birth_date
        ? moment(formData.birth_date, 'YYYY/MM/DD').format('YYYY/MM/DD')
        : null,
      company_unique_code: formData.company_unique_code
        ? formData.company_unique_code
        : null,
      user_unique_code: formData.user_unique_code,
    };

    const shouldVerifyContact =
      userPayload?.contact_no !== userData?.contact_no
        ? false
        : !userData?.contact_verification_status
          ? false
          : true;

    console.log({ bbbb: userPayload })
    if (!shouldVerifyContact) {
      // Update User Deatils API Call
      await handleApiCall(
        () => contactVerification(userPayload?.contact_no), // Call API
        async (response) => {
          // Callback respose after success
          if (response) {
            navigate('EditProfileVerification', { userPayload });
          }
        },
      );

      setLoading(false);
    } else {
      // Update User Deatils API Call
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
    }
  };

  return (
    <View style={commonStyles.flex}>
      <LoadingSpinner visible={loading} />
      <Header isBackButton title={'Edit profile'} />
      <View style={commonStyles.container}>
        <KeyboardAwareScrollView
          bounces={false}
          style={styles.scrollViewStyle}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}
        >
          <View style={styles.profileContainer}>
            <Image
              source={
                imageUri
                  ? { uri: imageUri }
                  : formData?.download_profile_img_url !== null
                    ? { uri: formData?.download_profile_img_url }
                    : icons.avatar
              }
              style={styles.profileImgStyle}
            />
            <TouchableOpacity style={styles.uploadImgBtn} onPress={pickImage}>
              <Text style={styles.uploadImgText}>{'Upload image'}</Text>
            </TouchableOpacity>
          </View>
          <TextInputComp
            value={formData.first_name}
            maxLength={20}
            labelText={'First name'}
            onChangeText={(text) => handleChange('first_name', text)}
          />
          <TextInputComp
            value={formData.last_name}
            maxLength={20}
            labelText={'Last name'}
            onChangeText={(text) => handleChange('last_name', text)}
          />
          <TextInputComp
            editable={false}
            value={formData.email_id}
            labelText={'Email'}
            textInputStyle={{
              backgroundColor: colors.mediumGrey,
            }}
            additionalContainerStyle={{
              borderColor: colors.liteGrey,
            }}
            contentStyle={{
              color: colors.grey,
            }}
          />
          <TextInputComp
            value={formData.contact_no.startsWith('+91 ') ? formData.contact_no : `+91 ${formData.contact_no}`}
            maxLength={14}
            keyboardType={'number-pad'}
            labelText={'Phone number'}
            onChangeText={handlePhoneNumberChange}
            rightIcon={
              !userData?.contact_verification_status && (
                <Image
                  source={icons.info}
                  style={[commonStyles.icon24, { tintColor: colors.darkRed }]}
                />
              )
            }
          />
          {!formData.contact_no.startsWith('+91 ') && (formData.contact_no?.length !== 10 && formData.contact_no !== '') && (
            <Text style={styles.errText}>
              Length of Phone number should be 10.
            </Text>
          )}
          <TextInputComp
            value={
              formData.birth_date
                ? moment(formData.birth_date, 'YYYY/MM/DD').format('DD.MM.YYYY')
                : ''
            }
            labelText={'Date of birth'}
            onChangeText={(text) => handleChange('birth_date', text)}
            rightIcon={
              <Image source={icons.calendar} style={commonStyles.icon24} />
            }
            onRightPress={() => setIsDatePicker(true)}
            editable={false}
            onFocus={() => setIsDatePicker(true)}
          />
          <TextInputComp
            value={formData.company_unique_code}
            maxLength={6}
            labelText={'Company code'}
            keyboardType={'number-pad'}
            onChangeText={(text) => handleChange('company_unique_code', text)}
          />
          <TextInputComp
            value={formData.user_unique_code}
            maxLength={6}
            labelText={'User code'}
            onChangeText={(text) => handleChange('user_unique_code', text)}
          />
          <View style={styles.bottomPadding} />
        </KeyboardAwareScrollView>
      </View>
      <BottomButton
        title={'Update'}
        disabled={loading || !hasChanges || isReadyToEdit()}
        onPress={updateProfile}
      />
      <View
        style={{
          backgroundColor: colors.white,
          height: isIos ? (insets.bottom === 0 ? hp(12) : 0) : 0,
        }}
      />
      <SafeAreaView style={styles.safeAreaViewStyle} />
      {isDatePicker && (
        <DatePicker
          modal
          open={isDatePicker}
          date={
            formData.birth_date
              ? new Date(moment(formData.birth_date, 'YYYY/MM/DD'))
              : new Date()
          }
          onConfirm={(date) => {
            setIsDatePicker(false);
            handleChange('birth_date', date);
          }}
          onCancel={() => {
            setIsDatePicker(false);
          }}
          buttonColor={colors.primary}
          mode="date"
          maximumDate={new Date()}
          dividerColor={colors.primary}
          title={'Select Date of Birth'}
        />
      )}
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  scrollViewStyle: {
    flex: 1,
    paddingTop: hp(16),
  },
  uploadImgText: {
    lineHeight: hp(20),
    color: colors.primary,
    fontSize: fontSize(16),
    fontFamily: fonts.regular,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: hp(8),
  },
  profileImgStyle: {
    width: wp(80),
    height: wp(80),
    borderRadius: wp(80),
    borderWidth: wp(1),
    borderColor: colors.xLiteGrey,
  },
  uploadImgBtn: {
    marginTop: hp(8),
    padding: wp(10),
  },
  bottomPadding: {
    height: hp(70),
  },
  safeAreaViewStyle: {
    backgroundColor: colors.white,
  },
  errText: {
    marginTop: hp(4),
    lineHeight: hp(16),
    color: colors.darkRed,
    fontSize: fontSize(12),
    fontFamily: fonts.regular,
  },
});
