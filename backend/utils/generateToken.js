import jwt from 'jsonwebtoken';

//////////////////////////
// Json Web Token

export const signTOKEN = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const createSendToken = function (user, statusCode, req, res) {
  // If everything ok, Send TOKEN to client

  const token = signTOKEN(user._id);

  // sending JWT via cookie
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
  };

  // expires -> 30d

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  // Send responde to client
  res.status(statusCode).json({
    status: 'success',
    token,
    data: { user },
  });
};
