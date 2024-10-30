import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { orderRows } from "../../OrdersTableSource";
import "./OrdersTable.css";
import { Link } from "react-router-dom";

const OrdersTable = () => {
  const [data] = useState(orderRows);

  const orderColumns = [
    { field: "id", headerName: "Order ID", width: 100 },
    { field: "customer", headerName: "Customer", width: 180 },
    { field: "shippingAddress", headerName: "Shipping Address", width: 150 },
    { field: "totalPrice", headerName: "Total Price", width: 100, },
    { field: "noOfItems", headerName: "No Of Items", width: 100, },
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
            <Link to="/manageOrders/orderId" style={{ textDecoration: "none" }}>
              <div className="viewButton">VIEW</div>
            </Link>
            <div className="rejectButton">REJECT</div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="ordersTable">
      <div className="ordersTableTitle">
        <span>ORDERS LIST</span>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={orderColumns.concat(actionColumn)}
        pageSize={7}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};
export default OrdersTable;