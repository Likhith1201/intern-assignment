import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const [message, setMessage] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));

  
  const config = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5000/api/v1/tasks/mytasks',
        config
      );
      setTasks(res.data); 
    } catch (err) {
      console.error(err);
      setMessage('Failed to fetch tasks');
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, []); 

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.post(
        'http://localhost:5000/api/v1/tasks',
        formData,
        config
      );
      
      setTasks([res.data, ...tasks]);
      
      setFormData({ title: '', description: '' });
      setMessage('Task created successfully!');

    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to create task';
      setMessage(errorMsg);
    }
  };

  const deleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }
    
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/tasks/${taskId}`,
        config
      );

      setTasks(tasks.filter((task) => task._id !== taskId));
      setMessage('Task deleted successfully');

    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to delete task';
      setMessage(errorMsg);
    }
  };

  return (
    <div className="task-dashboard">
      <h3>My Tasks</h3>
      
      <div className="form-container task-form">
        <h4>Create New Task</h4>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={onChange}
              required
            />
          </div>
          <button type="submit">Create Task</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>

      <div className="task-list">
        <h4>Task List</h4>
        {tasks.length === 0 ? (
          <p>You have no tasks. Create one above!</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="task-item">
              <div>
                <strong>{task.title}</strong> (Status: {task.status})
                <p>{task.description}</p>
              </div>
              <button
                className="delete-btn"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TaskDashboard;