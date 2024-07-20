import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const ToDoListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  items: [ItemSchema],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const ToDoList = mongoose.models.ToDoList || mongoose.model('ToDoList', ToDoListSchema);

export default ToDoList;
