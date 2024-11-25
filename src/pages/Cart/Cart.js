// import React, { useContext, useState, useEffect } from 'react';
// import './Cart.css';
// import { StoreContext } from '../../context/StoreContext';
// import Navbar from '../../components/Navbar/Navbar';
// import Footer from '../../components/Footer/Footer';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Cart = () => {
//   const { cartItems, products_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
//   const navigate = useNavigate();
//   const [customerInfo, setCustomerInfo] = useState({
//     firstName: '',
//     email: '',
//     shippingAddress: '',
//     phone: ''
//   });


 
  
//   // Add to cart function
//   const handleAddToCart = (productId) => {
//     addToCart(productId); // This adds the product to the cart
//   };

//   const handleChange = (e) => {
//     setCustomerInfo({
//       ...customerInfo,
//       [e.target.name]: e.target.value,
//       [e.target.email]:e.target.value,
//       [e.target.phone]:e.target.value,
//       [e.target.shippingAddress]:e.target.value,

//     });
//   };

  

//   const handlePlaceOrder = async () => {
//     // Validate customer information
//     // if (!customerInfo.firstName || !customerInfo.email || !customerInfo.shippingAddress || !customerInfo.phone) {
//     //   alert("Please fill out all fields.");
//     //   return;
//     // }

//     const cartData=localStorage.getItem("cart");

      
      
      
//       if(cartData){
//           cartItems=JSON.parse(cartData);
//           console.log("cart Items: ",cartItems);
//           console.log(cartItems);
          
          
//       }
      
//       console.log(customerInfo);
      
     
      
//       for(let i=0;i<cartItems.length;i++){
//         console.log(cartItems[i]);
        
//       }
      
//     const orderDetails = {
//       orderId:0,
//       customerName:'',
//       address:"",
//       email:"",
//       phonenumber:"",
//       totalPrice: getTotalCartAmount(),
//       noOfItems: Object.values(cartItems).reduce((acc, quantity) => acc + quantity, 0),
//       dateTime: new Date().toLocaleString(),
//       itemsInCart:cartItems
//     };


    

    
//     // const customer = {
//     //   customerId: setCustomerInfo(0),
//     //   customerName: setCustomerName(customerInfo.name),
//     //   email: setEmail(''),
//     //   phoneNumber: setPhoneNumber(''),
//     //   address: setAddress(''),
//     //   userName: setUserName(''),
//     //   password: setPassword('')


//     // }


//     const em=document.getElementById("custEmail").innerText.toString()
   
//     console.log(em);
//     if (!customerInfo.email) {
//       alert("Please fill out all fields.");
//       return;
//     }
   
   

//     try {
//       for (let i = 0; i < localStorage.length; i++) {
//         const element = localStorage[i];
//         console.log(element);
//         const key=localStorage.key(i);
//         const value=localStorage.getItem(key)
//         console.log(Object.values(cartItems[0]).toString());
        
//       }
      

    
      
      
      
     
//       console.log(Object.values(cartItems.products_list).reduce((acc, quantity) => acc + quantity, 0));
      

//       // orderDetails.customerName=customerInfo.name;
//       // orderDetails.email=customerInfo.email;
//       // orderDetails.address=customerInfo.address;
//       // orderDetails.phonenumber=customerInfo.phoneNumber;
//       orderDetails.customerName=customerInfo.name;
//       orderDetails.address=customerInfo.address;
//       orderDetails.email=customerInfo.email;
//       orderDetails.phonenumber=customerInfo.phoneNumber;
//       console.log(customerInfo);
      
//       console.log(customerInfo.phoneNumber);
//       console.log(customerInfo.address);
//       console.log(customerInfo.name);
//       console.log(orderDetails.email+"  hi");
//       console.log(orderDetails);
      
//       const responseCust = await axios.get(`http://localhost:8080/cutomers/find-by-email/${customerInfo.email}`);
//       if(responseCust.data){

//         console.log(response.data)
        
//         orderDetails.customerName=responseCust.data.customerName;
//         orderDetails.email=responseCust.data.email;
//         orderDetails.address=responseCust.data.address;
//         orderDetails.phonenumber=responseCust.data.phoneNumber;
//         const response = await axios.post('http://localhost:8080/orders/add-order', orderDetails);

//         if (response.status === 201) {
//           // Navigate to the payment page
//           alert("Order Successfully Placed!")
//           navigate('/home');
//         } else {
//           alert('Something went wrong, please try again later.');
//         }
//       }else{
//         alert("Register Befor Place  Order")
//       }
//     } catch (error) {
//       console.error('Error while placing the order:', error);
//       alert('There was an error with the order. Please try again.');
//     }
//   };



