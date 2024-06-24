import React, { forwardRef, memo, useImperativeHandle, useRef } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import { commonStyles } from '../../styles/styles';
import { colors, fontSize, fonts, hp, icons, wp } from '../../utils';

const SearchBar = forwardRef(
  (
    {
      value,
      onBlur,
      onFocus,
      isFocus,
      isFiltered,
      placeholder,
      keyboardType,
      onChangeText,
      onClosePress,
      onFilterPress,
      onCancelPress,
    },
    ref,
  ) => {
    // const textInputRef = useRef(null);
    // useImperativeHandle(ref, () => ({
    //   blur: () => {
    //     if (textInputRef.current) {
    //       textInputRef.current.blur();
    //     }
    //   },
    // }));

    return (
      <>
        <SafeAreaView style={styles.safearea} />
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Image source={icons.search} style={commonStyles.icon24} />
            <TextInput
              ref={ref}
              value={value}
              onBlur={onBlur}
              onFocus={onFocus}
              autoCorrect={false}
              blurOnSubmit={true}
              autoCapitalize="none"
              placeholder={placeholder}
              style={styles.inputStyle}
              onChangeText={onChangeText}
              keyboardType={keyboardType}
              cursorColor={colors.primary}
              placeholderTextColor={colors.grey}
            />
            {value && (
              <TouchableOpacity onPress={onClosePress}>
                <Image source={icons.close} style={commonStyles.icon24} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.filterBtn}
            onPress={isFocus ? onCancelPress : onFilterPress}
          >
            {!isFocus ? (
              <Image source={icons.filter} style={commonStyles.icon24} />
            ) : (
              <Text style={styles.cancelText}>{'Cancel'}</Text>
            )}
            {isFiltered && <View style={styles.dot} />}
          </TouchableOpacity>
        </View>
      </>
    );
  },
);

export default memo(SearchBar);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: hp(10),
    paddingHorizontal: wp(16),
    backgroundColor: colors.white,
  },
  inputContainer: {
    flex: 1,
    padding: wp(12),
    borderRadius: wp(8),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: colors.xLiteGrey,
  },
  inputStyle: {
    flex: 1,
    paddingVertical: 0,
    fontSize: fontSize(16),
    marginHorizontal: wp(8),
    color: colors.xDarkGrey,
    fontFamily: fonts.regular,
  },
  filterBtn: {
    padding: wp(8),
    marginLeft: wp(8),
  },
  safearea: {
    backgroundColor: colors.white,
  },
  cancelText: {
    color: colors.primary,
    fontSize: fontSize(16),
    fontFamily: fonts.regular,
  },
  dot: {
    height: wp(8),
    width: wp(8),
    borderRadius: wp(8),
    backgroundColor: colors.primary,
    position: 'absolute',
    right: wp(8),
    top: hp(6),
  },
});
