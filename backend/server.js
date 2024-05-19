import app from './app.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);

  process.exit(1);
});

//////////////////////////////////

const MONGODB_URI = process.env.MONGO_URI.replace(
  '<PASSWORD>',
  process.env.MONGO_PASSWORD
);

const dbConnect = async function () {
  try {
    const connect = await mongoose.connect(MONGODB_URI);
    console.log(`🟢 MongoDB Connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(`💥 Error: ${error.message}`);
    process.exit(1);
  }
};

dbConnect();

//////////////////////////////////
// START SERVER

const port = process.env.PORT || 3000 || 8080;

const server = app.listen(port, () =>
  console.log(
    `⚡ Server running in ${process.env.NODE_ENV} mode on port ${port}`
  )
);

//////////////////////////////////

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');

  server.close(() => {
    console.log('💥 Process terminated!');
  });
});
