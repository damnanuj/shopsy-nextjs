import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user");

    router.push("/");
  };

  return (
    <div style={styles.header}>
      <div style={styles.leftMenu}>
        <Link href="/products" style={styles.link}>
          Products
        </Link>
        <Link href="/wishlist" style={styles.link}>
          Wishlist
        </Link>
        <Link href="/cart" style={styles.link}>
          Cart
        </Link>
      </div>
      <div style={styles.rightMenu}>
        <p></p>
        {/* >>=============Logout button================>> */}
        <button onClick={handleLogout} style={styles.link}>
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    color: "white",
    padding: "10px 20px",
  },
  leftMenu: {
    display: "flex",
    gap: "15px",
  },
  rightMenu: {
    display: "flex",
  },
  link: {
    textDecoration: "none",
    color: "white",
    padding: "10px 15px",
    borderRadius: "5px",
    transition: "background-color 0.3s",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Header;
