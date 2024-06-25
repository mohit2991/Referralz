import { icons } from './icons';

export const profileItemList1 = [
  {
    id: 1,
    title: 'Change password',
    icon: icons.shield,
    route: 'ChangePassword',
  },
  {
    id: 2,
    title: 'Payout and billing',
    icon: icons.dollars,
    route: 'PayBilling',
  },
  {
    id: 3,
    title: 'Settings',
    icon: icons.setting,
    route: 'SettingScreen',
  },
  {
    id: 4,
    title: 'About app',
    icon: icons.info,
    route: 'AboutAppScreen',
  },
];

export const profileItemList2 = [
  {
    id: 1,
    title: 'Log out',
    icon: icons.logout,
  },
  {
    id: 2,
    title: 'Delete account',
    icon: icons.delete,
  },
];

export const payoutMethodsListData = [
  {
    id: 1,
    icon: icons.checkDollar,
    title: 'Check',
    desc: 'Description',
    isSelected: true,
    value: "CHECK",
  },
  {
    id: 2,
    icon: icons.creditCard,
    title: 'Venmo',
    desc: 'If your account has a balance of more than $5000, you can make a payment using a card.',
    isSelected: false,
    value: "VENMO",
  },
  {
    id: 3,
    icon: icons.bank,
    title: 'ACH',
    desc: 'Description',
    isSelected: false,
    value: "ACH",
  },
  {
    id: 4,
    icon: icons.checkDollar,
    title: 'Virtual card',
    desc: 'Description',
    isSelected: false,
    value: "VIRTUAL_VISA",
  },
];

export const dashboardFilterOptionsList = [
  {
    id: 1,
    title: '1 week',
    isSelected: true,
    value: "ONE_WEEK"
  },
  {
    id: 2,
    title: '30 days',
    isSelected: false,
    value: "ONE_MONTH"
  },
  {
    id: 3,
    title: '6 months',
    isSelected: false,
    value: "SIX_MONTHS"
  },
  {
    id: 4,
    title: '1 year',
    isSelected: false,
    value: "ONE_YEAR"
  },
];

export const homeLeadsList = [
  {
    id: 1,
    name: 'Kathy Pacheco',
    rating: 4.1,
    date: 'Aug 8, 2023',
    address: '3707 Irving Place, Arnold, MO 63010',
    status: 'Recieved',
    interest: 'Low',
  },
  {
    id: 2,
    name: 'David Dumon',
    rating: 2,
    date: 'Aug 8, 2023',
    address: '3831 Cedar Lane, Somerville, MA 02143',
    status: 'Scheduled',
    interest: 'High',
  },
  {
    id: 3,
    name: 'James Hall',
    rating: 3.0,
    date: 'Aug 8, 2023',
    address: '3831 Cedar Lane, Somerville, MA 02143',
    status: 'Inspection',
    interest: 'Low',
  },
  {
    id: 4,
    name: 'Rodgers McKinley',
    rating: 5,
    date: 'Aug 8, 2023',
    address: '2323 Dancing Dove Lane, Long Island City, NY 11101',
    status: 'Job Sold',
    interest: 'Low',
  },
  {
    id: 5,
    name: 'Frederick Swanson',
    rating: 4.1,
    date: 'Aug 8, 2023',
    address: '970 Ersel Street, Carrollton, TX 75006',
    status: 'Referral Paid',
    interest: 'Low',
  },
];


export const transactionList = [
  {
    id: 1,
    title: 'Payout: Virtual Card',
    checkNumber: 'Check No. 735373',
    amount: '2000',
    isCard: false,
  },
  {
    id: 2,
    title: 'Payout: ACH',
    checkNumber: 'Check No. 735373',
    amount: '2000',
    isCard: false,
  },
  {
    id: 3,
    title: 'Payout: Venmo',
    checkNumber: 'Check No. 735373',
    amount: '5000',
    isCard: true,
  },
  {
    id: 4,
    title: 'Payout: Virtual Card',
    checkNumber: 'Check No. 735373',
    amount: '2000',
    isCard: false,
  },
  {
    id: 5,
    title: 'Payout: ACH',
    checkNumber: 'Check No. 735373',
    amount: '2000',
    isCard: true,
  },
  {
    id: 6,
    title: 'Payout: Virtual Card',
    checkNumber: 'Check No. 735373',
    amount: '2000',
    isCard: true,
  },
  {
    id: 7,
    title: 'Payout: Venmo',
    checkNumber: 'Check No. 735373',
    amount: '2000',
    isCard: true,
  },
  {
    id: 8,
    title: 'Payout: ACH',
    checkNumber: 'Check No. 735373',
    amount: '2000',
    isCard: true,
  },
  {
    id: 9,
    title: 'Payout: ACH',
    checkNumber: 'Check No. 735373',
    amount: '2000',
    isCard: false,
  },
  {
    id: 10,
    title: 'Payout: ACH',
    checkNumber: 'Check No. 735373',
    amount: '2000',
    isCard: false,
  },
];