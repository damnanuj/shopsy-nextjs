"use client";

import React, { useEffect, useState } from "react";
import ProductList from "@/components/ProductList";
import { fetchAllProducts } from "@/network/fetchProducts";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchAllProducts();
        setProducts(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Product List</h1>
      {products.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default ProductsList;
