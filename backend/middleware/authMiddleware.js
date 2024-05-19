import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import User from '../models/userModel.js';
import asyncHandler from '../utils/asyncHandler.js';

//////////////////////////
// Protect Routes

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  const isAuthorized =
    req.headers.authorization && req.headers.authorization.startsWith('Bearer');

  // 1) Getting token and check of it's there
  if (isAuthorized) token = req.headers.authorization.split(' ')[1];
  else if (req.cookies.jwt) token = req.cookies.jwt;

  if (!token) {
    res.status(401);
    return next(
      new Error("💥You aren't logged in! Please login to get access.")
    );
  }

  // 2) Verification token
  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  // 3) Check if user still exists
  const currentUser = await User.findById(decodedToken.id);

  if (!currentUser) {
    res.status(401);
    return next(
      new Error("💥The user belonging to this TOKEN doesn't longer exist.")
    );
  }

  // Grant Access To Protected Route
  req.user = currentUser;
  res.locals.user = currentUser;

  next();
});

//////////////////////////
// Restrict Certain Routes.

export const restrictTo = function (...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403);

      return next(
        new Error("💥You don't have permission to perform this action")
      );
    }

    next();
  };
};
