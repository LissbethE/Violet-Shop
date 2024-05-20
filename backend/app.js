import path from 'path';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';

import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';

import { notFound, errorHandler } from './utils/errorHandler.js';

dotenv.config({ path: './config.env' });

//////////////////////////////////

const app = express();

//////////////////////////////////
// 1) GLOBAL MIDDLEWARE

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Implement CORS
app.use(cors({ origin: true, credentials: true }));

// { credentials: true }

// Access-Control-Allow-Origin header to everything
app.options('*', cors());

// Parse data coming from a URL-encoded form
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Body parser, reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));

// Parse the data from the cookie
app.use(cookieParser());

// Date Sanitization against NoSQL query injection
app.use(mongoSanitize());

// compress all the text that is sent to client. not img
app.use(compression());

//////////////////////////////////
// 2) ROUTES

//app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
// /var/data/uploads

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();

  app.use('/uploads', express.static('/var/data/uploads'));
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  /* app.use(
    '/uploads',
    express.static(path.join(__dirname, '/frontend/dist/img'))
  );*/
} else {
  const __dirname = path.resolve();

  app.use(
    '/uploads',
    express.static(path.join(__dirname, '/frontend/public/img'))
  );
}

app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/upload', uploadRouter);

app.get('/api/v1/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

/*
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();

  app.get('/', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
}*/

app.use(notFound);
app.use(errorHandler);

//////////////////////////////////

export default app;
