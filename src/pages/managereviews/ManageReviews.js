import React from "react";
import "./ManageReviews.css";
import AdminNavbar from "../../components/adminnavbar/AdminNavbar";
import AdminSidebar from "../../components/adminsidebar/AdminSidebar";
import ReviewsTable from "../../components/reviewstable/ReviewsTable";

const ManageReviews = () => {
  return (
    <div className="manageReviews">
      <AdminSidebar/>
      <div className="manageReviewsContainer">
        <AdminNavbar/>
        <ReviewsTable/>
      </div>
    </div>
  );
};

export default ManageReviews;