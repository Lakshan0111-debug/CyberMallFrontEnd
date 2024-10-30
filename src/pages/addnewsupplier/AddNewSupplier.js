import React, { useState } from "react";
import "./AddNewSupplier.css";
import AdminSidebar from "../../components/adminsidebar/AdminSidebar";
import AdminNavbar from "../../components/adminnavbar/AdminNavbar";
import ProfileImg from "../../assets/DefaultProfile.jpg";
import axios from 'axios';

const AddNewSupplier = () => {
  const [formData, setFormData] = useState({
    supplierName: "",
    address: "",
    email: "",
    phoneNumber: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send data as JSON instead of FormData
    const data = {
      supplierName: formData.supplierName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      address: formData.address
    };

    try {
      await axios.post('http://localhost:8080/suppliers/addS', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert("Supplier added successfully");
    } catch (error) {
      console.error("There was an error adding the supplier:", error);
    }

    // Reset form to empty fields
    setFormData({
      supplierName: "",
      address: "",
      email: "",
      phoneNumber: ""
    });
  };

  return (
    <div className='addNewSupplier'>
      <AdminSidebar/>
      <div className='addNewSupplierContainer'>
        <AdminNavbar/>
        <div className='top'>
            <h1>ADD NEW SUPPLIER</h1>
        </div>
        <div className='bottom'>
          <div className='left'>
            <img src={ProfileImg} alt="" className='image'/>
          </div>
          <div className='right'>
            <form onSubmit={handleSubmit}>
              <div className='formInput'>
                <label>Supplier Name</label>
                <input 
                  type='text' 
                  name='supplierName' 
                  placeholder="Enter Supplier's Name"
                  value={formData.supplierName} 
                  onChange={handleInputChange} 
                  required
                />
              </div>
              <div className='formInput'>
                <label>Address</label>
                <input 
                  type='text' 
                  name='address' 
                  placeholder="Enter Supplier's Address"
                  value={formData.address} 
                  onChange={handleInputChange} 
                  required
                />
              </div>
              <div className='formInput'>
                <label>E-Mail</label>
                <input 
                  type='email' 
                  name='email' 
                  placeholder="Enter Supplier's E-Mail"
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required
                />
              </div>
              <div className='formInput'>
                <label>Phone</label>
                <input 
                  type='text' 
                  name='phoneNumber' 
                  placeholder="Enter Supplier's Phone No"
                  value={formData.phoneNumber} 
                  onChange={handleInputChange} 
                  required
                />
              </div>
              <button type='submit'>Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewSupplier;
