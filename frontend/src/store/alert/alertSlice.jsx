import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: { message: "", status: "close" },
  reducers: {
    showAlert: (state, action) => {
      state.message = action.payload;
      state.status = "open";
    },
    closeAlert: (state) => {
      state.message = "";
      state.status = "close";
    },
  },
});

export const alertActions = alertSlice.actions;
export const alertReducers = alertSlice.reducer;
