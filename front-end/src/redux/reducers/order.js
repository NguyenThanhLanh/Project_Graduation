import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const orderReducer = createReducer(initialState, {
  // create Event
  LoadOrderUserRequest: (state) => {
    state.isLoading = true;
  },

  LoadOrderUserSuccess: (state, action) => {
    state.isLoading = false;
    state.orderData = action.payload;
    state.success = true;
    // console.log("danh sach cate: ", state.categoriesData);
  },

  LoadOrderUserFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  loadAllOrderAdminRequest: (state) => {
    state.isLoading = true;
  },

  loadAllOrderAdminSuccess: (state, action) => {
    state.isLoading = false;
    state.orderAdminData = action.payload;
    state.success = true;
    // console.log("danh sach cate: ", state.categoriesData);
  },

  loadAllOrderAdminFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  deleteOrderAdminRequest: (state) => {
    state.isLoading = true;
  },

  deleteOrderAdminSuccess: (state, action) => {
    state.isLoading = false;
    state.deleteOrderData = action.payload;
    state.success = true;
    // console.log("danh sach cate: ", state.categoriesData);
  },

  deleteOrderAdminFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
});
