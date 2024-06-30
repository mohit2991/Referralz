import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { colors, wp } from '../../utils';
import { commonStyles } from '../../styles/styles';
import { Header, InfoComponent } from '../../components';

const InboxCheck = () => {
  const { params } = useRoute();
  const { navigate } = useNavigation();

  const { title, description, btnText, routeName, email } = params;

  const handlePress = async () => {
    if (routeName !== '') {
      navigate(routeName);
    } else {
      const sendEmail = `mailto:${email}`;
      try {
        Linking.openURL(sendEmail);
      } catch (error) {
        console.log("error",error)
      }
    }
  };
  return (
    <View style={commonStyles.flex}>
      <Header isBackButton />
      <View style={styles.container}>
        <InfoComponent
          title={title}
          description={description}
          btnText={btnText}
          onPress={handlePress}
        // onPress={
        //   routeName !== ''
        //     ? () => {
        //       navigate(routeName);
        //     }
        //     : null
        // }
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

export default InboxCheck;
