"use client";

import { useState, useEffect } from "react";
import Card from "@/components/Card";
import { fetchProductById } from "@/network/fetchProductById";
import io from "socket.io-client";
import { removeFromCart } from "@/network/removeFromCart";

const CartPage = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      const cartItems = user.cart;

      const fetchCartProducts = async () => {
        try {
          const socket = io("https://shopsy-nextjs.onrender.com");
          const productPromises = cartItems.map(async (item) => {
            // >>==========Fetch product details for each productId===========>>
            const product = await fetchProductById(item.productId);
            return { ...product, quantity: item.quantity };
          });

          const products = await Promise.all(productPromises);
          setCartProducts(products);
        } catch (error) {
          setError(error.message);
        }
      };

      fetchCartProducts();
    } else {
      setError("User not found in local storage.");
    }
  }, []);

  const onRemoveFromCart = async (productId) => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      const userId = user._id;

      try {
        const updatedCart = await removeFromCart(userId, productId);

        setCartProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );

        console.log("Cart updated successfully:", updatedCart);
      } catch (error) {
        console.error("Error removing product from cart:", error);
        setError(error);
      }
    } else {
      setError("User not found in local storage.");
    }
  };

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.heading}>My Cart</h1>
      {error && <p style={styles.errorMessage}>{error}</p>}
      {cartProducts.length > 0 ? (
        <div style={styles.gridContainer}>
          {cartProducts.map((item) => (
            <Card key={item._id} item={item} onRemove={onRemoveFromCart} />
          ))}
        </div>
      ) : (
        <p style={styles.emptyMessage}>Your cart is empty.</p>
      )}
    </div>
  );
};

const styles = {
  pageContainer: {
    padding: "20px",
    textAlign: "center",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    justifyContent: "center",
  },
  emptyMessage: {
    fontSize: "1.2rem",
    color: "#666",
  },
  errorMessage: {
    fontSize: "1.2rem",
    color: "red",
  },
};

export default CartPage;
