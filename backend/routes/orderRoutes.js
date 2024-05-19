import express from 'express';

import {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from '../controllers/orderController.js';

import { protect, restrictTo } from '../middleware/authMiddleware.js';

//////////////////////////////////

const router = express.Router();

router.route('/').get(protect, restrictTo('admin'), getOrders);

router.route('/createOrder').post(protect, createOrder);
router.route('/myOrders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').patch(protect, updateOrderToPaid);

router
  .route('/:id/deliver')
  .patch(protect, restrictTo('admin'), updateOrderToDelivered);

//////////////////////////////////

export default router;
