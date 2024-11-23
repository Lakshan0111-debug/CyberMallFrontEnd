import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./Cart.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import axios from "axios"; // Replacing API instance with axios for backend calls
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartData, setCartData] = useState(null); // Store cart data
  const navigate = useNavigate();

  // Fetch cart data from backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getCart/1"); // Adjust the endpoint if needed
        const formattedCartItems = response.data.cartItems.map((item, index) => ({
          ...item,
          id: index + 1, // Assign a unique ID for each row
          productId: item.product.productId, // Flatten product ID
          name: item.product.productName, // Flatten product name
          price: item.product.unitPrice, // Flatten product price
        }));
        setCartData({
          ...response.data,
          cartItems: formattedCartItems,
        });
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
  
    fetchCart();
  }, []);
  

  // Remove item from cart
  const handleRemoveFromCart = async (productId) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      try {
        // Send a request to update the cart with quantity = 0 for the specific product
        await axios.post("http://localhost:8080/createCart", {
          cartId: cartData.cartId,
          productId,
          quantity: 0, // Set quantity to 0 to remove the item
        });

        // Update cart data locally without re-fetching
        const updatedCartItems = cartData.cartItems.filter(
          (item) => item.product.productId !== productId
        );
        setCartData({
          ...cartData,
          cartItems: updatedCartItems,
          totalPrice: updatedCartItems.reduce((sum, item) => sum + item.subtotal, 0),
        });
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    }
  };

  const cartColumns = [
    { field: "productId", headerName: "Product ID", width: 100 },
    { field: "name", headerName: "Product Name", width: 230 },
    { field: "price", headerName: "Price (LKR)", width: 120 },
    { field: "quantity", headerName: "Quantity", width: 100 },
    { field: "subtotal", headerName: "Total (LKR)", width: 120 },
  ];
  

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleRemoveFromCart(params.row.product.productId)}
            >
              REMOVE
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="cart">
      <Navbar />
      <div className="cartTable">
        <div className="cartTableTitle">
          <span>MY CART</span>
        </div>
        {cartData ? (
          <DataGrid
            className="datagrid"
            rows={cartData.cartItems}
            columns={cartColumns.concat(actionColumn)}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row.id} // Use the unique ID for rows
          />
        ) : (
          <p>Loading cart data...</p>
        )}
      </div>
      <div className="cartSummary">
  <h2>Cart Totals</h2>
  <div className="cartSummaryDetails">
    <div>
      <p>Subtotal</p>
      <p>LKR.{cartData?.totalPrice.toFixed(2) || 0}</p>
    </div>
    <div>
      <p>Delivery Fee</p>
      <p>LKR.450</p> {/* Set the delivery fee to 450 */}
    </div>
    <div>
      <b>Total</b>
      <b>
        LKR.
        {(cartData?.totalPrice + 450).toFixed(2)} {/* Add fixed delivery fee to the total */}
      </b>
    </div>
  </div>
  <button onClick={() => navigate("/placeOrder")}>PROCEED TO CHECKOUT</button>
</div>
      <Footer />
    </div>
  );
};

export default Cart;
