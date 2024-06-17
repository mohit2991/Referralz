import { StyleSheet } from 'react-native';
import { colors, hp, wp } from '../utils';

export const commonStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: wp(16),
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexRowCenter: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon24: {
    width: wp(24),
    height: wp(24),
    resizeMode: 'contain',
  },
});
