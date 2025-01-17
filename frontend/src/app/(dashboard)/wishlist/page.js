"use client";

import { getWishlist, removeFromWishlist } from "@/network/wishlistSocket";
import React, { useState, useEffect } from "react";
import Card from "@/components/Card";

const Wishlist = () => {
  const [userId, setUserId] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserId(parsedUser._id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      getWishlist(userId, (response) => {
        if (response.success) {
          setWishlist(response.wishlist);
        } else {
          alert(`Failed to fetch wishlist: ${response.message}`);
        }
        setLoading(false);
      });
    }
  }, [userId]);

  const handleRemoveProduct = (productId) => {
    if (!userId) {
      alert("User not logged in!");
      return;
    }

    removeFromWishlist(userId, productId, (response) => {
      if (response.success) {
        setWishlist(response.wishlist);
        alert(`Failed to remove product: ${response.message}`);
      }
    });
  };

  if (loading) {
    return <div>Loading wishlist...</div>;
  }

  return (
    <div style={styles.wishlistContainer}>
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div style={styles.productsList}>
          {wishlist.map((product) => (
            <Card
              key={product._id}
              item={product}
              onRemove={handleRemoveProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  wishlistContainer: {
    padding: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
    textAlign: "center",
  },
  productsList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
};

export default Wishlist;
