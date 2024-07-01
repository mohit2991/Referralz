import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { View, Image, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors, fontSize, fonts, hp, icons } from '../../utils';
import LottieViewer from './LottieViewer';
import { lotties } from '../../utils/icons';

const LoadingSpinner = ({ visible, text = 'Loading...' }) => {
  return (
    <Spinner
      visible={visible}
      customIndicator={
        <View style={styles.container}>
          <LottieViewer children={undefined} source={lotties.loader} />
          <Text style={styles.spinnerTextStyle}>{text}</Text>
        </View>
      }
      overlayColor="rgba(255, 255, 255, 0.6)"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerTextStyle: {
    marginTop: hp(10),
    lineHeight: hp(24),
    fontSize: fontSize(16),
    color: colors.xDarkGrey,
    fontFamily: fonts.regular,
  },
});

export default LoadingSpinner;