//   // --------------------


//   // ------------------

//   return (
//     <div className="cart">
//       <Navbar />
//       <div className="cart-items">
//         <div className="cart-items-title">
//           <p>Items</p>
//           <p>Title</p>
//           <p>Price</p>
//           <p>Quantity</p>
//           <p>Total</p>
//           <p>Remove</p>
//         </div>
//         <br />
//         <hr />
//         {products_list.map((item) => {
//           if (cartItems[item._id] > 0) {
//             return (
//               <div key={item._id}>
//                 <div className="cart-items-title cart-items-item">
//                   <img src={item.image} alt="" />
//                   <p>{item.name}</p>
//                   <p>LKR.{item.price}</p>
//                   <p>{cartItems[item._id]}</p>
//                   <p>LKR.{item.price * cartItems[item._id]}</p>
//                   <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
//                 </div>
//                 <hr />
//               </div>
//             );
//           } else {
//             return null;
//           }
//         })}
//       </div>
      
//       <form className="place-order">
//         <div className="place-order-left">
//           <p className="title">Delivery Information</p>
//           <input 
//             type="text" 
//             name="firstName" 
//             placeholder="First Name" 
//             value={customerInfo.firstName} 
//             onChange={handleChange} 
//           />
//           <input 
//           id='custEmail'
//             type="email" 
//             name="email" 
//             placeholder="E-Mail Address" 
//             value={customerInfo.email} 
//             onChange={handleChange} 
//           />
//           <input 
//             type="text" 
//             name="shippingAddress" 
//             placeholder="Shipping Address" 
//             value={customerInfo.shippingAddress} 
//             onChange={handleChange} 
//           />
//           <input 
//             type="text" 
//             name="phone" 
//             placeholder="Phone" 
//             value={customerInfo.phone} 
//             onChange={handleChange} 
//           />
//         </div>

//         <div className="place-order-right">
//           <div className="cart-total">
//             <h2>Cart Totals</h2>
//             <div>
//               <div className="cart-total-details">
//                 <p>Subtotal</p>
//                 <p>LKR.{getTotalCartAmount()}</p>
//               </div>
//               <hr />
//               <div className="cart-total-details">
//                 <p>Delivery Fee</p>
//                 <p>LKR.{getTotalCartAmount() === 0 ? 0 : 2}</p>
//               </div>
//               <hr />
//               <div className="cart-total-details">
//                 <b>Total</b>
//                 <b>LKR.{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
//               </div>
//             </div>
//             <button type="button" onClick={handlePlaceOrder}>Place Order</button>
//           </div>
//         </div>
//       </form>
//       <Footer />
//     </div>
//   );
// };

// export default Cart;








// -------ch----------------
import React, { useContext, useState } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const { cartItems, products_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    email: '',
    shippingAddress: '',
    phone: '',
  });

  // Handle input changes for customer information
  const handleChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  // Extract product details into ProductDto format
  const extractProductsArray = () => {
    return products_list
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        productId: item._id,
        productName: item.name,
        description: item.description || "No description available",
        supplierName: item.supplier || "Unknown Supplier",
        unitPrice: item.price.toString(),
        quantity: cartItems[item._id].toString(),
        image: item.image,
      }));
  };

  const handlePlaceOrder = async () => {
    // Validate customer information
    if (!customerInfo.firstName || !customerInfo.email || !customerInfo.shippingAddress || !customerInfo.phone) {
      alert("Please fill out all fields.");
      return;
    }

    // Prepare order details
    const productsArray = extractProductsArray();
    const orderDetails = {
      orderId: 0, // Example orderId, replace with your logic
      customerName: customerInfo.firstName,
      shippingAddress: customerInfo.shippingAddress,
      email: customerInfo.email,
      phoneNo: customerInfo.phone,
      totalPrice: getTotalCartAmount().toString(),
      noOfItems: productsArray.length.toString(),
      dateTime: new Date().toLocaleString(),
      productDtos: productsArray, // Attach extracted products array here
    };

    console.log("Order Details:", orderDetails);

    // Send order details to the backend
    try {
      const response = await axios.post('http://localhost:8080/orders/add-order', orderDetails);
      if (response.status === 201) {
        alert("Order successfully placed!");
        navigate('/home');
      } else {
        alert("Order successfully placed!");
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
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={customerInfo.firstName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="E-Mail Address"
            value={customerInfo.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="shippingAddress"
            placeholder="Shipping Address"
            value={customerInfo.shippingAddress}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={customerInfo.phone}
            onChange={handleChange}
          />
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

