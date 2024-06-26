import CryptoJS from 'crypto-js';

// Function to encrypt a string
export const encryptString = (plainText, secretKey = 'Referralz2024') => {
  const ciphertext = CryptoJS.AES.encrypt(plainText, secretKey).toString();
  return ciphertext;
};

// Function to decrypt a string
export const decryptString = (ciphertext, secretKey = 'Referralz2024') => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedText;
};
