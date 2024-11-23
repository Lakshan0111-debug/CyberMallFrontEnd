import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios"; 
import "./OrdersTable.css";
import { Link } from "react-router-dom";

const OrdersTable = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/orders/get-all");
        const ordersWithId = response.data.map((order, index) => ({
          ...order,
          id: index + 1, 
        }));
        setData(ordersWithId);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); 

  const orderColumns = [
    { field: "id", headerName: "Order ID", width: 100 },
    { field: "customerName", headerName: "Customer", width: 180 },
    { field: "shippingAddress", headerName: "Shipping Address", width: 150 },
    { field: "totalPrice", headerName: "Total Price", width: 100 },
    { field: "noOfItems", headerName: "No Of Items", width: 100 },
    { field: "date", headerName: "Date", width: 100 },
    { field: "time", headerName: "Time", width: 100 },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/manageOrders/${params.row.id}`} style={{ textDecoration: "none" }}>
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
      {loading ? (
        <p>Loading orders...</p> 
      ) : (
        <DataGrid
          className="datagrid"
          rows={data}
          columns={orderColumns.concat(actionColumn)}
          pageSize={7}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.id} 
        />

      )}
    </div>
  );
};

export default OrdersTable;
