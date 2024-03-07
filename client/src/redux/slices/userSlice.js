import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    id: null,
    username: null,
    email: null, 
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
     
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.id = null;
      state.username = null;
      state.email = null; // Reset email
      state.Fname = null;
      state.Lname = null;
      state.role = null;
     
    },
    setCurrentOrganization: (state, action) => {
      state.currentOrganization = action.payload;
    },
  },
});

// Export actions
export const { login, logout, setCurrentOrganization } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
