import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const categoryReducer = createReducer(initialState, {
  LoadCategoryRequest: (state) => {
    state.isLoading = true;
  },

  LoadCategoryRequestSuccess: (state, action) => {
    state.isLoading = false;
    state.categoriesData = action.payload;
    // console.log("danh sach cate: ", state.categoriesData);
  },

  LoadCategoryRequestFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
});
