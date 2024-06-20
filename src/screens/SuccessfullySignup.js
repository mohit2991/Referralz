import React from 'react';
import { View, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { colors, wp } from '../utils';
import { commonStyles } from '../styles/styles';
import { Header, InfoComponent } from '../components';

const SuccessfullySignup = () => {
  const { navigate } = useNavigation();

  return (
    <View style={commonStyles.flex}>
      <Header isBackButton />
      <View style={styles.container}>
        <InfoComponent
          title={'Success!'}
          description={'Your registration has been completed successfully. An email with instructions to activate your membership has been sent to you.'}
          btnText={'Sign into Referralz'}
          onPress={() => { navigate('Login') }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(16),
    backgroundColor: colors.white,
  }
});

export default SuccessfullySignup;
