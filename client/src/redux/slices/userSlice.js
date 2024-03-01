import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    id: null,
    username: null,
    email: null, // Add email to your state if needed
    Fname: null,
    Lname: null,
    role: null,
  },
  reducers: {
    login: (state, action) => {
      const { id, username, email, Fname, Lname, role } = action.payload;
      state.isAuthenticated = true;
      state.id = id;
      state.username = username;
      state.email = email; // Store email
      state.Fname = Fname;
      state.Lname = Lname;
      state.role = role;
      // Set other user data from action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.id = null;
      state.username = null;
      state.email = null; // Reset email
      state.Fname = null;
      state.Lname = null;
      state.role = null;
      // Reset other user data fields here
    },
    // Additional reducers can be added here
  },
});

// Export actions
export const { login, logout } = userSlice.actions;

// Export reducer
export default userSlice.reducer;