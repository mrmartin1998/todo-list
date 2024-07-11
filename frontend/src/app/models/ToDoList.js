import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const ToDoListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  items: [ItemSchema],
});

const ToDoList = mongoose.models.ToDoList || mongoose.model('ToDoList', ToDoListSchema);

export default ToDoList;
