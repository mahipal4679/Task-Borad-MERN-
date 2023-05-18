import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskList.css'

//For Updating States
const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');


  //useEffect Hook
  useEffect(() => {
    fetchTasks();
  }, []);

  //function CreateTask
  const createTask = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', { name: newTaskName });
      setTasks([...tasks, response.data]);
      setNewTaskName('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  //APi for Fetching
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  //api for updateing List
  const updateTaskListId = async (taskId, listId) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, { listId });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task listId:', error);
    }
  };

  //Api for Mark Completed
  const markTaskAsCompleted = async (taskId) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}/complete`);
      fetchTasks();
    } catch (error) {
      console.error('Error marking task as completed:', error);
    }
  };

  //Api for Deleteing
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="task-list-container">
      <h1>Task List</h1>
      <div className="add-task-container">
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="Enter task name"
        />
        <button onClick={createTask}>Create Task</button>
      </div>
      <ul className="task-items">
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <div className="task-details">
              <div className="task-name">{task.name}</div>
              <div className="task-meta">
                <div className="list-id">List ID: {task.listId}</div>
                <div className="completed">
                  Completed: {task.completed ? 'Yes' : 'No'}
                </div>
              </div>
            </div>
            <div className="task-actions">
              <button
                className="action-button"
                onClick={() => updateTaskListId(task._id, 'Updated')}
              >
                Update List ID
              </button>
              <button
                className="action-button"
                onClick={() => markTaskAsCompleted(task._id)}
              >
                Mark as Completed
              </button>
              <button className="action-button" onClick={() => deleteTask(task._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
