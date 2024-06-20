import React from 'react';
import {View,StyleSheet} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { colors, wp } from '../utils';
import { commonStyles } from '../styles/styles';
import { Header, InfoComponent } from '../components';

const InboxCheck = () => {
  const {navigate} = useNavigation();

  return (
    <View style={commonStyles.flex}>
      <Header isBackButton/>
      <View style={styles.container}>
        <InfoComponent 
          title={'Check your inbox!'}
          description={'A link to reset your password has been sent to adam.smith@gmail.com.'}
          btnText={'Open inbox'}
          onPress={()=>{}}
        />
      </View>
      </View>
  );
};
const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(16),
    backgroundColor: colors.white,
  }
});

export default InboxCheck;
