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
import useApiHandler from '../../hooks/useApiHandler';
import { getLeadSources, getLeadPriorities, createLead, createLeadImage, dashboardDetails } from '../../services/apiService';
import { useUser } from '../../contexts/userContext';
import RNFS from 'react-native-fs';
import { Buffer } from 'buffer';
import axios from 'axios';
import { ToastAlert } from '../../components';

const CreateLeadBottomSheet = ({ isOpen = false, onClose = () => { } }) => {
  const insets = useSafeAreaInsets();
  const { handleApiCall } = useApiHandler();
  const bottomSheetRef = useRef(null);
  const sourceDDRef = useRef(null);
  const priorityDDRef = useRef(null);
  const oopsProgramDDRef = useRef(null);
  const scrollViewRef = useRef(null);
  const { dashboardFilter, setDashboardData } = useUser();
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    aptSuit: '',
    city: '',
    postalCode: '',
    state: '',
    country: '',
    description: '',
    leadSource: 'Select',
    leadPriority: 'Select',
    oopsProgram: 'Select',
  });
  const [leadSourceData, setLeadSourceData] = useState([]);
  const [isSourceFocus, setIsSourceFocus] = useState(false);
  const [leadPriorityData, setLeadPriorityData] = useState([]);
  const [isPriorityFocus, setIsPriorityFocus] = useState(false);
  const [isOopsProgramFocus, setIsoopsProgramFocus] = useState(false);
  const [successScreen, setSuccessScreen] = useState(false);
  const [imageData, setImageData] = useState([{ id: 1 }]);
  const snapPoints = useMemo(() => [isIos ? '85%' : '98%'], []);
  const oopsProgramData = [
    { name: 'Yes', id: 'yes' },
    { name: 'No', id: 'no' },
  ];

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.expand();
      resetState();
      fetchLeadSourceData()
      fetchLeadPrioritiesData()
    } else {
      bottomSheetRef.current?.close();
      scrollViewRef.current?.scrollToPosition(0, 0);
    }
  }, [isOpen]);

  const fetchLeadSourceData = async () => {
    handleApiCall(
      () => getLeadSources(),
      async (response) => {
        if (response) {
          setLeadSourceData(response.data);
        }
      },
      null, // Success message
    );
  };

  const fetchLeadPrioritiesData = async () => {
    handleApiCall(
      () => getLeadPriorities(),
      async (response) => {
        if (response) {
          setLeadPriorityData(response.data);
        }
      },
      null, // Success message
    );
  };

  const pickImage = () => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      multiple: true,
    };

    launchImageLibrary(options, (response) => {
      if (imageData.length >= 10) {
        ToastAlert({
          type: 'error',
          description: 'You can only select up to 10 images.',
        });
        return;
      }
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.assets[0].uri;
        const fileSize = response.assets[0].fileSize;
        if (fileSize > 5 * 1024 * 1024) {
          ToastAlert({
            type: 'error',
            description: 'Image size should be less than 5MB.',
          });
          return;
        }
        const imgObj = {
          id: imageData?.length + 1,
          imgUri: uri,
          ...response.assets[0]
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
          value={item?.label === formState.leadSource}
          text={item?.label}
          onPress={() => {
            setFormState((prevState) => ({
              ...prevState,
              leadSource: item.label,
            }));
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
          value={item?.label === formState.oopsProgram}
          text={item?.label}
          onPress={() => {
            setFormState((prevState) => ({
              ...prevState,
              oopsProgram: item.label,
            }));
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
          value={item?.label === formState.leadPriority}
          text={item?.label}
          onPress={() => {
            setFormState((prevState) => ({
              ...prevState,
              leadPriority: item.label,
            }));
            setIsPriorityFocus(false);
            priorityDDRef.current.close();
          }}
        />
      </View>
    );
  };

  const getDasboardData = async () => {
    const userPayload = {
      filter_by_date: dashboardFilter ? dashboardFilter.value : 'ONE_WEEK',
      isPaginationRequired: false,
    };

    handleApiCall(() => dashboardDetails(userPayload),
      async (response) => {
        if (response) {
          setDashboardData(response?.data);
        }
      },
      null, // Success message
    );
  };

  const createLeadImageHandle = async (id) => {
    handleApiCall(() => createLeadImage(id));
  }

  const createLeadImageUpload = async (uploadImage, response) => {
    for (let i = 0; i < uploadImage.length; i++) {
      const image = uploadImage[i];
      const uploadUrl = response?.data?.upload_urls[i];
      try {
        const binaryFile = await RNFS.readFile(image.uri, 'base64');
        const binaryData = Buffer.from(binaryFile, 'base64');
        await axios.put(uploadUrl, binaryData, {
          headers: {
            'Content-Type': image.type,
            'Content-Length': binaryData.length,
          }
        });
      } catch (error) {
        ToastAlert({
          type: 'error',
          description: `Failed to upload ${image.fileName}:`, error,
        });
      }
    }
  }

  const createLeadHandle = async () => {
    const uploadImage = imageData.filter(item => item?.fileName).map(item => item)
    const userPayload = {
      contact: {
        email_id: formState.email,
        first_name: formState.firstName,
        last_name: formState.lastName,
        phone_number: formState.phoneNumber,
      },
      amount: 0,
      status: 'REFERRAL_RECEIVED',
      priority: formState.leadPriority,
      source: formState.leadSource,
      oops_problem: formState.oopsProgram,
      description: formState.description,
      address: {
        address: formState.address,
        name: formState.aptSuit,
        city: formState.city,
        postal_code: formState.postalCode,
        state: formState.state,
        country: formState.country,
      },
      file_names: imageData.filter(item => item?.fileName).map(item => item.fileName)
    };

    handleApiCall(() => createLead(userPayload),
      async (response) => {
        if (response) {
          if (uploadImage?.length) {
            await createLeadImageUpload(uploadImage, response)
            await createLeadImageHandle(response?.data?.id)
          }
          setSuccessScreen(true)
          getDasboardData();
        }
      },
      null, // Success message
    );
  };

  const resetState = () => {
    setFormState({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      address: '',
      aptSuit: '',
      city: '',
      postalCode: '',
      state: '',
      country: '',
      description: '',
      leadSource: 'Select',
      leadPriority: 'Select',
      oopsProgram: 'Select',
    });
    setIsoopsProgramFocus(false);
    setIsPriorityFocus(false);
    setIsSourceFocus(false);
    setSuccessScreen(false);
    setImageData([{ id: 1 }]);

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
            {!successScreen ? (
              <View style={{ flex: 1 }}>
                <KeyboardAwareScrollView
                  ref={scrollViewRef}
                  scrollEnabled={true}
                  enableOnAndroid
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.keyboardAwareStyle}
                  extraScrollHeight={hp(100)}
                >
                  <View>
                    <TextInputComp
                      editable={false}
                      value={formState.leadSource}
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
                      labelField="name"
                      valueField="id"
                      value={formState.leadSource}
                      onFocus={() => setIsSourceFocus(true)}
                      onBlur={() => setIsSourceFocus(false)}
                      // onChange={(item) => {
                      //   setLeadSource(item?.label);
                      //   setIsSourceFocus(false);
                      // }}
                      renderItem={renderSourceDDItems}
                    />
                  </View>
                  <View>
                    <TextInputComp
                      editable={false}
                      value={formState.oopsProgram}
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
                      labelField="name"
                      valueField="id"
                      value={formState.oopsProgram}
                      onFocus={() => setIsoopsProgramFocus(true)}
                      onBlur={() => setIsoopsProgramFocus(false)}
                      // onChange={(item) => {
                      //   setOopsProgram(item?.label);
                      //   setIsoopsProgramFocus(false);
                      // }}
                      renderItem={renderOopsDDItems}
                    />
                  </View>
                  <View>
                    <TextInputComp
                      editable={false}
                      value={formState.leadPriority}
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
                      labelField="name"
                      valueField="id"
                      value={formState.leadPriority}
                      onFocus={() => setIsPriorityFocus(true)}
                      onBlur={() => setIsPriorityFocus(false)}
                      // onChange={(item) => {
                      //   setLeadPriority(item?.label);
                      //   setIsPriorityFocus(false);
                      // }}
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
                    value={formState.firstName}
                    maxLength={20}
                    labelText={'First name'}
                    onChangeText={(text) =>
                      setFormState((prevState) => ({
                        ...prevState,
                        firstName: text,
                      }))
                    } />
                  <TextInputComp
                    value={formState.lastName}
                    maxLength={20}
                    labelText={'Last name'}
                    onChangeText={(text) =>
                      setFormState((prevState) => ({
                        ...prevState,
                        lastName: text,
                      }))
                    }
                  />
                  <TextInputComp
                    value={formState.phoneNumber}
                    maxLength={10}
                    labelText={'Phone number'}
                    onChangeText={(text) =>
                      setFormState((prevState) => ({
                        ...prevState,
                        phoneNumber: text,
                      }))
                    }
                  />
                  <TextInputComp
                    value={formState.email}
                    maxLength={100}
                    labelText={'Email address (Optional)'}
                    onChangeText={(text) =>
                      setFormState((prevState) => ({
                        ...prevState,
                        email: text,
                      }))
                    }
                  />

                  <View style={styles.titleView}>
                    <Text style={styles.headerText}>{'Lead address'}</Text>
                    <Text style={styles.descText}>
                      {'Precise data regarding the address of lead.'}
                    </Text>
                  </View>
                  <TextInputComp
                    value={formState.address}
                    maxLength={100}
                    labelText={'Address'}
                    onChangeText={(text) =>
                      setFormState((prevState) => ({
                        ...prevState,
                        address: text,
                      }))
                    }
                  />
                  <TextInputComp
                    value={formState.aptSuit}
                    maxLength={100}
                    labelText={'Apt, suite, etc...'}
                    onChangeText={(text) =>
                      setFormState((prevState) => ({
                        ...prevState,
                        aptSuit: text,
                      }))
                    }
                  />
                  <TextInputComp
                    value={formState.city}
                    maxLength={30}
                    labelText={'City'}
                    onChangeText={(text) =>
                      setFormState((prevState) => ({
                        ...prevState,
                        city: text,
                      }))
                    }
                  />
                  <TextInputComp
                    value={formState.postalCode}
                    maxLength={8}
                    labelText={'Postal code'}
                    onChangeText={(text) =>
                      setFormState((prevState) => ({
                        ...prevState,
                        postalCode: text,
                      }))
                    }
                  />
                  <TextInputComp
                    value={formState.state}
                    maxLength={30}
                    labelText={'State'}
                    onChangeText={(text) =>
                      setFormState((prevState) => ({
                        ...prevState,
                        state: text,
                      }))
                    }
                  />
                  <TextInputComp
                    value={formState.country}
                    maxLength={30}
                    labelText={'Country'}
                    onChangeText={(text) =>
                      setFormState((prevState) => ({
                        ...prevState,
                        country: text,
                      }))
                    }
                  />

                  <View style={styles.titleView}>
                    <Text style={styles.headerText}>{'Description'}</Text>
                    <Text style={styles.descText}>
                      {`Brief overview of the lead's nature and requirements.`}
                    </Text>
                  </View>
                  <View style={{ marginTop: hp(16) }}>
                    <TextInput
                      maxLength={300}
                      textAlignVertical="top"
                      style={[styles.textInput]}
                      multiline={true}
                      value={formState.description}
                      onChangeText={(text) =>
                        setFormState((prevState) => ({
                          ...prevState,
                          description: text,
                        }))
                      }
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
                  onPress={createLeadHandle}
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
