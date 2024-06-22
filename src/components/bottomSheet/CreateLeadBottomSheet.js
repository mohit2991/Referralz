import {
  FlatList,
  Image,
  PanResponder,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import { colors, fontSize, fonts, hp, icons, isIos, wp } from '../../utils';
import TextInputComp from '../common/TextInputComp';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { commonStyles } from '../../styles/styles';
import BottomButton from '../common/BottomButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InfoComponent from '../common/InfoComponent';
import { Dropdown } from 'react-native-element-dropdown';
import RadioSelector from '../common/RadioSelector';
import { launchImageLibrary } from 'react-native-image-picker';

const CreateLeadBottomSheet = ({ isOpen = false, onClose = () => {} }) => {
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef(null);
  const sourceDDRef = useRef(null);
  const priorityDDRef = useRef(null);
  const oopsProgramDDRef = useRef(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [aptSuit, setAptSuit] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');

  //   const [height, setHeight] = useState(100);

  //   const minHeight = 0;
  //   const maxHeight = 300;

  //   const panResponder = useRef(
  //     PanResponder.create({
  //       onStartShouldSetPanResponder: () => true,
  //       onPanResponderMove: (e, gestureState) => {
  //         let newHeight = height + gestureState.dy;
  //         if (newHeight < minHeight) newHeight = minHeight;
  //         if (newHeight > maxHeight) newHeight = maxHeight;
  //         setHeight(newHeight);
  //       },
  //       onPanResponderRelease: (e, gestureState) => {
  //         let newHeight = height + gestureState.dy;
  //         if (newHeight < minHeight) newHeight = minHeight;
  //         if (newHeight > maxHeight) newHeight = maxHeight;
  //         setHeight(newHeight);
  //       },
  //     }),
  //   ).current;

  const snapPoints = useMemo(() => [isIos ? '88%' : '92%'], []);

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isOpen]);

  const [leadSource, setLeadSource] = useState('Select');
  const [isSourceFocus, setIsSourceFocus] = useState(false);
  const [leadPriority, setLeadPriority] = useState('Normal');
  const [isPriorityFocus, setIsPriorityFocus] = useState(false);
  const [oopsProgram, setOopsProgram] = useState('Select');
  const [isOopsProgramFocus, setIsoopsProgramFocus] = useState(false);

  const leadSourceData = [
    { label: 'Label1', value: '1' },
    { label: 'Label2', value: '2' },
    { label: 'Label3', value: '3' },
    { label: 'Label4', value: '4' },
  ];

  const oopsProgramData = [
    { label: 'Label1', value: '1' },
    { label: 'Label2', value: '2' },
    { label: 'Label3', value: '3' },
    { label: 'Label4', value: '4' },
  ];

  const leadPriorityData = [
    { label: 'Low', value: '1' },
    { label: 'Normal', value: '2' },
    { label: 'High', value: '3' },
    { label: 'Urgent', value: '4' },
  ];

  const [imageData, setImageData] = useState([
    {
      id: 1,
      imgUri: '',
    },
  ]);

  const pickImage = () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.assets[0].uri;
        const imgObj = {
          id: imageData?.length + 1,
          imgUri: uri,
        };
        setImageData((prevData) => [...prevData, imgObj]);
      }
    });
  };

  const renderImageItems = ({ item, index }) => {
    return (
      <>
        {index === 0 && imageData?.length <= 10 ? (
          <TouchableOpacity onPress={pickImage} style={styles.addFileView}>
            <>
              <Image
                source={icons.add}
                style={{ ...commonStyles.icon24, tintColor: colors.xDarkGrey }}
              />
              <Text style={styles.addFileText}>{'Add file'}</Text>
            </>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity disabled={true} style={styles.addFileView}>
            <Image
              source={{ uri: item?.imgUri }}
              style={{ width: '100%', height: '100%' }}
            />
          </TouchableOpacity>
        )}
      </>
    );
  };

  const renderSourceDDItems = (item) => {
    return (
      <View style={styles.ddItemsView}>
        <RadioSelector
          value={item?.label === leadSource}
          text={item?.label}
          onPress={() => {
            setLeadSource(item?.label);
            setIsSourceFocus(false);
            sourceDDRef.current.close();
          }}
        />
      </View>
    );
  };

  const renderOopsDDItems = (item) => {
    return (
      <View style={styles.ddItemsView}>
        <RadioSelector
          value={item?.label === oopsProgram}
          text={item?.label}
          onPress={() => {
            setOopsProgram(item?.label);
            setIsoopsProgramFocus(false);
            oopsProgramDDRef.current.close();
          }}
        />
      </View>
    );
  };

  const renderPriorityDDItems = (item) => {
    return (
      <View style={styles.ddItemsView}>
        <RadioSelector
          value={item?.label === leadPriority}
          text={item?.label}
          onPress={() => {
            setLeadPriority(item?.label);
            setIsPriorityFocus(false);
            priorityDDRef.current.close();
          }}
        />
      </View>
    );
  };

  return (
    <Portal>
      <BottomSheet
        ref={bottomSheetRef}
        index={isOpen ? 0 : -1}
        snapPoints={snapPoints}
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
        )}
        handleIndicatorStyle={styles.handleIndicatorStyle}
        style={styles.bottomSheetContainer}
        onClose={onClose}
        enablePanDownToClose={false}
        backgroundStyle={{ backgroundColor: 'transparent' }}
        android_keyboardInputMode="adjustResize"
        keyboardBlurBehavior="restore"
      >
        <View style={styles.bottoSheetModalStyle}>
          <View style={styles.container}>
            <View style={styles.headerView}>
              <Text style={styles.headerText}>{'Create a new lead'}</Text>
              <TouchableOpacity style={styles.closeTextView} onPress={onClose}>
                <Text style={styles.closeText}>{'Close'}</Text>
              </TouchableOpacity>
            </View>
            {true ? (
              <View style={{ flex: 1 }}>
                <KeyboardAwareScrollView
                  scrollEnabled={true}
                  enableOnAndroid
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.keyboardAwareStyle}
                  extraScrollHeight={hp(100)}
                >
                  <View>
                    <TextInputComp
                      editable={false}
                      value={leadSource}
                      labelText={'Source'}
                      rightIcon={
                        <Image
                          source={icons.downChevron}
                          style={[
                            commonStyles.icon24,
                            {
                              transform: [
                                {
                                  rotate: !isSourceFocus ? `0deg` : `${180}deg`,
                                },
                              ],
                            },
                          ]}
                        />
                      }
                      onRightPress={() => {
                        sourceDDRef.current.open();
                      }}
                    />
                    <Dropdown
                      ref={sourceDDRef}
                      style={styles.dropdown}
                      data={leadSourceData}
                      labelField="label"
                      valueField="value"
                      value={leadSource}
                      onFocus={() => setIsSourceFocus(true)}
                      onBlur={() => setIsSourceFocus(false)}
                      onChange={(item) => {
                        setLeadSource(item?.label);
                        setIsSourceFocus(false);
                      }}
                      renderItem={renderSourceDDItems}
                    />
                  </View>
                  <View>
                    <TextInputComp
                      editable={false}
                      value={oopsProgram}
                      labelText={'Oops program'}
                      rightIcon={
                        <Image
                          source={icons.downChevron}
                          style={[
                            commonStyles.icon24,
                            {
                              transform: [
                                {
                                  rotate: !isOopsProgramFocus
                                    ? `0deg`
                                    : `${180}deg`,
                                },
                              ],
                            },
                          ]}
                        />
                      }
                      onRightPress={() => {
                        oopsProgramDDRef.current.open();
                      }}
                    />
                    <Dropdown
                      ref={oopsProgramDDRef}
                      style={styles.dropdown}
                      data={oopsProgramData}
                      labelField="label"
                      valueField="value"
                      value={leadSource}
                      onFocus={() => setIsoopsProgramFocus(true)}
                      onBlur={() => setIsoopsProgramFocus(false)}
                      onChange={(item) => {
                        setOopsProgram(item?.label);
                        setIsoopsProgramFocus(false);
                      }}
                      renderItem={renderOopsDDItems}
                    />
                  </View>
                  <View>
                    <TextInputComp
                      editable={false}
                      value={leadPriority}
                      labelText={'Lead priority'}
                      rightIcon={
                        <Image
                          source={icons.downChevron}
                          style={[
                            commonStyles.icon24,
                            {
                              transform: [
                                {
                                  rotate: !isPriorityFocus
                                    ? `0deg`
                                    : `${180}deg`,
                                },
                              ],
                            },
                          ]}
                        />
                      }
                      onRightPress={() => {
                        priorityDDRef.current.open();
                      }}
                    />
                    <Dropdown
                      ref={priorityDDRef}
                      style={styles.dropdown}
                      data={leadPriorityData}
                      labelField="label"
                      valueField="value"
                      value={leadPriority}
                      onFocus={() => setIsPriorityFocus(true)}
                      onBlur={() => setIsPriorityFocus(false)}
                      onChange={(item) => {
                        setLeadPriority(item?.label);
                        setIsPriorityFocus(false);
                      }}
                      renderItem={renderPriorityDDItems}
                    />
                  </View>
                  <View style={styles.titleView}>
                    <Text style={styles.headerText}>
                      {'Contact information'}
                    </Text>
                    <Text style={styles.descText}>
                      {'Main information about contact for this lead.'}
                    </Text>
                  </View>
                  <TextInputComp
                    value={firstName}
                    maxLength={20}
                    labelText={'First name'}
                    onChangeText={(text) => setFirstName(text)}
                  />
                  <TextInputComp
                    value={lastName}
                    maxLength={20}
                    labelText={'Last name'}
                    onChangeText={(text) => setLastName(text)}
                  />
                  <TextInputComp
                    value={phoneNumber}
                    //   maxLength={20}
                    labelText={'Phone number'}
                    onChangeText={(text) => setPhoneNumber(text)}
                  />
                  <TextInputComp
                    value={email}
                    labelText={'Email address (Optional)'}
                    onChangeText={(text) => setEmail(text)}
                  />

                  <View style={styles.titleView}>
                    <Text style={styles.headerText}>{'Lead address'}</Text>
                    <Text style={styles.descText}>
                      {'Precise data regarding the address of lead.'}
                    </Text>
                  </View>
                  <TextInputComp
                    value={address}
                    labelText={'Address'}
                    onChangeText={(text) => setAddress(text)}
                  />
                  <TextInputComp
                    value={aptSuit}
                    labelText={'Apt, suite, etc...'}
                    onChangeText={(text) => setAptSuit(text)}
                  />
                  <TextInputComp
                    value={city}
                    labelText={'City'}
                    onChangeText={(text) => setCity(text)}
                  />
                  <TextInputComp
                    value={postalCode}
                    labelText={'Postal code'}
                    onChangeText={(text) => setPostalCode(text)}
                  />
                  <TextInputComp
                    value={state}
                    labelText={'State'}
                    onChangeText={(text) => setState(text)}
                  />
                  <TextInputComp
                    value={country}
                    labelText={'Country'}
                    onChangeText={(text) => setCountry(text)}
                  />

                  <View style={styles.titleView}>
                    <Text style={styles.headerText}>{'Description'}</Text>
                    <Text style={styles.descText}>
                      {`Brief overview of the lead's nature and requirements.`}
                    </Text>
                  </View>
                  <View style={{ marginTop: hp(16) }}>
                    <TextInput
                      textAlignVertical="top"
                      style={[styles.textInput]}
                      multiline={true}
                      value={description}
                      onChangeText={(text) => setDescription(text)}
                    />
                    {/* <View {...panResponder.panHandlers} style={styles.resizeHandle}>
                <Image source={icons.expander} style={commonStyles.icon24} />
              </View> */}
                  </View>

                  <View style={styles.titleView}>
                    <Text style={styles.headerText}>
                      {'Upload attachments (Optional)'}
                    </Text>
                    <Text style={styles.descText}>
                      {`Include any relevant images or reports of damage by adding up to 10 files. The maximum size for each image is 5 MB.`}
                    </Text>
                  </View>
                  <FlatList
                    key={1}
                    data={imageData}
                    renderItem={renderImageItems}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => (
                      <View style={{ width: wp(8) }} />
                    )}
                    style={{
                      marginVertical: hp(16),
                    }}
                  />
                </KeyboardAwareScrollView>
                <BottomButton
                  title={'Create lead'}
                  disabled={false}
                  onPress={() => {}}
                />
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <InfoComponent
                  icon={icons.successIcon}
                  title={'Success!'}
                  description={
                    'Your lead has been successfully submitted. Our team will review the details and get in touch shortly. Thank you for providing the information!"'
                  }
                />
              </View>
            )}
            <View style={{ height: insets.bottom + 8 }} />
          </View>
        </View>
      </BottomSheet>
    </Portal>
  );
};

