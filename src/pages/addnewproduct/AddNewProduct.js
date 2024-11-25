import React, { useState } from "react";
import "./AddNewProduct.css";
import AdminSidebar from "../../components/adminsidebar/AdminSidebar";
import AdminNavbar from "../../components/adminnavbar/AdminNavbar";
import { DriveFolderUploadOutlined, Close } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddNewProduct = () => {
  const [imagePreview, setImagePreview] = useState(null); // Single preview
  const [formData, setFormData] = useState({
    productId: 0,
    productName: "",
    description: "",
    supplierName: "",
    unitPrice: "",
    quantity: "",
  });

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!file) {
      setImagePreview(null);
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      alert(`Invalid file type: ${file.name}. Please upload JPEG or PNG images only.`);
      return;
    }

    setImagePreview(URL.createObjectURL(file)); // Set single preview
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    const fileInput = e.target.fileInput.files[0];

    if (!fileInput) {
      alert("Please upload an image.");
      return;
    }

    data.append("file", fileInput); // Append single file
    data.append("productId", formData.productId);
    data.append("productName", formData.productName);
    data.append("description", formData.description);
    data.append("supplierName", formData.supplierName);
    data.append("unitPrice", formData.unitPrice);
    data.append("quantity", formData.quantity);

    try {
      const response = await axios.post("http://localhost:8080/products/add-product", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Server Response:", response.data);
      alert("Product added successfully");
      navigate(`/manageInventory`);
    } catch (error) {
      console.error("There was an error adding the product:", error);
      alert("Failed to add product. Please try again.");
    }

    setImagePreview(null); // Clear image preview
    setFormData({
      productId: 0,
      productName: "",
      description: "",
      supplierName: "",
      unitPrice: "",
      quantity: "",
    });

    e.target.reset();
  };

  return (
    <div className="addNewProduct">
      <AdminSidebar />
      <div className="addNewProductContainer">
        <AdminNavbar />
        <div className="top">
          <h1>ADD NEW PRODUCT</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <div className="imageGrid">
              {imagePreview && (
                <div className="imageContainer">
                  <div className="imageWrapper">
                    <img src={imagePreview} alt="Uploaded Preview" className="imagePreview" />
                    <Close
                      className="removeIcon"
                      onClick={() => setImagePreview(null)} // Clear preview
                    />
                  </div>
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
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <label>Product Name</label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  placeholder="Enter Product Name"
                  required
                />
              </div>
              <div className="formInput">
                <label>Product Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter Product Description"
                  required
                />
              </div>
              <div className="formInput">
                <label>Supplier</label>
                <select
                  name="supplierName"
                  value={formData.supplierName}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">None</option>
                  <option value="Supplier A">Supplier A</option>
                  <option value="Supplier B">Supplier B</option>
                </select>
              </div>
              <div className="formInput">
                <label>Unit Price (LKR)</label>
                <input
                  type="number"
                  name="unitPrice"
                  value={formData.unitPrice}
                  onChange={handleInputChange}
                  placeholder="Enter Unit Price In LKR"
                  required
                />
              </div>
              <div className="formInput">
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="Enter Quantity"
                  required
                />
              </div>
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
