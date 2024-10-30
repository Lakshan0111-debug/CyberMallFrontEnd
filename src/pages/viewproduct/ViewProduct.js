import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./ViewProduct.css";
import AdminSidebar from "../../components/adminsidebar/AdminSidebar";
import AdminNavbar from "../../components/adminnavbar/AdminNavbar";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const ViewProduct = ({ product = {} }) => {
    const navigate = useNavigate(); // Initialize useNavigate

    const {
        productId = "12345",
        productName = "Shopping Cart",
        supplierName = "Sachintha Rashen",
        unitPrice = "234.99",
        quantity = "36",
        images = [],
    } = product;

    const filledImages = [...images];
    while (filledImages.length < 4) {
        filledImages.push(null);
    }

    const handleEdit = () => {
        navigate(`/manageInventory/productId/updateProduct`); // Navigate to the Edit Product page
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
                            {filledImages.map((src, index) => (
                                src ? (
                                    <img
                                        key={index}
                                        src={src}
                                        alt={`Uploaded Preview ${index + 1}`}
                                        className="imagePreview"
                                    />
                                ) :
                                <ShoppingCartOutlinedIcon className="placeholder" />
                            ))}
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
                            <button type="button" onClick={handleEdit}>Edit</button> {/* Add onClick handler */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;