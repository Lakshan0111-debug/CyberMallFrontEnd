import React, { useState } from "react";
import "./AddNewProduct.css";
import AdminSidebar from "../../components/adminsidebar/AdminSidebar";
import AdminNavbar from "../../components/adminnavbar/AdminNavbar";
import { DriveFolderUploadOutlined, Close } from "@mui/icons-material";
import axios from 'axios'; // Import Axios

const AddNewProduct = () => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    supplierName: "",
    unitPrice: "",
    quantity: ""
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const newPreviews = [];

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        alert(`Invalid file type: ${file.name}. Please upload JPEG or PNG images only.`);
        return;
      }
      newPreviews.push(URL.createObjectURL(file));
    }

    if (newPreviews.length + imagePreviews.length > 4) {
      alert("You can only upload a maximum of 4 images.");
      return;
    }

    setImagePreviews((prev) => [...prev, ...newPreviews].slice(0, 4));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('file', e.target.fileInput.files[0]); // Only one file for now
    data.append('productName', formData.productName);
    data.append('description', formData.description);
    data.append('supplierName', formData.supplierName);
    data.append('unitPrice', formData.unitPrice);
    data.append('quantity', formData.quantity);

    try {
      await axios.post('http://localhost:8080/products/addP', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("Product added successfully");
    } catch (error) {
      console.error("There was an error adding the product:", error);
    }

    setImagePreviews([]);
    setFormData({
      productName: "productName",
      description: "description",
      supplierName: "supplierName",
      unitPrice: "unitPrice",
      quantity: "quantity"
    });
    e.target.reset();
  };

  return (
    <div className='addNewProduct'>
      <AdminSidebar />
      <div className='addNewProductContainer'>
        <AdminNavbar />
        <div className='top'>
          <h1>ADD NEW PRODUCT</h1>
        </div>
        <div className='bottom'>
          <div className="left">
            <div className="imageGrid">
              {imagePreviews.map((src, index) => (
                <div key={index} className="imageContainer">
                  <div className="imageWrapper">
                    <img src={src} alt={`Uploaded Preview ${index + 1}`} className="imagePreview" />
                    <Close className="removeIcon" onClick={() => setImagePreviews(prev => prev.filter((_, i) => i !== index))} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='right'>
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor='fileInput' className='fileUploadLabel'>
                  <DriveFolderUploadOutlined className='uploadIcon'/>
                  <span>Choose Images (Max 4)</span>
                </label>
                <input type="file" id="fileInput" multiple onChange={handleImageChange} style={{ display: "none" }} />
              </div>
              <div className='formInput'>
                <label>Product Name</label>
                <input type='text' name='productName' value={formData.productName} onChange={handleInputChange} placeholder='Enter Product Name' required />
              </div>
              <div className='formInput'>
                <label>Product Description</label>
                <input type='text' name='description' value={formData.description} onChange={handleInputChange} placeholder='Enter Product Description' required />
              </div>
              <div className='formInput'>
                <label>Supplier</label>
                <select name='supplierName' value={formData.supplierName} onChange={handleInputChange} required>
                  <option value="">None</option>
                  <option value="Supplier A">Supplier A</option>
                  <option value="Supplier B">Supplier B</option>
                </select>
              </div>
              <div className='formInput'>
                <label>Unit Price (LKR)</label>
                <input type='number' name='unitPrice' value={formData.unitPrice} onChange={handleInputChange} placeholder='Enter Unit Price In LKR' required />
              </div>
              <div className='formInput'>
                <label>Quantity</label>
                <input type='number' name='quantity' value={formData.quantity} onChange={handleInputChange} placeholder='Enter Quantity' required />
              </div>
              <button type='submit'>Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
