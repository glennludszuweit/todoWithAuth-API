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
});

export default mongoose.model('Todos', todosSchema);
