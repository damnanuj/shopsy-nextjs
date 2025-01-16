"use client";


import Card from "@/components/Card";
import React, { useState } from "react";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);

  const onRemoveFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.heading}>My Wishlist</h1>
      {wishlist.length > 0 ? (
        <div style={styles.gridContainer}>
          {wishlist.map((item) => (
            <Card key={item.id} item={item} onRemove={onRemoveFromWishlist} />
          ))}
        </div>
      ) : (
        <p style={styles.emptyMessage}>Your wishlist is empty.</p>
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
};

export default WishlistPage;
