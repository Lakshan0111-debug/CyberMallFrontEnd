import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './CustomerProfile.css';
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import axios from "axios";

const CustomerProfile = () => {
    const { email } = useParams(); // Assuming email is passed as a URL parameter
    const navigate = useNavigate();

    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [userName, setUserName] = useState('');
    const [nic, setNic] = useState('');
    const [password, setPassword] = useState('');

    
    useEffect(() => {
        console.log("Email from route:", email);
        loadCustomerDetails();
    }, [email]);

    async function loadCustomerDetails() {
        try {
            const response = await axios.get(`http://localhost:8080/user/${email}`);
            const customerData = response.data;
            setCustomerName(customerData.customerName);
            setEmail(customerData.email);
            setPhoneNumber(customerData.phoneNumber);
            setAddress(customerData.address);
            setUserName(customerData.userName);
            setNic(customerData.nic);
            setPassword(customerData.password);
        }
        catch (error) {
            console.error("Error fetching customer details:", error);
        }
    }

    const handleEdit = () => {
        navigate(`/manageCustomers/${email}/updateCustomer`); // Navigate to the Edit Product page
    };
    
    return (
    <div>
        <Navbar/>
        <div className="customerProfile">
            <div className="customerProfileContainer">
                <h2>Customer Profile</h2>
                <div className="details">
                    <div className="detailItem">
                        <span className="itemKey">Username: </span>
                        <span className="itemValue">{userName}</span>
                    </div>
                    <div className="detailItem">
                        <span className="itemKey">Customer: </span>
                        <span className="itemValue">{customerName}</span>
                    </div>
                    <div className="detailItem">
                        <span className="itemKey">E-Mail: </span>
                        <span className="itemValue">{email}</span>
                    </div>
                    <div className="detailItem">
                        <span className="itemKey">Phone: </span>
                        <span className="itemValue">{phoneNumber}</span>
                    </div>
                    <div className="detailItem">
                        <span className="itemKey">Address: </span>
                        <span className="itemValue">{address}</span>
                    </div>
                    <div className="detailItem">
                        <span className="itemKey">NIC: </span>
                        <span className="itemValue">{nic}</span>
                    </div>
                    <div className="detailItem">
                        <span className="itemKey">Password: </span>
                        <span className="itemValue">{password}</span>
                    </div>
                    <div className='detailItem'>
                        <Link to='/customerProfile/customerId/updateProfile'>
                            <button type="submit"onClick={handleEdit}>Edit Profile</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default CustomerProfile;