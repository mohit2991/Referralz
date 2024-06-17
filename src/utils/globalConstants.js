import { Platform, Dimensions } from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { RFValue } from 'react-native-responsive-fontsize';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const wp = (val) => {
  return widthPercentageToDP((val * 100) / screenWidth);
};

export const hp = (val) => {
  return heightPercentageToDP((val * 100) / screenHeight);
};

export const fontSize = (val) => RFValue(val, 812);

export const isIos = Platform.OS === 'ios' ? true : false;

export const deviceType = Platform.OS === 'ios' ? 'ios' : 'android';
