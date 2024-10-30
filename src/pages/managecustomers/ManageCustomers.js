import React from "react";
import "./ManageCustomers.css";
import AdminNavbar from "../../components/adminnavbar/AdminNavbar";
import AdminSidebar from "../../components/adminsidebar/AdminSidebar";
import CustomersTable from "../../components/customerstable/CustomersTable";

const ManageCustomers = () => {
  return (
    <div className="manageCustomers">
      <AdminSidebar/>
      <div className="manageCustomersContainer">
        <AdminNavbar/>
        <CustomersTable/>
      </div>
    </div>
  );
};

export default ManageCustomers;