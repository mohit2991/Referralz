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
import { colors, fontSize, fonts, hp, icons, wp } from '../../utils';
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
import useApiHandler from '../../hooks/useApiHandler';
import messages from '../../constants/messages';

const EditProfileScreen = () => {
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
    try {
      const response = await profileImageUpdate();
      if (response.status === 201) {
        const updatedProfileImage = {
          download_profile_img_url: response?.data?.download_profile_img_url,
        };
        ToastAlert({
          type: 'success',
          description: 'Your profile has been successfully updated!',
        });
        setUserData((prevUserData) => ({
          ...prevUserData,
          ...updatedProfileImage,
        }));
      } else {
        ToastAlert({
          type: 'error',
          description: response.data,
        });
      }
    } catch (error) {
      ToastAlert({
        type: 'error',
        description: error.message,
      });
    }
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
      console.log('oookkk', { aa: response?.status });
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

  const updateProfile = async () => {
    setLoading(true);
    const userPayload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email_id: formData.email_id,
      contact_no: formData.contact_no,
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
    if (!shouldVerifyContact) {
      try {
        const response = await contactVerification(userPayload?.contact_no);
        if (response.status === 201) {
          ToastAlert({
            type: 'success',
            description: response?.data,
          });
          navigate('EditProfileVerification', { userPayload });
        } else {
          ToastAlert({
            type: 'error',
            description: response,
          });
        }
      } catch (error) {
        console.log(error.message);
        ToastAlert({
          type: 'error',
          description: error.message,
        });
      } finally {
        setLoading(false);
      }
    } else {
      // Update user deatils API Call
      handleApiCall(
        () => updateUserDetails(userPayload), // Call API
        async (response) => {
          // Callback respose after success
          if (response) {
            setHasChanges(false);
            setUserData((prevUserData) => ({
              ...prevUserData,
              ...userPayload,
            }));
          }
        },
        messages.profileSubmitted,
      );
    }
  };

  return (
    <View style={commonStyles.flex}>
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
                    ? { uri: formData.download_profile_img_url }
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
            value={formData.contact_no}
            maxLength={10}
            labelText={'Phone number'}
            onChangeText={(text) => handleChange('contact_no', text)}
            rightIcon={
              !userData?.contact_verification_status && (
                <Image
                  source={icons.info}
                  style={[commonStyles.icon24, { tintColor: colors.darkRed }]}
                />
              )
            }
            onRightPress={() => {}}
          />
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
        disabled={loading || !hasChanges}
        onPress={updateProfile}
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
  },
  uploadImgBtn: {
    marginTop: hp(8),
    padding: wp(10),
  },
  bottomPadding: {
    height: hp(30),
  },
  safeAreaViewStyle: {
    backgroundColor: colors.white,
  },
});
