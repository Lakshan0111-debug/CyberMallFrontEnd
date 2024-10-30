import React from "react";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  return (
    <div className="adminNavbar">
      <div className="adminNavbarContainer">
        <span>ADMIN DASHBOARD</span>
        <div className="item">
          <img src="/assets/person/DefaultProfile.jpg" alt="" className="profileImg"/>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;