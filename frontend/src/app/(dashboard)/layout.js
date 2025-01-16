"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { getToken, saveToken } from "@/utlils/auth";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    //>>============ Extract token from URL ==================>>
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    const user = queryParams.get("user");

    // >>============save it to localStorage==================>>
    if (token && user) {
      saveToken(token);
      localStorage.setItem("user", user);

      //>>============  after saving token redirect to products==============>>
      router.push("/products");
    }

    if (!getToken()) {
      router.push("/login");
    }
  }, []);

  return (
    <section>
      <Header />
      {children}
    </section>
  );
}
