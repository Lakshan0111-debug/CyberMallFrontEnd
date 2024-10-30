import React, { useState } from 'react';
import './LogIn.css';
import Navbar from '../../components/Navbar/Navbar';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Log In form submitted:', formData);
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
