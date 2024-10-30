import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { supplierRows } from "../../SuppliersTableSource";
import "./SuppliersTable.css";
import { Link } from "react-router-dom";

const SuppliersTable = () => {
  const [data] = useState(supplierRows);

  const supplierColumns = [
    { field: "id", headerName: "Supplier ID", width: 100 },
    {
      field: "supplier",
      headerName: "Supplier",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.supplier}
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
            <Link to="/manageSuppliers/supplierId" style={{ textDecoration: "none" }}>
              <div className="viewButton">VIEW</div>
            </Link>
            <div className="deleteButton">DELETE</div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="suppliersTable">
      <div className="suppliersTableTitle">
        <span>SUPPLIERS LIST</span>
        <Link to="/manageSuppliers/addNew" style={{ textDecoration: "none" }}>
          <span className="link">ADD NEW</span>
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={supplierColumns.concat(actionColumn)}
        pageSize={7}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};
export default SuppliersTable;