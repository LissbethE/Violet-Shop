import { createSlice } from '@reduxjs/toolkit';
//import { saveData } from '../../utils/saveDataLocalStore';

import { getData, saveData } from '../../utils/saveDataLocalStore';

///////////////////////////
//* INITIAL STATE

/*const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : {
      cart: [],
      results: 0,
    };*/

const initialState = getData('cart')
  ? getData('cart')
  : {
      cart: [],
      results: 0,
    };

///////////////////////////
//* createSlice

const cartSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    addItem(state, action) {
      // payload = newItem

      state.cart.push(action.payload);
      state.results = state.cart.length;

      saveData('cart', state);
    },

    deleteItem(state, action) {
      // payload = id
      state.cart = state.cart.filter(
        (item) => item.productId !== action.payload
      );

      state.results = state.cart.length;

      saveData('cart', state);
    },

    changeSizeItem: {
      prepare(productId, size) {
        return { payload: { productId, size } };
      },

      reducer(state, action) {
        if (action.payload.size === undefined) return;

        const item = state.cart.find(
          (item) => item.productId === action.payload.productId
        );

        item.size = action.payload.size;

        saveData('cart', state);
      },
    },

    increaseItemQuantity(state, action) {
      // payload = id
      const item = state.cart.find((item) => item.productId === action.payload);

      item.quantity++;
      item.totalPrice = item.quantity * item.price;

      saveData('cart', state);
    },

    decreaseItemQuantity(state, action) {
      // payload = id
      const item = state.cart.find((item) => item.productId === action.payload);

      item.quantity--;
      item.totalPrice = item.quantity * item.price;

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);

      saveData('cart', state);
    },

    clearCart(state) {
      state.cart = [];
      state.results = 0;

      saveData('cart', state);
    },

    resetCart: (state) => (state = initialState),
  },
});

////////////////////////////

export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.cart?.reduce((sum, item) => sum + item?.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart?.reduce((sum, item) => sum + item?.totalPrice, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart?.find((item) => item.productId === id)?.quantity ?? 0;

////////////////////////////

export const {
  addItem,
  deleteItem,
  changeSizeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
