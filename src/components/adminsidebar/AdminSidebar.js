import React from 'react';
import "./AdminSidebar.css";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ReviewsOutlinedIcon from '@mui/icons-material/ReviewsOutlined';
import { Link } from 'react-router-dom';
import Logo from '../../assets/CyberMallLogo.png'

const AdminSidebar = () => {
  return (
    <div className='adminSidebar'>
        <div className='top'>
            <Link to="/" style={{textDecoration:"none"}}>
                <img src={Logo} alt='' className='logo'/>
            </Link>
        </div>
        <div className='bottom'>
            <ul>
                <Link to="/adminDashboard" style={{textDecoration:"none"}}>
                    <li>
                        <DashboardIcon className='icon'/>
                        <span>Dashboard</span>
                    </li>
                </Link>
                <Link to="/manageInventory" style={{textDecoration:"none"}}>
                    <li>
                        <ShoppingCartOutlinedIcon className='icon'/>
                        <span>Manage Inventory</span>
                    </li>
                </Link>
                <Link to="/manageCustomers" style={{textDecoration:"none"}}>
                    <li>
                        <PeopleAltOutlinedIcon className='icon'/>
                        <span>Manage Customers</span>
                    </li>
                </Link>
                <Link to="/manageSuppliers" style={{textDecoration:"none"}}>
                    <li>
                        <LocalShippingOutlinedIcon className='icon'/>
                        <span>Manage Suppliers</span>
                    </li>
                </Link>
                <Link to="/manageOrders" style={{textDecoration:"none"}}>
                    <li>
                        <ShoppingBagOutlinedIcon className='icon'/>
                        <span>Manage Orders</span>
                    </li>
                </Link>
                <Link to="/manageReviews" style={{textDecoration:"none"}}>
                    <li>
                        <ReviewsOutlinedIcon className='icon'/>
                        <span>Manage Reviews</span>
                    </li>
                </Link>
            </ul>
        </div>
    </div>
  );
};

export default AdminSidebar;