export const validateAlpha = (text) => {
    return /^[a-zA-Z]*$/.test(text);
};
export const validateNumber = (text) => {
    return /^[0-9]*$/.test(text);
};
export const validatePhoneNumber = (text) => {
    return /^\d{10,11}$/.test(value);
};