import { createSlice } from '@reduxjs/toolkit';
import { getData, saveData } from '../../utils/saveDataLocalStore';

///////////////////////////
//* INITIAL STATE

const initialState = getData('shippingAddress')
  ? getData('shippingAddress')
  : {
      shippingAddress: {},
    };

///////////////////////////
//* createSlice

const shippingAddressSlice = createSlice({
  name: 'shippingAddress',
  initialState,

  reducers: {
    saveShippingAddress(state, action) {
      state.shippingAddress = action.payload;
      saveData('shippingAddress', state);
    },

    editShippingAddress(state, action) {
      state.shippingAddress = {};

      state.shippingAddress = action.payload;

      saveData('shippingAddress', state);
    },

    clearShippingAddress(state) {
      state.shippingAddress = {};
      saveData('shippingAddress', state);
    },
  },
});

////////////////////////////

export const {
  saveShippingAddress,
  editShippingAddress,
  clearShippingAddress,
} = shippingAddressSlice.actions;

export default shippingAddressSlice.reducer;
