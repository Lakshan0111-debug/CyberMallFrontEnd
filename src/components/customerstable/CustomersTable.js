import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { customerRows } from "../../CustomersTableSource";
import "./CustomersTable.css";
import { Link } from "react-router-dom";

const CustomersTable = () => {
  const [data] = useState(customerRows);

  const customerColumns = [
    { field: "id", headerName: "Customer ID", width: 100 },
    {
      field: "customer",
      headerName: "Customer",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.customer}
          </div>
        );
      },
    },
    { field: "email", headerName: "E-mail", width: 150 },
    { field: "phoneNo", headerName: "Phone No", width: 120 },
    { field: "address", headerName: "Address", width: 200, },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/manageCustomers/customerId" style={{ textDecoration: "none" }}>
              <div className="viewButton">VIEW</div>
            </Link>
            <div className="deleteButton">DELETE</div>
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