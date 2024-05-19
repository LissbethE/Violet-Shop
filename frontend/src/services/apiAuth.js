import axios from 'axios';
import { baseURL } from '../utils/constants';

//////////////////////////

const config = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};

//////////////////////////

//* Register user
// @route POST /api/v1/users
// @access Public
export async function signup({ name, email, password, passwordConfirm }) {
  let res = await axios.post(
    `${baseURL}/users`,
    {
      name,
      email,
      password,
      passwordConfirm,
    },
    config
  );

  if (res.data.status !== 'success') throw new Error('💥Data invalid');

  return res.data || {};
}

//* Auth user & get token
// @route POST /api/v1/users/login
// @access Public
export async function login({ email, password }) {
  let res = await axios.post(
    `${baseURL}/users/login`,
    { email, password },
    config
  );

  if (res.data.status !== 'success') throw new Error('💥Data invalid');

  return res.data || {};
}

//* Logout user / clear cookie
// @route POST /api/v1/users/logout
// @access Private
export async function logout() {
  let res = await axios.post(`${baseURL}/users/logout`, config);

  if (res.data.status !== 'success') throw new Error('💥Something went awry.');

  return;
}
