import React, { useState } from 'react';
import './LogIn.css';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';




const LogIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Send login request to the backend
      const response = await axios.post('http://localhost:8080/user/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Handle success response
      alert(response.data); // "Login Successful!"
      console.log('User logged in:', response.data);
  
      // Redirect or update UI after login success
      window.location.href = '/'; 
    } catch (error) {
      // Handle error response
      if (error.response && error.response.status === 401) {
        alert(error.response.data); // "Invalid credentials"
      } else {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="login-container">
        <div className="login-box">
          <h2>Log In</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <p className="forgot-password">
              <a href="/forgotPassword">Forgot Password?</a>
            </p>

            <button type="submit">Log In</button>

            <p className="signup-link">
              Don't have an account? <a href="/signUp">Sign Up here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
