import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  username: string;
  access: string;
  refresh: string;
};

const initialState: initialStateType = {
  username: '',
  access: '',
  refresh: '',
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      localStorage.setItem('username', action.payload);
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.access = action.payload;
      localStorage.setItem('access', action.payload);
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refresh = action.payload;
      localStorage.setItem('refresh', action.payload);
    },
    clearLS: (state) => {
        state.access = '';
        state.refresh = '';
        state.username = '';
        localStorage.clear();

    }
  },
});

export const { setUserInfo, setAccessToken, setRefreshToken, clearLS } =
  authSlice.actions;
export const authSliceReducer = authSlice.reducer;
