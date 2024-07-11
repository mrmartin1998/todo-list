import mongoose from 'mongoose';

const ToDoListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [40, 'Name cannot be more than 40 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.ToDoList || mongoose.model('ToDoList', ToDoListSchema);
