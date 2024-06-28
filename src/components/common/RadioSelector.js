import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { commonStyles } from '../../styles/styles';
import { colors, fontSize, fonts, hp, icons, wp } from '../../utils';

const RadioSelector = ({
  text,
  value,
  onPress,
  multiSelect,
  containerStyle,
  isRightIcon = true,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[commonStyles.flexRowJustify, containerStyle]}
    >
      <Text style={styles.radioText}>{text}</Text>
      {isRightIcon && (
        <View>
          {!multiSelect ? (
            <Image
              style={commonStyles.icon24}
              source={value ? icons.activeRadio : icons.inActiveRadio}
            />
          ) : (
            <View
              style={[
                styles.checkBox,
                {
                  backgroundColor: value ? colors.primary : colors.white,
                  borderColor: value ? colors.primary : colors.grey0,
                },
              ]}
            >
              {value && (
                <Image source={icons.checkMark} style={commonStyles.icon24} />
              )}
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default RadioSelector;

const styles = StyleSheet.create({
  radioText: {
    lineHeight: hp(24),
    fontSize: fontSize(16),
    color: colors.xDarkGrey,
    fontFamily: fonts.regular,
  },
  checkBox: {
    width: wp(24),
    height: wp(24),
    borderWidth: wp(1),
    borderRadius: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
