import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  supportedBiometricType: string | null;
  biometricEnabled: boolean;
  openErrorModal: boolean;
  errorMessage: string;
  errorTitle: string;
  buttonText: string;
  errorCode: number | string | null;
  isBiometricAuthenticated: boolean;
  showAmount: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  isLoading: false,
  supportedBiometricType: null,
  biometricEnabled: false,
  openErrorModal: false,
  errorMessage: '',
  errorTitle: '',
  buttonText: '',
  errorCode: null,
  isBiometricAuthenticated: false,
  showAmount: false,
};

export const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    login: state => {
      state.isLoggedIn = true;
    },
    logout: state => {
      state.isLoggedIn = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setBiometricType: (state, action) => {
      state.supportedBiometricType = action.payload;
    },
    setBiometricEnabled: (state, action) => {
      state.biometricEnabled = action.payload;
    },
    setBiometricAuthenticated: (state, action) => {
      state.isBiometricAuthenticated = action.payload;
    },
    setShowAmount: (state, action) => {
      state.showAmount = action.payload;
    },
    setOpenErrorModal: (state, action) => {
      state.openErrorModal = action.payload.errorModal;
      state.errorMessage = action.payload.errorMessage;
      state.errorTitle = action.payload.errorTitle;
      state.buttonText = action.payload.buttonText;
      state.errorCode = action.payload.errorCode;
    },
    closeErrorModal: state => {
      state.openErrorModal = false;
      state.errorMessage = '';
      state.errorTitle = '';
      state.buttonText = '';
      state.errorCode = null;
    },
    removeAuthState: state => {
      state.isLoggedIn = false;
      state.isLoading = false;
      state.openErrorModal = false;
      state.errorMessage = '';
      state.errorTitle = '';
      state.buttonText = '';
      state.errorCode = null;
      state.isBiometricAuthenticated = false;
      state.showAmount = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  login,
  logout,
  setLoading,
  setBiometricType,
  setBiometricEnabled,
  setOpenErrorModal,
  closeErrorModal,
  removeAuthState,
  setBiometricAuthenticated,
  setShowAmount,
} = authSlice.actions;

export default authSlice.reducer;
