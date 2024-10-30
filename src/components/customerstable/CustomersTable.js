import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import "./CustomersTable.css";
import { Link } from "react-router-dom";

const CustomersTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/customers");
        const customersWithId = response.data.map((customer) => ({
          ...customer,
          id: customer.customerId, // Ensure id is mapped correctly
        }));
        setData(customersWithId);
      } catch (error) {
        console.error("Error fetching customer data", error);
      }
    };
    fetchCustomers();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this customers?")) {
      axios
        .delete(`http://localhost:8080/customers/${id}`)
        .then(() => {
          setData(data.filter((item) => item.id !== id)); 
          alert("Customer deleted successfully");
        })
        .catch((error) => {
          console.error("There was an error deleting the customer!", error);
        });
    }
  };
  const customerColumns = [
    { field: "id", headerName: "Customer ID", width: 100 },
    {
      field: "customerName",
      headerName: "Customer",
      width: 230,
    },
    { field: "email", headerName: "E-mail", width: 150 },
    { field: "phoneNumber", headerName: "Phone No", width: 120 },
    { field: "address", headerName: "Address", width: 200 },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/manageCustomers/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">VIEW</div>
            </Link>
            <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
              DELETE
            </div>
          </div>
        );
      },
    },
  ];
    

  return (
    <div className="customersTable">
      <div className="customersTableTitle">
        <span>CUSTOMERS LIST</span>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={customerColumns.concat(actionColumn)}
        pageSize={7}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};
export default CustomersTable;