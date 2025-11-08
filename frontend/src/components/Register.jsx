import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); 

    try {
     
      const res = await axios.post(
        'http://localhost:5000/api/v1/users/register',
        formData
      );

      setMessage('Registration successful! You can now log in.');
      console.log('Token:', res.data.token);
      
      setFormData({ name: '', email: '', password: '' });

    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Registration failed';
      setMessage(errorMsg);
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      
      {/* Display messages here */}
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Register;