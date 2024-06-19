import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';

import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { commonStyles } from '../../styles/styles';
import { colors, fontSize, fonts, hp, icons, wp } from '../../utils';
import { BottomButton, Header, TextInputComp } from '../../components';
import { updateUserDetails } from '../../services/apiService';

const EditProfileScreen = () => {
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
    "address": null,
    "company": null
  }

  const [imageUri, setImageUri] = useState(null);
  const [formData, setFormData] = useState(initialState);
  const [hasChanges, setHasChanges] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isDatePicker, setIsDatePicker] = useState(false);

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
      }
    });
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
      birth_date: moment(formData.birth_date).format('YYYY/MM/DD'),
      company_unique_code: formData.company_unique_code,
      user_unique_code: formData.user_unique_code,
    };
    console.log({ userPayload })
    try {
      const response = await updateUserDetails(userPayload);
      if (response.status === 200) {
        setHasChanges(false);
        console.log("Profile updated successfully", response)
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
              source={imageUri ? { uri: imageUri } : icons.avatar}
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
            maxLength={11}
            labelText={'Phone number'}
            onChangeText={(text) => handleChange('contact_no', text)}
            rightIcon={
              <Image
                source={icons.info}
                style={[commonStyles.icon24, { tintColor: colors.darkRed }]}
              />
            }
            onRightPress={() => { }}
          />
          <TextInputComp
            value={formData.birth_date ? moment(formData.birth_date)?.format('DD.MM.YYYY') : ""}
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
          date={formData.birth_date ?? new Date()}
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
