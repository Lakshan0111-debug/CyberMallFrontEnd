import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { productRows } from "../../InventoryTableSource";
import "./InventoryTable.css";
import { Link } from "react-router-dom";

const InventoryTable = () => {
  const [data] = useState(productRows);

  const productColumns = [
    { field: "id", headerName: "Product ID", width: 100 },
    {
      field: "product",
      headerName: "Product",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.product}
          </div>
        );
      },
    },
    { field: "supplier", headerName: "Supplier", width: 180 },
    { field: "unitPrice", headerName: "Unit Price (LKR)", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 100, },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/manageInventory/productId" style={{ textDecoration: "none" }}>
              <div className="viewButton">VIEW</div>
            </Link>
            <div className="deleteButton">DELETE</div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="inventoryTable">
      <div className="inventoryTableTitle">
        <span>PRODUCTS LIST</span>
        <Link to="/manageInventory/addNew" style={{ textDecoration: "none" }}>
          <span className="link">ADD NEW</span>
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={productColumns.concat(actionColumn)}
        pageSize={7}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};
export default InventoryTable;