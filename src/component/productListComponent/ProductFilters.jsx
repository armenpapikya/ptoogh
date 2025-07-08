import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../cssComponent/productListCss/ProductFilters.css';

export default function ProductFilters({ onFilterChange }) {
  const [activeCategory, setActiveCategory] = useState('fruits');
  const { t } = useTranslation();

  const categories = [
    { key: 'fruits', label: 'Միրգ' },
    { key: 'vegetables', label: 'Բանջարեղեն' },
    { key: 'berries', label: 'Հատապտուղ' }
  ];

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    onFilterChange({ type: category });
  };

  return (
    <div className="product-filters">
      <div className="filters-container">
        <div className="category-tabs">
          {categories.map(category => (
            <button
              key={category.key}
              className={`category-tab${activeCategory === category.key ? ' active' : ''}`}
              onClick={() => handleCategoryChange(category.key)}
            >
              {category.label}
            </button>
          ))}
        </div>
        <button className="see-more-btn">
          Տեսնես ավելին
        </button>
      </div>
    </div>
  );
} 