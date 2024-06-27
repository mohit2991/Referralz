import { createRef } from 'react';

export const navigationRef = createRef();

export const resetStack = (name, params) =>
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: name, params: params }],
    }),
  );

export const isValidEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return emailPattern.test(email);
};

export const validatePassword = (password) => {
  const regex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

export const getTagColor = (status) => {
  switch (status) {
    case 'Received':
      return { light: '#E9F4FC', dark: '#6399AE' };
    case 'Scheduled':
      return { light: '#FFF0E9', dark: '#FFB03B' };
    case 'Inspection':
      return { light: '#E9F4FC', dark: '#4FD2D2' };
    case 'Job Sold':
      return { light: '#FAEAEA', dark: '#E16032' };
    case 'Job Closed':
      return { light: '#FAEAEA', dark: '#E16032' };
    case 'Referral Paid':
      return { light: '#E9F8F0', dark: '#54A77B' };
    case 'Submitted':
      return { light: '#E9F4FC', dark: '#6399AE' };
    case 'In progress':
      return { light: '#FFF0E9', dark: '#FFB03B' };
    default:
      return { light: '#E9F4FC', dark: '#6399AE' };
  }
};
