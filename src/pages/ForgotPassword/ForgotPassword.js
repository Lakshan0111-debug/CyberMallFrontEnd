import React, { useState } from 'react';
import './ForgotPassword.css';
import Navbar from '../../components/Navbar/Navbar';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle forgot password submission logic here
    console.log('Password reset email sent to:', email);
  };

  return (
    <div>
      <Navbar/>
      <div className="forgot-container">
        <div className="forgot-box">
          <h2>Forgot Password</h2>
          <p>Enter your email address to reset your password.</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={email}
              onChange={handleChange}
              required
            />
            <button type="submit">Send Reset Link</button>
          </form>
          <p className="login-link">
            Remember your password? <a href="/login">Log In here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
