import React from "react";
import "./ManageInventory.css";
import AdminNavbar from "../../components/adminnavbar/AdminNavbar";
import AdminSidebar from "../../components/adminsidebar/AdminSidebar";
import InventoryTable from "../../components/inventorytable/InventoryTable";

const ManageInventory = () => {
  return (
    <div className="manageInventory">
      <AdminSidebar/>
      <div className="manageInventoryContainer">
        <AdminNavbar/>
        <InventoryTable/>
      </div>
    </div>
  );
};

export default ManageInventory;