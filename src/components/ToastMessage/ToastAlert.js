import Toast from 'react-native-toast-message';
import { hp, isIos } from '../../utils';

const ToastAlert = ({
  title,
  description,
  type = 'error' | 'info' | 'success',
}) => {
  return Toast.show({
    type: type,
    text1: title,
    text2: description,
    position: 'top',
    topOffset: isIos ? hp(60) : hp(15),
    visibilityTime: 3000,
    autoHide: true,
  });
};

export default ToastAlert;
