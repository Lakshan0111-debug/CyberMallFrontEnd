import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./SuppliersTable.css";
import { Link } from "react-router-dom";
import axios from "axios";

const SuppliersTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/suppliers");
        const suppliersWithId = response.data.map((supplier) => ({
          ...supplier,
          id: supplier.supplierId, // Ensure id is mapped correctly
        }));
        setData(suppliersWithId);
      } catch (error) {
        console.error("Error fetching supplier data", error);
      }
    };
    fetchSuppliers();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      axios
        .delete(`http://localhost:8080/suppliers/${id}`)
        .then(() => {
          // Remove supplier from the data list
          setData(data.filter((item) => item.id !== id)); // Correct the field
          alert("Supplier deleted successfully");
        })
        .catch((error) => {
          console.error("There was an error deleting the supplier!", error);
        });
    }
  };

  const supplierColumns = [
    { field: "id", headerName: "Supplier ID", width: 100 },
    {
      field: "supplierName",
      headerName: "Supplier",
      width: 230,
    },
    { field: "email", headerName: "E-mail", width: 150 },
    { field: "phoneNo", headerName: "Phone No", width: 120 },
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
            <Link to={`/manageSuppliers/${params.row.id}`} style={{ textDecoration: "none" }}>
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
        getRowId={(row) => row.id} 
      />
    </div>
  );
};
export default SuppliersTable;
