import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoSearchOutline, IoHeartOutline, IoGlobeOutline, IoChevronDown } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../../i18n';
import '../cssComponent/Header.css';

const Header = ({ user, onLoginClick }) => {
  const [logo, setLogo] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const { t, i18n } = useTranslation();

  const location = useLocation();

  const fetchLogo = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/images/logo');
      const data = await response.json();
      
      const mainLogo = data.find(img => img.name === 'Logo');
      
      if (mainLogo) {
        setLogo(`http://localhost:5000/api/image-blob/${mainLogo.id}`);
      }
    } catch (error) {
      console.error('Error fetching logo:', error);
    }
  }, []);

  useEffect(() => {
    fetchLogo();
  }, [fetchLogo]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showLanguageDropdown && !event.target.closest('.language-dropdown')) {
        setShowLanguageDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLanguageDropdown]);



  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLanguageChange = (language) => {
    changeLanguage(language);
    setShowLanguageDropdown(false);
  };



  const getCurrentLanguageFlag = () => {
    const flags = {
      'hy': '🇦🇲',
      'en': '🇺🇸',
      'ru': '🇷🇺'
    };
    return flags[i18n.language] || '🌐';
  };

  return (
    <header className="header minimal-header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="logo">
            {logo && <img src={logo} alt="Ptoogh Logo" />}
          </Link>
        </div>
        
        <nav className="main-nav">
          <Link to="/" className={isActive('/') ? 'active' : ''}>
            {t('home')}
          </Link>
          <Link to="/about" className={isActive('/about') ? 'active' : ''}>
            {t('about')}
          </Link>
          <Link to="/blog" className={isActive('/blog') ? 'active' : ''}>
            {t('blog')}
          </Link>
          <Link to="/products" className={isActive('/products') ? 'active' : ''}>
            {t('products')}
          </Link>
        </nav>
        
        <div className="header-actions">
          <div className="search-box">
            <IoSearchOutline className="search-icon" />
            <input
              type="text"
              placeholder={t('search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                type="button" 
                className="clear-btn"
                onClick={() => setSearchQuery('')}
              >
                ×
              </button>
            )}
          </div>
          
          <button className="action-icon">
            <IoHeartOutline />
          </button>
          
          <div className="language-dropdown">
            <button 
              className="lang-btn"
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            >
              <span className="language-flag">{getCurrentLanguageFlag()}</span>
              <IoChevronDown className={`chevron ${showLanguageDropdown ? 'rotated' : ''}`} />
            </button>
            
            {showLanguageDropdown && (
              <div className="language-menu">
                <button 
                  className={`language-option ${i18n.language === 'hy' ? 'active' : ''}`}
                  onClick={() => handleLanguageChange('hy')}
                >
                  <span className="flag">🇦🇲</span>
                  <span>Հայերեն</span>
                </button>
                <button 
                  className={`language-option ${i18n.language === 'en' ? 'active' : ''}`}
                  onClick={() => handleLanguageChange('en')}
                >
                  <span className="flag">🇺🇸</span>
                  <span>English</span>
                </button>
                <button 
                  className={`language-option ${i18n.language === 'ru' ? 'active' : ''}`}
                  onClick={() => handleLanguageChange('ru')}
                >
                  <span className="flag">🇷🇺</span>
                  <span>Русский</span>
          </button>
              </div>
            )}
          </div>
          
          {user ? (
            <Link to="/profile" className="login-btn">
              {user.name}
            </Link>
          ) : (
            <button className="login-btn" onClick={onLoginClick}>
              {t('login')}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
