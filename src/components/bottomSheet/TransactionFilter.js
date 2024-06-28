import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import { colors, fontSize, fonts, hp, isIos, wp } from '../../utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import RadioSelector from '../common/RadioSelector';
import DatePicker from 'react-native-date-picker';
import TextInputComp from '../common/TextInputComp';
import moment from 'moment';

const TransactionFilter = ({
  isOpen = false,
  applyFilters,
  resetFiltersHandle,
  onClose = () => { },
  isLeadsFilter,
}) => {
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef(null);
  const scrollViewRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const [currentPicker, setCurrentPicker] = useState(null);
  const [periodFilterList, setPeriodFilterList] = useState({
    allTime: true,
    last7days: false,
    last30days: false,
    last90days: false,
    custom: false,
  });
  const [transactionTypeFilterList, setTransactionTypeFilterList] = useState({
    check: true,
    virtualCard: false,
    ach: false,
    venmo: false,
  });
  const [leadStatusFilter, setLeadStatusFilter] = useState({
    referralReceived: false,
    inspectionScheduled: false,
    inspectionCompleted: false,
    referralPaid: false,
    jobWon: false,
    jobClosed: false,
    jobClosedNoOpportunity: false,
    jobClosedNoInsuranceNoMoney: false,
    jobClosedHomeownerDeclined: false,
  });

  const { allTime, last7days, last30days, last90days, custom } =
    periodFilterList;

  const { check, virtualCard, ach, venmo } = transactionTypeFilterList;

  const {
    referralReceived,
    inspectionScheduled,
    inspectionCompleted,
    referralPaid,
    jobWon,
    jobClosed,
    jobClosedNoOpportunity,
    jobClosedNoInsuranceNoMoney,
    jobClosedHomeownerDeclined,
  } = leadStatusFilter;

  const snapPoints = useMemo(() => ['85%'], []);

  const onPeriodSelect = (key) => {
    setPeriodFilterList({
      allTime: key === 'allTime',
      last7days: key === 'last7days',
      last30days: key === 'last30days',
      last90days: key === 'last90days',
      custom: key === 'custom',
    });
  };

  const onTransTypeSelect = (key) => {
    setTransactionTypeFilterList({
      check: key === 'check',
      virtualCard: key === 'virtualCard',
      ach: key === 'ach',
      venmo: key === 'venmo',
    });
  };

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
      scrollViewRef.current?.scrollToPosition(0, 0);
    }
  }, [isOpen]);

  const handleDateChange = (date) => {
    if (currentPicker === 'fromDate') {
      if (date > toDate) {
        setToDate(date);
      }
      setFromDate(date);
    } else if (currentPicker === 'toDate') {
      if (date < fromDate) {
        setFromDate(date);
      }
      setToDate(date);
    }
    setDatePickerOpen(false);
  };

  const openDatePicker = (picker) => {
    setCurrentPicker(picker);
    setDatePickerOpen(true);
  };

  const resetFilters = () => {
    setPeriodFilterList({
      allTime: true,
      last7days: false,
      last30days: false,
      last90days: false,
      custom: false,
    });
    setTransactionTypeFilterList({
      check: true,
      virtualCard: false,
      ach: false,
      venmo: false,
    });
    setLeadStatusFilter({
      referralReceived: false,
      inspectionScheduled: false,
      inspectionCompleted: false,
      referralPaid: false,
      jobWon: false,
      jobClosed: false,
      jobClosedNoOpportunity: false,
      jobClosedNoInsuranceNoMoney: false,
      jobClosedHomeownerDeclined: false,
    });
    setFromDate(new Date());
    setToDate(new Date());
    resetFiltersHandle();
  };

  const getSelectedFilters = () => {
    const selectedFilters = {
      period: periodFilterList,
      fromDate,
      toDate,
      transactionType: transactionTypeFilterList,
      leadStatus: leadStatusFilter,
    };

    applyFilters(selectedFilters);
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
              <Text style={styles.headerText}>{'Filter'}</Text>
              <TouchableOpacity style={styles.closeTextView} onPress={onClose}>
                <Text style={styles.closeText}>{'Close'}</Text>
              </TouchableOpacity>
            </View>
            {isLoading && (
              <View style={styles.loaderView}>
                <ActivityIndicator color={colors.black} size={'small'} />
                <Text style={styles.loadingTextStyle}>{'Loading...'}</Text>
              </View>
            )}
            <ScrollView
              style={styles.filterContainer}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: hp(30) }}
            >
              <Text style={styles.filterTitleText}>{'Period'}</Text>
              <View style={styles.filterView}>
                <RadioSelector
                  value={allTime}
                  text={'All time'}
                  onPress={() => onPeriodSelect('allTime')}
                  containerStyle={styles.radioContainer}
                />
                <RadioSelector
                  value={last7days}
                  text={'Last 7 days'}
                  onPress={() => onPeriodSelect('last7days')}
                  containerStyle={styles.radioContainer}
                />
                <RadioSelector
                  value={last30days}
                  text={'Last 30 days'}
                  onPress={() => onPeriodSelect('last30days')}
                  containerStyle={styles.radioContainer}
                />
                <RadioSelector
                  value={last90days}
                  text={'Last 90 days'}
                  onPress={() => onPeriodSelect('last90days')}
                  containerStyle={styles.radioContainer}
                />
                <RadioSelector
                  value={custom}
                  text={'Custom'}
                  onPress={() => onPeriodSelect('custom')}
                  containerStyle={styles.radioContainer}
                />
                {custom && (
                  <View style={styles.dateContainer}>
                    <TouchableOpacity
                      activeOpacity={1}
                      style={styles.dateButton}
                      onPress={() => openDatePicker('fromDate')}
                    ></TouchableOpacity>
                    <TextInputComp
                      onFocus={() => openDatePicker('fromDate')}
                      value={moment(fromDate).format('DD.MM.YYYY')}
                      labelText={'From'}
                      onChangeText={(text) => setFromDate(text)}
                      additionalContainerStyle={{ marginTop: 0 }}
                    />
                    <View style={{ width: wp(16) }} />
                    <TouchableOpacity
                      activeOpacity={1}
                      style={{ ...styles.dateButton, right: wp(3), left: null }}
                      onPress={() => openDatePicker('toDate')}
                    ></TouchableOpacity>
                    <TextInputComp
                      onFocus={() => openDatePicker('toDate')}
                      value={moment(toDate).format('DD.MM.YYYY')}
                      labelText={'To'}
                      onChangeText={(text) => setToDate(text)}
                      additionalContainerStyle={{ marginTop: 0 }}
                    />
                  </View>
                )}
                <View style={{ marginTop: hp(32) }} />
                <Text style={styles.filterTitleText}>
                  {'Transaction type (Payout)'}
                </Text>
                <View style={styles.filterView}>
                  {isLeadsFilter ? (
                    <>
                      <RadioSelector
                        multiSelect
                        value={referralReceived}
                        text={'Referral Received'}
                        onPress={() =>
                          setLeadStatusFilter({
                            ...leadStatusFilter,
                            referralReceived: !referralReceived,
                          })
                        }
                        containerStyle={styles.radioContainer}
                      />
                      <RadioSelector
                        multiSelect
                        value={inspectionScheduled}
                        text={'Inspection Scheduled'}
                        onPress={() =>
                          setLeadStatusFilter({
                            ...leadStatusFilter,
                            inspectionScheduled: !inspectionScheduled,
                          })
                        }
                        containerStyle={styles.radioContainer}
                      />
                      <RadioSelector
                        multiSelect
                        value={inspectionCompleted}
                        text={'Inspection Completed'}
                        onPress={() =>
                          setLeadStatusFilter({
                            ...leadStatusFilter,
                            inspectionCompleted: !inspectionCompleted,
                          })
                        }
                        containerStyle={styles.radioContainer}
                      />
                      <RadioSelector
                        multiSelect
                        value={referralPaid}
                        text={'Referral Paid'}
                        onPress={() =>
                          setLeadStatusFilter({
                            ...leadStatusFilter,
                            referralPaid: !referralPaid,
                          })
                        }
                        containerStyle={styles.radioContainer}
                      />
                      <RadioSelector
                        multiSelect
                        value={jobWon}
                        text={'Job Won'}
                        onPress={() =>
                          setLeadStatusFilter({
                            ...leadStatusFilter,
                            jobWon: !jobWon,
                          })
                        }
                        containerStyle={styles.radioContainer}
                      />
                      <RadioSelector
                        multiSelect
                        value={jobClosed}
                        text={'Job Closed'}
                        onPress={() =>
                          setLeadStatusFilter({
                            ...leadStatusFilter,
                            jobClosed: !jobClosed,
                          })
                        }
                        containerStyle={styles.radioContainer}
                      />
                      <RadioSelector
                        multiSelect
                        value={jobClosedNoOpportunity}
                        text={'Job Closed No Opportunity'}
                        onPress={() =>
                          setLeadStatusFilter({
                            ...leadStatusFilter,
                            jobClosedNoOpportunity: !jobClosedNoOpportunity,
                          })
                        }
                        containerStyle={styles.radioContainer}
                      />
                      <RadioSelector
                        multiSelect
                        value={jobClosedNoInsuranceNoMoney}
                        text={'Job Closed No Insurance No Money,'}
                        onPress={() =>
                          setLeadStatusFilter({
                            ...leadStatusFilter,
                            jobClosedNoInsuranceNoMoney:
                              !jobClosedNoInsuranceNoMoney,
                          })
                        }
                        containerStyle={styles.radioContainer}
                      />
                      <RadioSelector
                        multiSelect
                        value={jobClosedHomeownerDeclined}
                        text={'Job Closed Homeowner Declined'}
                        onPress={() =>
                          setLeadStatusFilter({
                            ...leadStatusFilter,
                            jobClosedHomeownerDeclined:
                              !jobClosedHomeownerDeclined,
                          })
                        }
                        containerStyle={styles.radioContainer}
                      />
                    </>
                  ) : (
                    <>
                      <RadioSelector
                        value={check}
                        text={'Check'}
                        onPress={() => onTransTypeSelect('check')}
                        containerStyle={styles.radioContainer}
                      />
                      <RadioSelector
                        value={virtualCard}
                        text={'Virtual card'}
                        onPress={() => onTransTypeSelect('virtualCard')}
                        containerStyle={styles.radioContainer}
                      />
                      <RadioSelector
                        value={ach}
                        text={'ACH'}
                        onPress={() => onTransTypeSelect('ach')}
                        containerStyle={styles.radioContainer}
                      />
                      <RadioSelector
                        value={venmo}
                        text={'Venmo'}
                        onPress={() => onTransTypeSelect('venmo')}
                        containerStyle={styles.radioContainer}
                      />
                    </>
                  )}
                </View>
              </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
                <Text style={styles.btnText}>{'Reset'}</Text>
              </TouchableOpacity>
              <View style={{ width: wp(8) }} />
              <TouchableOpacity
                style={styles.resultBtn}
                onPress={getSelectedFilters}
              >
                <Text style={{ ...styles.btnText, color: colors.white }}>
                  {'See result'}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: isIos
                  ? insets.bottom === 0
                    ? hp(12)
                    : insets.bottom
                  : hp(12),
              }}
            />
          </View>
          {isDatePickerOpen && (
            <DatePicker
              modal
              open={isDatePickerOpen}
              date={currentPicker === 'fromDate' ? fromDate : toDate}
              onConfirm={(date) => handleDateChange(date)}
              onCancel={() => setDatePickerOpen(false)}
              buttonColor={colors.primary}
              mode="date"
              maximumDate={new Date()}
              dividerColor={colors.primary}
              title={
                currentPicker === 'fromDate'
                  ? `Select "To" Date`
                  : `Select "To" Date`
              }
            />
          )}
        </View>
      </BottomSheet>
    </Portal>
  );
};

