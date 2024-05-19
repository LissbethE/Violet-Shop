import express from 'express';

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserByID,
  updatetUser,
  deleteUser,
} from '../controllers/userController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

//////////////////////////////////

const router = express.Router();

router
  .route('/')
  .post(registerUser)
  .get(protect, restrictTo('admin'), getUsers);

// The user must be registered
router
  .route('/profile')
  .get(protect, getUserProfile)
  .patch(protect, updateUserProfile);

// Only for admin
router
  .route('/:id')
  .delete(protect, restrictTo('admin'), deleteUser)
  .get(protect, restrictTo('admin'), getUserByID)
  .patch(protect, restrictTo('admin'), updatetUser);

router.post('/logout', logoutUser);
router.post('/login', authUser);

//////////////////////////////////

export default router;
