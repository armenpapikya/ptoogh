import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { IoHeartOutline } from 'react-icons/io5';
import '../cssComponent/MainPage.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/images/product');
      const data = await response.json();
      
      const productData = data.slice(0, 8).map(img => ({
        id: img.id,
        name: img.name,
        price: Math.floor(Math.random() * 1000) + 100,
        type: img.name.includes('Apple') ? 'fruit' : img.name.includes('Pomegranate') ? 'fruit' : 'vegetable',
        region: ['Syunik', 'Lori', 'Gegharkunik', 'Tavush', 'Aragatsotn'][Math.floor(Math.random() * 5)],
        image: `http://localhost:5000/api/image-blob/${img.id}`,
        description: t('short_description')
      }));
      
      setProducts(productData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(product => product.type === filter);

  const productsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  if (loading) {
    return (
      <section className="products-section">
        <div className="products-container">
          <div className="products-header">
            <h2>Ապրանքներ</h2>
          </div>
          <div className="loading-spinner">Բեռնվում է...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="products-section">
      <div className="products-container">
        <div className="products-header">
          <h2>Ապրանքներ</h2>
          <button className="view-all-btn">Իմանալ ավելին</button>
        </div>
        
        <div className="product-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Բոլորը
          </button>
          <button 
            className={`filter-btn ${filter === 'fruit' ? 'active' : ''}`}
            onClick={() => setFilter('fruit')}
          >
            Մրգեր
          </button>
          <button 
            className={`filter-btn ${filter === 'vegetable' ? 'active' : ''}`}
            onClick={() => setFilter('vegetable')}
          >
            Բանջարեղեն
          </button>
        </div>
        
        <div className="product-grid">
          {currentProducts.map(product => (
            <div key={product.id} className="product-item">
              <div className="product-image">
                {product.image && <img src={product.image} alt={product.name} />}
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-price">{product.price} դրամ</p>
                <div className="product-actions">
                  <button className="heart-btn">
                    <IoHeartOutline />
                  </button>
                  <span className="quantity">1 հատ</span>
                  <button className="add-btn">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {totalPages > 1 && (
          <div className="pagination-controls">
            <button 
              className="pagination-btn prev-btn"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              ‹
            </button>
            
            <div className="page-indicators">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            
            <button 
              className="pagination-btn next-btn"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              ›
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductList;