import React, { useContext } from 'react';
import './PlaceOrder.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { StoreContext } from '../../context/StoreContext';

const PlaceOrder = () => {

  const {getTotalCartAmount} = useContext(StoreContext)

  return (
    <div className='place-order-page'>
      <Navbar/>
      <form className='place-order'>
        <div className='place-order-left'>
          <p className='title'>Delivery Information</p>
          <input type='text' placeholder='First Name'/>
          <input type='email' placeholder='E-Mail Address'/>
          <input type='text' placeholder='Shipping Address'/>
          <input type='text' placeholder='Phone'/>
        </div>
        <div className='place-order-right'>
          <div className='cart-total'>
            <h2>Cart Totals</h2>
            <div>
              <div className='cart-total-details'>
                <p>Subtotal</p>
                <p>LKR.{getTotalCartAmount()}</p>
              </div>
              <hr/>
              <div className='cart-total-details'>
                <p>Delivery Fee</p>
                <p>LKR.{getTotalCartAmount()===0?0:2}</p>
              </div>
              <hr/>
              <div className='cart-total-details'>
                <b>Total</b>
                <b>LKR.{getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
              </div>
            </div>
            <button>PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
      <Footer/>
    </div>
  )
}

export default PlaceOrder;