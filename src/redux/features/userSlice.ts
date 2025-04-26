
import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  isLoggedIn: boolean;
  username: string | null;
  token: string | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  username: null,
  token: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = null;
      state.token = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
