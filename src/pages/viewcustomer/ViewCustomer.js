import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ViewCustomer.css";
import AdminSidebar from "../../components/adminsidebar/AdminSidebar";
import AdminNavbar from "../../components/adminnavbar/AdminNavbar";
import axios from "axios";


const ViewCustomer = () => {

    const { customerId } = useParams();
    const navigate = useNavigate();

    const [customerName, setCustomerName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    
    useEffect(() => {
        loadCustomerDetails();
    }, [customerId]);

    async function loadCustomerDetails() {
        try {
            const response = await axios.get(`http://localhost:8080/customers/${customerId}`);
            const customerData = response.data;
            setCustomerName(customerData.customerName);
            setEmail(customerData.email);
            setPhoneNumber(customerData.phoneNumber);
            setAddress(customerData.address);
        }
        catch (error) {
            console.error("Error fetching customer details:", error);
        }
    }


    return (
        <div className="viewCustomer">
            <AdminSidebar />
            <div className="viewCustomerContainer">
                <AdminNavbar />
                <div className="top">
                    <h1>CUSTOMER DETAILS</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <div className="details">
                            <div className="detailItem">
                                <span className="itemKey">Customer:</span>
                                <span className="itemValue">{customerName}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Customer ID:</span>
                                <span className="itemValue">{customerId}</span>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewCustomer;