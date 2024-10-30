import React, { useState, useEffect } from "react";
import "./UpdateProduct.css";
import AdminSidebar from "../../components/adminsidebar/AdminSidebar";
import AdminNavbar from "../../components/adminnavbar/AdminNavbar";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { DriveFolderUploadOutlined, Close } from "@mui/icons-material";

const UpdateProduct = ({ product }) => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [formData, setFormData] = useState({
    productId: "",
    productName: "",
    supplierName: "None",
    unitPrice: "",
    quantity: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Populate the form with existing product data when component mounts
    if (product) {
      setFormData({
        productId: product.productId,
        productName: product.productName,
        supplierName: product.supplierName,
        unitPrice: product.unitPrice,
        quantity: product.quantity,
      });
      setImagePreviews(product.images); // Set existing images
    }
  }, [product]);

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

    // Limit to max 4 images
    if (newPreviews.length + imagePreviews.length > 4) {
      alert("You can only upload a maximum of 4 images.");
      return;
    }

    setImagePreviews((prev) => [...prev, ...newPreviews].slice(0, 4)); // Ensure only 4 images
  };

  const removeImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index)); // Remove image at the given index
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Replace with your submission logic (e.g., API call)
    console.log("Form submitted with data:", {
      images: imagePreviews,
      ...formData,
    });
    
    // Simulate a successful submission
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  const suppliers = ["None", "Supplier A", "Supplier B"];

  // Prepare filled images for rendering (fill up to 4)
  const filledImages = [...imagePreviews];
  while (filledImages.length < 4) {
    filledImages.push(null);
  }

  return (
    <div className='editProduct'>
      <AdminSidebar />
      <div className='editProductContainer'>
        <AdminNavbar />
        <div className='top'>
          <h1>EDIT PRODUCT</h1>
        </div>
        <div className='bottom'>
          <div className="left">
            <div className="imageGrid">
              {filledImages.map((src, index) => (
                <div key={index} className="imageContainer">
                  {src ? (
                    <div className="imageWrapper">
                      <img
                        src={src}
                        alt={`Uploaded Preview ${index + 1}`}
                        className="imagePreview"
                      />
                      <Close 
                        className="removeIcon" 
                        onClick={() => removeImage(index)} 
                      />
                    </div>
                  ) : (
                    <ShoppingCartOutlinedIcon className="placeholder" />
                  )}
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
                <input 
                  type="file" 
                  id="fileInput" 
                  multiple 
                  onChange={handleImageChange} 
                  style={{ display: "none" }} 
                />
              </div>
              <div className='formInput'>
                <label>Product ID</label>
                <input 
                  type='number' 
                  id='PRODUCT_ID' 
                  name='productId' 
                  value={formData.productId} 
                  onChange={handleChange} 
                  placeholder='Enter Product ID' 
                  required 
                />
              </div>
              <div className='formInput'>
                <label>Product Name</label>
                <input 
                  type='text' 
                  id='PRODUCT_NAME' 
                  name='productName' 
                  value={formData.productName} 
                  onChange={handleChange} 
                  placeholder='Enter Product Name' 
                  required 
                />
              </div>
              <div className='formInput'>
                <label>Supplier</label>
                <select 
                  id='SUPPLIER_NAME' 
                  name='supplierName' 
                  value={formData.supplierName} 
                  onChange={handleChange} 
                  required
                >
                  {suppliers.map((supplier, index) => (
                    <option key={index} value={supplier}>{supplier}</option>
                  ))}
                </select>
              </div>
              <div className='formInput'>
                <label>Unit Price (LKR)</label>
                <input 
                  type='number' 
                  id='UNIT_PRICE' 
                  name='unitPrice' 
                  value={formData.unitPrice} 
                  onChange={handleChange} 
                  placeholder='Enter Unit Price In LKR' 
                  required 
                  step="0.01" 
                />
              </div>
              <div className='formInput'>
                <label>Quantity</label>
                <input 
                  type='number' 
                  id='QUANTITY' 
                  name='quantity' 
                  value={formData.quantity} 
                  onChange={handleChange} 
                  placeholder='Enter Quantity' 
                  required 
                />
              </div>
              <button type='submit' disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;