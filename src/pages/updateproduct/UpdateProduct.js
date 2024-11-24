import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UpdateProduct.css";
import AdminSidebar from "../../components/adminsidebar/AdminSidebar";
import AdminNavbar from "../../components/adminnavbar/AdminNavbar";
import { DriveFolderUploadOutlined, Close, Description } from "@mui/icons-material";
import axios from "axios";

const UpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);  // Single image state initialized as null

  // Load the product details when the component mounts
  useEffect(() => {
    loadProductDetails();
  }, [productId]);

  // Fetch the product details from the backend
  const loadProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/products/search-product/${productId}`);
      const product = response.data;
      console.log("Product Details:", product);
      
      setProductName(product.productName);
      setProductDescription(product.description);
      setSupplierName(product.supplierName);
      setUnitPrice(product.unitPrice);
      setQuantity(product.quantity);

      // Check if image is returned and set it
      if (product.image) {
        setImage(product.image);  // Assuming product.image is a URL or base64 string
      } else {
        setImage(null);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("productDescription", productDescription);
    formData.append("supplierName", supplierName);
    formData.append("unitPrice", unitPrice);
    formData.append("quantity", quantity);

    // If an image is selected, append it to the formData
    if (image instanceof File) {
      formData.append("image", image);  // Add the file object to the FormData
    }

    // Send the form data as a PUT request
    axios.put(`http://localhost:8080/products/update-product/${productId}`, formData)
      .then(response => {
        console.log('Product details updated:', response.data);
        navigate('/manageInventory');
      })
      .catch(error => {
        console.error("There was an error updating the product!", error.response || error.message);
      });
  };

  // Handle image change (selecting an image)
  const handleImageChange = (e) => {
    const file = e.target.files[0];  
    if (file) {
      const objectURL = URL.createObjectURL(file);  
      setImage(file);  // Store the file instead of objectURL for FormData
    }
  };

  // Remove the image
  const removeImage = () => {
    setImage(null);  
  };

  return (
    <div className="editProduct">
      <AdminSidebar />
      <div className="editProductContainer">
        <AdminNavbar />
        <div className="top">
          <h1>EDIT PRODUCT</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <div className="imageGrid">
              {image ? (
                <div className="imageWrapper">
                  <img
                    src={image instanceof File ? URL.createObjectURL(image) : image}  // Check if file or base64 string
                    alt="Uploaded Preview"
                    className="imagePreview"  // Apply fixed size via CSS
                  />
                  <Close
                    className="removeIcon"
                    onClick={removeImage}  // Remove image handler
                  />
                </div>
              ) : (
                <div className="placeholder">
                  <p>No Image Available</p>
                </div>
              )}
            </div>
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="fileInput" className="fileUploadLabel">
                  <DriveFolderUploadOutlined className="uploadIcon" />
                  <span>Choose Image</span>
                </label>
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleImageChange}  // Handle image change
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <label>Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Enter Product Name"
                  required
                />
              </div>
              <div className="formInput">
                <label>Product Description</label>
                <input
                  type="text"
                  name="productDescription"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  placeholder="Enter Product Description"
                  required
                />
              </div>
              <div className="formInput">
                <label>Supplier</label>
                <input
                  name="supplierName"
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
                  required
                />
              </div>
              <div className="formInput">
                <label>Unit Price (LKR)</label>
                <input
                  type="number"
                  name="unitPrice"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                  placeholder="Enter Unit Price In LKR"
                  required
                  step="0.01"
                />
              </div>
              <div className="formInput">
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter Quantity"
                  required
                />
              </div>
              <button type="submit">Update Product</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
