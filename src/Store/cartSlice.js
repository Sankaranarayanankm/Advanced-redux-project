import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart(state,action){
      state.items=action.payload.items;
    },
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === newItem.id
      );
      const existingItem = state.items[existingItemIndex];
      if (existingItem) {
        state.items[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
    },
    incrementCartItem(state, action) {
      const upadatedItemindex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      const updatedItem = state.items[upadatedItemindex];
      state.items[upadatedItemindex] = {
        ...updatedItem,
        quantity: updatedItem.quantity + 1,
      };
    },
    decrementCartItem(state, action) {
      const updatedItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      const updatedItem = state.items[updatedItemIndex];
      if (updatedItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      } else {
        state.items[updatedItemIndex] = {
          ...updatedItem,
          quantity: updatedItem.quantity - 1,
        };
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
