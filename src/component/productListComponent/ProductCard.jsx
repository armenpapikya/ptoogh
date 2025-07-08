import React from 'react';
import { useTranslation } from 'react-i18next';
import { IoHeartOutline, IoAdd } from 'react-icons/io5';
import '../cssComponent/productListCss/ProductCard.css';

export default function ProductCard({ product }) {
  const { t } = useTranslation();
  
  return (
    <div className="product-card">
      <button className="product-card__favorite" title={t('add_to_favorites')}>
        <IoHeartOutline />
      </button>
      <img src={product.img} alt={product.name} className="product-card__img" />
      <div className="product-card__body">
        <div className="product-card__name">{product.name}</div>
        <div className="product-card__price">{product.price} դր.</div>
      </div>
      <div className="product-card__footer">
        <button className="product-card__add-btn" title={t('add_to_cart')}>
          <IoAdd />
        </button>
        <span className="product-card__quantity">1 հատ</span>
        <button className="product-card__favorite-footer" title={t('add_to_favorites')}>
          <IoHeartOutline />
        </button>
      </div>
    </div>
  );
} 