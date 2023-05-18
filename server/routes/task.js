const router = require('express').Router();
const Task= require('../models/task')

//get data
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Unable to retrieve lists' });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  try {
    const newTask = await Task.create(req.body);
    res.json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Unable to create a new task' });
  }
});

// Update the listId of a task
router.put('/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const { listId } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(taskId, { listId }, { new: true });
    if (updatedTask) {
      res.sendStatus(200);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Unable to update task listId' });
  }
});

// Mark a task as completed
router.put('/:taskId/complete', async (req, res) => {
  try {
    const { taskId } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(taskId, { completed: true }, { new: true });
    if (updatedTask) {
      res.sendStatus(200);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Unable to mark task as completed' });
  }
});

// Delete a task
router.delete('/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (deletedTask) {
      res.sendStatus(200);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Unable to delete task' });
  }
});

module.exports = router;
