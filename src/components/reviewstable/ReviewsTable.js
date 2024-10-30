import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { reviewRows } from "../../ReviewsTableSource";
import "./ReviewsTable.css";
import { Link } from "react-router-dom";

const ReviewsTable = () => {
  const [data] = useState(reviewRows);

  const reviewColumns = [
    { field: "id", headerName: "Review ID", width: 100 },
    { field: "customer", headerName: "Customer", width: 180 },
    { field: "rating", headerName: "Rating", width: 150 },
    { field: "comment", headerName: "Comment", width: 100, },
    { field: "date", headerName: "Date", width: 100, },
    { field: "time", headerName: "Time", width: 100, },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/manageReviews/reviewId" style={{ textDecoration: "none" }}>
              <div className="viewButton">VIEW</div>
            </Link>
            <div className="deleteButton">DELETE</div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="reviewsTable">
      <div className="reviewsTableTitle">
        <span>REVIEWS LIST</span>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={reviewColumns.concat(actionColumn)}
        pageSize={7}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};
export default ReviewsTable;