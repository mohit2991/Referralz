import React from 'react';
import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { wp } from '../../utils';

const LottieViewer = ({ source, children, lottieStyle, loop = true }) => {
  return (
    <LottieView
      autoPlay
      loop={loop}
      source={source}
      resizeMode="contain"
      hardwareAccelerationAndroid
      style={[styles.lottieStyle, lottieStyle]}
    >
      {children}
    </LottieView>
  );
};

const styles = StyleSheet.create({
  lottieStyle: {
    width: wp(24),
    height: wp(24),
  },
});

export default LottieViewer;
