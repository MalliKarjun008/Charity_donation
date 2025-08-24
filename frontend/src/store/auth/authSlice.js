import { createSlice } from "@reduxjs/toolkit";
const savedUser = JSON.parse(localStorage.getItem("user"));
const savedToken = localStorage.getItem("token");

const initialState = {
  user: savedUser || null,
  token: savedToken || null,
  logInstatus: "idle", // idle, success, loading, error
  isAuthenticated: !!savedToken,
  errorMsg: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.logInstatus = "loading";
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.logInstatus = "success";
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.logInstatus = "idle";
    },
    loginFailed: (state, action) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.logInstatus = "error";
      state.errorMsg = action.payload || "login failed";
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
