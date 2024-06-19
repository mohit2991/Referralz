import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-paper';
import { colors, fontSize, fonts, hp, wp } from '../../utils';

const TextInputComp = ({
  placeholder,
  onSubmitEditing,
  onChangeText,
  onBlur,
  keyboardType,
  returnKeyType,
  defaultValue,
  value,
  secureTextEntry,
  multiline = false,
  textInputStyle,
  labelText,
  editable = true,
  additionalContainerStyle,
  LeftIcon,
  maxLength,
  rightIcon,
  onRightPress,
  autoFocus,
  inputMode,
  contentStyle,
  onFocus,
}) => {
  return (
    <View style={[styles.container, additionalContainerStyle]}>
      <TextInput
        autoCapitalize="none"
        autoFocus={autoFocus || false}
        multiline={multiline}
        placeholder={placeholder}
        disabled={!editable}
        mode="flat"
        underlineColor={colors.grey}
        activeUnderlineColor={colors.grey}
        label={<Text style={styles.labelBlurStyle}>{labelText}</Text>}
        onSubmitEditing={onSubmitEditing}
        defaultValue={defaultValue}
        keyboardType={keyboardType}
        outlineColor={colors.primary}
        maxLength={maxLength}
        value={value}
        returnKeyType={returnKeyType}
        onChangeText={onChangeText}
        onBlur={onBlur}
        left={LeftIcon && <TextInput.Icon icon={() => LeftIcon} />}
        right={
          rightIcon && (
            <TextInput.Icon icon={() => rightIcon} onPress={onRightPress} />
          )
        }
        activeOutlineColor={colors.transparent}
        editable={editable}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={colors.darkGrey}
        autoCorrect={false}
        style={StyleSheet.flatten([styles.textInputStyle, textInputStyle])}
        inputMode={inputMode}
        contentStyle={[styles.contentStyle, contentStyle]}
        cursorColor={colors.primary}
        textColor={colors.darkBlack}
        onFocus={onFocus}
      />
    </View>
  );
};

export default TextInputComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: hp(56),
    marginTop: hp(16),
    borderWidth: wp(1),
    overflow: 'hidden',
    borderRadius: wp(8),
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: colors.grey,
    backgroundColor: colors.white,
  },
  textInputStyle: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: wp(8),
    backgroundColor: colors.white,
  },
  labelFocusStyle: {
    lineHeight: hp(16),
    fontSize: fontSize(12),
    color: colors.darkGrey,
    fontFamily: fonts.regular,
  },
  labelBlurStyle: {
    lineHeight: hp(24),
    fontSize: fontSize(16),
    color: colors.grey,
    fontFamily: fonts.regular,
  },
  contentStyle: {
    fontSize: fontSize(16),
    color: colors.darkBlack,
    fontFamily: fonts.regular,
  },
});
