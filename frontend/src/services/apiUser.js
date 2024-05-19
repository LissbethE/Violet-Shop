import axios from 'axios';
import { getData } from '../utils/saveDataLocalStore';

import { baseURL } from '../utils/constants';

const config = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};

//////////////////////////

//* Get user profile
// @route GET /api/v1/users/profile
// @access Private
// Not id. token
export async function getCurrentUser() {
  const userLoggedIn = getData('userLoggedIn');

  if (!userLoggedIn) return;

  let res = await axios.get(`${baseURL}/users/profile`, config);

  if (res?.data?.status !== 'success') return;

  return res?.data || {};
}

//* Update user profile
// @route PATCH  /api/v1/users/profile
// @access Private
// Not id. token
export async function updateUserProfile({ ...values }) {
  let res = await axios.patch(`${baseURL}/users/profile`, values, config);

  if (res.data.status !== 'success') return;

  return res.data || {};
}

//////////////////////////
// A D M I N

//* Get users
// @route GET  /api/v1/users
// @access Private/Admin
export async function getUsers() {
  let res = await axios.get(`${baseURL}/users`, config);

  if (res.data.status !== 'success') return;

  console.log('userss', res.data);

  return res.data || {};
}

//* Update user
// @route PATCH  /api/v1/users/:id
// @access Private/Admin
export async function updateUser({ userId, data }) {
  console.log('sss', userId, data);
  let res = await axios.patch(`${baseURL}/users/${userId}`, data, config);

  if (res.data.status !== 'success') throw new Error('💥 Error');

  return res.data || {};
}

//* Delete user
// @route DELETE  /api/v1/users/:id
// @access Private/Admin
export async function deleteUser(userID) {
  let res = await axios.delete(`${baseURL}/users/${userID}`, config);

  if (res.data.status !== 'success') throw new Error('💥 Error');

  return null;
}
