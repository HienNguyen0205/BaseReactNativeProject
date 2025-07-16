import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/storage/store';

type AuthState = {
  isLogin: boolean;
};

const initialState: AuthState = {
  isLogin: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<AuthState>) => {
        state = {...action.payload}
    },
  },
});

export const { setAuthData } = authSlice.actions;

export const authData = (state: RootState) => state.auth;

export default authSlice.reducer;