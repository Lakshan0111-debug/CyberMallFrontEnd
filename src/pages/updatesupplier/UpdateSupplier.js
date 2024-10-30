import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateSupplier.css";
import AdminSidebar from "../../components/adminsidebar/AdminSidebar";
import AdminNavbar from "../../components/adminnavbar/AdminNavbar";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { DriveFolderUploadOutlined, Close } from "@mui/icons-material";
import axios from "axios"; // Import axios for API calls

const UpdateSupplier = () => {
  const { supplierId } = useParams();
  const navigate = useNavigate();

  const [supplierName, setSupplierName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    loadSupplierDetails();
  }, [supplierId]);

  const loadSupplierDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/suppliers/${supplierId}`);
      const supplier = response.data;
      setSupplierName(supplier.supplierName);
      setEmail(supplier.email);
      setPhoneNumber(supplier.phoneNumber);
      setAddress(supplier.address);

    } catch (error) {
      console.error("Error fetching supplier details:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedSupplier = {supplierId: parseInt(supplierId),supplierName,email,phoneNumber,address
    };

    console.log('Updating supplier with data:', updatedSupplier);

    axios.put(`http://localhost:8080/suppliers/${supplierId}`, updatedSupplier)
      .then(response => {
        console.log('Supplier details updated:', response.data);
        navigate('/manageSuppliers');
      })
      .catch(error => {
        console.error("There was an error updating the supplier!", error);
      });
  };

  /*const handleImageChange = (e) => {
    const file = e.target.files[0]; // Allow only one file
    const newPreview = [];

    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        alert(`Invalid file type: ${file.name}. Please upload JPEG or PNG images only.`);
        return;
      }
      newPreview.push(URL.createObjectURL(file)); // Preview the uploaded image
    }

    if (newPreview.length + imagePreview.length > 1) {
      alert("You can only upload one image.");
      return;
    }

    setImagePreview((prev) => [...prev, ...newPreview].slice(0, 1)); // Ensure only 1 image
  };

  const removeImage = () => {
    setImagePreview(null); // Remove the current image
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };*/

  return (
    <div className='updateSupplier'>
      <AdminSidebar />
      <div className='updateSupplierContainer'>
        <AdminNavbar />
        <div className='top'>
          <h1>UPDATE SUPPLIER</h1>
        </div>
        <div className='bottom'>
          <div className="left">
            {/*<div className="imageContainer">
              {imagePreview ? (
                <div className="imageWrapper">
                  <img
                    src={imagePreview}
                    alt="Uploaded Preview"
                    className="imagePreview"
                  />
                  <Close className="removeIcon" onClick={removeImage} />
                </div>
              ) : (
                <ShoppingCartOutlinedIcon className="placeholder" />
              )}
            </div>*/}
          </div>
          <div className='right'>
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                {/*<label htmlFor='fileInput' className='fileUploadLabel'>
                  <DriveFolderUploadOutlined className='uploadIcon' />
                  <span>Choose Image</span>
                </label>
                <input 
                  type="file" 
                  id="fileInput" 
                  multiple 
                  onChange={handleImageChange} 
                  style={{ display: "none" }} 
                />*/}
              </div>
              <div className='formInput'>
                <label>Supplier ID</label>
                <label>{supplierId}</label>
              </div>
              <div className='formInput'>
                <label>Supplier Name</label>
                <input 
                  type='text' 
                  name='supplierName' 
                  value={supplierName} 
                  onChange={(e)=> setSupplierName(e.target.value)}
                  placeholder='Enter Supplier Name'
                  required 
                />
              </div>
              <div className='formInput'>
                <label>E-Mail</label>
                <input 
                  type='email'
                  name='supplierEmail'
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                  placeholder="Enter Supplier's E-Mail"
                />
              </div>
              <div className='formInput'>
                <label>Phone</label>
                <input 
                  type='number'
                  name='supplierPhone'
                  value={phoneNumber}
                  onChange={(e)=> setPhoneNumber(e.target.value)}
                  placeholder="Enter Supplier's Phone Number"
                />
              </div>
              <div className='formInput'>
                <label>Address</label>
                <input 
                  type='text'
                  name='supplierAddress'
                  value={address}
                  onChange={(e)=> setAddress(e.target.value)}
                  placeholder="Enter Supplier's Address"
                />
              </div>
              <button type='submit'>
                Update Supplier
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSupplier;
