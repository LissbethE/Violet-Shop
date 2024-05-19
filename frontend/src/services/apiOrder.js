import axios from 'axios';

import { baseURL } from '../utils/constants';

//////////////////////////

const config = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};

//////////////////////////

//* Create new order
// @route Post /api/v1/orders/createOrder
// @access Private
export async function createOrder({ ...values }) {
  let res = await axios.post(`${baseURL}/orders/createOrder`, values, config);

  if (res.data.status !== 'success') throw new Error('💥 Data invalid');

  return res.data || {};
}

//* Get order by ID
// @route Get /api/v1/orders/:id
// @access Private
export async function getOrderById(id) {
  let res = await axios.get(`${baseURL}/orders/${id}`, config);

  if (res.data.status !== 'success') throw new Error('💥 Order not found');

  return res.data || {};
}

//* Update order to paid
// @route Patch /api/v1/orders/:id/pay
// @access Private
export async function updateOrderToPaid({ orderId, details }) {
  let res = await axios.patch(
    `${baseURL}/orders/${orderId}/pay`,
    details,
    config
  );

  if (res.data.status !== 'success') throw new Error('💥 Error');

  return res.data || {};
}

//* Get logged in user orders
// @route Get /api/v1/orders/myOrders
// @access Private
export async function getMyOrders() {
  let res = await axios.get(`${baseURL}/orders/myOrders`, config);

  if (res.data.status !== 'success')
    throw new Error('💥Please log in to access your orders');

  return res.data || {};
}

//////////////////////////
// A D M I N

//* Get all orders
// @route Get /api/v1/orders
// @access Private/Admin
export async function getOrders() {
  let res = await axios.get(`${baseURL}/orders`, config);

  if (res.data.status !== 'success') throw new Error('💥 Order not found');

  return res.data || {};
}

//* Update order to delivered
// @route Patch /api/v1/orders/:id/deliver
// @access Private/Admin
export async function updateOrderToDelivered(orderId) {
  let res = await axios.patch(
    `${baseURL}/orders/${orderId}/deliver`,
    {},
    config
  );

  if (res.data.status !== 'success') throw new Error('💥 Error');

  return res.data || {};
}
