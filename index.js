import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './route/userRoutes.js';

const app = express();
const uri = 'mongodb://localhost:27017/todos';
const port = 9000;

app.use(express.json());

app.use('/api/auth', userRoutes);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection.on('open', () => console.log('Database connected.'));

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);