import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import { alertReducers } from "./alert/alertSlice";

export const store = configureStore({
  reducer: { auth: authReducer, alert: alertReducers },
});

// some changes to check git again
