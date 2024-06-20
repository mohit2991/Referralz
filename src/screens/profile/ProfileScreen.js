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
import { useUser } from '../../contexts/userContext';

const ProfileScreen = () => {
  const { navigate } = useNavigation();
  const { userData, setUserData } = useUser();
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
      if (response.status === 204) {
        await AsyncStorage.clear();
        navigate('Login');
      } else {
        console.log("delete error", response);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response.status === 201) {
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
