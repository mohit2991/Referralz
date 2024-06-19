import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { ConfirmationModal, Header } from '../../components';
import { commonStyles } from '../../styles/styles';
import { colors, fontSize, fonts, hp, icons, wp } from '../../utils';
import { profileItemList1, profileItemList2 } from '../../utils/dataConstants';
import { useNavigation } from '@react-navigation/native';
import { deleteUser, logoutUser } from '../../services/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
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

  const [userData, setUserData] = useState(initialState);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isLogoutModal, setIsLogoutModal] = useState(false);

  const renderProfileListItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item?.title === 'Log out') {
            setIsLogoutModal(true);
          } else if (item?.title === 'Delete account') {
            setIsDeleteModal(true);
          } else {
            navigate(item?.route);
          }
        }}
        style={styles.flatListItemContainer}
      >
        <View style={commonStyles.flexRowCenter}>
          <Image source={item.icon} style={commonStyles.icon24} />
          <Text style={styles.itemTitleText}>{item.title}</Text>
        </View>
        <Image source={icons.rightChevron} style={commonStyles.icon24} />
      </TouchableOpacity>
    );
  };

  const ItemSeparatorComponent = () => {
    return <View style={styles.itemSeparatorStyle} />;
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await deleteUser();
      if (response.status === 201) {
        console.log('delete Account', { response });
        await AsyncStorage.clear();
        navigate('Login');
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response.status === 201) {
        console.log('logout Account', { response });
        await AsyncStorage.clear();
        navigate('Login');
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={commonStyles.flex}>
      <Header isBackButton title={'Profile'} />
      <View style={styles.container}>
        <ScrollView bounces={false} style={styles.scrollViewStyle}>
          <View style={styles.profileContainer}>
            <Image source={userData?.download_profile_img_url !== null ? { uri: userData.download_profile_img_url } : icons.avatar} style={styles.profileImgView} />
            <View style={styles.profileNameView}>
              <Text style={styles.profileNameText}>{userData?.first_name} {userData?.last_name}</Text>
              <TouchableOpacity onPress={() => navigate('EditProfileScreen')}>
                <Text style={styles.updateInfoText}>
                  {'Update personal info'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            bounces={false}
            data={profileItemList1}
            style={styles.flatListStyle}
            renderItem={renderProfileListItem}
            ItemSeparatorComponent={ItemSeparatorComponent}
          />
          <FlatList
            bounces={false}
            data={profileItemList2}
            style={styles.flatListStyle}
            renderItem={renderProfileListItem}
            ItemSeparatorComponent={ItemSeparatorComponent}
          />
        </ScrollView>
      </View>
      <ConfirmationModal
        isVisible={isDeleteModal}
        title={'Are you sure you want to delete your account?'}
        description={
          'Once deleted, you would lose access to this account along with the saved details on Referralz'
        }
        primaryBtnText={'Yes, Delete'}
        secondaryBtnText={'Cancel'}
        primaryBtnPress={handleDeleteAccount}
        secondaryBtnPress={() => { }}
        toggleModal={() => setIsDeleteModal(!isDeleteModal)}
        primaryBtnStyle={{ backgroundColor: colors.darkRed }}
        secondaryTextStyle={{ color: colors.darkGrey }}
      />
      <ConfirmationModal
        isVisible={isLogoutModal}
        title={'Log out'}
        description={
          'Do you really want to end your session? Please confirm if you wish to log out now.'
        }
        primaryBtnText={'Log out'}
        secondaryBtnText={'Cancel'}
        primaryBtnPress={handleLogout}
        secondaryBtnPress={() => { }}
        primaryBtnStyle={{ marginTop: hp(48) }}
        toggleModal={() => setIsLogoutModal(!isLogoutModal)}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(16),
    backgroundColor: colors.xLiteGrey,
  },
  scrollViewStyle: {
    paddingTop: hp(16),
  },
  profileNameText: {
    lineHeight: hp(28),
    fontSize: fontSize(18),
    color: colors.darkBlack,
    fontFamily: fonts.semiBold,
    textTransform: 'capitalize'
  },
  updateInfoText: {
    lineHeight: hp(20),
    fontSize: fontSize(16),
    color: colors.darkBlack,
    fontFamily: fonts.regular,
    textDecorationLine: 'underline',
  },
  profileContainer: {
    padding: wp(16),
    borderRadius: wp(8),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  profileImgView: {
    width: wp(56),
    height: wp(56),
    borderRadius: wp(56),
    resizeMode: 'contain',
  },
  profileNameView: {
    marginLeft: wp(12),
  },
  itemTitleText: {
    marginLeft: wp(8),
    lineHeight: hp(24),
    fontSize: fontSize(16),
    color: colors.darkBlack,
    fontFamily: fonts.medium,
  },
  flatListStyle: {
    borderRadius: wp(8),
    marginVertical: hp(8),
    paddingVertical: hp(8),
    paddingHorizontal: wp(16),
    backgroundColor: colors.white,
  },
  itemSeparatorStyle: {
    height: hp(1),
    backgroundColor: colors.liteGrey,
  },
  flatListItemContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: hp(16),
    justifyContent: 'space-between',
  },
});
