import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCart: true,
  notification: null,
};
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    handleNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

export const uiAction = uiSlice.actions;

export default uiSlice.reducer;
