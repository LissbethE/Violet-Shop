import axios from 'axios';

import { baseURL } from '../utils/constants';

//////////////////////////

export async function uploadProductImage({ productId, data }) {
  const image = new FormData();
  image.append('image', data);

  await axios.post(`${baseURL}/upload/${productId}/productImage`, image);
}

export async function uploadUserPhoto({ userId, data }) {
  const image = new FormData();
  image.append('image', data);

  await axios.post(`${baseURL}/upload/${userId}/userImage`, image);
}
