import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import '../cssComponent/aboutCss/AboutHeroCarousel.css';

const AboutHeroCarousel = () => {
  const [backgroundImages, setBackgroundImages] = useState([]);
  const { t } = useTranslation();

  const fetchBackgroundImages = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/images/background');
      const data = await response.json();
      setBackgroundImages(data);
    } catch (error) {
      console.error('Error fetching background images:', error);
    }
  }, []);

  useEffect(() => {
    fetchBackgroundImages();
  }, [fetchBackgroundImages]);

  return (
    <section className="about-hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1>{t('about_us')}</h1>
          <p>{t('ptoogh_description')}</p>
        </div>
        <div className="hero-image">
          {backgroundImages.length > 0 && (
            <img 
              src={`http://localhost:5000/api/image-blob/${backgroundImages[0].id}`} 
              alt="About Hero" 
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutHeroCarousel;