import React from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Header } from '../../components';
import { commonStyles } from '../../styles/styles';
import { colors, fontSize, fonts, hp, icons, wp } from '../../utils';
import { profileItemList1, profileItemList2 } from '../../utils/dataConstants';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const { navigate } = useNavigation();
  const renderProfileListItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.flatListItemContainer}>
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
  return (
    <View style={commonStyles.flex}>
      <Header isBackButton title={'Profile'} />
      <View style={styles.container}>
        <ScrollView bounces={false} style={styles.scrollViewStyle}>
          <View style={styles.profileContainer}>
            <Image source={icons.avatar} style={styles.profileImgView} />
            <View style={styles.profileNameView}>
              <Text style={styles.profileNameText}>{'Adam Smita'}</Text>
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