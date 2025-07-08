import React, { useState, useEffect, useCallback } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import '../cssComponent/MainPage.css';

const OurTeam = () => {
  const [productImages, setProductImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProductImages = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/images/product');
      const data = await response.json();
      
      // Get 8 product images for the grid
      const selectedImages = data.slice(0, 8);
      setProductImages(selectedImages);
    } catch (error) {
      console.error('Error fetching product images:', error);
    }
  }, []);

  useEffect(() => {
    fetchProductImages();
  }, [fetchProductImages]);

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(3, prev + 1));
  };

  return (
    <section className="products-section">
      <div className="products-container">
        <div className="products-header">
          <h2>Բույսեր</h2>
          <button className="view-all-btn">Իմանալ ավելին</button>
        </div>
        
        <div className="products-grid">
          {productImages.map((image, index) => (
            <div key={index} className="product-grid-item">
              <img 
                src={`http://localhost:5000/api/image-blob/${image.id}`} 
                alt={`Product ${index + 1}`}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="image-placeholder" style={{display: 'none'}}>
                <p>Product {index + 1}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination-controls">
          <button 
            className="pagination-btn prev-btn"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <IoChevronBack />
          </button>
          
          <div className="page-indicators">
            {[1, 2, 3].map(page => (
              <button
                key={page}
                className={`page-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button 
            className="pagination-btn next-btn"
            onClick={handleNextPage}
            disabled={currentPage === 3}
          >
            <IoChevronForward />
          </button>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
