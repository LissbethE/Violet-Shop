const notFound = (req, res, next) => {
  const error = new Error(`💥 Not Found - ${req.originalUrl}`);
  console.log('Error: ', error, error.message);

  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };
