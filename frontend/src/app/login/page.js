"use client";

import { getToken } from "@/utlils/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginPage = () => {
  const router = useRouter();
  useEffect(() => {
    const token = getToken();

    if (token) {
      router.push("/products");
    }
  }, []);

  return (
    <div style={styles.container}>
      <h2>Please log in to access the products</h2>
      {/* >>===========google login===============>> */}
      <a href="http://localhost:5000/auth/google" style={styles.button}>
        <img
          src="https://img.icons8.com/?size=512&id=17949&format=png"
          alt="Google Login"
          width={24}
          height={24}
        />
        Login With Google
      </a>
 {/* >>===========github login===============>> */}
      <button style={styles.button}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmrGmeBv3SOLSKz6OlTVlVYkfH9_W3BBgdrA&s"
          alt="GitHub Login"
          width={24}
          height={24}
        />
        Login With GitHub
      </button>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
  },
  button: {
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#fff",
    cursor: "pointer",
    gap: "10px",
    color: "#000",
  },
};

export default LoginPage;
