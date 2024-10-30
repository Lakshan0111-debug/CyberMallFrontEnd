import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Add missing imports
import "./UpdateProduct.css";
import AdminSidebar from "../../components/adminsidebar/AdminSidebar";
import AdminNavbar from "../../components/adminnavbar/AdminNavbar";
// import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { DriveFolderUploadOutlined, Close } from "@mui/icons-material";
import axios from "axios";

const UpdateProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate(); 

 
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  // const [images, setImages] = useState([]); 

  useEffect(() => {
    loadProductDetails();
  }, [productId]);

  const loadProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/products/${productId}`);
      const product = response.data;
      setProductName(product.productName);
      setProductDescription(product.description);
      setSupplierName(product.supplierName);
      setUnitPrice(product.unitPrice);
      setQuantity(product.quantity);

    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {productId: parseInt(productId),productName,productDescription,supplierName,unitPrice,quantity
    };

    console.log('Updating product with data:', updatedProduct);

    axios.put(`http://localhost:8080/products/${productId}`, updatedProduct)
      .then(response => {
        console.log('Product details updated:', response.data);
        navigate('/manageInventory');
      })
      .catch(error => {
        console.error("There was an error updating the product!", error);
      });
  };


  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   setImages(files.map(file => URL.createObjectURL(file))); // Preview images
  // };


  // const removeImage = (index) => {
  //   const newImages = [...images];
  //   newImages.splice(index, 1); 
  //   setImages(newImages);
  // };

  // General input change handler for text inputs


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
            {/* <div className="imageGrid">
              {images.map((src, index) => (
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
            </div> */}
          </div>
          <div className='right'>
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                {/* <label htmlFor='fileInput' className='fileUploadLabel'>
                  <DriveFolderUploadOutlined className='uploadIcon' />
                  <span>Choose Images (Max 4)</span>
                </label>
                <input
                  type="file"
                  id="fileInput"
                  multiple
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                /> */}
              </div>
              <div className='formInput'>
                <label>Product Name</label>
                <input
                  type='text'
                  name='productName'
                  value={productName}
                  onChange={(e)=> setProductName(e.target.value)}
                  placeholder='Enter Product Name'
                  required
                />
              </div>
              <div className='formInput'>
                <label>Product Description</label>
                <input
                  type='text'
                  name='productDescription'
                  value={productDescription}
                  onChange={(e)=> setProductDescription(e.target.value)}
                  placeholder='Enter Product Description'
                  required
                />
              </div>
              <div className='formInput'>
                <label>Supplier</label>
                <input
                  name='supplierName'
                  value={supplierName}
                  onChange={(e)=> setSupplierName(e.target.value)}
                  required
                >
                </input>
              </div>
              <div className='formInput'>
                <label>Unit Price (LKR)</label>
                <input
                  type='number'
                  name='unitPrice'
                  value={unitPrice}
                  onChange={(e)=> setUnitPrice(e.target.value)}
                  placeholder='Enter Unit Price In LKR'
                  required
                  step="0.01"
                />
              </div>
              <div className='formInput'>
                <label>Quantity</label>
                <input
                  type='number'
                  name='quantity'
                  value={quantity}
                  onChange={(e)=> setQuantity(e.target.value)}
                  placeholder='Enter Quantity'
                  required
                />
              </div>
              <button type='submit'>
                Update Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
