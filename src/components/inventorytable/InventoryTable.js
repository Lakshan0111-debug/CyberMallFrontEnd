import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./InventoryTable.css";
import { Link } from "react-router-dom";
import axios from "axios";

const InventoryTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/products/get-all");

        // Ensure each product has a unique ID for the DataGrid
        const productsWithId = response.data.map((product, index) => ({
          ...product,
          id: product.productId || `temp-id-${index}`, // Assign productId or generate a fallback ID
        }));

        setData(productsWithId);
      } catch (error) {
        console.error("Error fetching products data", error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:8080/products/delete-product/${id}`);
        setData(data.filter((item) => item.id !== id));
        alert("Product deleted successfully");
      } catch (error) {
        console.error("There was an error deleting the product!", error);
      }
    }
  };

  const productColumns = [
    { field: "id", headerName: "Product ID", width: 100 },
    { field: "productName", headerName: "Product", width: 230 },
    { field: "description", headerName: "Description", width: 180 },
    { field: "supplierName", headerName: "Supplier", width: 180 },
    { field: "unitPrice", headerName: "Unit Price (LKR)", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 100 },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div className="cellAction">
          <Link to={`/manageInventory/${params.row.id}`} style={{ textDecoration: "none" }}>
            <div className="viewButton">VIEW</div>
          </Link>
          <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
            DELETE
          </div>
        </div>
      ),
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
        getRowId={(row) => row.id} // Use id property in each row
      />
    </div>
  );
};

export default InventoryTable;
