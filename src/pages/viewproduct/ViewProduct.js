import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ViewProduct.css";
import AdminSidebar from "../../components/adminsidebar/AdminSidebar";
import AdminNavbar from "../../components/adminnavbar/AdminNavbar";
import axios from "axios";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const ViewProduct = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [productName, setProductName] = useState('');
    const [supplierName, setSupplierName] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [filledImages, setFilledImages] = useState([]); 
    useEffect(() => {
        loadProductDetails();
    }, [productId]);

    async function loadProductDetails() {
        try {
            const response = await axios.get(`http://localhost:8080/products/search-product/${productId}`);
            console.log("API Response:", response.data);

            const productData = response.data;

            setProductName(productData.productName || 'N/A');
            setSupplierName(productData.supplierName || 'N/A');
            setUnitPrice(productData.unitPrice || 'N/A');
            setQuantity(productData.quantity || 'N/A');

            // If the image exists, set the image(s) in state
            if (productData.image) {
                setFilledImages([productData.image]); // Store base64 image string in array for uniformity
            } else {
                setFilledImages([]);
            }
        }
        catch (error) {
            console.error("Error fetching product details:", error);
        }
    }

    const handleEdit = () => {
        navigate(`/manageInventory/${productId}/updateProduct`);
    };

    return (
        <div className='viewProduct'>
            <AdminSidebar />
            <div className='viewProductContainer'>
                <AdminNavbar />
                <div className='top'>
                    <h1>VIEW PRODUCT</h1>
                </div>
                <div className='bottom'>
                    <div className="left">
                        <div className="imageGrid">
                            {filledImages.length > 0 ? (
                                filledImages.map((base64Image, index) => (
                                    <img
                                        key={index}
                                        src={`data:image/jpeg;base64,${base64Image}`} // Display base64-encoded image
                                        alt={`Uploaded Preview ${index + 1}`}
                                        className="imagePreview"
                                    />
                                ))
                            ) : (
                                <div className="placeholder">
                                    <ShoppingCartOutlinedIcon className="icon" />
                                    <p>No Images Available</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="right">
                        <div className="details">
                            <div className="detailItem">
                                <span className="itemKey">Product:</span>
                                <span className="itemValue">{productName}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Product ID:</span>
                                <span className="itemValue">{productId}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Supplier:</span>
                                <span className="itemValue">{supplierName}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Unit Price (LKR):</span>
                                <span className="itemValue">{unitPrice}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Quantity:</span>
                                <span className="itemValue">{quantity}</span>
                            </div>
                            <button type="button" onClick={handleEdit}>Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;
