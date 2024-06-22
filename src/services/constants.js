const useApi = () => {
  return {
    login: '/realms/referralz/protocol/openid-connect/token',
    registerUser: '/user',
    getUserDetails: '/user',
    forgotPassword: (email) =>
      `/user/forget-password/${email}?validation=false`,
    dashboardDetails: '/dashboard/',
    updateUser: '/user',
    deleteUser: '/user',
    logoutUser: '/user/logout',
    profileImageUpdate: '/user/img-upload-success',
    changePassword: '/user/change-password',
    contactVerification: (contact) =>
      `/user/contact-verification?contact-no=${contact}`,
    contactVerificationOtp: (otp) => `/user/contact-verification?otp=${otp}`,
    getLeadSources: '/master/lead-sources',
    getLeadPriorities: '/master/lead-priorities',
    createLead: '/user/lead',
    createLeadImage: (id) => `/user/lead/${id}/success`,
  };
};

export default useApi;
