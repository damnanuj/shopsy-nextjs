import { useState, useEffect } from "react";
import { addToWishlist } from "@/network/wishlistSocket";

const ProductCard = ({ product }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log(parsedUser._id);
      setUserId(parsedUser._id);
    }
  }, []);

  const handleAddToWishlist = () => {
    if (!userId) {
      alert("User not logged in!");
      return;
    }

    addToWishlist(userId, product._id, (response) => {
      if (response.success) {
        alert("Product added to wishlist!");
      } else {
        alert(`Failed to add product to wishlist: ${response.message}`);
      }
    });
  };

  return (
    <div style={styles.card}>
      <img src={product.image} alt={product.title} style={styles.image} />
      <h2 style={styles.title}>{product.title}</h2>
      <p style={styles.description}>{product.description}</p>
      <p style={styles.price}>${product.price}</p>
      <p style={styles.rating}>
        Rating: {product.rating.rate} ({product.rating.count} reviews)
      </p>
      <div style={styles.buttonContainer}>
        <button onClick={handleAddToWishlist} style={styles.button}>
          Add to Wishlist
        </button>
        <button style={styles.button}>Add to Cart</button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    maxWidth: "300px",
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    margin: "16px",
  },
  image: {
    width: "100%",
    height: "300px",
    borderRadius: "8px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "12px 0",
  },
  description: {
    fontSize: "14px",
    color: "#666",
    margin: "8px 0",
  },
  price: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
    margin: "8px 0",
  },
  rating: {
    fontSize: "14px",
    color: "#555",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "16px",
  },
  button: {
    padding: "8px 12px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#0070f3",
    color: "#fff",
    fontSize: "14px",
    transition: "background-color 0.3s",
  },
};

export default ProductCard;
