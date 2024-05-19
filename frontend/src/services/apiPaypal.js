import axios from 'axios';

import { paypalURL } from '../utils/constants';

//////////////////////////

const config = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};

//////////////////////////

//?   P A Y P A L

export async function getPayPalClientId() {
  let res = await axios.get(`${paypalURL}`, config);

  if (res.status !== 200) throw new Error('💥 Error');

  return res.data || {};
}
