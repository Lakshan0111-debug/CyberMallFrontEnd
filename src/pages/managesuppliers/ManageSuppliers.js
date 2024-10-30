import React from "react";
import "./ManageSuppliers.css";
import AdminNavbar from "../../components/adminnavbar/AdminNavbar";
import AdminSidebar from "../../components/adminsidebar/AdminSidebar";
import SuppliersTable from "../../components/supplierstable/SuppliersTable";

const ManageSuppliers = () => {
  return (
    <div className="manageSuppliers">
      <AdminSidebar/>
      <div className="manageSuppliersContainer">
        <AdminNavbar/>
        <SuppliersTable/>
      </div>
    </div>
  );
};

export default ManageSuppliers;