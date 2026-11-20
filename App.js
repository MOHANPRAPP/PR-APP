import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Modal,
  Animated,
  Linking,
} from 'react-native';

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const textData = {
  kn: {
    title: 'PR App - ಸ್ಮಾರ್ಟ್ ಕೊಟೇಶನ್',
    selectRole: 'ನಿಮ್ಮ ಲಾಗಿನ್ ಆಯ್ಕೆಮಾಡಿ',
    cust: 'ಕಸ್ಟಮರ್ (Customer)',
    vend: 'ವ್ಯಾಪಾರಿ (Vendor)',
    edit: 'ಎಡಿಟರ್ (Editor)',
    phone: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ (10 ಅಂಕಿ)',
    pin: 'ಎಡಿಟರ್ ಪಾಸ್‌ವರ್ಡ್ (ಕನಿಷ್ಠ 8 ಅಂಕಿ: 12345678)',
    login: 'ಲಾಗಿನ್ ಆಗಿ',
    logout: 'ಲಾಗ್ ಔಟ್',
    // New Vendor Registration
    newVendBtn: '+ ಹೊಸ ವ್ಯಾಪಾರಿ ನೋಂದಣಿ (Register Vendor)',
    backLoginBtn: '← ಈಗಾಗಲೇ ನೋಂದಾಯಿಸಿದ್ದೀರಾ? ಲಾಗಿನ್ ಆಗಿ',
    regTitle: 'ಹೊಸ ವ್ಯಾಪಾರಿ ನೋಂದಣಿ (Vendor Registration)',
    bizName: 'ವ್ಯಾಪಾರ / ಶೋರೂಮ್ ಹೆಸರು (Business Name)',
    regFeeNote: 'ನೋಂದಣಿ ಶುಲ್ಕ (Registration Fee): ₹',
    payRegBtn: 'ಶುಲ್ಕ ಪಾವತಿಸಿ ನೋಂದಾಯಿಸಿ',
    pendingApprovalBanner: '⏳ ನಿಮ್ಮ ವ್ಯಾಪಾರಿ ಖಾತೆ ಅಡ್ಮಿನ್ ಅನುಮೋದನೆಗಾಗಿ ಬಾಕಿ ಇದೆ (Pending Admin Approval). ಅನುಮೋದನೆ ಸಿಕ್ಕ ನಂತರ ಕೊಟೇಶನ್ ಕಳುಹಿಸಬಹುದು.',
    notRegisteredErr: 'ಈ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ವ್ಯಾಪಾರಿಯಾಗಿ ನೋಂದಣಿಯಾಗಿಲ್ಲ! ಮೊದಲು ನೋಂದಾಯಿಸಿ.',
    // Categories & Quotes
    chooseCat: 'ಯಾವ ವಿಭಾಗಕ್ಕೆ ಕೊಟೇಶನ್ ಬೇಕು?',
    cats: [
      '🚗 ಕಾರ್ (Car)',
      '🏍️ ಬೈಕ್ (Bike)',
      '⚡ ಎಲೆಕ್ಟ್ರಿಕಲ್ (Electrical)',
      '🍲 ಫುಡ್ & ಕೇಟರಿಂಗ್ (Food)',
      '🏠 ರಿಯಲ್ ಎಸ್ಟೇಟ್ (Property)',
      '📱 ಮೊಬೈಲ್ & ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್',
      '🛋️ ಪೀಠೋಪಕರಣ (Furniture)',
      '🎉 ಮದುವೆ & ಇವೆಂಟ್ಸ್ (Events)',
      '✈️ ಟ್ರಾವೆಲ್ & ಟೂರ್ಸ್ (Travel)',
      '🧱 ಕಟ್ಟಡ ಸಾಮಗ್ರಿ (Construction)',
      '📦 ಇತರೆ (Others)',
    ],
    details: 'ಬೇಡಿಕೆಯ ವಿವರ (ಮಾಡೆಲ್, ಬಣ್ಣ, ಪ್ರಮಾಣ)',
    budget: 'ಅಂದಾಜು ಬಜೆಟ್ (₹)',
    reqBtn: 'ಕೊಟೇಶನ್ ಕೇಳಿ',
    quotes: 'ಕೊಟೇಶನ್‌ಗಳ ಪಟ್ಟಿ',
    price: 'ನಿಮ್ಮ ಕೊಟೇಶನ್ ಬೆಲೆ (₹)',
    paySend: 'ಶುಲ್ಕ ಪಾವತಿಸಿ ಕಳುಹಿಸಿ',
    pending: '⏳ ಬಾಕಿ ಇದೆ (Pending)',
    quoted: '✅ ಕೊಟೇಶನ್ ಬೆಲೆ: ₹',
    callBtn: '📞 ಕರೆ (Call)',
    chatBtn: '💬 ಚಾಟ್ (Chat)',
    pdfBtn: '📄 PDF ಕೊಟೇಶನ್ ಡೌನ್‌ಲೋಡ್',
    chatTitle: 'ನೇರ ಚಾಟ್ (Direct Chat)',
    typeMsg: 'ಸಂದೇಶ ಟೈಪ್ ಮಾಡಿ...',
    sendBtn: 'ಕಳುಹಿಸಿ',
    // Editor Tabs & Labels
    tabRev: '💰 ಆದಾಯ (Revenue)',
    tabVend: '👥 ವ್ಯಾಪಾರಿಗಳು (Vendors)',
    tabSet: '⚙️ ಸೆಟ್ಟಿಂಗ್ಸ್ (Settings)',
    totalRev: 'ಒಟ್ಟು ಸಂಗ್ರಹವಾದ ಆದಾಯ',
    txHistory: 'ವಹಿವಾಟಿನ ಪಟ್ಟಿ (Transaction History)',
    vendorListTitle: 'ವ್ಯಾಪಾರಿಗಳ ಖಾತೆ ಮತ್ತು ಅನುಮೋದನೆ',
    approveBtn: '✅ ಅನುಮೋದಿಸಿ (Approve)',
    blockBtn: '🚫 ನಿರ್ಬಂಧಿಸಿ (Block)',
    approvedBadge: '✅ ಅನುಮೋದಿತ (Approved)',
    pendingBadge: '⏳ ಅನುಮೋದನೆ ಬಾಕಿ (Pending)',
    blockedBadge: '🚫 ನಿರ್ಬಂಧಿತ (Blocked)',
    blockedWarning: 'ನಿಮ್ಮ ವ್ಯಾಪಾರಿ ಖಾತೆಯನ್ನು ಎಡಿಟರ್ ನಿರ್ಬಂಧಿಸಿದ್ದಾರೆ.',
    feeSet: 'ಪ್ರತಿ ಕೊಟೇಶನ್ ಶುಲ್ಕ (₹)',
    regFeeSet: 'ಹೊಸ ವ್ಯಾಪಾರಿ ನೋಂದಣಿ ಶುಲ್ಕ (₹)',
    bank: 'ಬ್ಯಾಂಕ್ ಹೆಸರು',
    acc: 'ಖಾತೆ ಸಂಖ್ಯೆ (Account No)',
    ifsc: 'IFSC ಕೋಡ್',
    upi: 'UPI ID',
    newPassLabel: 'ಹೊಸ ಎಡಿಟರ್ ಪಾಸ್‌ವರ್ಡ್ (ಕನಿಷ್ಠ 8 ಅಂಕಿ)',
    save: 'ವಿವರ ಸೇವ್ ಮಾಡಿ',
    payTitle: 'ಸುರಕ್ಷಿತ ಪೇಮೆಂಟ್ ಗೇಟ್‌ವೇ',
    payNow: 'ಈಗಲೇ ಪಾವತಿಸಿ (Pay Now)',
  },
  en: {
    title: 'PR App - Smart Quotations',
    selectRole: 'Select Login Role',
    cust: 'Customer',
    vend: 'User / Vendor',
    edit: 'Editor / Admin',
    phone: 'Mobile Number (10 digits)',
    pin: 'Editor Password (Min 8 digits: 12345678)',
    login: 'Login',
    logout: 'Logout',
    // New Vendor Registration
    newVendBtn: '+ New Vendor Registration',
    backLoginBtn: '← Already Registered? Vendor Login',
    regTitle: 'New Vendor Registration',
    bizName: 'Business / Showroom Name',
    regFeeNote: 'One-Time Registration Fee: ₹',
    payRegBtn: 'Pay Fee & Submit Registration',
    pendingApprovalBanner: '⏳ Your Vendor account is Pending Admin Approval. You can send quotes once the Admin approves your account.',
    notRegisteredErr: 'Mobile number not registered as Vendor! Please register first.',
    // Categories & Quotes
    chooseCat: 'Select Category for Quotation',
    cats: [
      '🚗 Car',
      '🏍️ Bike',
      '⚡ Electrical Items',
      '🍲 Food & Catering',
      '🏠 Real Estate / Property',
      '📱 Mobiles & Electronics',
      '🛋️ Furniture & Interiors',
      '🎉 Events & Wedding',
      '✈️ Travel & Tours',
      '🧱 Construction Materials',
      '📦 Others',
    ],
    details: 'Requirement Details (Model, Brand, Qty)',
    budget: 'Expected Budget (₹)',
    reqBtn: 'Request Quotation',
    quotes: 'Quotations List',
    price: 'Enter Quote Price (₹)',
    paySend: 'Pay Fee & Send Quote',
    pending: '⏳ Pending',
    quoted: '✅ Quoted Price: ₹',
    callBtn: '📞 Call',
    chatBtn: '💬 Chat',
    pdfBtn: '📄 Download PDF Quotation',
    chatTitle: 'Direct Chat',
    typeMsg: 'Type a message...',
    sendBtn: 'Send',
    // Editor Tabs & Labels
    tabRev: '💰 Revenue',
    tabVend: '👥 Vendors',
    tabSet: '⚙️ Settings',
    totalRev: 'Total Collected Revenue',
    txHistory: 'Transaction History',
    vendorListTitle: 'Vendor Approvals & Management',
    approveBtn: '✅ Approve Vendor',
    blockBtn: '🚫 Block Vendor',
    approvedBadge: '✅ Approved',
    pendingBadge: '⏳ Pending Approval',
    blockedBadge: '🚫 Blocked',
    blockedWarning: 'Your vendor account has been blocked by Admin.',
    feeSet: 'Fee Per Quotation (₹)',
    regFeeSet: 'Vendor Registration Fee (₹)',
    bank: 'Bank Name',
    acc: 'Account Number',
    ifsc: 'IFSC Code',
    upi: 'Merchant UPI ID',
    newPassLabel: 'New Editor Password (Min 8 Digits)',
    save: 'Save Settings',
    payTitle: 'Secure Payment Gateway',
    payNow: 'Pay Now',
  },
};

