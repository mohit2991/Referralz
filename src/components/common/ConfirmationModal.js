import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Modal from 'react-native-modal';

import Button from './Button';
import { colors, fontSize, fonts, hp, wp } from '../../utils';

const ConfirmationModal = ({
  title,
  loading,
  isVisible,
  toggleModal,
  description,
  primaryBtnText,
  primaryBtnPress,
  primaryBtnStyle,
  secondaryBtnText,
  primaryTextStyle,
  secondaryBtnPress,
  secondaryBtnStyle,
  secondaryTextStyle,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      onBackdropPress={toggleModal}
    >
      <View style={styles.modalContent}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.descriptionText}>{description}</Text>
        <Button
          loading={loading}
          title={primaryBtnText}
          onPress={primaryBtnPress}
          customTitleStyle={primaryTextStyle}
          customBtnStyle={[styles.primaryButton, primaryBtnStyle]}
        />
        <TouchableOpacity
          hitSlop={15}
          onPress={() => {
            toggleModal();
            secondaryBtnPress();
          }}
          style={[styles.secondaryButton, secondaryBtnStyle]}
        >
          <Text style={[styles.secondaryText, secondaryTextStyle]}>
            {secondaryBtnText || 'Cancel'}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
  modalContent: {
    alignItems: 'center',
    borderRadius: wp(12),
    paddingVertical: hp(10),
    paddingHorizontal: hp(16),
    backgroundColor: colors.white,
  },
  titleText: {
    lineHeight: hp(28),
    textAlign: 'center',
    fontSize: fontSize(18),
    color: colors.xDarkGrey,
    fontFamily: fonts.semiBold,
  },
  descriptionText: {
    marginTop: hp(24),
    lineHeight: hp(22),
    textAlign: 'center',
    fontSize: fontSize(14),
    color: colors.xDarkGrey,
    fontFamily: fonts.regular,
  },
  primaryButton: {
    width: '100%',
    marginTop: hp(26),
  },
  secondaryButton: {
    marginTop: hp(24),
    marginBottom: hp(10),
  },
  secondaryText: {
    lineHeight: hp(20),
    textAlign: 'center',
    color: colors.primary,
    fontSize: fontSize(16),
    fontFamily: fonts.regular,
  },
});
