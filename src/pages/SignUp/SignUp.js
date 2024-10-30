import React, { useState } from 'react';
import './SignUp.css';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phoneNumber: '',
    address: '',
    nic: '',
    userName: '',
    password: ''
  });

  // Handle input change to update form data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      customerName: formData.customerName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      nic: formData.nic,
      userName: formData.userName,
      password: formData.password // Ensure password is lowercase
    };

    try {
      await axios.post('http://localhost:8080/customers/addC', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('Customer added successfully');
    } catch (error) {
      console.error('There was an error adding the customer:', error);
    }

    // Reset form fields after submission
    setFormData({
      customerName: '',
      email: '',
      phoneNumber: '',
      address: '',
      nic: '',
      userName: '',
      password: ''
    });
  };

  return (
    <div>
      <Navbar />
      <div className="signup-container">
        <div className="signup-box">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="customerName"
              placeholder="Your Name"
              value={formData.customerName}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your E-Mail"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Your Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Your Address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="nic"
              placeholder="Your NIC"
              value={formData.nic}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={formData.userName}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Create account</button>

            <div className="terms">
              <input type="checkbox" required /> By continuing, I agree to the terms of use & privacy policy.
            </div>

            <p className="login-link">
              Already have an account? <a href="/logIn">Login here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
