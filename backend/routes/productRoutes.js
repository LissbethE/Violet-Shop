import express from 'express';

import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createdProductReview,
} from '../controllers/productController.js';

import { protect, restrictTo } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

//////////////////////////////////

const router = express.Router();

router
  .route('/')
  .get(getAllProducts)
  .post(protect, restrictTo('admin'), createProduct);

router
  .route('/:id')
  .get(checkObjectId, getProduct)
  .patch(protect, restrictTo('admin'), checkObjectId, updateProduct)
  .delete(protect, restrictTo('admin'), checkObjectId, deleteProduct);

router.route('/:id/reviews').post(protect, createdProductReview);

//////////////////////////////////

export default router;
