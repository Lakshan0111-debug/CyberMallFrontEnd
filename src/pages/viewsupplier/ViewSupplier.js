import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ViewSupplier.css";
import AdminSidebar from "../../components/adminsidebar/AdminSidebar";
import AdminNavbar from "../../components/adminnavbar/AdminNavbar";
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import axios from "axios";

const ViewSupplier = () => {
    const { supplierId } = useParams();
    const navigate = useNavigate();

    const [supplierName, setSupplierName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    
    useEffect(() => {
        loadSupplierDetails();
    }, [supplierId]);

    async function loadSupplierDetails() {
        try {
            const response = await axios.get(`http://localhost:8080/suppliers/${supplierId}`);
            const supplierData = response.data;
            setSupplierName(supplierData.supplierName);
            setEmail(supplierData.email);
            setPhoneNumber(supplierData.phoneNumber);
            setAddress(supplierData.address);
        }
        catch (error) {
            console.error("Error fetching supplier details:", error);
        }
    }

    const handleEdit = () => {
        navigate(`/manageSuppliers/${supplierId}/updateSupplier`); // Navigate to the Edit Product page
    };

    return (
        <div className="viewSupplier">
            <AdminSidebar />
            <div className="viewSupplierContainer">
                <AdminNavbar />
                <div className="top">
                    <h1>SUPPLIER DETAILS</h1>
                </div>
                <div className="bottom">
                    {/* <div className="left">
                        <div className="imageContainer">
                            {image ? (
                                <img
                                    src={image}
                                    alt="Uploaded Preview"
                                    className="imagePreview"
                                />
                            ) : (
                                <LocalShippingOutlinedIcon className="placeholder" />
                            )}
                        </div>
                    </div> */}
                    <div className="right">
                        <div className="details">
                            <div className="detailItem">
                                <span className="itemKey">Supplier:</span>
                                <span className="itemValue">{supplierName}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Supplier ID:</span>
                                <span className="itemValue">{supplierId}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">E-Mail:</span>
                                <span className="itemValue">{email}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Phone:</span>
                                <span className="itemValue">{phoneNumber}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Address:</span>
                                <span className="itemValue">{address}</span>
                            </div>
                            <button type="button" onClick={handleEdit}>Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewSupplier;