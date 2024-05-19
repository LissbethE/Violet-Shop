import User from '../models/userModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import { createSendToken } from '../utils/generateToken.js';

//////////////////////////

//* Auth user & get token
// @route POST /api/v1/users/login
// @access Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    res.status(400);
    throw new Error('💥 Please provid email and password');
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.matchPassword(password, user.password))) {
    res.status(401);
    throw new Error('💥 Invalid email or password');
  }

  // 3) If everything ok, Send TOKEN to client
  // Send Response 🛩️
  createSendToken(user, 200, req, res);

  // res.send('Auth User');
});

//* Register user
// @route POST /api/v1/users
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({ name, email, password, passwordConfirm });

  if (!user) {
    res.status(400);
    throw new Error('💥Invalid user data');
  }

  // Send Response 🛩️
  createSendToken(user, 201, req, res);
});

//* Logout user / clear cookie
// @route POST /api/v1/users/logout
// @access Private
export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', 'loggedOut', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    maxAge: 0,
  });

  //res.clearCookie('jwt', { path: '/' });

  res
    .status(200)
    .json({ status: 'success', message: 'Logged out successfully 🎉' });
});

//////////////////////////

//* Get user profile
// @route GET /api/v1/users/profile
// @access Private
// Not id. token
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('💥User not found');
  }

  // Send Response 🛩️
  res.status(200).json({
    status: 'success',
    data: { user },
  });
});

//* Update user profile
// @route PATCH  /api/v1/users/profile
// @access Private
// Not id. token
export const updateUserProfile = asyncHandler(async (req, res) => {
  const options = { new: true, runValidators: false };
  const user = await User.findByIdAndUpdate(req.user._id, req.body, options);

  if (!user) {
    res.status(404);
    throw new Error('💥User not found');
  }

  // Send Response 🛩️
  res.status(200).json({
    status: 'success',
    data: { user },
  });
});

//////////////////////////
// A D M I N

//* Get users
// @route GET  /api/v1/users
// @access Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  const user = await User.find({});

  if (!user) {
    res.status(404);
    throw new Error('💥Users not found');
  }

  // Send Response 🛩️
  res.status(200).json({
    status: 'success',
    data: { user },
  });
});

//* Get user by ID
// @route GET  /api/v1/users/:id
// @access Private/Admin
export const getUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    res.status(404);
    throw new Error('💥User not found');
  }

  // Send Response 🛩️
  res.status(200).json({
    status: 'success',
    data: { user },
  });
});

//* Update user
// @route PATCH  /api/v1/users/:id
// @access Private/Admin
export const updatetUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('💥User not found');
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.role = req.body.role || user.role;

  const updateUser = await user
    .save({ validateBeforeSave: false })
    .catch((err) => console.log(err));

  // Send Response 🛩️
  res.status(200).json({
    status: 'success',
    data: { updateUser },
  });
});

//* Delete user
// @route DELETE  /api/v1/users/:id
// @access Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user.role === 'admin') {
    res.status(400);
    throw new Error('💥Cannot delete admin user');
  }

  const data = await User.findByIdAndDelete(req.params.id);

  if (!data) {
    res.status(404);
    throw new Error('💥User not found');
  }

  // Send Response 🛩️
  res.status(200).json({
    status: 'success',
    message: 'User deleted successfully',
    data: null,
  });
});
