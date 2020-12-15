import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 4,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

export default mongoose.model('Auth', userSchema);
