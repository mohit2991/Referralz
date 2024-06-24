import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { View, Image, Text, StyleSheet } from 'react-native';
import { icons } from '../../utils';

const LoadingSpinner = ({
  visible,
  text = 'Loading...',
  color = '#3B4248',
}) => {
  return (
    <Spinner
      visible={visible}
      customIndicator={
        <View style={styles.container}>
          <Image source={icons.loader} style={styles.spinnerIconStyle} />
          <Text style={styles.spinnerTextStyle}>{text}</Text>
        </View>
      }
      overlayColor="rgba(255, 255, 255, 0.70)"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerIconStyle: {
    width: 24,
    height: 24,
    marginBottom: 10, // Add some space between the image and the text
  },
  spinnerTextStyle: {
    color: '#3B4248',
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 24,
  },
});

export default LoadingSpinner;