export default CreateLeadBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    alignItems: 'center',
    borderBottomWidth: wp(1),
    borderColor: colors.xLiteGrey,
    paddingBottom: hp(22),
  },
  bottoSheetModalStyle: {
    flex: 1,
  },
  handleIndicatorStyle: {
    backgroundColor: colors.grey0,
    height: hp(5),
    width: wp(36),
    borderRadius: wp(36),
  },
  bottomSheetContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: wp(12),
    borderTopRightRadius: wp(12),
    zIndex: 1,
  },
  keyboardAwareStyle: {
    paddingBottom: hp(100),
    paddingHorizontal: wp(16),
  },
  headerText: {
    lineHeight: hp(28),
    fontSize: fontSize(18),
    fontFamily: fonts.semiBold,
    color: colors.xDarkGrey,
  },
  titleView: {
    marginTop: hp(34),
  },
  descText: {
    lineHeight: hp(24),
    fontSize: fontSize(16),
    fontFamily: fonts.regular,
    color: colors.darkGrey,
  },
  closeText: {
    lineHeight: hp(20),
    fontSize: fontSize(16),
    fontFamily: fonts.regular,
    color: colors.primary,
  },
  addFileText: {
    lineHeight: hp(20),
    fontSize: fontSize(16),
    fontFamily: fonts.regular,
    color: colors.xDarkGrey,
    marginTop: hp(8),
  },
  closeTextView: {
    position: 'absolute',
    right: wp(24),
    top: hp(6),
    zIndex: 999,
  },
  descInputView: {
    borderRadius: wp(8),
    borderWidth: wp(1),
    borderColor: colors.grey,
  },
  textInput: {
    borderRadius: wp(8),
    borderWidth: wp(1),
    borderColor: colors.grey,
    padding: wp(12),
    minHeight: hp(100),
    maxHeight: hp(200),
    lineHeight: hp(24),
    fontSize: fontSize(16),
    fontFamily: fonts.regular,
    color: colors.darkGrey,
  },
  resizeHandle: {
    alignSelf: 'flex-end',
    marginRight: wp(4),
    marginBottom: hp(4),
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 4,
    right: 4,
    zIndex: 55,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(16),
    backgroundColor: colors.white,
  },
  dropdown: {
    width: '100%',
    marginTop: hp(-20),
    zIndex: -1,
  },
  ddItemsView: {
    paddingHorizontal: wp(16),
    paddingVertical: hp(12),
  },
  addFileView: {
    height: hp(100),
    width: wp(114),
    borderRadius: wp(8),
    borderColor: colors.liteGrey,
    borderWidth: wp(1),
    backgroundColor: colors.xLiteGrey,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: hp(8),
  },
});
