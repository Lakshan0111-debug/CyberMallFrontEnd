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

    useEffect(() => {
        loadProductDetails();
    }, [productId]);

    async function loadProductDetails() {
        try {
            const response = await axios.get(`http://localhost:8080/products/${productId}`);
            const productData = response.data;
            setProductName(productData.productName);
            setSupplierName(productData.supplierName);
            setUnitPrice(productData.unitPrice);
            setQuantity(productData.quantity);
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
                    {/*<div className="left">
                        <div className="imageGrid">
                            {filledImages.map((src, index) => (
                                src ? (
                                    <img
                                        key={index}
                                        src={src}
                                        alt={`Uploaded Preview ${index + 1}`}
                                        className="imagePreview"
                                    />
                                ) : (
                                    <ShoppingCartOutlinedIcon key={index} className="placeholder" />
                                )
                            ))}
                        </div>
                    </div>*/}
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