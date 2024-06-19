import React from 'react';
import { StyleSheet } from 'react-native';

import DropShadow from 'react-native-drop-shadow';
import { colors, hp } from '../../utils';

const Shadow = ({ children, shadowStyle }) => {
  return (
    <DropShadow style={[styles.shadowStyle, shadowStyle]}>
      {children}
    </DropShadow>
  );
};

export default Shadow;

const styles = StyleSheet.create({
  shadowStyle: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    zIndex: 999,
  },
});
