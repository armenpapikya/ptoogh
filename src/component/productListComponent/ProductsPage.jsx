import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import ProductGrid from './ProductGrid';
import ProductFilters from './ProductFilters';
import ProductPagination from './ProductPagination';
import '../cssComponent/productListCss/ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const { t } = useTranslation();

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/images/product');
      const data = await response.json();
      
      const productData = data.map(img => ({
        id: img.id,
        name: img.name,
        price: Math.floor(Math.random() * 1000) + 100,
        type: img.name.includes('Apple') ? 'fruits' : img.name.includes('Pomegranate') ? 'fruits' : 'vegetables',
        region: ['Syunik', 'Lori', 'Gegharkunik', 'Tavush', 'Aragatsotn'][Math.floor(Math.random() * 5)],
        img: `http://localhost:5000/api/image-blob/${img.id}`,
        description: t('short_description')
      }));
      
      setProducts(productData);
      setFilteredProducts(productData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleFilterChange = (filters) => {
    let filtered = products;

    if (filters.type && filters.type !== 'all') {
      filtered = filtered.filter(product => product.type === filters.type);
    }

    if (filters.region && filters.region !== 'all') {
      filtered = filtered.filter(product => product.region === filters.region);
    }

    if (filters.search) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="products-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-container">
        <ProductFilters onFilterChange={handleFilterChange} />
        <ProductGrid products={currentProducts} />
        <ProductPagination 
          currentPage={currentPage}
          totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProductsPage; 