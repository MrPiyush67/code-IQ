import mongoose from 'mongoose';
import { ENV } from './env.js';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.DB_URI);
    console.log('connect to DB: ', conn.connection.host);
  } catch (error) {
    console.error('error connecting to mongoDB ', error);
    process.exit(1); // 0 for success , 1 for failed
  }
};
