// TODO: refactor userSlice

import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    id: null,
    username: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.id = action.payload.id;
      state.username = action.payload.username;
      // set other user data
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.id = null;
      state.username = null;
      // reset other user data
    },
    // additional reducers
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
