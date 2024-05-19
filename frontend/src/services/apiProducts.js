import axios from 'axios';

import { baseURL } from '../utils/constants';
import validator from 'validator';

//////////////////////////

const config = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};

//////////////////////////

//* Get all product
// @route GET /api/v1/products
// @access Public
export async function getAllProducts({ page, category }) {
  let res = await axios.get(`${baseURL}/products`, {
    params: { page, category },
  });

  if (res.data.status !== 'success')
    throw Error('💥 Products could not be loaded');

  return res.data || [];
}

//* Get One Hundred Products
// @route GET /api/v1/products?limit=100
// @access Public
export async function getOneHundredProducts() {
  let res = await axios.get(`${baseURL}/products?limit=100`);

  if (res.data.status !== 'success')
    throw Error('💥 Products could not be loaded');

  return res.data || [];
}

//* Get single product
// @route GET /api/v1/products/:id
// @access Public
export async function getProduct(id) {
  let res = await axios.get(`${baseURL}/products/${id}`);

  if (res.data.status !== 'success')
    throw Error('💥 Products could not be loaded');

  return res.data || [];
}

//////////////////////////
// A D M I N

//* Create new product
// @route   POST /api/products
// @access  Private/Admin
export async function createProduct() {
  let res = await axios.post(`${baseURL}/products`, {}, config);

  if (res.data.status !== 'success') throw new Error('💥Data invalid');

  return res.data || {};
}

//* Update product
// @route   PATCH /api/products/:id
// @access  Private/Admin
export async function updateProduct({ productId, data }) {
  let res = await axios.patch(`${baseURL}/products/${productId}`, data, config);

  if (res.data.status !== 'success') throw new Error('💥 Error');

  return res.data || {};
}

//* Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export async function deleteProduct(productId) {
  let res = await axios.delete(`${baseURL}/products/${productId}`, config);

  if (res.data.status !== 'success') throw new Error('💥 Error');

  return null;
}

//////////////////////////
// R E V I E W

//* Create a new review
// @route POST /api/v1/products/:id/reviews
// @access Private
export async function createdProductReview({ productId, data }) {
  let res = await axios.post(
    `${baseURL}/products/${productId}/reviews`,
    data,
    config
  );

  if (res.data.status !== 'success') throw new Error('💥Data invalid');

  return res.data || {};
}
