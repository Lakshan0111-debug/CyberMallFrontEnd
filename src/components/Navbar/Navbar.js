import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from '../../assets/CyberMallLogo.png';
import { Person2Outlined, ShoppingBasketOutlined } from '@mui/icons-material';

const Navbar = ({setShowLogin}) => {

  const [menu,setMenu] = useState("category")

  return (
    <div className="navbar dark-nav">
      <Link to='/adminDashboard'>
        <img src={Logo} alt='' className='logo'/>
      </Link>
      <ul className="navbar-menu">
        <a href='/#header' onClick={()=>setMenu("header")} className={menu==="header"?"active":""}>Home</a>
        <a href='/#explore-category' onClick={()=>setMenu("products")} className={menu==="products"?"active":""}>Products</a>
        <a href='/#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact Us</a>
      </ul>
      <div className='navbar-right'>
        <div className='navbar-cart-icon'>
          <Link to='/cart'><ShoppingBasketOutlined/></Link>
        </div>
        <Link to='/logIn'><button>Sign Up</button></Link>
        <div className='profileImg'>
          <Link to='/customerProfile/customerId'><Person2Outlined/></Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;