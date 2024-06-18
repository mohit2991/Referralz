import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { BottomButton, Header } from '../../components';
import { commonStyles } from '../../styles/styles';
import { colors } from '../../utils';
import { useNavigation } from '@react-navigation/native';

const PayBilling = () => {
  const { navigate } = useNavigation();

  return (
    <View style={commonStyles.flex}>
      <Header isBackButton title={'Payout and billing '} />
      <View style={commonStyles.container}></View>
      <BottomButton
        disabled={false}
        title={'Update'}
        onPress={() => navigate('ProfileScreen')}
      />
      <SafeAreaView style={styles.safeAreaViewStyle} />
    </View>
  );
};

export default PayBilling;

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    backgroundColor: colors.white,
  },
});
