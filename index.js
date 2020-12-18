import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './route/authRoutes.js';
import todoRoutes from './route/todoRoutes.js';

const app = express();
dotenv.config();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/todo', todoRoutes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection.on('open', () => console.log('Database connected.'));

app.listen(process.env.PORT, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);
