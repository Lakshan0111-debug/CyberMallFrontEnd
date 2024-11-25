import React, { useContext, useState, useEffect } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const { cartItems, products_list, addToCart, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState({
    // firstName: '',
    email: '',
    // shippingAddress: '',
    // phone: ''
  });

  console.log(localStorage.getItem.toString());
  
  // Add to cart function
  const handleAddToCart = (productId) => {
    addToCart(productId); // This adds the product to the cart
  };

  const handleChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {
    // Validate customer information
    // if (!customerInfo.firstName || !customerInfo.email || !customerInfo.shippingAddress || !customerInfo.phone) {
    //   alert("Please fill out all fields.");
    //   return;
    // }

    const orderDetails = {
      orderId:0,
      customerName:'',
      address:'',
      email:'',
      phonenumber:'',
      totalPrice: getTotalCartAmount(),
      noOfItems: Object.values(cartItems).reduce((acc, quantity) => acc + quantity, 0),
      dateTime: new Date().toLocaleString(),
    };

    // const customer = {
    //   customerId: setCustomerInfo(0),
    //   customerName: setCustomerName(''),
    //   email: setEmail(''),
    //   phoneNumber: setPhoneNumber(''),
    //   address: setAddress(''),
    //   userName: setUserName(''),
    //   password: setPassword('')


    // }

    const em=document.getElementById("custEmail").innerText.toString()
   
    console.log(em);
    if (!customerInfo.email) {
      alert("Please fill out all fields.");
      return;
    }
   
   

    try {

      const responseCust = await axios.get(`http://localhost:8080/cutomers/find-by-email/${customerInfo.email}`);
      if(responseCust.data){


        orderDetails.customerName=responseCust.data.customerName;
        orderDetails.email=responseCust.data.email;
        orderDetails.address=responseCust.data.address;
        orderDetails.phonenumber=responseCust.data.phoneNumber;
        const response = await axios.post('http://localhost:8080/orders/add-order', orderDetails);

        if (response.status === 201) {
          // Navigate to the payment page
          alert("Order Successfully Placed!")
          navigate('/home');
        } else {
          alert('Something went wrong, please try again later.');
        }
      }else{
        alert("Register Befor Place  Order")
      }
    } catch (error) {
      console.error('Error while placing the order:', error);
      alert('There was an error with the order. Please try again.');
    }
  };

  return (
    <div className="cart">
      <Navbar />
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {products_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>LKR.{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>LKR.{item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
                </div>
                <hr />
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
      
      <form className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          {/* <input 
            type="text" 
            name="firstName" 
            placeholder="First Name" 
            value={customerInfo.firstName} 
            onChange={handleChange} 
          /> */}
          <input 
          id='custEmail'
            type="email" 
            name="email" 
            placeholder="E-Mail Address" 
            value={customerInfo.email} 
            onChange={handleChange} 
          />
          {/* <input 
            type="text" 
            name="shippingAddress" 
            placeholder="Shipping Address" 
            value={customerInfo.shippingAddress} 
            onChange={handleChange} 
          /> */}
          {/* <input 
            type="text" 
            name="phone" 
            placeholder="Phone" 
            value={customerInfo.phone} 
            onChange={handleChange} 
          /> */}
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>LKR.{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>LKR.{getTotalCartAmount() === 0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>LKR.{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
              </div>
            </div>
            <button type="button" onClick={handlePlaceOrder}>Place Order</button>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Cart;
