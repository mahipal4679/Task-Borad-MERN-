const mongoose = require('mongoose');

// Create task schema
const taskSchema = new mongoose.Schema({
  name: String,
  listId: String,
  completed: Boolean,
});
module.exports= mongoose.model('Task', taskSchema);

 