import React from "react";
import "./AdminWidget.css";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Link } from 'react-router-dom';

const AdminWidget = ({ type }) => {

  let data;
  const amount = 500;

  switch (type) {
    case "customers":
      data = {
        title: "CUSTOMERS",
        isMoney: false,
        link: <Link to="/manageCustomers" style={{textDecoration:"none", color:"#425060"}}><span>View All Customers</span></Link>,
        icon: (
          <PeopleAltOutlinedIcon
            className="icon"
            style={{ color: "crimson", backgroundColor: "#ff000033" }}
          />
        ),
      };
      break;

    case "suppliers":
      data = {
        title: "SUPPLIERS",
        isMoney: false,
        link: <Link to="/manageSuppliers" style={{textDecoration:"none", color:"#425060"}}><span>View All Suppliers</span></Link>,
        icon: (
          <LocalShippingOutlinedIcon
            className="icon"
            style={{ color: "purple", backgroundColor: "#80008033" }}
          />
        ),
      };
      break;

    case "orders":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: <Link to="/manageOrders" style={{textDecoration:"none", color:"#425060"}}><span>View All Orders</span></Link>,
        icon: (
          <ShoppingBagOutlinedIcon
            className="icon"
            style={{ color: "goldenrod", backgroundColor: "#daa52033" }}
          />
        ),
      };
      break;

    case "earnings":
      data = {
        title: "TOTAL EARNINGS",
        isMoney: true,
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ color: "green", backgroundColor: "#00800033" }}
          />
        ),
      };
      break;

    default:
      break;
  }

  return (
    <div className='widget'>
      <div className='left'>
        <span className='title'>{data.title}</span>
        <span className='counter'>{data.isMoney ? `LKR. ${amount}` : amount}</span>
      </div>
      <div className='right'>
        {data.icon}
        <span className='link'>{data.link}</span>
      </div>
    </div>
  );
};

export default AdminWidget;