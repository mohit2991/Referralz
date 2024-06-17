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

import { commonStyles } from '../../styles/styles';
import { colors, fontSize, fonts, hp, icons, wp } from '../../utils';

const Header = ({ title, isBackButton }) => {
  const { goBack } = useNavigation();
  return (
    <>
      <SafeAreaView style={styles.safearea} />
      <View style={styles.container}>
        <View style={styles.mainView}>
          {isBackButton && (
            <TouchableOpacity
              style={styles.backBtnView}
              onPress={() => goBack()}
            >
              <Image source={icons.backArrow} style={commonStyles.icon24} />
            </TouchableOpacity>
          )}
          {title && <Text style={styles.titleText}>{title}</Text>}
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
  titleText: {
    lineHeight: hp(30),
    fontSize: fontSize(20),
    fontFamily: fonts.bold,
    color: colors.darkBlack,
  },
  backBtnView: {
    padding: wp(8),
    marginRight: wp(8),
  },
  mainView: {
    height: hp(40),
    alignItems: 'center',
    flexDirection: 'row',
  },
});
