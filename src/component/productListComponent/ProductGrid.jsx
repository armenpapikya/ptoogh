import React from 'react';
import ProductCard from './ProductCard';
import '../cssComponent/productListCss/ProductGrid.css';

export default function ProductGrid({ products }) {
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
} 