export default function App() {
  const [lang, setLang] = useState('kn');
  const [role, setRole] = useState(null);
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [logged, setLogged] = useState(false);

  // Vendor Registration Form States
  const [isRegisteringVendor, setIsRegisteringVendor] = useState(false);
  const [regBizName, setRegBizName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCatIdx, setRegCatIdx] = useState(0);

  // Editor Settings & 8+ Digit Password
  const [adminPassword, setAdminPassword] = useState('12345678');
  const [newPasswordInput, setNewPasswordInput] = useState('12345678');
  const [editorTab, setEditorTab] = useState('vend'); // 'rev' | 'vend' | 'set'
  const [fee, setFee] = useState('49');
  const [vendorRegFee, setVendorRegFee] = useState('499');
  const [bank, setBank] = useState('State Bank of India');
  const [acc, setAcc] = useState('30987654321');
  const [ifsc, setIfsc] = useState('SBIN0001234');
  const [upi, setUpi] = useState('prapp@sbi');

  // Vendors List ('approved' | 'pending' | 'blocked')
  const [vendors, setVendors] = useState([
    { id: 'v1', name: 'Karnataka Motors Showroom', phone: '9123456780', category: 0, status: 'approved', paidReg: 499 },
    { id: 'v2', name: 'Annapoorna Grand Catering', phone: '9845012345', category: 3, status: 'approved', paidReg: 499 },
    { id: 'v3', name: 'Sri Lakshmi Electricals', phone: '9900112233', category: 2, status: 'pending', paidReg: 499 },
  ]);

  // Transaction History & Revenue
  const [transactions, setTransactions] = useState([
    { id: 'TX101', vendor: 'Karnataka Motors (Reg Fee)', amount: 499, mode: 'UPI', date: '20 Nov 2026' },
    { id: 'TX102', vendor: 'Annapoorna Catering (Quote Fee)', amount: 49, mode: 'Debit Card', date: '20 Nov 2026' },
    { id: 'TX103', vendor: 'Sri Lakshmi Electricals (Reg Fee)', amount: 499, mode: 'UPI', date: '20 Nov 2026' },
  ]);

  // Customer Input
  const [catIdx, setCatIdx] = useState(0);
  const [details, setDetails] = useState('');
  const [budget, setBudget] = useState('');

  // Quotations List
  const [list, setList] = useState([
    {
      id: 1001,
      cat: 0,
      details: 'Hyundai Creta SX - Black, On-road Price',
      budget: '15,00,000',
      quote: '14,75,000',
      custPhone: '9876543210',
      vendPhone: '9123456780',
      messages: [
        { sender: 'vend', text: 'ನಮಸ್ಕಾರ! ಈ ಬೆಲೆಯಲ್ಲಿ ಇನ್ಶೂರೆನ್ಸ್ ಮತ್ತು ಆಕ್ಸೆಸರೀಸ್ ಸೇರಿವೆ.' },
        { sender: 'cust', text: 'ಧನ್ಯವಾದಗಳು, ಡೆಲಿವರಿ ಎಷ್ಟು ದಿನದಲ್ಲಿ ಸಿಗುತ್ತದೆ?' },
      ],
    },
    {
      id: 1002,
      cat: 3,
      details: '200 Plates South Indian Veg Wedding Meal',
      budget: '60,000',
      quote: '',
      custPhone: '9988776655',
      vendPhone: '',
      messages: [],
    },
  ]);

  // Payment Gateway Modal ('quote' | 'vendor_reg')
  const [vPrice, setVPrice] = useState({});
  const [modal, setModal] = useState(false);
  const [paymentPurpose, setPaymentPurpose] = useState('quote');
  const [activeId, setActiveId] = useState(null);
  const [payMode, setPayMode] = useState('UPI (GPay / PhonePe)');

  const [chatModal, setChatModal] = useState(false);
  const [chatItemId, setChatItemId] = useState(null);
  const [chatInput, setChatInput] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
  }, [logged, lang, editorTab, isRegisteringVendor]);

  const t = textData[lang];

  const doLogin = () => {
    if (role === 'edit') {
      if (pin.length < 8) {
        Alert.alert('Error', lang === 'kn' ? 'ಪಾಸ್‌ವರ್ಡ್ ಕನಿಷ್ಠ 8 ಅಂಕಿಗಳಿರಬೇಕು!' : 'Password must be at least 8 digits!');
        return;
      }
      if (pin === adminPassword) setLogged(true);
      else Alert.alert('Error', lang === 'kn' ? 'ತಪ್ಪು ಪಾಸ್‌ವರ್ಡ್! (ಡೀಫಾಲ್ಟ್: 12345678)' : 'Incorrect Password! (Default: 12345678)');
      return;
    }

    if (phone.length < 10) {
      Alert.alert('Error', lang === 'kn' ? '10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಹಾಕಿ' : 'Enter 10-digit mobile number');
      return;
    }

    if (role === 'vend') {
