import React, { useState, useEffect } from "react";
import "./ViewOrder.css";
import AdminSidebar from "../../components/adminsidebar/AdminSidebar";
import AdminNavbar from "../../components/adminnavbar/AdminNavbar";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ViewOrder = () => {
    const { orderId } = useParams(); // Get orderId from the URL
    const navigate = useNavigate();

    // State variables for order details
    const [orderDetails, setOrderDetails] = useState({
        customerName: '',
        shippingAddress: '',
        totalPrice: '',
        noOfItems: '',
        orderDate: '',
        orderTime: ''
    });

    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch order details when component mounts or orderId changes
    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                setLoading(true); // Start loading
                setError(null); // Reset error

                const response = await axios.get(`http://localhost:8080/orders/search-order/${orderId}`);
                console.log("Order data:", response.data); // Debug the response

                const data = response.data;

                // Update state with the fetched data
                setOrderDetails({
                    customerName: data.customerName  || "N/A",
                    shippingAddress: data.shippingAddress || "N/A",
                    totalPrice: data.totalPrice || "0",
                    noOfItems: data.noOfItems || "0",
                    orderDate: data.orderDate || "N/A",
                    orderTime: data.orderTime || "N/A"
                });
            } catch (error) {
                console.error("Error fetching order details:", error);
                setError("Failed to load order details. Please try again later.");
            } finally {
                setLoading(false); // End loading
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    const handleEdit = () => {
        navigate(`/manageOrders/${orderId}/updateOrder`); // Navigate to edit order page
    };

    // Display a loading state if data is being fetched
    if (loading) {
        return <p>Loading order details...</p>;
    }

    // Display an error message if data fetch failed
    if (error) {
        return <p className="error">{error}</p>;
    }

    const { customerName, shippingAddress, totalPrice, noOfItems, orderDate, orderTime } = orderDetails;

    return (
        <div className="viewOrder">
            <AdminSidebar />
            <div className="viewOrderContainer">
                <AdminNavbar />
                <div className="top">
                    <h1>ORDER DETAILS</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <div className="imageContainer">
                            <ShoppingBagOutlinedIcon className="placeholder" />
                        </div>
                    </div>
                    <div className="right">
                        <div className="details">
                            <div className="detailItem">
                                <span className="itemKey">Order ID:</span>
                                <span className="itemValue">{orderId}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Customer:</span>
                                <span className="itemValue">{customerName}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Shipping Address:</span>
                                <span className="itemValue">{shippingAddress}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Total Price (LKR):</span>
                                <span className="itemValue">{totalPrice}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">No Of Items:</span>
                                <span className="itemValue">{noOfItems}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Date:</span>
                                <span className="itemValue">{orderDate}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Time:</span>
                                <span className="itemValue">{orderTime}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewOrder;