export default TransactionFilter;

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
  headerText: {
    lineHeight: hp(28),
    fontSize: fontSize(18),
    fontFamily: fonts.semiBold,
    color: colors.xDarkGrey,
  },
  closeText: {
    lineHeight: hp(20),
    fontSize: fontSize(16),
    fontFamily: fonts.regular,
    color: colors.primary,
  },
  closeTextView: {
    position: 'absolute',
    right: wp(24),
    top: hp(6),
    zIndex: 999,
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
  filterContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: wp(16),
    paddingTop: hp(16),
  },
  filterTitleText: {
    fontSize: fontSize(18),
    lineHeight: hp(28),
    fontFamily: fonts.semiBold,
    color: colors.xDarkGrey,
  },
  filterView: {
    marginTop: hp(10),
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(16),
    paddingTop: hp(12),
    borderTopWidth: wp(1),
    borderColor: colors.xLiteGrey,
  },
  resetBtn: {
    borderRadius: wp(12),
    borderWidth: wp(1),
    borderColor: colors.darkBlack,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(16),
  },
  resultBtn: {
    flex: 1,
    borderRadius: wp(8),
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(16),
  },
  radioContainer: {
    paddingVertical: hp(6),
  },
  btnText: {
    fontSize: fontSize(16),
    lineHeight: hp(20),
    fontFamily: fonts.regular,
    color: colors.xDarkGrey,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(8),
  },
  dateView: {
    borderRadius: wp(8),
    paddingVertical: hp(16),
    paddingHorizontal: wp(12),
    borderWidth: wp(1),
    borderColor: colors.grey,
    flex: 1,
  },
  dateInputStyle: {
    fontSize: fontSize(16),
    fontFamily: fonts.regular,
    color: colors.xDarkGrey,
    paddingBottom: hp(3),
  },
  dateButton: {
    opacity: 0.5,
    position: 'absolute',
    width: '46%',
    height: hp(50),
    zIndex: 99,
    borderRadius: wp(8),
    left: wp(3),
  },
});
