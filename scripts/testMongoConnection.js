// Import mongoose
const mongoose = require('mongoose');

// MongoDB URI from the .env.local file
const MONGODB_URI = 'mongodb+srv://Martin_emil_Brabenec:KzIAUhbpitQxYFwF@todolist.ten0z4l.mongodb.net/todolist?retryWrites=true&w=majority&appName=ToDoList';

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    mongoose.connection.close();
  }
}

connectToDatabase();
