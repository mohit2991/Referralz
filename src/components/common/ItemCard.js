import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Shadow from './Shadow';
import { colors, wp } from '../../utils';
import { commonStyles } from '../../styles/styles';

const ItemCard = ({
  children,
  shadowStyle,
  onItemPress,
  cardContainerStyle,
}) => {
  return (
    <Shadow shadowStyle={[commonStyles.flex, shadowStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onItemPress}
        style={[styles.cardContainer, cardContainerStyle]}
      >
        {children}
      </TouchableOpacity>
    </Shadow>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  cardContainer: {
    padding: wp(16),
    borderRadius: wp(12),
    backgroundColor: colors.white,
  },
});
