const express = require('express');
const router = express.Router();
const {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask,
  getAllTasks,
} = require('../controllers/taskController');

const { protect, admin } = require('../middleware/authMiddleware');


router.post('/', protect, createTask);


router.get('/mytasks', protect, getMyTasks);


router.get('/all', protect, admin, getAllTasks);


router.put('/:id', protect, updateTask);


router.delete('/:id', protect, deleteTask);


module.exports = router;