import React from 'react';
import CustomToast from './CustomToast';

const toastConfig = {
  success: ({ text1, text2 }) => (
    <CustomToast text1={text1} text2={text2} type="success" />
  ),
  error: ({ text1, text2 }) => (
    <CustomToast text1={text1} text2={text2} type="error" />
  ),
  info: ({ text1, text2 }) => (
    <CustomToast text1={text1} text2={text2} type="info" />
  ),
};

export default toastConfig;
