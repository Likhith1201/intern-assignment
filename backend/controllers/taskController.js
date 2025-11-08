const Task = require('../models/taskModel');
const User = require('../models/userModel');

const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description) {
      res.status(400);
      throw new Error('Please provide a title and description');
    }

    const task = new Task({
      user: req.user._id, 
      title,
      description,
      status: status || 'pending', 
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};


const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};


const updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.findById(req.params.id); 

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    if (task.user.toString() !== req.user._id.toString()) {
      res.status(401); 
      throw new Error('User not authorized to update this task');
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};


const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id); 

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    if (task.user.toString() !== req.user._id.toString()) {
      res.status(401); 
      throw new Error('User not authorized to delete this task');
    }

    await task.remove();
    res.status(200).json({ message: 'Task removed successfully' });
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};


const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).populate('user', 'name email'); 
    res.status(200).json(tasks);
  } catch (error) {
    res.status(res.statusCode || 500).json({ message: error.message });
  }
};


module.exports = {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask,
  getAllTasks,
};