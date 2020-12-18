import mongoose from 'mongoose';

const todosSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 4,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auth',
  },
});

export default mongoose.model('Todos', todosSchema);
