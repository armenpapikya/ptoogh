import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import './cssComponent/HowToUsePage.css';

const HowToUsePage = () => {
  const [logo, setLogo] = useState('');
  const [background, setBackground] = useState('');
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const imageCache = useMemo(() => new Map(), []);

  const fetchImages = useCallback(async () => {
    try {
      const [logoResponse, backgroundResponse] = await Promise.all([
        fetch('http://localhost:5000/api/images/logo'),
        fetch('http://localhost:5000/api/images/background')
      ]);
      
      const logoData = await logoResponse.json();
      const backgroundData = await backgroundResponse.json();
      
      const mainLogo = logoData.find(img => img.name === 'Logo');
      const loginBg = backgroundData.find(img => img.name.includes('Login'));
      
      const logoUrl = mainLogo ? `http://localhost:5000/api/image-blob/${mainLogo.id}` : '';
      const backgroundUrl = loginBg ? `http://localhost:5000/api/image-blob/${loginBg.id}` : '';
      
      imageCache.set('logo', logoUrl);
      imageCache.set('background', backgroundUrl);
      
      setLogo(logoUrl);
      setBackground(backgroundUrl);
    } catch (error) {
      console.error('Error fetching images:', error);
      
      const fallbackLogo = '/logo.png';
      const fallbackBackground = '/login.jpg';
      
      setLogo(fallbackLogo);
      setBackground(fallbackBackground);
    } finally {
      setLoading(false);
    }
  }, [imageCache]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const steps = [
    {
      title: t('register_login'),
      description: t('register_login_desc')
    },
    {
      title: t('browse_products'),
      description: t('browse_products_desc')
    },
    {
      title: t('contact_seller'),
      description: t('contact_seller_desc')
    },
    {
      title: t('use_filters'),
      description: t('use_filters_desc')
    },
    {
      title: t('place_order_desc'),
      description: t('place_order_desc')
    },
    {
      title: t('enjoy_products_desc'),
      description: t('enjoy_products_desc')
    }
  ];

  if (loading) {
    return (
      <div className="how-to-use-page">
        <div className="image-loading">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="how-to-use-page">
      <div className="title-section">
        <h1 className="ptoogh-text">Ptoogh</h1>
      </div>
      
      <div className="how-to-use-main">
        <div className="registration-section">
          <div className="registration-content">
            <div className="registration-left">
              <img 
                src={background} 
                alt="Fresh vegetables" 
                className="registration-image"
                onError={(e) => {
                  e.target.src = '/login.jpg';
                }}
              />
            </div>
            <div className="registration-right">
              <div className="login-form-container">
                <div className="form-header">
                  <img src={logo} alt="Ptoogh Logo" className="form-logo" />
                  <h2 className="form-title">{t('login')}</h2>
                </div>
                <form className="login-form">
                  <div className="input-group">
                    <input 
                      type="email" 
                      className="form-input" 
                      placeholder={t('email_label')}
                    />
                  </div>
                  <div className="input-group">
                    <input 
                      type="password" 
                      className="form-input" 
                      placeholder={t('password_label')}
                    />
                  </div>
                  <div className="form-buttons">
                    <button type="button" className="btn btn-primary">
                      {t('login')}
                    </button>
                    <button type="button" className="btn btn-secondary">
                      {t('register')}
                    </button>
                  </div>
                  <div className="form-links">
                    <a href="#" className="forgot-link">{t('forgot_password')}</a>
                  </div>
                  <div className="language-selector">
                    <button className="lang-btn active">ՀԱՅ</button>
                    <button className="lang-btn">ENG</button>
                    <button className="lang-btn">РУС</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="lorem-section">
          <div className="lorem-text">
            <p>{t('about_text_1')}</p>
          </div>
        </div>

        <div className="steps-section">
          <h2 className="section-title">{t('how_to_use_title')}</h2>
          <div className="steps-grid">
            {steps.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-number">{index + 1}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="video-section">
          <h2 className="section-title">{t('video_tutorial')}</h2>
          <div className="video-placeholder">
            {t('video_coming_soon')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToUsePage; 