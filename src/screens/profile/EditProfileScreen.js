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

const EditProfileScreen = () => {
  const { navigate } = useNavigation();

  const [firstName, setFirstName] = useState('Adam');
  const [lastName, setLastName] = useState('Smith');
  const [email, setEmail] = useState('adam.smith@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('(518) 744-6291');
  const [dob, setDob] = useState(new Date());
  const [companyCode, setCompanyCode] = useState('');
  const [userCode, setUserCode] = useState('');
  const [imageUri, setImageUri] = useState(null);

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
            value={firstName}
            labelText={'First name'}
            onChangeText={(text) => setFirstName(text)}
          />
          <TextInputComp
            value={lastName}
            labelText={'Last name'}
            onChangeText={(text) => setLastName(text)}
          />
          <TextInputComp
            editable={false}
            value={email}
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
            value={phoneNumber}
            labelText={'Phone number'}
            onChangeText={(text) => setPhoneNumber(text)}
            rightIcon={
              <Image
                source={icons.info}
                style={[commonStyles.icon24, { tintColor: colors.darkRed }]}
              />
            }
            onRightPress={() => {}}
          />
          <TextInputComp
            value={moment(dob)?.format('DD.MM.YYYY')}
            labelText={'Date of birth'}
            onChangeText={(text) => setDob(text)}
            rightIcon={
              <Image source={icons.calendar} style={commonStyles.icon24} />
            }
            onRightPress={() => setIsDatePicker(true)}
            editable={false}
            onFocus={() => setIsDatePicker(true)}
          />
          <TextInputComp
            value={companyCode}
            labelText={'Company code'}
            onChangeText={(text) => setCompanyCode(text)}
          />
          <TextInputComp
            value={userCode}
            labelText={'User code'}
            onChangeText={(text) => setUserCode(text)}
          />
          <View style={styles.bottomPadding} />
        </KeyboardAwareScrollView>
      </View>
      <BottomButton
        title={'Update'}
        onPress={() => navigate('EditProfileVerification')}
      />
      <SafeAreaView style={styles.safeAreaViewStyle} />
      {isDatePicker && (
        <DatePicker
          modal
          open={isDatePicker}
          date={dob}
          onConfirm={(date) => {
            setIsDatePicker(false);
            setDob(date);
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
