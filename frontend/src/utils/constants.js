const URL =
  import.meta.env.VITE_NODE_ENV === 'development'
    ? import.meta.env.VITE_BACKEND_URL
    : 'https://violet-shop.onrender.com';

export const baseURL = `${URL}/api/v1`;
export const paypalURL = `${URL}/api/v1/config/paypal`;

export const PAGE_SIZE = 5;
