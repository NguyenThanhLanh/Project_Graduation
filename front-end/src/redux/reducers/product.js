import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const productReducer = createReducer(initialState, {
  LoadProductRequest: (state) => {
    state.isLoading = true;
  },

  LoadProductRequestSuccess: (state, action) => {
    state.isLoading = false;
    state.productData = action.payload;
    state.success = true;
    // console.log("danh sach cate: ", state.categoriesData);
  },

  LoadProductRequestFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // create Product
  CreateProductRequest: (state) => {
    state.isLoading = true;
  },

  CreateProductSuccess: (state, action) => {
    state.isLoading = false;
    state.newproduct = action.payload;
    state.success = true;
  },

  CreateProductFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Delete product
  DeleteProductRequest: (state) => {
    state.isLoading = true;
  },

  DeleteProductSuccess: (state, action) => {
    state.isLoading = false;
    state.success = true;
    state.message = action.payload;
  },

  DeleteProductFaild: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  ClearError: (state) => {
    state.error = null;
  },
});
