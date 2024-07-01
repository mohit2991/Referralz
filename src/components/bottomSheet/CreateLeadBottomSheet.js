import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import { colors, fontSize, fonts, hp, icons, isIos, wp } from '../../utils';
import TextInputComp from '../common/TextInputComp';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { commonStyles } from '../../styles/styles';
import BottomButton from '../common/BottomButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InfoComponent from '../common/InfoComponent';
import RadioSelector from '../common/RadioSelector';
import { launchImageLibrary } from 'react-native-image-picker';
import useApiHandler from '../../hooks/useApiHandler';
import {
  getLeadSources,
  getLeadPriorities,
  createLead,
  createLeadImage,
  dashboardDetails,
  getActivity,
  getLead,
} from '../../services/apiService';
import { useUser } from '../../contexts/userContext';
import RNFS from 'react-native-fs';
import { Buffer } from 'buffer';
import axios from 'axios';
import { Shadow, ToastAlert } from '../../components';
import { isValidEmail } from '../../utils/globalFunctions';
import LoadingSpinner from '../common/LoadingSpinner';

const CreateLeadBottomSheet = ({ isOpen = false, onClose = () => { } }) => {
  const insets = useSafeAreaInsets();
  const { handleApiCall } = useApiHandler();
  const bottomSheetRef = useRef(null);
  const scrollViewRef = useRef(null);
  const {
    dashboardFilter,
    setDashboardData,
    setTodayActivityData,
    setLeadData,
  } = useUser();
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
  const [isLoading, setIsLoading] = useState(false);
  const [imageData, setImageData] = useState([{ id: 1 }]);

  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    address,
    aptSuit,
    city,
    postalCode,
    state,
    country,
    description,
    leadPriority,
    leadSource,
    oopsProgram,
  } = formState;

  const snapPoints = useMemo(() => [isIos ? '95%' : '95%'], []);
  const oopsProgramData = [
    { name: 'Yes', id: 'yes' },
    { name: 'No', id: 'no' },
  ];

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.expand();
      resetState();
      fetchLeadSourceData();
      fetchLeadPrioritiesData();
    } else {
      bottomSheetRef.current?.close();
      scrollViewRef.current?.scrollToPosition(0, 0);
    }
  }, [isOpen]);

  const fetchLeadSourceData = async () => {
    await handleApiCall(
      () => getLeadSources(),
      async (response) => {
        if (response) {
          setLeadSourceData(response?.data);
        }
      },
      null, // Success message
    );
  };

  const fetchLeadPrioritiesData = async () => {
    await handleApiCall(
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
      if (imageData.length >= 11) {
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
          ...response.assets[0],
        };
        setImageData((prevData) => [...prevData, imgObj]);
      }
    });
  };

  const renderImageItems = ({ item, index }) => {
    return (
      <>
        {index === 0 ? (
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
          // ) : index === 0 && imageData?.length === 11 ? null : (
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
          isRightIcon={false}
          value={item?.name === formState.leadSource}
          text={item?.name || item?.name}
          onPress={() => {
            setFormState((prevState) => ({
              ...prevState,
              leadSource: item.name,
            }));
            setIsSourceFocus(false);
          }}
        />
      </View>
    );
  };

  const renderOopsDDItems = (item) => {
    return (
      <View style={styles.ddItemsView}>
        <RadioSelector
          isRightIcon={false}
          value={item?.name === formState.oopsProgram}
          text={item?.name}
          onPress={() => {
            setFormState((prevState) => ({
              ...prevState,
              oopsProgram: item.name,
            }));
            setIsoopsProgramFocus(false);
          }}
        />
      </View>
    );
  };

  const renderPriorityDDItems = (item) => {
    return (
      <View style={styles.ddItemsView}>
        <RadioSelector
          isRightIcon={false}
          value={item?.name === formState.leadPriority}
          text={item?.name}
          onPress={() => {
            setFormState((prevState) => ({
              ...prevState,
              leadPriority: item.name,
            }));
            setIsPriorityFocus(false);
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

    await handleApiCall(
      () => dashboardDetails(userPayload),
      async (response) => {
        if (response) {
          setDashboardData(response?.data);
        }
      },
      null, // Success message
    );
  };

  const getActivityData = async () => {
    const userPayload = {};
    await handleApiCall(
      () => getActivity(userPayload),
      async (response) => {
        if (response) {
          setTodayActivityData(response?.data);
        }
      },
      null,
      null,
    );
  };

  const getLeadData = async () => {
    const payload = {
      isPaginationRequired: false,
    };
    await handleApiCall(
      () => getLead(payload),
      async (response) => {
        if (response) {
          setLeadData(response?.data);
        }
      },
      null,
    );
  };

  const createLeadImageHandle = async (id) => {
    await handleApiCall(() => createLeadImage(id));
  };

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
          },
        });
      } catch (error) {
        ToastAlert({
          type: 'error',
          description: `Failed to upload ${image.fileName}:`,
          error,
        });
      }
    }
  };

  const createLeadHandle = async () => {
    const uploadImage = imageData
      .filter((item) => item?.fileName)
      .map((item) => item);
    const userPayload = {
      contact: {
        email_id: formState.email,
        first_name: formState.firstName,
        last_name: formState.lastName,
        phone_number: formState.phoneNumber.replace('+91 ', ''),
      },
      amount: 0,
      status: 'REFERRAL_RECEIVED',
      priority:
        leadPriorityData.find(
          (priority) => priority.name === formState.leadPriority,
        )?.id || null,
      source:
        leadSourceData.find((source) => source.name === formState.leadSource)
          ?.id || null,
      oops_problem:
        oopsProgramData.find(
          (program) => program.name === formState.oopsProgram,
        )?.id || null,
      description: formState.description,
      address: {
        address: formState.address,
        name: formState.aptSuit,
        city: formState.city,
        postal_code: formState.postalCode,
        state: formState.state,
        country: formState.country,
      },
      file_names: imageData
        .filter((item) => item?.fileName)
        .map((item) => item.fileName),
    };
    setIsLoading(true);
    await handleApiCall(
      () => createLead(userPayload),
      async (response) => {
        if (response) {
          if (uploadImage?.length) {
            await createLeadImageUpload(uploadImage, response);
            await createLeadImageHandle(response?.data?.id);
          }
          setSuccessScreen(true);
          getDasboardData();
          getActivityData();
          getLeadData();
        }
      },
      null, // Success message
    );

    setIsLoading(false);
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

  const handlePhoneNumberChange = (text) => {
    if (text === '+91 ' || text === '+91') {
      text = '';
    } else if (!text.startsWith('+91 ') && text.length > 0) {
      text = '+91 ' + text.replace('+91 ', '');
    }
    setFormState((prevState) => ({
      ...prevState,
      phoneNumber: text,
    }));
  };

  const isButtonEnable = () => {
    if (
      firstName !== '' &&
      lastName !== '' &&
      phoneNumber !== '' &&
      phoneNumber?.length === 14 &&
      address !== '' &&
      aptSuit !== '' &&
      city !== '' &&
      postalCode !== '' &&
      state !== '' &&
      country !== '' &&
      description !== '' &&
      leadPriority !== '' &&
      leadPriority !== 'Select' &&
      leadSource !== '' &&
      leadSource !== 'Select' &&
      oopsProgram !== '' &&
      oopsProgram !== 'Select' &&
      email !== '' &&
      isValidEmail(email)
    ) {
      if (email !== '' && isValidEmail(email)) {
        return true;
      } else if (email === '') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
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
            <LoadingSpinner visible={isLoading} />
            {!successScreen ? (
              <View style={commonStyles.flex}>
                <BottomSheetScrollView
                  ref={scrollViewRef}
                  scrollEnabled={true}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.keyboardAwareStyle}
                  extraScrollHeight={hp(60)}
                >
                  <KeyboardAwareScrollView
                    enableOnAndroid
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                  >
                    <View style={{ ...styles.ddView, zIndex: 99 }}>
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                          setIsSourceFocus(!isSourceFocus);
                          setIsoopsProgramFocus(false);
                          setIsPriorityFocus(false);
                        }}
                        style={styles.ddContainer}
                      >
                        <View>
                          <Text style={styles.ddLabelText}>{'Source'}</Text>
                          <Text style={styles.ddSelectedText}>
                            {leadSource}
                          </Text>
                        </View>
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
                      </TouchableOpacity>
                      {isSourceFocus && (
                        <Shadow shadowStyle={styles.ddShadowStyle}>
                          {leadSourceData?.map((item) =>
                            renderSourceDDItems(item),
                          )}
                        </Shadow>
                      )}
                    </View>
                    <View style={{ ...styles.ddView, zIndex: 77 }}>
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                          setIsoopsProgramFocus(!isOopsProgramFocus);
                          setIsSourceFocus(false);
                          setIsPriorityFocus(false);
                        }}
                        style={styles.ddContainer}
                      >
                        <View>
                          <Text style={styles.ddLabelText}>
                            {'Oops program'}
                          </Text>
                          <Text style={styles.ddSelectedText}>
                            {oopsProgram}
                          </Text>
                        </View>
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
                      </TouchableOpacity>
                      {isOopsProgramFocus && (
                        <Shadow shadowStyle={styles.ddShadowStyle}>
                          {oopsProgramData?.map((item) =>
                            renderOopsDDItems(item),
                          )}
                        </Shadow>
                      )}
                    </View>

                    <View style={{ ...styles.ddView, zIndex: 55 }}>
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                          setIsSourceFocus(false);
                          setIsoopsProgramFocus(false);
                          setIsPriorityFocus(!isPriorityFocus);
                        }}
                        style={styles.ddContainer}
                      >
                        <View>
                          <Text style={styles.ddLabelText}>
                            {'Lead priority'}
                          </Text>
                          <Text style={styles.ddSelectedText}>
                            {leadPriority}
                          </Text>
                        </View>
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
                      </TouchableOpacity>
                      {isPriorityFocus && (
                        <Shadow shadowStyle={styles.ddShadowStyle}>
                          {leadPriorityData?.map((item) =>
                            renderPriorityDDItems(item),
                          )}
                        </Shadow>
                      )}
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
                      }
                    />
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
                      value={
                        formState.phoneNumber.startsWith('+91 ')
                          ? formState.phoneNumber
                          : `+91 ${formState.phoneNumber}`
                      }
                      maxLength={14}
                      keyboardType={'number-pad'}
                      labelText={'Phone number'}
                      onChangeText={handlePhoneNumberChange}
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
                      keyboardType={'number-pad'}
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
                      <BottomSheetTextInput
                        placeholder="Type Here..."
                        multiline={true}
                        textAlignVertical="top"
                        onChangeText={(text) => {
                          setFormState((prevState) => ({
                            ...prevState,
                            description: text,
                          }));
                        }}
                        style={styles.textInput}
                        maxLength={300}
                        autoCorrect={false}
                        autoCapitalize={'sentences'}
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
                </BottomSheetScrollView>
                <BottomButton
                  title={'Create lead'}
                  disabled={!isButtonEnable()}
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
            <View
              style={{
                height: isIos
                  ? insets.bottom === 0
                    ? hp(12)
                    : insets.bottom
                  : 0,
              }}
            />
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
    // zIndex: 1,
  },
  keyboardAwareStyle: {
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
    // marginTop: hp(-20),
    zIndex: -1,
  },
  ddItemsView: {
    paddingHorizontal: wp(16),
    paddingVertical: hp(12),
    backgroundColor: colors.white,
    textTransform: 'capitalize',
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
  loadingTextStyle: {
    lineHeight: hp(24),
    fontSize: fontSize(16),
    fontFamily: fonts.regular,
    color: colors.xDarkGrey,
    marginTop: hp(10),
    textAlign: 'center',
  },
  loaderView: {
    position: 'absolute',
    top: hp(50),
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: colors.white,
    opacity: 0.7,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ddContainer: {
    borderRadius: wp(8),
    borderColor: colors.grey,
    borderWidth: wp(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(16),
    paddingVertical: hp(8),
  },
  ddView: { marginTop: hp(16) },
  ddLabelText: {
    fontSize: fontSize(12),
    lineHeight: hp(16),
    fontFamily: fonts.regular,
    color: colors.darkGrey,
  },
  ddSelectedText: {
    fontSize: fontSize(16),
    lineHeight: hp(24),
    color: colors.darkBlack,
    fontFamily: fonts.regular,
    textTransform: 'capitalize',
  },
  ddShadowStyle: {
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    position: 'absolute',
    width: '100%',
    top: hp(58),
  },
});
