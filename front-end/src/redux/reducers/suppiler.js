import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const suppilerReducer = createReducer(initialState, {
  LoadSuppilerRequest: (state) => {
    state.isLoading = true;
  },

  LoadSuppilerRequestSuccess: (state, action) => {
    state.isLoading = false;
    state.suppilerData = action.payload;
    state.success = true;
    // console.log("danh sach cate: ", state.categoriesData);
  },

  LoadSuppilerRequestFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Create Suppiler
  CreateSuppilerRequest: (state) => {
    state.isLoading = true;
  },

  CreateSuppilerRequestSuccess: (state, action) => {
    state.isLoading = false;
    state.newSuppiler = action.payload;
    // console.log("danh sach cate: ", state.categoriesData);
  },

  CreateSuppilerRequestFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Delete Suppiler
  DeleteSuppilerRequest: (state) => {
    state.isLoading = true;
  },

  DeleteSuppilerRequestSuccess: (state, action) => {
    state.isLoading = false;
    state.success = true;
    state.message = action.payload;
    // console.log("danh sach cate: ", state.categoriesData);
  },

  DeleteSuppilerRequestFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
});
