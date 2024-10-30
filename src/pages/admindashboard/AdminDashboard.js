import React from "react";
import "./AdminDashboard.css";
import AdminNavbar from "../../components/adminnavbar/AdminNavbar";
import AdminSidebar from "../../components/adminsidebar/AdminSidebar";
import AdminWidget from "../../components/adminwidget/AdminWidget";
import LatestOrders from "../../components/latestorders/LatestOrders";

const AdminDashboard = () => {
  return (
    <div className="adminDashboard">
      <AdminSidebar/>
      <div className="adminDashboardContainer">
        <AdminNavbar/>
        <div className="adminWidgets">
          <AdminWidget type="customers"/>
          <AdminWidget type="suppliers"/>
          <AdminWidget type="orders"/>
          <AdminWidget type="earnings"/>
        </div>
        <div className="listContainer">
          <div className="listTitle">LATEST ORDERS</div>
          <LatestOrders/>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;