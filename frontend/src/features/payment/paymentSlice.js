import { createSlice } from '@reduxjs/toolkit';
import { getData, saveData } from '../../utils/saveDataLocalStore';

///////////////////////////
//* INITIAL STATE

const initialState = getData('payment')
  ? getData('payment')
  : {
      paymentMethod: 'Paypal',
    };

///////////////////////////
//* createSlice

const paymentSlice = createSlice({
  name: 'payment',
  initialState,

  reducers: {
    savePaymentMethod(state, action) {
      state.paymentMethod = action.payload;
      saveData('payment', state);
    },

    clearPaymentMethod(state) {
      state.paymentMethod = '';
      saveData('payment', state);
    },
  },
});

////////////////////////////

export const { savePaymentMethod, clearPaymentMethod } = paymentSlice.actions;
export default paymentSlice.reducer;
