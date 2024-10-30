import React from "react";
import "./ViewReview.css";
import AdminSidebar from "../../components/adminsidebar/AdminSidebar";
import AdminNavbar from "../../components/adminnavbar/AdminNavbar";
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';

const ViewReview = ({ review = {} }) => {

    const {
        reviewId = "1000",
        reviewCustomer = "Olivia",
        rating = "4.5",
        comment = "Great product.",
        reviewDate = "24 Oct 2024",
        reviewTime = "14:43"
    } = review;

    return (
        <div className="viewReview">
            <AdminSidebar />
            <div className="viewReviewContainer">
                <AdminNavbar />
                <div className="top">
                    <h1>REVIEW DETAILS</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <div className="imageContainer">
                            <ReviewsOutlinedIcon className="placeholder" />
                        </div>
                    </div>
                    <div className="right">
                        <div className="details">
                            <div className="detailItem">
                                <span className="itemKey">Review ID:</span>
                                <span className="itemValue">{reviewId}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Customer:</span>
                                <span className="itemValue">{reviewCustomer}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Rating:</span>
                                <span className="itemValue">{rating}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Comment:</span>
                                <span className="itemValue">{comment}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Date:</span>
                                <span className="itemValue">{reviewDate}</span>
                            </div>
                            <div className="detailItem">
                                <span className="itemKey">Time:</span>
                                <span className="itemValue">{reviewTime}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewReview;