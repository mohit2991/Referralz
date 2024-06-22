import React from 'react';
import { View, StyleSheet } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { colors, wp } from '../utils';
import { commonStyles } from '../styles/styles';
import { Header, InfoComponent } from '../components';

const InboxCheck = () => {
  const { params } = useRoute();
  const { navigate } = useNavigation();

  const { title, description, btnText, routeName } = params;

  return (
    <View style={commonStyles.flex}>
      <Header isBackButton />
      <View style={styles.container}>
        <InfoComponent
          title={title}
          description={description}
          btnText={btnText}
          onPress={
            routeName !== ''
              ? () => {
                  navigate(routeName);
                }
              : null
          }
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
