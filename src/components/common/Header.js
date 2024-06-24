import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { commonStyles } from '../../styles/styles';
import { colors, fontSize, fonts, hp, icons, wp } from '../../utils';

const Header = ({ title, isBackButton, isAvatar, leftIcon, profileImage }) => {
  const { goBack, navigate } = useNavigation();
  return (
    <>
      <SafeAreaView style={styles.safearea} />
      <View style={styles.container}>
        <View style={commonStyles.flexRowJustify}>
          <View style={styles.mainView}>
            {isBackButton && (
              <TouchableOpacity
                style={styles.backBtnView}
                onPress={() => goBack()}
              >
                <Image
                  source={leftIcon || icons.backArrow}
                  style={commonStyles.icon24}
                />
              </TouchableOpacity>
            )}
            {title && (
              <View style={styles.titleView}>
                <Text numberOfLines={1} style={styles.titleText}>
                  {title}
                </Text>
              </View>
            )}
          </View>
          {isAvatar && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigate('ProfileScreen')}
            >
              {profileImage ? (
                <Image
                  source={
                    profileImage !== null ? { uri: profileImage } : icons.avatar
                  }
                  style={styles.avatarStyle}
                />
              ) : (
                <SkeletonPlaceholder>
                  <SkeletonPlaceholder.Item
                    width={50}
                    height={50}
                    borderRadius={25}
                  />
                </SkeletonPlaceholder>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp(12),
    borderBottomWidth: wp(1),
    paddingHorizontal: wp(16),
    borderColor: colors.xLiteGrey,
    backgroundColor: colors.white,
  },
  safearea: {
    backgroundColor: colors.white,
  },
  titleView: {
    flex: 1,
    marginRight: wp(12),
  },
  titleText: {
    lineHeight: hp(30),
    fontSize: fontSize(20),
    fontFamily: fonts.bold,
    color: colors.darkBlack,
    textTransform: 'capitalize',
  },
  backBtnView: {
    padding: wp(8),
    marginRight: wp(8),
  },
  mainView: {
    flex: 1,
    height: hp(40),
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatarStyle: {
    width: wp(40),
    height: wp(40),
    borderWidth: wp(1),
    resizeMode: 'cover',
    borderRadius: wp(40),
    borderColor: colors.xLiteGrey,
  },
});
