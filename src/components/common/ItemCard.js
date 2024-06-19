import { StyleSheet, View } from 'react-native';
import React from 'react';
import Shadow from './Shadow';
import { colors, wp } from '../../utils';
import { commonStyles } from '../../styles/styles';

const ItemCard = ({ children, cardContainerStyle, shadowStyle }) => {
  return (
    <Shadow shadowStyle={[commonStyles.flex, shadowStyle]}>
      <View style={[styles.cardContainer, cardContainerStyle]}>{children}</View>
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
