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
import axios from 'axios';
import DatePicker from 'react-native-date-picker';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { commonStyles } from '../../styles/styles';
import { colors, fontSize, fonts, hp, icons, wp } from '../../utils';
import { BottomButton, Header, TextInputComp } from '../../components';
import { updateUserDetails, profileImageUpdate } from '../../services/apiService';

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
    "download_profile_img_url": "https://storage.googleapis.com/referralz-public/referralz/user_29/profile_img?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=cs-cf-cst-service-account%40homespark-409114.iam.gserviceaccount.com%2F20240619%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240619T093558Z&X-Goog-Expires=604800&X-Goog-SignedHeaders=host&X-Goog-Signature=11b9b8a72d81dce37ac69be55beb6ed84621a4e5de996e8026cb6daf53b68f584277e8da3762e8e06af283a595401ef20c032718f42289782175c8b4aabe20d32dd310b7d34649b8091d4c097df322294021997961080c8401a8093c64e20eeb2f902bc171557ecdc44ae640585e7baa3a92917f47b663d3128ff8d0d957b43f87626fde0c309fde1fabdf0cf6e4135452f2f5dcc296beea588178e245853c10ad499593adae74f8157ddd64f490d58b972fbe29a903442f7c04fdc0b0a8c737354fcbe36e203069aad500cf4c3906a7c09266f4e8e5b10aeb94819b088b7c6d1da8e266d6e0a5f58ea61235e201f4643e94740a81615914c9a4f1a290039690",
    "upload_profile_img_url": "https://storage.googleapis.com/referralz-public/referralz/user_29/profile_img?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=cs-cf-cst-service-account%40homespark-409114.iam.gserviceaccount.com%2F20240619%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240619T083217Z&X-Goog-Expires=604800&X-Goog-SignedHeaders=host&X-Goog-Signature=32b97859170df7b35f78c7d621fd935a6456dcd64d6d70eed4d6634befef93f7241c055b673119f5c705f104de621624c11479ee38b7b94a1d9c4b7ce8d42a509724248ec5dc681e57e6a61c0e1b3e5af76335518cf95974848e136a7e8af5885e1585119ebed14fd6302c6372a1bfbb38b5c42d7ba538e13f388746c0b76781f69139e774fe731145b83ccd279b1dd24bb79f6287b1432335ed8ab7de057692b0a3722e7eb4788ade4472b53b0e20051b3cf3f534a21fc5eee2220654490a215a38a4dbd9f0974ae43d60cece422003bde71e08441bf363b6cedf41c67a32072617c25a8f1ea7574cf8d5635b566e5be7e6e98393a6068b84b169f6306f6fdc",
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
        uploadProfileImage(response.assets[0]);
      }
    });
  };

  const profileImageHandle = async () => {
    try {
      const response = await profileImageUpdate();
      if (response.status === 200) {
        console.log("Image uploaded successfully", response)
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const uploadProfileImage = async (image) => {
    const imgData = new FormData();
    imgData.append('file', {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    });
    try {
      const response = await axios.post(formData.upload_profile_img_url, imgData, {
        headers: {
          'Content-Type': image.type,
        },
      });
      if (response.status === 200) {
        profileImageHandle()
      } else {
        console.log("aa", response.data);
      }
    } catch (error) {
      console.log(error.message);
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
      birth_date: moment(formData.birth_date).format('YYYY/MM/DD'),
      company_unique_code: formData.company_unique_code,
      user_unique_code: formData.user_unique_code,
    };
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
              source={imageUri ? { uri: imageUri } : formData?.download_profile_img_url !== null ? { uri: formData.download_profile_img_url } : icons.avatar}
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
