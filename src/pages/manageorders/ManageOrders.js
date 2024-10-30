import React from "react";
import "./ManageOrders.css";
import AdminNavbar from "../../components/adminnavbar/AdminNavbar";
import AdminSidebar from "../../components/adminsidebar/AdminSidebar";
import OrdersTable from "../../components/orderstable/OrdersTable";

const ManageOrders = () => {
  return (
    <div className="manageOrders">
      <AdminSidebar/>
      <div className="manageOrdersContainer">
        <AdminNavbar/>
        <OrdersTable/>
      </div>
    </div>
  );
};

export default ManageOrders;