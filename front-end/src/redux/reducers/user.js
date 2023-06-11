import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, {
  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    localStorage.setItem("user", JSON.stringify(action.payload));
    state.user = action.payload;
  },
  LoadUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  // Update
  updateUserInfoRequest: (state) => {
    state.loading = true;
  },

  updateUserInfoSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.successMessage = action.payload.successMessage;
  },

  updateUserInfoFailed: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  // Logout
  LogOutUserRequest: (state, action) => {
    state.loading = true;
  },

  LogOutUserSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.logOutMessage = action.payload;
  },

  LogOutUserFail: (state, action) => {
    state.isAuthenticated = true;
    state.logOutMessage = action.payload;
  },
});
