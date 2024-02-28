import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    id: null,
    username: null,
    // add other initial state fields here
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.id = action.payload.id;
      state.username = action.payload.username;
      // set other user data from action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.id = null;
      state.username = null;
      // reset other user data fields here
    },
    // additional reducers can be added here
  },
});

// Export actions
export const { login, logout } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
