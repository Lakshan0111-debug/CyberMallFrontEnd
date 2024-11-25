import { createContext, useState, useEffect } from "react";
import { products_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
    setCartItems(storedCartItems);
  }, []);

  // Save cart items to localStorage whenever cartItems change
  useEffect(() => {
    if (Object.keys(cartItems).length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;
      return updatedCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId]) {
        updatedCart[itemId]--;
        if (updatedCart[itemId] <= 0) {
          delete updatedCart[itemId]; // Remove item if count is zero
        }
      }
      return updatedCart;
    });
  };

  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((totalAmount, itemId) => {
      const itemInfo = products_list.find((product) => product._id.toString() === itemId.toString());
      if (itemInfo && cartItems[itemId] > 0) {
        totalAmount += itemInfo.price * cartItems[itemId];
      }
      return totalAmount;
    }, 0);
  };

  const contextValue = {
    products_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
