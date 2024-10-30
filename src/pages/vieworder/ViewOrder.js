import React from "react";
import "./ViewOrder.css";
import AdminSidebar from "../../components/adminsidebar/AdminSidebar";
import AdminNavbar from "../../components/adminnavbar/AdminNavbar";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

const ViewOrder = ({ order = {} }) => {

    const {
        orderId = "1000",
        orderCustomer = "Olivia",
        shippingAddress = "Koswaththa, Battaramulla.",
        totalPrice = "1050",
        noOfItems = "5",
        orderDate = "24 Oct 2024",
        orderTime = "14:43"
    } = order;

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
                                <span className="itemValue">{orderCustomer}</span>
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