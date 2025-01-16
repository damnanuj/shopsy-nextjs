import React from 'react';
import ProductCard from './ProductCard';


const ProductList = ({ products }) => {
  return (
    <div style={styles.container}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

const styles = {
  container: {
    
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '16px',
    padding: '20px',
  },
};

export default ProductList;
