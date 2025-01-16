import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.heading}>Welcome, User!</h1>
      <p style={styles.message}>Please login to use our services.</p>
      <Link href={"/login"} style={styles.getStartedButton}>
        Get Started
      </Link>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",

    textAlign: "center",
  },
  heading: {
    fontSize: "2.5rem",
    color: "#fff",
    marginBottom: "20px",
  },
  message: {
    fontSize: "1.2rem",
    color: "#bbb",
    marginBottom: "30px",
  },
  getStartedButton: {
    padding: "12px 24px",
    fontSize: "1.2rem",
    backgroundColor: "#fff",
    color: "#000",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

export default Home;
