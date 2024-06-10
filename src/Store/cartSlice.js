import { createSlice } from "@reduxjs/toolkit";
import { uiAction } from "./uiSlice";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
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

export const storeData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiAction.handleNotification({
        status: "pending",
        title: "Sending...",
        message: "sending data to backend",
      })
    );
    async function sendRequest() {
      const response = await fetch(
        "https://practice-b7928-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error.message || "Failed to store data");
      }
    }
    try {
      await sendRequest();
      dispatch(
        uiAction.handleNotification({
          status: "success",
          title: "Success!",
          message: "sending data successful",
        })
      );
    } catch (error) {
      dispatch(
        uiAction.handleNotification({
          status: "error",
          title: "Error",
          message: "sending data failed",
        })
      );
    }
  };
};

export const getData = () => {
  return async (dispatch) => {
    dispatch(
      uiAction.handleNotification({
        status: "pending",
        title: "Sending...",
        message: "sending data to backend",
      })
    );
    const getDataHandler = async () => {
      const resposne = await fetch(
        "https://practice-b7928-default-rtdb.firebaseio.com/cart.json"
      );
      if (!resposne.ok) {
        const errData = await resposne.json();
        throw new Error(errData.error.message || "Failed to get Data");
      }
      const resData = await resposne.json();
      return resData;
    };
    try {
      const data = await getDataHandler();
      for (let val of data.items) {
        dispatch(cartActions.addToCart(val));
      }
      dispatch(
        uiAction.handleNotification({
          status: "success",
          title: "Success!",
          message: "sending data successful",
        })
      );
    } catch (error) {
      dispatch(
        uiAction.handleNotification({
          status: "error",
          title: "Error",
          message: "sending data failed",
        })
      );
    }
  };
};

export default cartSlice.reducer;
