import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  role: null,
  isAdmin: false,
  id: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.role = action.payload.role;
      state.id = action.payload.id;
      state.isAuthenticated = true;
      if (action.payload.role === "admin") {
        state.isAdmin = true;
      }
    },
    register(state, action) {
      const user = action.payload.user;
      state.user = user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isAdmin = false;
    },
    logout(state) {
      // state = initialState;
      Object.assign(state, initialState);
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
