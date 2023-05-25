import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const eventReducer = createReducer(initialState, {
  // create Event
  CreateEventRequest: (state) => {
    state.isLoading = true;
  },

  CreateEventSuccess: (state, action) => {
    state.isLoading = false;
    state.newEvent = action.payload;
    state.success = true;
    state.error = false;
    // console.log("danh sach cate: ", state.categoriesData);
  },

  CreateEventFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Get All event
  GetAllEventRequest: (state) => {
    state.isLoading = true;
  },

  GetAllEventSuccess: (state, action) => {
    state.isLoading = false;
    state.eventData = action.payload;
    state.success = true;
  },

  GetAllEventFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // Delete event
  DeleteEventRequest: (state) => {
    state.isLoading = true;
  },

  DeleteEventSuccess: (state, action) => {
    state.isLoading = false;
    state.success = true;
    state.message = action.payload;
  },

  DeleteEventFaid: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  ClearError: (state) => {
    state.error = null;
  },
});
