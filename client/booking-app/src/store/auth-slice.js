import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerSuccess(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    registerFailure(state, action) {
      state.error = action.payload;
    },
    loginSuccess(state, action) {
      const user = action.payload;
      state.user = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailure(state, action) {
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
