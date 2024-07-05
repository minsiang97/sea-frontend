import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  email: string | null;
}

const initialState: UserState = {
  email: null,
};

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUserState: (state, action) => {
      state.email = action.payload.email;
    },
    removeUserState: state => {
      state.email = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserState, removeUserState } = userSlice.actions;

export default userSlice.reducer;
