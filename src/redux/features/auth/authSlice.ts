import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  supportedBiometricType: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  isLoading: false,
  supportedBiometricType: null,
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
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, setLoading, setBiometricType } =
  authSlice.actions;

export default authSlice.reducer;
