import React, { useState, useEffect } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import TaskDashboard from './components/TaskDashboard'; 
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []); 

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.reload();
  };

  return (
    <div className="App">
      <h1>User Management Dashboard</h1>
      
      {user ? (
        <div className="welcome-container">
          <h2>Welcome, {user.name}!</h2>
          <p>Your role is: <strong>{user.role}</strong></p>
          <button onClick={handleLogout}>Logout</button>
          
          <hr />
          <TaskDashboard /> 
        </div>
      ) : (
        <div className="auth-container">
          <Register />
          <Login />
        </div>
      )}
    </div>
  );
}

export default App;