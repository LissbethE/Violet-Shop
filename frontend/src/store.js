import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './features/cart/cartSlice';
import paymentReducer from './features/payment/paymentSlice';
import shippingAddressReducer from './features/shipping/shippingAddressSlice';

//////////////////////////
//* STORES

const store = configureStore({
  reducer: {
    cart: cartReducer,
    payment: paymentReducer,
    shippingAddress: shippingAddressReducer,
  },
});

export default store;
